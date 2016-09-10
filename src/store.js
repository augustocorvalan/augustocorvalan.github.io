import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

const createStoreWithMiddleware = compose(
	applyMiddleware(routerMiddleware(browserHistory)),
	devTools
)(createStore);

export default createStoreWithMiddleware(reducers);
