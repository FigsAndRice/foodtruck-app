export default function truckReducer(state = [], action) {
  switch (action.type) {
    case 'RECEIVE_TRUCKS':
    return action.payload;
    break;
  default:
    return state;
  }
}
