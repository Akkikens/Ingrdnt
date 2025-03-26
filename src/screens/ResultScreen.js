// File: src/screens/ResultScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { analyzeIngredients } from '../utils/ingredientChecker';
import { getAlternatives } from '../utils/alternatives';
import { saveScanToHistory } from '../utils/firestore';
import { AntDesign } from '@expo/vector-icons';

export default function ResultScreen({ route }) {
  const { product } = route.params;
  const [flaggedIngredients, setFlaggedIngredients] = useState([]);
  const [alternatives, setAlternatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const analyze = async () => {
      try {
        const analyzed = await analyzeIngredients(product.ingredients_text_en);
        const alts = await getAlternatives(product.product_name, product.categories_tags?.[0] || '');
        setFlaggedIngredients(analyzed);
        setAlternatives(alts);

        await saveScanToHistory({
          barcode: product.code,
          name: product.product_name,
          image: product.image_url,
          scannedAt: new Date().toISOString(),
        });
      } catch (e) {
        console.error('Error in analysis or saving:', e);
      } finally {
        setLoading(false);
      }
    };

    analyze();
  }, [product]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Analyzing product...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="#333" />
      </TouchableOpacity>

      <Image source={{ uri: product.image_url }} style={styles.productImage} />
      <Text style={styles.productName}>{product.product_name}</Text>

      <Text style={styles.sectionTitle}>⚠️ Flagged Ingredients</Text>
      {flaggedIngredients.length > 0 ? (
        flaggedIngredients.map((item, index) => (
          <View key={index} style={styles.ingredientCard}>
            <Text style={styles.ingredientName}>{item.name}</Text>
            <Text style={styles.ingredientImpact}>{item.impact}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.safeText}>✅ No harmful ingredients flagged</Text>
      )}

      <Text style={styles.sectionTitle}>💡 Healthier Alternatives</Text>
      {alternatives.length > 0 ? (
        alternatives.map((alt, index) => (
          <Text key={index} style={styles.altText}>• {alt}</Text>
        ))
      ) : (
        <Text style={styles.altText}>No alternatives found.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#F8FAF5',
    minHeight: '100%'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#555'
  },
  backBtn: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 10,
    backgroundColor: '#E8F5E9',
    padding: 8,
    borderRadius: 50,
  },
  productImage: {
    width: '100%',
    height: 240,
    borderRadius: 16,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2E7D32',
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: '#4CAF50',
  },
  ingredientCard: {
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  ingredientName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#BF360C'
  },
  ingredientImpact: {
    color: '#6D4C41',
    fontSize: 14,
    marginTop: 4
  },
  safeText: {
    fontSize: 16,
    color: '#388E3C'
  },
  altText: {
    fontSize: 15,
    marginVertical: 4,
    color: '#424242'
  }
});