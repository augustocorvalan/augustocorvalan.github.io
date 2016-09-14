import React from "react";
import { connect } from 'react-redux';
import "./style.css";

//components
import ItemGrid from '../../common/components/ItemGrid';
import Header from '../../common/components/Header';
import ReactInterval from 'react-interval';

//actions
import { shuffleCards } from '../../actions/home.js';

//constants
const cardWidth = 300;

class HomePage extends React.Component {
	getCards() {
		return this.props.cards.map((card, i) => (
			<img 
				style={{ width: cardWidth }} 
				key={card} 
				className='home-item'
				src={require(`../../images/typer_${card}.jpg`)} />
		));
	}

	render() {
		return (
			<div>
				<Header />
				<ItemGrid className='home-grid' columnWidth={cardWidth}>
					{::this.getCards()}
				</ItemGrid>
				 <ReactInterval timeout={8000} enabled={true}
          			callback={() => this.props.shuffleCards()} />
			</div>
		);
	}
};

function mapStateToProps(state) {
	return {
		cards: state.home.cards
	}
}

export default connect(
	mapStateToProps,
	{ shuffleCards }
)(HomePage);