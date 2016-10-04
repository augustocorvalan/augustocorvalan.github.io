import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

const createStoreWithMiddleware = compose(
	devTools
)(createStore);

export default createStoreWithMiddleware(reducers);
