import axios from 'axios';
import { Actions as NavigationActions } from 'react-native-router-flux';

export function register(registerObj) {
  axios.post('http://localhost:5000/api/restaurants/register', registerObj)
    .then(res => {
      alert('Registered. Please check your email');
      NavigationActions.login();
    })
    .catch(alert('User not registered properly.'));
};

export function login(loginObj) {
  // axios.post('http://localhost:5000/api/restaurants/login', loginObj)
  //   .then(res => {
  //     // GET REQUEST TO RECEIVE PROFILE
  //     NavigationActions.profile();
  //   })
  //   .catch(console.error);
};
