/**
 * App entry point
 */

// Polyfill
import 'babel-polyfill';

// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Routes
import routes from './routes';

//Store
import store from './store';

// Base styling
import './common/styles/base.css';


// ID of the DOM element to mount app on
const DOM_APP_EL_ID = 'app';
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={store}>
		<Router history={history} routes={routes} />
	</Provider>
	, document.getElementById(DOM_APP_EL_ID)
);