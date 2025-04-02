import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, Pressable } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../firebase/config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function ScanScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState(null);
  const isFocused = useIsFocused();
  const hasHandled = useRef(false);

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getPermissions();
  }, []);  

  const handleBarcodeScanned = async ({ data }) => {
    if (loading || hasHandled.current) return;

    hasHandled.current = true; // Block repeated scans
    setScannedBarcode(data);
    setLoading(true);

    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${data}`);
      const result = await response.json();

      if (!result || result.status === 0 || !result.product || !result.product.product_name) {
        Alert.alert('❌ Not Found', 'No product found for this barcode.', [
          {
            text: 'OK',
            onPress: () => {
              hasHandled.current = false;
              setLoading(false);
              setScannedBarcode(null);
            }
          }
        ]);
        return;
      }

      // const user = auth.currentUser;
      // if (user) {
      //   const scanRef = collection(db, 'users', user.uid, 'scanHistory');
      //   await addDoc(scanRef, {
      //     name: result.product.product_name || 'Unnamed Product',
      //     image: result.product.image_front_url || '',
      //     code: result.code,
      //     scannedAt: serverTimestamp(),
      //   });
      // }

      setTimeout(() => {
        navigation.navigate('Result', { product: result.product });
        setLoading(false);
        hasHandled.current = false;
      }, 500);

    } catch (error) {
      Alert.alert('❌ Error', 'Failed to fetch product data.', [
        {
          text: 'OK',
          onPress: () => {
            hasHandled.current = false;
            setLoading(false);
          }
        }
      ]);
    }
  };

  if (hasPermission === null) return <Text>Requesting permission...</Text>;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
      {isFocused && !loading && (
        <CameraView
          style={StyleSheet.absoluteFillObject}
          onBarcodeScanned={handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e'],
          }}
        />
      )}

      {/* Frame */}
      <View style={styles.scanFrame}>
        <View style={styles.cornerTopLeft} />
        <View style={styles.cornerTopRight} />
        <View style={styles.cornerBottomLeft} />
        <View style={styles.cornerBottomRight} />
      </View>

      {/* Loading */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#4caf50" />
          <Text style={styles.loadingText}>Scanning...</Text>
        </View>
      )}

      {/* Back */}
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </Pressable>
    </View>
  );
}

const FRAME_SIZE = 250;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scanFrame: {
    position: 'absolute', top: '30%', left: '50%',
    width: FRAME_SIZE, height: FRAME_SIZE, marginLeft: -FRAME_SIZE / 2,
    borderColor: 'transparent', borderRadius: 12
  },
  cornerTopLeft: {
    position: 'absolute', top: 0, left: 0,
    borderTopWidth: 4, borderLeftWidth: 4, borderColor: '#4caf50',
    width: 30, height: 30, borderTopLeftRadius: 8
  },
  cornerTopRight: {
    position: 'absolute', top: 0, right: 0,
    borderTopWidth: 4, borderRightWidth: 4, borderColor: '#4caf50',
    width: 30, height: 30, borderTopRightRadius: 8
  },
  cornerBottomLeft: {
    position: 'absolute', bottom: 0, left: 0,
    borderBottomWidth: 4, borderLeftWidth: 4, borderColor: '#4caf50',
    width: 30, height: 30, borderBottomLeftRadius: 8
  },
  cornerBottomRight: {
    position: 'absolute', bottom: 0, right: 0,
    borderBottomWidth: 4, borderRightWidth: 4, borderColor: '#4caf50',
    width: 30, height: 30, borderBottomRightRadius: 8
  },
  backButton: {
    position: 'absolute', top: 50, left: 20,
    backgroundColor: 'rgba(0,0,0,0.6)', padding: 10, borderRadius: 30, zIndex: 10
  },
  loadingOverlay: {
    position: 'absolute', top: '45%', alignSelf: 'center', alignItems: 'center'
  },
  loadingText: {
    marginTop: 10, fontSize: 16, color: '#4caf50', fontWeight: 'bold'
  }
});
