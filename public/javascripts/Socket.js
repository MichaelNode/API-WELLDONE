export default class Socket {
  constructor() {
    this.socket = io();
    this.initialize();
  }

  initializeToast() {
    toastr.options = {
      "closeButton": false,
      "debug": true,
      "newestOnTop": true,
      "progressBar": true,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "10000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
  }

  async initialize() {
    this.initializeToast();
    // register service worker for push notifications
    if ('Notification' in window) {
      const hasNotificationPermission = await this.checkPermission('notifications');
      if (!hasNotificationPermission) {
        this.requestNotificationPermission();
      }
    }

    this.socket.on('notification-article', (title, msg, url) => {
      this.sendNotification(title, msg, url)
    });

    this.socket.on('follow', (data) => this.sendNotification('', data));
  }

  async requestNotificationPermission() {
    return window.Notification.requestPermission();
  }

  async getPermission(permissionName) {
    return navigator.permissions.query({name: permissionName})
  }

  async checkPermission(permissionName) {
    const permission = await this.getPermission(permissionName);
    return permission.state === 'granted';
  }

  async sendNotification(title = '', message = '', url = null) {
    if ('Notification' in window) {
      const hasNotificationPermission = await this.checkPermission('notifications');
      if (hasNotificationPermission) {
        let options = {
          body: message,
          icon: '',
          vibrate: [100, 50, 100],
          data: {
            dateofArrival: Date.now()
          }
        };

        const notification = new Notification(title, options);
        if (url) {
          notification.onclick = () => {
            window.open(url);
          }
        }
        return;
      }
    }

    message = `<a target="_blank" href="${url}">${message}</a>`;
    // use toastr if not notification permission
    toastr.info(message, title);

  }
}