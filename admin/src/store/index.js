// Dependencies
import {createStore, combineReducers, applyMiddleware} from 'redux';
import userReducer from './user';
import thunk from 'redux-thunk';

const initialState = {};

const rootReducer = combineReducers({
  user: userReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;