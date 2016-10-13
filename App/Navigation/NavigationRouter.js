import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';

// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen';
import Results from '../Containers/Consumer/Results';
import UserMenu from '../Containers/Consumer/UserMenu';
import Register from '../Containers/Restaurants/Register';
import Login from '../Containers/Restaurants/Login';
import Profile from '../Containers/Restaurants/Profile';
import EditProfile from '../Containers/Restaurants/EditProfile';
import MenuEdit from '../Containers/Restaurants/MenuEdit';


class NavigationRouter extends Component {
  render() {
    return (
      <Router>
        <Scene key='presentationScreen' component={PresentationScreen} />
        <Scene key='results' component={Results} title="Results"/>
        <Scene key='register' component={Register} title="Register"/>
        <Scene key='login' component={Login} title="Login"/>
        <Scene key='profile' component={Profile} title="Profile"/>
        <Scene key='editProfile' component={EditProfile} title="Edit Profile"/>
        <Scene key='userMenu' component={UserMenu} title='Menu' />
        <Scene initial key='menuEdit' component={MenuEdit} title='Edit Menu' />
        {/* <Scene key='componentExamples' component={AllComponentsScreen} title='Components' /> */}
      </Router>
    )
  }
}

export default NavigationRouter;
