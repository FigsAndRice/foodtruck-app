import { combineReducers } from 'redux';
import startup from './Startup';
import location from './Location';
import trucks from './Trucks';
import hours from './Hour';

export default combineReducers({
  startup,
  location,
  trucks,
  hours
});
