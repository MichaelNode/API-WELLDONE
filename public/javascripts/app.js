import 'bootstrap';
import style from '../stylesheets/style.scss';
import Cards from './Cards';
import Articles from './Articles';
import Commons from './Commons';
import Socket from './Socket';
import Followers from './Followers';
import Accessibility from './Accessibility';


(function () {
    window.addEventListener('DOMContentLoaded', () => {
        new Cards();
        new Articles().eventListeners();
        new Commons();
        new Followers().eventListeners();
        new Socket();
        new Accessibility();
    })
})();


