import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import { TextInput, Button, Text, Checkbox, IconButton } from 'react-native-paper';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase/config';

export default function SignUpScreen({ navigation }) {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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
      newErrors.email = 'Enter a valid email address';
      valid = false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^()\-_=+]).{8,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be 8+ chars, with uppercase, lowercase, number & special character';
      valid = false;
    }

    if (password !== confirmPass) {
      newErrors.confirmPass = 'Passwords do not match';
      valid = false;
    }

    if (!agree) {
      newErrors.agree = 'You must agree to continue';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCred.user);
      Alert.alert(
        'Verify your email',
        'A verification link has been sent to your email. Please verify before logging in.'
      );
      navigation.navigate('SignIn');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={styles.heading}>Create Account</Text>

      <TextInput
        label="First Name"
        value={fname}
        onChangeText={setFname}
        style={styles.input}
        error={!!errors.fname}
      />
      {errors.fname && <Text style={styles.error}>{errors.fname}</Text>}

      <TextInput
        label="Last Name"
        value={lname}
        onChangeText={setLname}
        style={styles.input}
        error={!!errors.lname}
      />
      {errors.lname && <Text style={styles.error}>{errors.lname}</Text>}

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        error={!!errors.email}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry={!showPassword}
        error={!!errors.password}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <TextInput
        label="Confirm Password"
        value={confirmPass}
        onChangeText={setConfirmPass}
        style={styles.input}
        secureTextEntry={!showConfirm}
        error={!!errors.confirmPass}
        right={
          <TextInput.Icon
            icon={showConfirm ? 'eye-off' : 'eye'}
            onPress={() => setShowConfirm(!showConfirm)}
          />
        }
      />
      {errors.confirmPass && <Text style={styles.error}>{errors.confirmPass}</Text>}

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={agree ? 'checked' : 'unchecked'}
          onPress={() => setAgree(!agree)}
        />
        <Text onPress={() => setAgree(!agree)} style={styles.agreeText}>
          I agree to the Terms & Conditions
        </Text>
      </View>
      {errors.agree && <Text style={styles.error}>{errors.agree}</Text>}

      <Button
        mode="contained"
        onPress={handleSignup}
        loading={loading}
        style={styles.button}
      >
        Sign Up
      </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff'
  },
  heading: {
    fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#2e7d32'
  },
  input: {
    marginBottom: 10, backgroundColor: '#f1f8e9'
  },
  error: {
    fontSize: 12, color: 'red', marginBottom: 10
  },
  button: {
    marginTop: 20, padding: 8, borderRadius: 8
  },
  checkboxContainer: {
    flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 5
  },
  agreeText: {
    fontSize: 14, color: '#555'
  }
});
