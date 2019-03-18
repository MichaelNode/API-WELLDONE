var Masonry = require('masonry-layout');

// masonry 
var $grid = $('.grid').Masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    transitionDuration: 0,
  });

  $grid.imagesLoaded().progress( function() {
    $grid.Masonry();
});