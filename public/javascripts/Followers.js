export default class Followers {
    constructor(){
        this.followBtn = document.querySelectorAll('.follow')
    }

    eventListeners(){
        if(!this.followBtn) return;
        this.followBtn.forEach(item => 
            item.addEventListener('click', (e) => {
                const url = '/apiv1/followuser'
                const userData = item.getAttribute('data-user')
                var userToFollow = userData.slice(1, -1)
    
                const data = {
                    userToFollow: userToFollow
                }
    
                fetch(url, {
                    method: 'PUT', 
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .catch(error => console.error('Error: ', error))
                .then(response => item.childNodes[0].nodeValue=response.btnText)
            })
            )
        
    }
}