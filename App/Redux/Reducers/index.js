import { combineReducers } from 'redux';
import startup from './Startup';
import location from './Location';

export default combineReducers({
  startup,
  location
});
