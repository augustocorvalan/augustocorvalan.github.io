import _ from 'lodash';
import { handleActions} from 'redux-actions';
import { getCardData, shuffleCards } from '../actions/home';

export default handleActions({
	[getCardData]: (state, action) => ({
		cards: _.range(1, 12)
	}),
	[shuffleCards]: (state, action) => ({
		cards: _.shuffle(state.cards)
	})
}, { cards: [] });