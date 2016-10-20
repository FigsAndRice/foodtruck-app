import { takeEvery, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { create } from 'apisauce';

function* getTrucks(action){
  try {
    const trucks = yield call(getTrucksApi, action.payload)
    yield put({type: "RECEIVE_TRUCKS", payload: trucks })
  } catch(e) {
    yield put({type: "GET_TRUCKS_FAILED", message: e.message});
  }
}

function* mySaga(){
  yield* takeEvery("GET_TRUCKS", getTrucks)
}

export function getTrucksApi(coords){
  const api = create({
    baseURL: 'http://localhost:5000',
    headers: {'Content-Type': 'application/json'}
  })
  console.log('coords:', coords)
  return api.put('/api/restaurants/location', coords)
  .then(res => res.data.results)
  .catch(console.error)
}

export default mySaga;
