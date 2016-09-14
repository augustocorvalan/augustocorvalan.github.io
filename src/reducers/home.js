import _ from 'lodash';
import { handleActions} from 'redux-actions';
import { shuffleCards } from '../actions/home';

const initState = { cards: _.range(1, 12) };

export default handleActions({
	[shuffleCards]: (state, action) => ({
		cards: _.shuffle(state.cards)
	})
}, initState);