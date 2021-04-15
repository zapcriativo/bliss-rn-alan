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
import AnimatedSplash from "react-native-animated-splash-screen";

import Container from "./src/navigation/stack";
import Api from './src/helper/api'

const App = () => {

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    CheckHealthAPI()
  }, [])

  // Function to check if backend api is working 
  async function CheckHealthAPI() {
    setTimeout(() => {
      setIsLoaded(true)

    }, 2000);
  }

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
        <Container />
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
