import { useSignIn, useSignUp } from '@clerk/expo/legacy';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextInput,
  ImageBackground,
  Image,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type Mode = 'sign-in' | 'sign-up';

export default function AuthScreen() {
  const router = useRouter();
  const {
    signIn,
    setActive: setActiveSignIn,
    isLoaded: signInLoaded,
  } = useSignIn();
  const {
    signUp,
    setActive: setActiveSignUp,
    isLoaded: signUpLoaded,
  } = useSignUp();

  const [mode, setMode] = useState<Mode>('sign-in');
  const [firstName, setFirstName] = useState('');
  //   const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    if (!signInLoaded) return;
    try {
      console.log('Signing in with:', email);
      const attempt = await signIn.create({ identifier: email, password });
      console.log('Sign in attempt:', attempt.status);
      if (attempt.status === 'complete') {
        console.log('Sign in complete, redirecting...');
        await setActiveSignIn({ session: attempt.createdSessionId });
        router.replace('/(tabs)');
      } else {
        setError('Additional verification required.');
      }
    } catch (e: any) {
      console.error('Sign in error:', e);
      setError(e?.errors?.[0]?.message ?? e.message ?? 'Sign in failed.');
    }
  };

  const handleSignUp = async () => {
    if (!signUpLoaded) return;
    try {
      console.log('Signing up with:', email);
      await signUp.create({
        emailAddress: email,
        password,
        firstName,
      });
      console.log('Sign up created, sending verification email...');
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      console.log('Verification email sent');
      setPendingVerification(true);
    } catch (e: any) {
      console.error('Sign up error:', e);
      setError(e?.errors?.[0]?.message ?? e.message ?? 'Sign up failed.');
    }
  };

  const handleVerify = async () => {
    if (!signUpLoaded) return;
    try {
      const attempt = await signUp.attemptEmailAddressVerification({ code });
      if (attempt.status === 'complete') {
        await setActiveSignUp({ session: attempt.createdSessionId });
        router.replace('/(tabs)');
      } else {
        setError('Verification incomplete.');
      }
    } catch (e: any) {
      setError(e?.errors?.[0]?.message ?? 'Verification failed.');
    }
  };

  const handleSubmit = async () => {
    console.log('Submit pressed, mode:', mode, 'loading:', loading);
    setError(null);
    setLoading(true);
    try {
      if (pendingVerification) {
        await handleVerify();
      } else if (mode === 'sign-in') {
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
          <ThemedText type="title">
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              Back
            </Pressable>
            {pendingVerification
              ? 'Verify Email'
              : mode === 'sign-in'
                ? 'Sign In'
                : 'Sign Up'}
          </ThemedText>
          {!signInLoaded || !signUpLoaded ? (
            <ThemedText style={[styles.error, { marginTop: 8 }]}>
              Authentication is loading. Please try again in a moment.
            </ThemedText>
          ) : null}

          {pendingVerification ? (
            <TextInput
              style={styles.input}
              placeholder="Verification code"
              keyboardType="number-pad"
              value={code}
              onChangeText={setCode}
            />
          ) : (
            <>
              {mode === 'sign-up' && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Name"
                    autoCapitalize="words"
                    value={firstName}
                    onChangeText={setFirstName}
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
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </>
          )}

          {error && <ThemedText style={styles.error}>❌ {error}</ThemedText>}

          <Pressable
            style={[
              styles.button,
              (loading ||
                (!pendingVerification &&
                  (!email || !password || signUpMissingName))) &&
                styles.buttonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={
              loading ||
              (!pendingVerification &&
                (!email || !password || signUpMissingName))
            }
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ThemedText style={styles.buttonText}>
                {pendingVerification
                  ? 'Verify'
                  : mode === 'sign-in'
                    ? 'Sign In'
                    : 'Create Account'}
              </ThemedText>
            )}
          </Pressable>

          {!pendingVerification && (
            <Pressable
              onPress={() =>
                setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')
              }
            >
              <ThemedText type="link">
                {mode === 'sign-in'
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Sign in'}
              </ThemedText>
            </Pressable>
          )}
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
    color: 'gray',
    backgroundColor: 'rgba(15, 15, 15, 0.5)',
    marginBottom: 12,
  },
  logo: {
    width: '50%',
    height: 80,
    // marginTop: 10,
    alignContent: 'center',
    alignSelf: 'center',
    // justifyContent: 'flex-start',
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
});
