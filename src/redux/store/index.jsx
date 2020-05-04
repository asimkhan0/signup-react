import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import rootReducer from '../root/index';

const history = createBrowserHistory();
const store = createStore(rootReducer(history), applyMiddleware(thunk));
export default store;