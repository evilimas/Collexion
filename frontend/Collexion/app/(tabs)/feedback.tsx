import { useState } from 'react';
import { router } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { auth, db } from '@/lib/firebase';

const categories = ['Feedback', 'Feature request', 'Bug report'] as const;
type Category = (typeof categories)[number];

export default function FeedbackScreen() {
  const [category, setCategory] = useState<Category>('Feedback');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<{ text: string; error: boolean } | null>(
    null,
  );

  const handleSubmit = async () => {
    if (sending) return;

    const user = auth.currentUser;
    if (!user) {
      setNotice({ text: 'Please sign in to send feedback.', error: true });
      return;
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      setNotice({ text: 'Please write a message first.', error: true });
      return;
    }

    setSending(true);
    setNotice(null);
    try {
      await addDoc(collection(db, 'feedback'), {
        userId: user.uid,
        category,
        message: trimmedMessage,
        createdAt: serverTimestamp(),
      });
      setMessage('');
      setNotice({
        text: 'Thank you! Your feedback has been sent.',
        error: false,
      });
    } catch (error) {
      console.error('Failed to send feedback:', error);
      setNotice({
        text: 'Could not send feedback. Please check your connection and try again.',
        error: true,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/images/background3.jpg')}
      resizeMode="cover"
      style={styles.image}
    >
      <SafeAreaView style={styles.overlay} edges={['top']}>
        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <Pressable
              onPress={() => {
                router.replace('/profile');
              }}
              accessibilityRole="button"
              accessibilityLabel="Back to profile"
              style={styles.back}
            >
              <Text style={styles.backText}>‹ Profile</Text>
            </Pressable>

            <Text style={styles.eyebrow}>HELP US IMPROVE</Text>
            <Text style={styles.title}>Send feedback</Text>
            <Text style={styles.description}>
              Have an idea or found a problem? We&apos;d love to hear from you.
            </Text>

            <View style={styles.card}>
              <Text style={styles.label}>WHAT IS THIS ABOUT?</Text>
              <View style={styles.categories}>
                {categories.map((option) => (
                  <Pressable
                    key={option}
                    onPress={() => setCategory(option)}
                    disabled={sending}
                    accessibilityRole="button"
                    accessibilityState={{
                      selected: category === option,
                      disabled: sending,
                    }}
                    style={[
                      styles.category,
                      category === option && styles.categorySelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        category === option && styles.categoryTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Text style={styles.label}>YOUR MESSAGE</Text>
              <TextInput
                value={message}
                onChangeText={(text) => {
                  setMessage(text);
                  setNotice(null);
                }}
                editable={!sending}
                multiline
                maxLength={2000}
                placeholder="Tell us what you think or what you'd like to see..."
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                accessibilityLabel="Your feedback message"
                style={styles.input}
              />
              <Text style={styles.counter}>{message.length} / 2000</Text>

              {notice && (
                <Text
                  accessibilityLiveRegion="polite"
                  style={[styles.notice, notice.error && styles.error]}
                >
                  {notice.text}
                </Text>
              )}
              <Pressable
                onPress={handleSubmit}
                disabled={sending}
                accessibilityRole="button"
                accessibilityState={{ disabled: sending }}
                style={[styles.button, sending && styles.buttonDisabled]}
              >
                {sending ? (
                  <ActivityIndicator color="#101010" />
                ) : (
                  <Text style={styles.buttonText}>Send feedback</Text>
                )}
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  content: { flex: 1 },
  container: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32 },
  back: { alignSelf: 'flex-start', paddingVertical: 8, marginBottom: 22 },
  backText: { color: '#0DDCFD', fontSize: 16, fontWeight: '600' },
  eyebrow: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.8,
  },
  title: { color: 'white', fontSize: 34, fontWeight: '700', marginTop: 5 },
  description: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 24,
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  category: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  categorySelected: {
    borderColor: '#0DDCFD',
    backgroundColor: 'rgba(13, 220, 253, 0.15)',
  },
  categoryText: { color: 'white', fontSize: 13 },
  categoryTextSelected: { color: '#0DDCFD', fontWeight: '700' },
  input: {
    color: 'white',
    backgroundColor: 'rgba(15, 15, 15, 0.6)',
    borderColor: 'rgba(255, 255, 255, 0.35)',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    minHeight: 150,
    fontSize: 15,
    textAlignVertical: 'top',
  },
  counter: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 8,
  },
  notice: { color: '#90e8bd', marginTop: 14, lineHeight: 20 },
  error: { color: '#ffaaaa' },
  button: {
    backgroundColor: '#0DDCFD',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#101010', fontSize: 16, fontWeight: '700' },
});
