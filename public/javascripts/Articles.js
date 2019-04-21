export default class Articles {
    constructor() {
        this.bookmark = document.querySelector('.fav');
        this.content = document.querySelector('.art-content')
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
            let { x, y, width } = selection.getBoundingClientRect() 
            const startNode = selection.startContainer.parentNode
            const endNode = selection.endContainer.parentNode

            console.log(x, y, width, selection)

            if (!width) {
                this.pencil.style.visibility = 'hidden'
                return
            }

            let ypos = startNode.offsetTop
            let xpos = startNode.offsetWidth

            this.pencil.style.visibility = 'visible'
            this.pencil.style.left = xpos/2 + 'px'
            this.pencil.style.top = ypos -20 + 'px'

            this.pencil.addEventListener('click', () => {
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

        })


    }

}




