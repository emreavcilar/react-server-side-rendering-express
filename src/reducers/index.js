import { combineReducers } from 'redux';
import homeReducer from './home';
import aboutReducer from './about';

const combineRed = combineReducers({
    homeReducer,
    aboutReducer
});

export default combineRed