import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from "../screens/HomeScreen";
import newQuestionScreen from "../screens/NewQuestion"

import { Icon } from 'react-native-elements';

const AppNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        header: null, // Will hide header for all screens of current stack navigator,
      }),
    },
    newQuestion: {
      screen: newQuestionScreen,
      navigationOptions: ({ navigation, route }) => ({
        title: 'Create New Question',

        headerStyle: {
          backgroundColor: '#535CF7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },


        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 10 }}>
            <Icon
              name='arrow-left'
              type='font-awesome'
              color='#fff'
              size={20}
              iconStyle={{ marginLeft: 2, marginTop: -1 }}
            />
          </TouchableOpacity>
        ),
      }),
    }
  },
  {
    initialRouteName: "HomeScreen",
  }
)

const Container = createAppContainer(AppNavigator)
export default Container