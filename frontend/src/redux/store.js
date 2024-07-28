// redux/store.js
import { createStore, combineReducers } from 'redux';
import productReducer from './reducers';

const rootReducer = combineReducers({
  products: productReducer,
});

const store = createStore(rootReducer);

export default store;
