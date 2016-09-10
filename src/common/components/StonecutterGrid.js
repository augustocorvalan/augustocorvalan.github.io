import React from 'react';
import { SpringGrid, layout, measureItems, makeResponsive } from 'react-stonecutter';

class StonecutterGrid extends React.Component {
	componentWillMount() {
		const { maxWidth, minPadding } = this.props;
		const Grid = makeResponsive(measureItems(SpringGrid, { measureImages: true}), {
			maxWidth,
			minPadding
		});

		//using local state since Grid is ephemereal UI state,
		//not persistent application-wide state
		this.setState({ Grid });
	}

	render() {
		const { children, ...otherProps } = this.props;
		const { Grid } = this.state;

		return (
			<Grid {...otherProps}>
				{children}
			</Grid>
		);
	}
};

StonecutterGrid.defaultProps = {
	maxWidth: 1920,
	minPadding: 0,
	layout: layout.pinterest	
}

export default StonecutterGrid;