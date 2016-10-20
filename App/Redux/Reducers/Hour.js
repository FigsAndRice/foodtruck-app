export default function locationReducer(state = null, action) {
  switch (action.type) {
    case 'SET_HOURS':
    return action.payload;
    break;
  default:
    return state;
  }
}
