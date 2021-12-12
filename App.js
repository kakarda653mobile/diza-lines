import React, { useState, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

import Main from "./screens/Main";
import Settings from "./screens/Settings";
import Win from "./screens/Win";
import Rules from "./screens/Rules";
import Splash from "./screens/Splash";

import { PLAYERS_CONTEXT } from './utils/consts'

export const Context = React.createContext();

const App = () => {
  const [context, setContext] = useState();
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@context')
      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log({value})
      if (value === null) {
        setContext(PLAYERS_CONTEXT)
        await storeData(PLAYERS_CONTEXT)
      } else {
        setContext(value)
      }
    } catch (e) {
      setContext(PLAYERS_CONTEXT)
    }
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@context', jsonValue)
      const jsonValueResult = await AsyncStorage.getItem('@context')
      console.log({jsonValueResult})
    } catch (e) {
      // saving error
    }
  }

  const handleSetContext = async (newContext) => {
    console.log('handleSetContext', {newContext})
    setContext(newContext)
    await storeData(newContext)
  }

  useEffect(() => {
    // AsyncStorage.clear();
    setTimeout(() => setIsLoading(false), 3000)
    getData()
    SplashScreen.hide()
  }, [])

  console.log({context})

  const firstScreen = useMemo(() => {
    return context?.redRules ? 'Main' : 'Rules'
  }, [context?.redRules])

  return (
    <Context.Provider value={[context, handleSetContext]}>
      {context && !isLoading ?
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={firstScreen}
            screenOptions={{
              headerShown: false
            }}>
            <Stack.Screen name="Main" component={Main}/>
            <Stack.Screen name="Settings" component={Settings} mode="modal"/>
            <Stack.Screen name="Win" component={Win} mode="modal"/>
            <Stack.Screen name="Rules" component={Rules} mode="modal"/>
          </Stack.Navigator>
        </NavigationContainer> :
        <Splash/>}
    </Context.Provider>
  );
};

export default App;
