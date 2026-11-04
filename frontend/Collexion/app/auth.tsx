import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  GoogleAuthProvider,
  sendPasswordResetEmail,
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
  Alert,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { auth } from '@/lib/firebase';

type Mode = 'sign-in' | 'sign-up' | 'forgot-password';

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

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError('Enter your email first.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setError(null);
      Alert.alert('Password reset email sent.');
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to send password reset email.',
      );
    }
  };

  // const signInWithGoogle = async (): Promise<void> => {
  //   try {
  //     await signInWithPopup(auth, new GoogleAuthProvider());
  //     router.replace('/(tabs)');
  //   } catch (error) {
  //     alert('Error signing in with Google');
  //     setError(
  //       error instanceof Error ? error.message : 'Error signing in with Google',
  //     );
  //   }
  // };

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
          {mode === 'forgot-password' && (
            <>
              <ThemedText type="title" style={styles.titleText}>
                Forgot Password
              </ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#aaa"
              />
              {error && (
                <ThemedText style={styles.error}>❌ {error}</ThemedText>
              )}
              <Pressable
                style={[
                  styles.button,
                  (loading || !email) && styles.buttonDisabled,
                ]}
                onPress={handleForgotPassword}
                disabled={!email}
              >
                <ThemedText style={styles.buttonText}>
                  Send Reset Email
                </ThemedText>
              </Pressable>
              <Pressable
                onPress={() => {
                  setMode('sign-in');
                  setError(null);
                }}
              >
                <ThemedText
                  style={[styles.link, { color: '#aaa' }]}
                  type="link"
                >
                  Back To Login
                </ThemedText>
              </Pressable>
            </>
          )}
          {mode !== 'forgot-password' && (
            <>
              <ThemedText type="title" style={styles.titleText}>
                {mode === 'sign-in' ? 'Sign In' : 'Sign Up'}
              </ThemedText>
            </>
          )}
          {mode !== 'forgot-password' && (
            <>
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
                {/* {mode === 'sign-in' && (
            <Pressable style={styles.googleButton} onPress={signInWithGoogle}>
            <Image
            source={require('@/assets/images/google.png')}
            style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </Pressable>
            )} */}
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
                {mode === 'sign-in' && (
                  <Pressable onPress={() => setMode('forgot-password')}>
                    <ThemedText style={styles.forgot}>
                      Forgot password?
                    </ThemedText>
                  </Pressable>
                )}
              </>

              {error && (
                <ThemedText style={styles.error}>❌ {error}</ThemedText>
              )}

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
                onPress={() =>
                  setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')
                }
              >
                <ThemedText style={styles.link} type="link">
                  {mode === 'sign-in'
                    ? "Don't have an account? "
                    : 'Already have an account? '}
                  <Text
                    style={{
                      fontWeight: '700',
                      textDecorationLine: 'underline',
                    }}
                  >
                    {mode === 'sign-in' ? 'Sign up' : 'Sign in'}
                  </Text>
                </ThemedText>
              </Pressable>
            </>
          )}
        </View>
      </ImageBackground>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  link: {
    marginTop: 5,

    fontSize: 17,
  },
  forgot: {
    marginTop: 5,
    fontSize: 15,
    color: '#aaa',
  },
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

  // google button styles
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginTop: 8,
    marginBottom: 18,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  googleButtonText: {
    color: '#000',
    fontWeight: '600',
  },
});
