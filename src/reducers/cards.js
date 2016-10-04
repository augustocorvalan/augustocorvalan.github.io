import _ from 'lodash';
import { handleActions} from 'redux-actions';
import { shuffleCards } from 'actions/cards';

const initState = { items: _.range(1, 12) };

export default handleActions({
	[shuffleCards]: (state, action) => ({
		items: _.shuffle(state.items)
	})
}, initState);