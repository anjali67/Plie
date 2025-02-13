import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screen/login';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import EventsScreen from '../screen/event';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
  <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="EventsScreen" component={EventsScreen} /> 
   </Stack.Navigator>
    </NavigationContainer>
  </Provider>
  )
}