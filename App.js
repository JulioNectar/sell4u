import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import NewAdScreen from './screens/NewAdScreen'
import AdScreen from './screens/AdScreen'
import ChatScreen from './screens/ChatScreen'
import ChatListScreen from './screens/ChatListScreen'

const Stack = createStackNavigator();
const officialColor = "#2C6BED"
const globalScreenOptions = {
  headerStyle: { backgroundColor: officialColor },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={globalScreenOptions}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='NewAd' component={NewAdScreen} />
        <Stack.Screen name='Ad' component={AdScreen} />
        <Stack.Screen name='Chat' component={ChatScreen} />
        <Stack.Screen name='ChatList' component={ChatListScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
