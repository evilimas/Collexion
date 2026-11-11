import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDG8pB6EuW9BiwOzdzkLBkHsuo-ZDAnejY',
  authDomain: 'collextion-6d688.firebaseapp.com',
  projectId: 'collextion-6d688',
  storageBucket: 'collextion-6d688.firebasestorage.app',
  messagingSenderId: '516370418893',
  appId: '1:516370418893:web:62704b455cfcd886722d84',
};

const isNewApp = getApps().length === 0;
const app = isNewApp ? initializeApp(firebaseConfig) : getApp();
// const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// export const auth = getAuth(app);
export const auth =
  Platform.OS === 'web'
    ? getAuth(app)
    : isNewApp
      ? initializeAuth(app, {
          persistence: getReactNativePersistence(AsyncStorage),
        })
      : getAuth(app);

export const db = getFirestore(app);
