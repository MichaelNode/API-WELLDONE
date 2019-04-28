import $ from 'jquery';

class Utils {

    /**
     * Function for add underline array of text inside a large text content
     * @param text
     * @param idText
     */
    static underline(text, idText) {

        const inputText = document.getElementById("content-id");
        let innerHTML = inputText.innerHTML;
        let index = innerHTML.indexOf(text);

        // replace last tag for try
        if(index < 0){
            const regexFinish = /(<([^>]+)>)+$/;
            const regexStart = /^(<([^>]+)>)+/;
            text = text.replace(regexFinish, '');
            text = text.replace(regexStart, '');
            index = innerHTML.indexOf(text);
        }

        if (index >= 0) {
            const content = innerHTML.substring(index,index+text.length);
            const contentHighlighted = content.replace(/(<([^>]+)>)/ig,function ($tag) {
                return `</span>${$tag}<span class='highlight' data-textId='${idText}'>`;
            });
            innerHTML = innerHTML.substring(0,index) +
            "<span class='highlight' data-textId='"+ idText +"'>" +
            contentHighlighted +
            "</span>" +
            innerHTML.substring(index + text.length);
            inputText.innerHTML = innerHTML
            return inputText.querySelectorAll('.highlight');
        }
        return null;
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
                if( cur_size < 48 && cur_size > 16 ){
                    $(this).css('font-size', cur_size.toString()+'px');
                }

            });
        }
    }
}

window.Utils = Utils;
