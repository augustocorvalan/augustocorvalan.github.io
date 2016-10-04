//TODO: for such a simple app I think the redux-ducks design pattern is the way to go
import { createAction } from 'redux-actions';

//not using constants for action types since function itself will server 
//as key to handleActions. This is a way to reduce boilerplate
export const shuffleCards = createAction('SHUFFLE_CARDS');
