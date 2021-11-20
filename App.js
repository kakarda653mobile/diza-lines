import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();

import Main from "./screens/Main";
import Settings from "./screens/Settings";
import Win from "./screens/Win";

import { PLAYERS_CONTEXT } from './utils/consts'

export const Context = React.createContext();

const App = () => {
  const [context, setContext] = useState(PLAYERS_CONTEXT);

  useEffect(() => {
    SplashScreen.hide()
  },[])

  return (
    <Context.Provider value={[context, setContext]}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen
            name="Main"
            component={Main}
          />
          <Stack.Screen name="Settings" component={Settings}  mode="modal"/>
          <Stack.Screen name="Win" component={Win} mode="modal"/>
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
};

export default App;
