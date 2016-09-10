import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

//components
import App from './common/components/App';
import HomePage from './pages/home/page';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage} />
	</Route>
);