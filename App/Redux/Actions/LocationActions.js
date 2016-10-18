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

export function getTrucks(coordsObj) {
  const api = create({
    baseURL: 'http://localhost:5000',
    headers: {'Content-Type': 'application/json'}
  })

  api.put('/api/restaurants/location', coordsObj)
    .then(res => {
      return res.data
    })
    .catch(console.error)
}
