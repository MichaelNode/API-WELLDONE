export default class Articles {
    constructor() {
        this.bookmark = document.querySelector('.fav');
        this.content = document.querySelector('.art-content')
        this.menu = document.querySelector('.menu')
        this.underline = document.querySelector('.fa-pencil-alt')
        this.erase = document.querySelector('.fa-trash-alt')
        this.pencil = document.querySelector('.pencil')
        this.selection = ''
        this.changeBackgoundColor = (color) => {
            let selectedText = this.selection.extractContents()
            let span = document.createElement('span')
            span.style.backgroundColor = color
            span.appendChild(selectedText)
            this.selection.insertNode(span)
        }
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

        this.content.addEventListener('mousedown', (e) => {
            this.selection = ''
        })

<<<<<<< HEAD
        this.content.addEventListener('mouseup', (e) => {
            
            this.selection = window.getSelection().getRangeAt(0)
            const { x, top, width } = this.selection.getBoundingClientRect() 
            
=======
            let selection = window.getSelection().getRangeAt(0)
            const { x, top, width } = selection.getBoundingClientRect()
            const startNode = selection.startContainer.parentNode
            const endNode = selection.endContainer.parentNode


>>>>>>> develop
            if (!width) {
                this.menu.style.display = 'none'
                return
            }

            const menuWidth = this.menu.offsetWidth
            this.menu.style.display = 'block'
            this.menu.style.left = (x + (width/2) - (menuWidth/2)) + 'px'
            this.menu.style.top = (top - 10) + 'px'
        })

<<<<<<< HEAD
            this.underline.addEventListener('click', (e) => {
                this.changeBackgoundColor('#b3f4d8')
=======
            //console.log(selection.getBoundingClientRect(),  this.menu.style.top)

            this.underline.addEventListener('click', () => {
                let selectedText = selection.extractContents()
                let span = document.createElement('span')
                span.classList.add('highlight')
                span.appendChild(selectedText)
                selection.insertNode(span)

>>>>>>> develop
                var article = this.pencil.getAttribute('data-article')
                var articleID = article.slice(1, -1)
                var textUnderlined = this.selection.toString()

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
                        this.selection = ''
                    })
            })

            // Delete underline

            this.erase.addEventListener('click', () => {
<<<<<<< HEAD
                this.changeBackgoundColor('white')
=======
                let selectedText = selection.extractContents()
                console.log(selectedText)
                let span = document.createElement('span')
                span.style.backgroundColor = 'transparent'
                span.appendChild(selectedText)
                selection.insertNode(span)
>>>>>>> develop

                var article = this.erase.getAttribute('data-article')
                var articleID = article.slice(1, -1)
                var textUnderlined = this.selection.toString()

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
                        this.selection = ''
                    })
            })
    }
}




