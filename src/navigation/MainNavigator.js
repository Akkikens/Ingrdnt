// File: src/navigation/MainNavigator.js

import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ScanScreen from '../screens/ScanScreen';
import ResultScreen from '../screens/ResultScreen';
import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpStepOne from '../screens/SignUpStepOne';
import SignUpStepTwo from '../screens/SignUpStepTwo';
import WelcomeScreen from '../screens/WelcomeScreen';
import AuthIntroScreen from '../screens/AuthIntroScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const iconMap = {
  Home: 'home',
  Scan: 'barcode',
  History: 'time',
};

const Tabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        const iconName = iconMap[route.name] || 'alert-circle-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      }
      ,
      tabBarActiveTintColor: '#4caf50',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Scan" component={ScanScreen} />
    <Tab.Screen name="History" component={HistoryScreen} />
  </Tab.Navigator>
);

export default function MainNavigator() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (usr) => {
      if (usr && usr.emailVerified) {
        setUser(usr);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);  

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
  {!user ? (
    <>
    <Stack.Screen name="AuthIntro" component={AuthIntroScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUpStepOne" component={SignUpStepOne} />
      <Stack.Screen name="SignUpStepTwo" component={SignUpStepTwo} />
    </>
  ) : (
    <>
      <Stack.Screen name="HomeTabs" component={Tabs} />
      <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Scan Result' }} />
    </>
  )}
</Stack.Navigator>

    </NavigationContainer>
  );
}