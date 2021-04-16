import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

import AnimatedSplash from "react-native-animated-splash-screen";
import InternetConnectionAlert from "react-native-internet-connection-alert";

import Container from "./src/navigation/stack";
import HealStatusScreen from "./src/screens/HealthScreen"
import api from './src/helper/api'

const App = () => {

  const [isLoaded, setIsLoaded] = useState(false)
  const [healthStatus, sethealthStatus] = useState(true)

  // Check API health
  useEffect(() => {
    api.get("/health")
      .then(function (response) {

        if (response.status <= 200 && response.status >= 300) {
          sethealthStatus(false)
        }
        // sethealthStatus(false)

      
      })
      .then(
        setTimeout(() => {
          setIsLoaded(true)
        }, 1500)
      )
  }, [])

  return (
    <>
      <AnimatedSplash
        translucent={true}
        isLoaded={isLoaded}
        logoImage={require("./src/assets/images/logo.png")}
        backgroundColor={"#fff"}
        logoWidht={150}
        logoHeight={150}
      >
        {healthStatus == true ? (
          <InternetConnectionAlert
            onChange={(connectionState) => {
              console.log("Connection State: ", connectionState);
            }}
          >
            <Container />
          </InternetConnectionAlert>
        ) : (
          <HealStatusScreen />
        )}
      </AnimatedSplash>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;
