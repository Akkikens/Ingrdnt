import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function AuthIntroScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/plant-welcome.png')} style={styles.image} />
      <Text style={styles.title}>Make Smarter Choices 🌿</Text>
      <Text style={styles.subtitle}>
        Discover what’s inside your food and cosmetic products.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUpStepOne')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.loginText}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#e8f5e9', padding: 20
  },
  image: {
    width: 250, height: 250, resizeMode: 'contain', marginBottom: 30
  },
  title: {
    fontSize: 26, fontWeight: 'bold', color: '#2e7d32', textAlign: 'center'
  },
  subtitle: {
    fontSize: 16, textAlign: 'center', color: '#66bb6a', marginVertical: 20
  },
  button: {
    backgroundColor: '#4caf50', paddingVertical: 14,
    paddingHorizontal: 40, borderRadius: 30
  },
  buttonText: {
    color: '#fff', fontSize: 18
  },
  loginText: {
    marginTop: 20, fontSize: 14, color: '#388e3c'
  }
});
