import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button, Checkbox, useTheme } from 'react-native-paper';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase/config';
import { db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import Toast from 'react-native-toast-message';
import { CommonActions } from '@react-navigation/native'; // for animated reset nav

export default function SignUpStepTwo({ route, navigation }) {
  const { fname, lname, email } = route.params;
  const { colors } = useTheme();

  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let valid = true;
    const newErrors = {};

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^()\-_=+]).{8,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be 8+ chars w/ upper, lower, number, symbol';
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
  
      await setDoc(doc(db, 'users', userCred.user.uid), {
        firstName: fname,
        lastName: lname,
        email: email,
        createdAt: new Date(),
      });
  
      // ✅ Show success toast
      Toast.show({
        type: 'success',
        text1: 'Account created! 🎉',
        text2: 'Please verify your email and then sign in.',
        position: 'top',
        visibilityTime: 2000,
      });
  
      // ✅ Delay and then navigate to SignIn
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        });
      }, 2000); // Give the user time to see the message
  
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: err.message,
        position: 'top',
      });
    } finally {
      setLoading(false); // ✅ Stops spinner and re-enables button
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Secure your account</Text>

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        style={styles.input}
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
        secureTextEntry={!showConfirm}
        style={styles.input}
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
        <View style={styles.checkboxBox}>
          <Checkbox
            status={agree ? 'checked' : 'unchecked'}
            onPress={() => setAgree(!agree)}
            color={colors.primary}
          />
        </View>
        <Text onPress={() => setAgree(!agree)} style={styles.checkboxLabel}>
          I agree to the Terms & Conditions
        </Text>
      </View>
      {errors.agree && <Text style={styles.error}>{errors.agree}</Text>}

      <Button
  mode="contained"
  onPress={handleSignup}
  loading={loading}
  disabled={loading}
  style={styles.button}
  contentStyle={{ paddingVertical: 10 }}
>
  Create Account
</Button>

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
    flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f5fff5'
  },
  title: {
    fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#2e7d32', textAlign: 'center'
  },
  input: {
    marginBottom: 12, backgroundColor: '#f1f8e9', borderRadius: 8
  },
  error: {
    fontSize: 12, color: 'red', marginBottom: 6
  },
  checkboxContainer: {
    flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 5
  },
  checkboxBox: {
    borderWidth: 1.5,
    borderColor: '#2e7d32',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 8
  },
  checkboxLabel: {
    fontSize: 14, color: '#4e4e4e'
  },
  button: {
    marginTop: 20, borderRadius: 8
  },
  footer: {
    marginTop: 30, textAlign: 'center', color: '#777'
  },
  link: {
    color: '#2e7d32', fontWeight: 'bold'
  }
});
