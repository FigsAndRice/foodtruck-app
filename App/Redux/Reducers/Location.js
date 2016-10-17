export default function locationReducer(state = null, action) {
  switch (action.type) {
    case 'SET_LOCATION':
    return action.payload;
    break;
  default:
    return state;
  }
}
