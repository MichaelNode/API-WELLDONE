"use strict";

export default class Accessibility{
    constructor() {
        this.nightButtons = document.querySelectorAll('.night-btn');
        this.nightIcons = document.querySelectorAll('.night-icon');
        this.nightTexts = document.querySelectorAll('.night-text');
        this.initialize();
    }

    initialize() {
        this.initNight();
        this.nightButtons.forEach(btn => btn.addEventListener('click', () => this.toggleNight()))
    }

    /**
     * Function for toggle night mode in all page and save in local storage
     */
    toggleNight(){
        this.toggleIconNight();
        const body = document.querySelector('body');
        body.classList.toggle('night');
        const bodyClass = body.classList.contains('night') ? 'night' : '';
        localStorage.setItem('night', bodyClass);
    }

    toggleIconNight(){
        this.nightIcons.forEach(icon => {
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        });

        this.nightTexts.forEach(text => {
            text.classList.toggle('d-none');
        });
    }

    /**
     * Function for set initial night class depends of localStorage
     */
    initNight() {
        const bodyClass = localStorage.getItem('night') || null;
        const body = document.querySelector('body');
        if(!bodyClass){
            return;
        }
        this.toggleIconNight();
        body.classList.add(bodyClass);
    }

}

