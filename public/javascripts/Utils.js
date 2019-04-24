import $ from 'jquery';

class Utils {

    /**
     * Function for add underline array of text inside a large text content
     * @param text
     */
    static underline(text) {

        const inputText = document.getElementById("content-id");
        let innerHTML = inputText.innerHTML;
        const index = innerHTML.indexOf(text);
        if (index >= 0) {
            innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
            inputText.innerHTML = innerHTML;
        }
    }

    /**
     * Function for change text size
     */
    static changeSizeText() {
        $('i#letter').click(function(){
            change_font_size( parseInt($(this).data('csize')) );
        })

        function change_font_size(csize){
            const $cotent_html=$('#content-id p');
            $cotent_html.each(function(){
                let cur_size = parseInt($(this).css('font-size'));
                cur_size=cur_size+csize;
                $(this).css('font-size', cur_size.toString()+'px');
            });
        }
    }
}

window.Utils = Utils;
