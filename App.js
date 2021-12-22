/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import StackNavigation from './src/Naviggation/StackNavigation';

function App() {
  useEffect(() => {
      const changeBarColor = async () => {
          try{
            const response = await changeNavigationBarColor('#6b0505', false);
            console.log(response)// {success: true}
          } catch(e){
              console.log(e)// {success: false}
          }
      }
      
      changeBarColor();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="rgba(66, 0, 0, 1)" barStyle="light-content" />
      <StackNavigation />
    </View>
  );
};

export default App;