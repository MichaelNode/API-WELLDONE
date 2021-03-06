import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import store from './store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import I18n from "redux-i18n"
import {translations} from "./config/translations";
import 'bootstrap/dist/css/bootstrap.css';

import './index.css'
import sideBars from './components/sidebars/sidebars';


render(
  <Provider store={store}>
      <I18n translations={translations} initialLang="es">
          <BrowserRouter>
              <Switch>
                  <Route path="/admin" component={sideBars}/>
              </Switch>
          </BrowserRouter>
      </I18n>
  </Provider>
  , document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
