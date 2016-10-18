export function setLocation(lat, lng){
  return {
    type: 'SET_LOCATION',
    payload: {
      lat,
      lng
    }
  }
}
