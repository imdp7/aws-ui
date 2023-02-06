import {combineReducers} from 'redux';
import * as actions from './actions';

function preferences(state= {DarkThemeEnabled: false },action){
	switch(action.type){
		case actions.DARK_MDOE : 
			return {...state, DarkThemeEnabled: !state.DarkThemeEnabled };

	default: 
		return state;

	};
};

export default combineReducers({preferences});