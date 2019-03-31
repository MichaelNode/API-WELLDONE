
const Users = require("../../models/user.js");

export default class Articles {
    constructor(){
        this.bookmark = document.querySelector('.prueba');
        this.eventListeners()
    }

    eventListeners(){
        this.bookmark.addEventListener('click', (e) => {
            console.log('funciono')
        })
    }

/* 
            fav (articleId, authorId) {
                console.log(articleId)
                const bookmark = document.querySelector('.fa-bookmark')
                bookmark.classList.toggle('fas')
        Users.updateOne(
            { _id: authorId }, 
            { $push: { favArticles: articleId } },
            done
        );  */
    }
    



    