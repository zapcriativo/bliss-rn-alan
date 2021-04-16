import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import NavigationBackButton from '../components/NavigationBackButton'

import HomeScreen from "../screens/HomeScreen";
import newQuestionScreen from "../screens/NewQuestion"
import DetailScreen from "../screens/DetailScreen"

import { Icon } from 'react-native-elements';

const AppNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerShown: false, // Will hide header for all screens of current stack navigator,
      }),
    },
    newQuestion: {
      screen: newQuestionScreen,
      navigationOptions: ({ navigation, route }) => ({
        title: 'Create New Question',
        headerStyle: { backgroundColor: '#535CF7' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerLeft: (<NavigationBackButton navigation={navigation} />),
      }),
    },
    Detail: {
      screen: DetailScreen,
      navigationOptions: ({ navigation, route }) => ({
        title: 'Question Detail',
        headerStyle: { backgroundColor: '#535CF7' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerLeft: (<NavigationBackButton navigation={navigation} />),
      }),
    }
  },
  {
    initialRouteName: "HomeScreen",
  }
)

const Container = createAppContainer(AppNavigator)
export default Container