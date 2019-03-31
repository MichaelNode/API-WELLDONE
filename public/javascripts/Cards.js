import Masonry from 'masonry-layout';

export default class Cards {
    constructor(){
        this.card = document.querySelector('.cards-masonry');
        this.initializeCards();
    }
    
    initializeCards(){
        window.addEventListener("load", () => {
            if(!this.card){
                return;

            }
            
            new Masonry('.cards-masonry');
        })
    }
}
