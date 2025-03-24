// File: src/screens/ResultScreen.js
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, Card, Chip, Divider, Button } from 'react-native-paper';
import { analyzeIngredients } from '../utils/ingredientChecker';
import { getAlternatives } from '../utils/alternatives';
import { auth, db } from '../firebase/config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function ResultScreen({ route, navigation }) {
  const { product } = route.params;
  const [analysis, setAnalysis] = useState([]);
  const [alternatives, setAlternatives] = useState([]);

  useEffect(() => {
    if (product.ingredients_text) {
      const result = analyzeIngredients(product.ingredients_text);
      setAnalysis(result);
      setAlternatives(getAlternatives(product.product_name));
      saveToHistory(result);
    } else {
      Alert.alert('No Ingredients', 'No ingredients found for this product.');
    }
  }, []);

  const saveToHistory = async (results) => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const historyRef = doc(db, 'users', user.uid, 'scans', product._id);
      await setDoc(historyRef, {
        product_name: product.product_name,
        ingredients_text: product.ingredients_text,
        results,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.log('Failed to save history:', err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={product.product_name || 'Unknown Product'} />
        <Card.Content>
          <Text style={styles.label}>Ingredients:</Text>
          <Text style={styles.value}>{product.ingredients_text || 'N/A'}</Text>
          <Divider style={{ marginVertical: 10 }} />

          <Text style={styles.label}>Analysis:</Text>
          {analysis.map((item, index) => (
            <Chip
              key={index}
              style={item.harmful ? styles.bad : styles.good}
              textStyle={{ color: '#fff' }}
            >
              {item.name} - {item.harmful ? 'Harmful' : 'Healthy'}
            </Chip>
          ))}

          {alternatives.length > 0 && (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.label}>Suggested Alternatives:</Text>
              {alternatives.map((alt, i) => (
                <Text key={i} style={styles.alt}>{`• ${alt}`}</Text>
              ))}
            </View>
          )}
        </Card.Content>
      </Card>

      <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.backBtn}>
        Scan Another Product
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { marginVertical: 10 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  value: { fontSize: 14, color: '#444' },
  good: { backgroundColor: '#66bb6a', margin: 4 },
  bad: { backgroundColor: '#ef5350', margin: 4 },
  alt: { fontSize: 14, marginTop: 4 },
  backBtn: { marginTop: 20 }
});