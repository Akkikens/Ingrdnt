
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export const saveScanToHistory = async (product) => {
  try {
    const user = auth.currentUser;
    if (!user) return;

    const {
      code,
      product_name,
      ingredients_text,
      image_url,
      categories_tags,
      nutriscore_grade,
    } = product;

    const validCode = code ?? product._id; // fallback to _id if code missing
    if (!validCode || !product_name) {
      console.warn("⚠️ Product is missing required fields, skipping save.");
      return;
    }

    const scanRef = collection(db, 'users', user.uid, 'scanHistory');
    await addDoc(scanRef, {
      code: validCode,
      name: product_name,
      image: image_url,
      ingredients: ingredients_text,
      categories: categories_tags ?? [],
      nutriscore: nutriscore_grade ?? null,
      scannedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Failed to save scan history:', error);
  }
};
