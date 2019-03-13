import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import store from './store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import * as serviceWorker from './serviceWorker';

render(
    <Provider store={store}>
      <BrowserRouter>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={AdminPanel}/>
          </Switch>
        </BrowserRouter>
      </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
