/**
 * App entry point
 */

// Polyfill
import 'babel-polyfill';

// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

//Store
import store from './store';

//SPA
import App from 'components/App';

// Base styling
import 'styles/base.css';


// ID of the DOM element to mount app on
const DOM_APP_EL_ID = 'app';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	, document.getElementById(DOM_APP_EL_ID)
);