import Masonry from 'masonry-layout';

export default class Cards {
    constructor(){
        this.initializeCards();
    }

    initializeCards(){
        window.addEventListener("load", () => {
            new Masonry('.cards-masonry');
        })
    }
}
