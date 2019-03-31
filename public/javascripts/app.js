import 'bootstrap';
import style from '../stylesheets/style.scss';
import Cards from './Cards';
import Commons from './Commons';

(function () {
    window.addEventListener('DOMContentLoaded', () => {
        new Cards();
        new Commons();
    })
})();


