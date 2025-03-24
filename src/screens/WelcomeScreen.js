import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';

export default function WelcomeScreen({ navigation }) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/plant-welcome.png')} // make sure you have this file!
        style={styles.image}
      />

      <Text style={styles.title}>Welcome to Ingrdnt</Text>
      <Text style={styles.subtitle}>
        Helping you choose the right products to eat and apply 🌱
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('AuthIntro')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Already have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('SignIn')}>
          Sign In
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f5e6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 30
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#4caf50',
    textAlign: 'center',
    marginBottom: 40
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  footer: {
    marginTop: 30,
    fontSize: 14,
    color: '#555'
  },
  link: {
    color: '#2e7d32',
    fontWeight: 'bold'
  }
});
