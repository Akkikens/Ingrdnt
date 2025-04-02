// File: src/screens/HistoryScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;
  
        const ref = collection(db, 'users', user.uid, 'scanHistory');
        const snapshot = await getDocs(ref);
  
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setHistory(data.sort((a, b) => new Date(b.scannedAt) - new Date(a.scannedAt)));
      } catch (error) {
        console.error('Error fetching scan history:', error);
      }
    };
  
    fetchHistory();
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.date}>
                🗓️ {new Date(item.scannedAt?.toDate?.() || item.scannedAt || new Date()).toLocaleDateString()}
              </Text>
              <Text style={styles.code}>🔍 Code: {item.code}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: { width: 60, height: 60, borderRadius: 6, marginRight: 12 },
  name: { fontSize: 16, fontWeight: '600' },
  code: { color: '#555' },
  date: { fontSize: 12, color: '#888' }
});
