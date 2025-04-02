import React from 'react';
import { StatusBar } from 'react-native';
import MainNavigator from './src/navigation/MainNavigator';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <MainNavigator />
    </>
  );
}
