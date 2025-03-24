import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function ScanScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = async ({ data }) => {
    setScanned(true);
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${data}`, {
        headers: {
          'User-Agent': 'Ingrdnt/1.0 (support@ingrdnt.app)'
        }
      });

      const result = await response.json();

      if (!result || result.status === 0) {
        Alert.alert("Not Found", "No product found for this barcode.");
        setScanned(false);
        return;
      }

      navigation.navigate('Result', { product: result.product });
    } catch (error) {
      Alert.alert("Error", "Failed to fetch product data.");
      setScanned(false);
    }
  };

  if (hasPermission === null) return <Text>Requesting camera permission...</Text>;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
      {isFocused && (
        <CameraView
          style={StyleSheet.absoluteFillObject}
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e', 'qr'],
          }}
        />
      )}

      {/* Overlay for Scan Frame */}
      <View style={styles.scanFrame}>
        <View style={styles.cornerTopLeft} />
        <View style={styles.cornerTopRight} />
        <View style={styles.cornerBottomLeft} />
        <View style={styles.cornerBottomRight} />
      </View>

      {/* Back Button */}
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </Pressable>

      {/* Rescan button */}
      {scanned && (
        <View style={styles.scanAgainBtn}>
          <Pressable onPress={() => setScanned(false)}>
            <Text style={styles.scanAgainText}>Tap to Scan Again</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const FRAME_SIZE = 250;

const styles = StyleSheet.create({
  container: { flex: 1 },

  scanFrame: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    marginLeft: -FRAME_SIZE / 2,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 12,
    justifyContent: 'space-between'
  },

  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#4caf50',
    width: 30,
    height: 30,
    borderTopLeftRadius: 8
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#4caf50',
    width: 30,
    height: 30,
    borderTopRightRadius: 8
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#4caf50',
    width: 30,
    height: 30,
    borderBottomLeftRadius: 8
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#4caf50',
    width: 30,
    height: 30,
    borderBottomRightRadius: 8
  },

  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 30
  },

  scanAgainBtn: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: '#ffffffcc',
    padding: 10,
    borderRadius: 8
  },

  scanAgainText: {
    color: '#2e7d32',
    fontWeight: 'bold',
    fontSize: 16
  }
});
