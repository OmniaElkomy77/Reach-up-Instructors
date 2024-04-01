import React from 'react';

import {
  SwitchControls,
  Login,
  Home,
  Classes,
  Groups,
  Movepages,
  // Assess,
  Qr_absence,
  Hours,
  Assess,
  Month_assess,
  AllActivetys
} from './component'
// import Assess from "./component/Assess"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
const Auth = createStackNavigator({
  Login: Login,
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  },
  {

    initialRouteName: Login,

  })
const HomePages = createStackNavigator(
  {

    Home: Home,
    Classes: Classes,
    Groups: Groups,
    Hours: Hours,
    Movepages: Movepages,
    Assess: Assess,
    Qr_absence: Qr_absence,
    Month_assess: Month_assess,
    AllActivetys: AllActivetys


  }
  , {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  },
  {
    initialRouteName: Home
  }
)
const AppSwitch = createSwitchNavigator({
  SwitchControls: { screen: SwitchControls },
})
const All = createSwitchNavigator(
  {
    AppSwitch: AppSwitch,
    Auth: Auth,
    HomePages: HomePages,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  }
)
const App = createAppContainer(All)

export default App


