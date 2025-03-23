
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/plant-welcome.png')} style={styles.image} />
      <Text style={styles.title}>Welcome to Ingrdnt</Text>
      <Text style={styles.subtitle}>
        Helping you choose smarter, safer products 🌱
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f5e6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 30
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#4caf50',
    textAlign: 'center',
    marginVertical: 20
  },
  button: {
    backgroundColor: '#66bb6a',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  }
});
