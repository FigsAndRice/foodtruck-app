import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'

// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen'
import Results from '../Containers/Consumer/Results'
import UserMenu from '../Containers/Consumer/UserMenu'
import Register from '../Containers/Restaurants/Register'
import Login from '../Containers/Restaurants/Login'
import Profile from '../Containers/Restaurants/Profile'
import EditProfile from '../Containers/Restaurants/EditProfile'
import MenuEdit from '../Containers/Restaurants/MenuEdit'


class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene initial key='presentationScreen' component={PresentationScreen} title='Fook' />
        <Scene key='results' component={Results} title='Components' />
        <Scene key='register' component={Register} title='Components' />
        <Scene key='login' component={Login} title='Components' />
        <Scene key='profile' component={Profile} title='Components' />
        <Scene key='editProfile' component={EditProfile} title='Components' />
        <Scene key='userMenu' component={UserMenu} title='Components' />
        <Scene key='menuEdit' component={MenuEdit} title='Components' />
        {/* <Scene key='componentExamples' component={AllComponentsScreen} title='Components' /> */}
      </Router>
    )
  }
}

export default NavigationRouter
