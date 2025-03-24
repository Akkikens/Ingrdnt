import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthIntroScreen from './src/screens/AuthIntroScreen';
import SignUpStepOne from './src/screens/SignUpStepOne';
import SignUpStepTwo from './src/screens/SignUpStepTwo';
import SignInScreen from './src/screens/SignInScreen';
import HomeScreen from './src/screens/HomeScreen';
import { PaperProvider } from 'react-native-paper';
import { theme } from './src/theme/theme';
import ScanScreen from './src/screens/ScanScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AuthIntro">
          <Stack.Screen name="AuthIntro" component={AuthIntroScreen} />
          <Stack.Screen name="SignUpStepOne" component={SignUpStepOne} />
          <Stack.Screen name="SignUpStepTwo" component={SignUpStepTwo} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />  
          <Stack.Screen name="Scan" component={ScanScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
