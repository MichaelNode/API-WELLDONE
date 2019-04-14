// Dependencies
import {createStore, combineReducers, applyMiddleware} from 'redux';
import userReducer from './user';
import articleReducer from './article';
import thunk from 'redux-thunk';
import {i18nState} from "redux-i18n"
import {checkTokenExpirationMiddleware} from "../utils/logoutMiddleware";


const initialState = {};

const rootReducer = combineReducers({
  user: userReducer,
  article:articleReducer,
  i18nState
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, checkTokenExpirationMiddleware),
);

export default store;
