import React from 'react';
import { StatusBar } from 'react-native';
import MainNavigator from './src/navigation/MainNavigator';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <MainNavigator />
      <Toast />
    </>
  );
}
