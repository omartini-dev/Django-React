import { combineReducers } from 'redux';
import authReducer from './auth'
import contentReducer from './content'
export default combineReducers({
	authReducer,
	contentReducer
});
