export default class Articles {
    constructor() {
        this.bookmark = document.querySelector('.fav');

    }

    eventListeners() {
        if (!this.bookmark) return;
        this.bookmark.addEventListener('click', (e) => {
            e.stopPropagation()
            e.preventDefault()
            var article = this.bookmark.getAttribute('data-article')
            var articleID = article.slice(1, -1)

<<<<<<< HEAD
            const url = '/apiv1/favarticle'
=======
            const url = 'http://localhost:3002/apiv1/favarticle'
>>>>>>> 6d5f62fdb72cbaa9fac2d954a7073c7149ece77c
            const data = {
                articleID: articleID
            }


            fetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    e.target.classList.add(response.add)
                    e.target.classList.remove(response.remove)
                    e.target.classList.remove("bubble");
                    void e.target.offsetWidth;
                    e.target.classList.add("bubble");
                })
        })

    }

}




