import { createAction } from 'redux-actions';

//not using constants for action types since function itself will server 
//as key to handleActions. This is a way to reduce boilerplate
export const getCardData = createAction('GET_CARD_DATA');

export const shuffleCards = createAction('SHUFFLE_CARDS');
