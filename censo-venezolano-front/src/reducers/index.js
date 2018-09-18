//index reducers
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import personsReducer from './personsReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: personsReducer
});
