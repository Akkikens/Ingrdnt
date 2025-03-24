import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Ingrdnt 🌿</Text>
      <Text style={styles.subtitle}>You’ve successfully logged in!</Text>

      <Button mode="contained" onPress={() => navigation.navigate('Scan')}>
  Start Scanning
</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#e8f5e9', padding: 24
  },
  title: {
    fontSize: 26, fontWeight: 'bold', color: '#2e7d32', marginBottom: 10
  },
  subtitle: {
    fontSize: 16, color: '#4caf50', marginBottom: 30, textAlign: 'center'
  }
});
