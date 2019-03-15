// Dependencies
import {createStore, combineReducers, applyMiddleware} from 'redux';
import userReducer from './user';
import thunk from 'redux-thunk';
import {i18nState} from "redux-i18n"

const initialState = {};

const rootReducer = combineReducers({
  user: userReducer,
  i18nState
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;
