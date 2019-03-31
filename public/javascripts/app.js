import 'bootstrap';
import style from '../stylesheets/style.scss';
import Cards from './Cards';
import Articles from './Articles';


(function () {
    window.addEventListener('DOMContentLoaded', () => {
        new Cards();
        new Articles().eventListeners();
    })
})();


