import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import CounterScreen from '../screen/counterScreen';
import { store } from '../redux/store';
import LoginScreen from '../screen/loginScreen';
import EventsScreen from '../screen/eventsScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
  <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          {/* <Stack.Screen name="CounterScreen" component={CounterScreen} /> */}
       <Stack.Screen name="LoginScreen" component={LoginScreen} /> 
       <Stack.Screen name="EventsScreen" component={EventsScreen} />
   </Stack.Navigator>
    </NavigationContainer>
  </Provider>
  )
}