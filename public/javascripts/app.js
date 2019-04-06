import 'bootstrap';
import style from '../stylesheets/style.scss';
import Cards from './Cards';
import Articles from './Articles';

import Commons from './Commons';
import Followers from './Followers';

(function () {
    window.addEventListener('DOMContentLoaded', () => {
        new Cards();
        new Articles().eventListeners();
        new Commons();
        new Followers().eventListeners();
    })
})();


