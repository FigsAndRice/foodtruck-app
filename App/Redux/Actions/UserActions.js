import { AsyncStorage } from 'react-native';
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
      AsyncStorage.removeItem('user');
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
      AsyncStorage.setItem('user', JSON.stringify(res.data), () => {
        AsyncStorage.mergeItem('user', JSON.stringify(res.data));
      });
      NavigationActions.profile();
    })
    .catch(console.error)
}
