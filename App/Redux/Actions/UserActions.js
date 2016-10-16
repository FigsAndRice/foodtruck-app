import axios from 'axios';
import { create } from 'apisauce';
import { Actions as NavigationActions } from 'react-native-router-flux';

let cookie = null;

export function register(registerObj) {
  axios.post('http://localhost:5000/api/restaurants/register', registerObj)
    .then(NavigationActions.login())
    .catch(console.error);
};

export function login(loginObj) {
  axios.post('http://localhost:5000/api/restaurants/login', loginObj)
    .then(res => {
      cookie = res.headers['set-cookie'];
      getProfile(cookie);
    })
    .catch(console.error);
};

export function logout() {
  axios.get('http://localhost:5000/api/restaurants/logout')
    .then(res => {
      console.log(res.data);
      NavigationActions.presentationScreen();
    })
    .catch(console.error);
};

export function getProfile(cookie) {
  const api = create({
    baseURL: 'http://localhost:5000',
    headers: {'Content-Type': 'application/json', 'Cookie': cookie}
  })

  api.get('/api/restaurants/profile')
    .then(res => {
      alert(res.data);
      NavigationActions.profile();
    })
    .catch(console.error)
}
