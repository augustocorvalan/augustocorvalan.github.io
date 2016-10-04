import React from 'react';
import classnames from 'classnames';
import 'styles/header-item.css';

const HeaderItem = ({ children, isBig }) => (
	<div className={classnames('header-item', isBig && 'header-item-big')}>
		{children}
	</div>
);

export default HeaderItem;