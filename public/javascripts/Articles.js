
export default class Articles {
    constructor(){
        this.bookmark = document.querySelector('.fav');
       
    }

    eventListeners(){
        
        this.bookmark.addEventListener('click', (e) => {
            e.stopPropagation()
            e.preventDefault()
            var article = this.bookmark.getAttribute('data-article')
            var articleID = article.slice(1, -1)

            const url = 'http://localhost:3000/apiv1/favarticle'
            const data = {
                articleID: articleID
            }


            fetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers:{
                  'Content-Type': 'application/json'
                }
              }).then(res => res.json())
              .catch(error => console.error('Error:', error))
              .then(response => {
                e.target.classList.add(response.add)
                e.target.classList.remove(response.remove)
              })
        })

    }

    }
    



    