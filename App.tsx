/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
//@ts-nocheck

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserListScreen from './app/screens/userlistScreen/UserListScreen';
import UserDetailScreen from './app/screens/userDetailScreen/UserDetailScreen';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';


function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{title:"Users List", headerShown:false }}  name="UserListScreen" component={UserListScreen} />
      <Stack.Screen options={{title:"User Details", }} name="UserDetailScreen" component={UserDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;
