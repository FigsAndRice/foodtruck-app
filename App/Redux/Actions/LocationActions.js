import axios from 'axios';
import { create } from 'apisauce';

export function setLocation(lat, lng){
  return {
    type: 'SET_LOCATION',
    payload: {
      lat,
      lng
    }
  }
}

// export function receiveTrucks(trucks){
//   return {
//     type: 'RECEIVE_TRUCKS',
//     payload: {
//       trucks
//     }
//   }
// }
//
// export function getTrucks(coordsObj) {
//   return dispatch => {
//     const api = create({
//       baseURL: 'http://localhost:5000',
//       headers: {'Content-Type': 'application/json'}
//     })
//
//     api.put('/api/restaurants/location', coordsObj)
//     .then(res => {
//       dispatch(receiveTrucks(res.data.results))
//     })
//     .catch(console.error)
//   }
// }
