import $ from 'jquery';

export default class Commons{
    constructor(props) {
        this.initialize();

    }

    initialize() {
        this.addSmoothScroll();
    }

    /**
     * Function for add smooth scroll to the page
     */
    addSmoothScroll(){
        $(document).on('click', 'a[href^="#"]', function (event) {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $($.attr(this, 'href')).offset().top
            }, 500);
        });
    }

}
