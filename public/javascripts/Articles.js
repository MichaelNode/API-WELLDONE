export default class Articles {
    constructor() {
        this.bookmark = document.querySelector('.fav');
        this.content = document.querySelector('.art-content')
        this.menu = document.querySelector('.menu')
        this.underline = document.querySelector('.fa-pencil-alt')
        this.erase = document.querySelector('.fa-trash-alt')
        this.pencil = document.querySelector('.pencil')
    }

    eventListeners() {
        if (!this.bookmark) return;
        this.bookmark.addEventListener('click', (e) => {
            e.stopPropagation()
            e.preventDefault()
            var article = this.bookmark.getAttribute('data-article')
            var articleID = article.slice(1, -1)

            const url = `/apiv1/favarticle`;
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

        this.content.addEventListener('mouseup', (e) => {

            let selection = window.getSelection().getRangeAt(0)
            const { x, top, width } = selection.getBoundingClientRect() 
            const startNode = selection.startContainer.parentNode
            const endNode = selection.endContainer.parentNode
            

            if (!width) {
                this.menu.style.display = 'none'
                return
            }

            let xpos = startNode.offsetWidth
            let ypos = startNode.offsetTop
            const menuWidth = this.menu.offsetWidth
            const menuHeight = this.menu.offsetTop

            this.menu.style.display = 'block'
            this.menu.style.left = (x + (width/2) - (menuWidth/2)) + 'px'
            this.menu.style.top = (top - 10) + 'px'

            //console.log(selection.getBoundingClientRect(),  this.menu.style.top)

            this.underline.addEventListener('click', () => {
                let selectedText = selection.extractContents()
                let span = document.createElement('span')
                span.style.backgroundColor = 'yellow'
                span.appendChild(selectedText)
                selection.insertNode(span)

                var article = this.pencil.getAttribute('data-article')
                var articleID = article.slice(1, -1)
                var textUnderlined = selection.toString()

                const url = `/apiv1/underlinetext`;
                const data = {
                    article: articleID,
                    content: textUnderlined
                }
                
                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(response => {
                        console.log('guardado', response)
                        selection = ''
                    })
            })

            // Delete underline

            this.erase.addEventListener('click', () => {
                let selectedText = selection.extractContents()
                let span = document.createElement('span')
                span.style.backgroundColor = 'white'
                span.appendChild(selectedText)
                selection.insertNode(span)

                var article = this.erase.getAttribute('data-article')
                var articleID = article.slice(1, -1)
                var textUnderlined = selection.toString()

                const url = `/apiv1/underlinetext`;
                const data = {
                    article: articleID,
                    content: textUnderlined
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
                        console.log('eliminado', response)
                        selection = ''
                    })
            })

        })


    }

}




