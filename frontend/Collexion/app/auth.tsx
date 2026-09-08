import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextInput,
  ImageBackground,
  Image,
  View,
  Text,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { auth } from '@/lib/firebase';

type Mode = 'sign-in' | 'sign-up';

export default function AuthScreen() {
  const router = useRouter();

  const [mode, setMode] = useState<Mode>('sign-in');
  const [firstName, setFirstName] = useState('');
  //   const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace('/(tabs)');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Sign in failed.');
    }
  };

  const handleSignUp = async () => {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      await updateProfile(credential.user, { displayName: firstName.trim() });
      router.replace('/(tabs)');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Sign up failed.');
    }
  };

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      if (mode === 'sign-in') {
        await handleSignIn();
      } else {
        await handleSignUp();
      }
    } catch (e: any) {
      console.error('Submit error:', e);
      setError(e?.message ?? 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const signUpMissingName = mode === 'sign-up' && !firstName.trim();

  return (
    <ThemedView style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/background3.jpg')}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.overlay}>
          <Image
            source={require('@/assets/images/logo3.png')}
            style={styles.logo}
          />
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text>Back</Text>
          </Pressable>
          <ThemedText type="title" style={styles.titleText}>
            {mode === 'sign-in' ? 'Sign In' : 'Sign Up'}
          </ThemedText>
          <>
            {mode === 'sign-up' && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  autoCapitalize="words"
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholderTextColor="#aaa"
                />
                {/* <TextInput
                style={styles.input}
                placeholder="Last name"
                autoCapitalize="words"
                value={lastName}
                onChangeText={setLastName}
              /> */}
              </>
            )}
            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#aaa"
            />
          </>

          {error && <ThemedText style={styles.error}>❌ {error}</ThemedText>}

          <Pressable
            style={[
              styles.button,
              (loading || !email || !password || signUpMissingName) &&
                styles.buttonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={loading || !email || !password || signUpMissingName}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ThemedText style={styles.buttonText}>
                {mode === 'sign-in' ? 'Sign In' : 'Create Account'}
              </ThemedText>
            )}
          </Pressable>

          <Pressable
            onPress={() => setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')}
          >
            <ThemedText type="link">
              {mode === 'sign-in'
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </ThemedText>
          </Pressable>
        </View>
      </ImageBackground>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    color: 'white',
  },
  overlay: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    // flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,

    // alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(15, 15, 15, 0.5)',
    marginBottom: 12,
  },

  logo: {
    width: '50%',
    height: 80,
    alignContent: 'center',
    alignSelf: 'center',
    position: 'absolute',

    top: 30,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#0a7ea4',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  error: {
    color: '#d33',
    backgroundColor: 'rgba(211, 51, 51, 0.1)',
    padding: 12,
    borderRadius: 6,
    borderColor: '#d33',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 4 },
    textShadowRadius: 6,
    resizeMode: 'cover',
  },
  titleText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 12,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 4 },
    textShadowRadius: 6,
  },
});
