import { combineReducers } from 'redux';
import startup from './Startup';
import location from './Location';
import trucks from './Trucks';

export default combineReducers({
  startup,
  location,
  trucks
});
