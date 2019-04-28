export default class Articles {
    constructor() {
        this.bookmark = document.querySelector('.fav');
        this.content = document.querySelector('.art-content')
        this.menu = document.querySelector('.menu')
        this.underline = document.querySelector('.underline')
        this.erase = document.querySelector('.erase')
        this.pencil = document.querySelector('.pencil')
        this.highlighted = document.querySelectorAll('.highlight')
        this.selection = ''
        this.textUnderlined = ''
        this.idTextUnderlined = null;
        this.node = null
        this.changeBackgoundColor = (className) => {
            let selectedText = this.selection.extractContents()
            let span = document.createElement('span')
            span.classList.add(className)
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

        this.content.addEventListener('mouseup', (e) => {

            this.selection = window.getSelection().getRangeAt(0)
            const {x, top, width} = this.selection.getBoundingClientRect()

            if (!width) {
                this.underline.style.display = 'none'
                this.erase.style.display = 'none'
                return
            }

            const menuWidth = this.underline.offsetWidth
            this.underline.style.display = 'block'
            this.underline.style.left = (x + (width / 2) - (menuWidth / 2)) + 'px'
            this.underline.style.top = (top - 10) + 'px'
        })

        this.highlightEvent(this.highlighted);

        this.underline.addEventListener('click', (e) => {
            var article = this.underline.getAttribute('data-article')
            var articleID = article.slice(1, -1)
            const div = document.createElement('div');
            const contents = this.selection.cloneContents();
            div.appendChild(contents.cloneNode(true));
            const textUnderlined = div.innerHTML;

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
                    const textObj = response.text;
                    const newHighLights = Utils.underline(textObj.content, textObj._id);
                    this.highlightEvent(newHighLights);
                })
        })

        this.erase.addEventListener('click', () => {
            const highContents = document.querySelectorAll(`[data-textId='${this.idTextUnderlined}']`);
            highContents.forEach(node => {
                const parent = node.parentNode;
                const text = document.createTextNode(node.innerHTML);
                parent.replaceChild(text, node);
            })

            const url = `/apiv1/underlinetext`;
            const data = {
                id: this.idTextUnderlined
            }

            fetch(url, {
                method: 'DELETE',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    console.log('eliminado', response)
                    this.erase.style.display = 'none'
                })
        })
    }

    highlightEvent(hightlightElems) {
        // Delete underline

        hightlightElems.forEach(node => node.addEventListener('click', (e) => {
            this.erase.style.display = 'block'
            this.erase.style.left = e.x + 'px'
            this.erase.style.top = (e.y - 10) + 'px'
            this.textUnderlined = e.target.textContent
            this.idTextUnderlined = e.target.getAttribute('data-textId');
            this.node = e.target
        }))
    }
}




