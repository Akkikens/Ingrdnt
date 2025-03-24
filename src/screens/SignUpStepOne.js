import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

export default function SignUpStepOne({ navigation }) {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    const newErrors = {};
    if (!fname.trim()) {
      newErrors.fname = 'First name is required';
      valid = false;
    }
    if (!lname.trim()) {
      newErrors.lname = 'Last name is required';
      valid = false;
    }
    if (!email.includes('@') || !email.includes('.')) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const nextStep = () => {
    if (validate()) {
      navigation.navigate('SignUpStepTwo', { fname, lname, email });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let’s get started</Text>

      <TextInput label="First Name" value={fname} onChangeText={setFname} style={styles.input} />
      {errors.fname && <Text style={styles.error}>{errors.fname}</Text>}

      <TextInput label="Last Name" value={lname} onChangeText={setLname} style={styles.input} />
      {errors.lname && <Text style={styles.error}>{errors.lname}</Text>}

      <TextInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <Button mode="contained" onPress={nextStep} style={styles.button}>
        Next
      </Button>

      <Text style={styles.footer}>
        Already have an account? <Text style={styles.link} onPress={() => navigation.navigate('SignIn')}>Sign In</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#2e7d32' },
  input: { marginBottom: 12, backgroundColor: '#f1f8e9' },
  error: { fontSize: 12, color: 'red' },
  button: { marginTop: 20, padding: 6 },
  footer: { marginTop: 30, textAlign: 'center', color: '#777' },
  link: { color: '#2e7d32', fontWeight: 'bold' }
});
