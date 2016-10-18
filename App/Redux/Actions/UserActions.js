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
    .catch(() => {
      alert('Incorrect email/password combination.')
      NavigationActions.login();
    });
};

export function logout() {
  axios.get('http://localhost:5000/api/restaurants/logout')
    .then(res => {
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
      AsyncStorage.setItem('user', JSON.stringify(res.data.results), () => {
        AsyncStorage.mergeItem('user', JSON.stringify(res.data.results));
      });
      NavigationActions.profile();
    })
    .catch(console.error);
};

export function editProfile(id, updateObj) {
  axios.put(`http://localhost:5000/api/restaurants/${id}`, updateObj)
    .then(res => {
      return res.data;
    })
    .catch(console.error);
};

export function updatePassword(pwdObj) {
  const api = create({
    baseURL: 'http://localhost:5000',
    headers: {'Content-Type': 'applcation/json'}
  })

  api.post('/api/restaurants/password', pwdObj)
    .then(res => {
      return res.data;
    })
    .catch(console.error);
};
