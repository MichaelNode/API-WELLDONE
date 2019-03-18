
import style from '../stylesheets/index.scss';
import $ from 'jquery';
import jQueryBridget from 'jquery-bridget';
import Masonry from 'masonry-layout';

// make Masonry a jQuery plugin
jQueryBridget( 'masonry', Masonry, $ );

// now you can use $().masonry()
$('.grid').masonry({
    itemSelector: '.grid-item', // use a separate class for itemSelector, other than .col-
    columnWidth: '.grid-sizer',
    percentPosition: true
});
