export default class Socket {
  constructor() {
    this.socket = io();
    this.initialize();
  }

  /**
   * Function for add toast notification configuration
   */
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

  /**
   * Function for initialize Socket class
   * @returns {Promise<void>}
   */
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

    this.socket.on('follow-user', (data) => this.sendNotification('', data));
  }

  /**
   * Function for request notification of naavigator permission
   * @returns {Promise<NotificationPermission>}
   */
  async requestNotificationPermission() {
    return window.Notification.requestPermission();
  }

  /**
   * Function for get permission value of one service
   * @param permissionName
   * @returns {Promise<*>}
   */
  async getPermission(permissionName) {
    return navigator.permissions.query({name: permissionName})
  }

  /**
   * Function for check if the client had permission in one service
   * @param permissionName
   * @returns {Promise<boolean>}
   */
  async checkPermission(permissionName) {
    const permission = await this.getPermission(permissionName);
    return permission.state === 'granted';
  }

  /**
   * Function for send notification (navigator if has permission, if not, then use toast)
   * @param title
   * @param message
   * @param url
   * @returns {Promise<void>}
   */
  async sendNotification(title = '', message = '', url = null) {

    // If notification permission, then send navigator notification
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

    // use toastr if not notification permission
    message = `<a target="_blank" href="${url}">${message}</a>`;
    toastr.info(message, title);

  }
}