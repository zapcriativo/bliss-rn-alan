import React, { useState, useEffect } from 'react';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from "../screens/HomeScreen";

const AppNavigator = createStackNavigator(
    {
      home: {
        screen: HomeScreen,
        navigationOptions: {
          header: null,
        },
      }
    },
    {
      initialRouteName: "home",
    }
  )
  
  const Container = createAppContainer(AppNavigator)
  export default Container