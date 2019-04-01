import $ from 'jquery';
  window.jQuery = $;
  window.$ = $;
  global.jQuery = $;

$('.custom-file-input').on('change',function(){
    var fileName = document.getElementById("file").files[0].name;
    $(this).next('.form-control-file').addClass("selected").html(fileName);
})