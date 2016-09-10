import React from 'react';

//components
import {default as Grid} from "./StonecutterGrid";

const ItemGrid = ({ children, ...otherProps }) => (
	<Grid {...otherProps}>
		{children}
	</Grid>
);

ItemGrid.defaultProps = {
	columns: 4,
	minPadding: 100,
	gutterWidth: 25,
	gutterHeight: 25,
	duration: 650,
	springConfig: { stiffness: 20, damping: 17 }	
}

export default ItemGrid;