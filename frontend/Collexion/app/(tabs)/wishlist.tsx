import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '@/lib/firebase';
import {
  addDoc,
  deleteDoc,
  doc,
  collection as firestoreCollection,
  serverTimestamp,
} from 'firebase/firestore';
import {
  useWishlistItems,
  deleteWishlistItem,
} from '@/hooks/use-wishlist-items';

export default function WishlistScreen() {
  const { wishlistItems } = useWishlistItems();

  const [newItem, setNewItem] = useState('');

  const handleaddItem = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Sign in required', 'Please sign in first');
      return;
    }

    const name = newItem.trim();
    if (!name) return;

    const docRef = await addDoc(firestoreCollection(db, 'wishlist_items'), {
      userId: user.uid,
      name,
      createdAt: serverTimestamp(),
    });

    setNewItem('');
  };

  return (
    <ImageBackground
      source={require('@/assets/images/background3.jpg')}
      resizeMode="cover"
      style={styles.image}
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={styles.eyebrow}>YOUR COLLECTION</Text>
              <Text style={styles.title}>Wishlist</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Wishlist options"
              style={styles.moreButton}
            >
              <Text style={styles.more}>···</Text>
            </Pressable>
          </View>

          <Text style={styles.subtitle}>Keep the things you love close.</Text>

          <View style={styles.summary}>
            <View>
              <Text style={styles.summaryLabel}>SAVED ITEMS</Text>
              <Text style={styles.summaryValue}>
                {wishlistItems.length}{' '}
                <Text style={styles.summaryUnit}>items</Text>
              </Text>
            </View>
            <Text style={styles.heart}>♡</Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your saved list</Text>
            <Text style={styles.count}>{wishlistItems.length}</Text>
          </View>

          <View style={styles.addRow}>
            <TextInput
              value={newItem}
              onChangeText={setNewItem}
              placeholder="Add an item to your wishlist"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              style={styles.input}
              returnKeyType="done"
              onSubmitEditing={handleaddItem}
              accessibilityLabel="New wishlist item"
            />
            <Pressable
              style={styles.addButton}
              onPress={handleaddItem}
              accessibilityRole="button"
              accessibilityLabel="Add to wishlist"
            >
              <Text style={styles.addButtonText}>＋</Text>
            </Pressable>
          </View>

          <FlatList
            data={wishlistItems}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <View style={styles.itemIcon}>
                  <Text style={styles.emptyHeart}>♡</Text>
                </View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => deleteWishlistItem(item.id)}
                  accessibilityRole="button"
                  accessibilityLabel="Delete from wishlist"
                >
                  <Text style={styles.deleteButtonText}>🗑️</Text>
                </Pressable>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyCard}>
                <View style={styles.emptyIcon}>
                  <Text style={styles.emptyHeart}>♡</Text>
                </View>
                <Text style={styles.emptyTitle}>
                  A little room for{'\n'}your next favourite
                </Text>
                <Text style={styles.emptyText}>
                  Save pieces you find while exploring and they’ll be waiting
                  for you here.
                </Text>
                <Pressable style={styles.button} accessibilityRole="button">
                  <Text style={styles.buttonText}>Explore collections</Text>
                  <Text style={styles.buttonArrow}>→</Text>
                </Pressable>
              </View>
            }
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'transparent' },
  image: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eyebrow: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -1.2,
    marginTop: 5,
  },
  moreButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  more: {
    color: '#FFFFFF',
    fontSize: 25,
    lineHeight: 25,
    fontWeight: '700',
    marginTop: -8,
  },
  subtitle: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 14, marginTop: 8 },
  summary: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.35)',
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    marginTop: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  summaryValue: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '700',
    marginTop: 5,
  },
  summaryUnit: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    fontWeight: '400',
  },
  heart: { color: '#0DDCFD', fontSize: 38 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 14,
  },
  sectionTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
  count: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 9,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  addRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: 'rgba(15, 15, 15, 0.6)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    paddingHorizontal: 15,
    color: '#FFFFFF',
    fontSize: 14,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  addButtonText: { color: '#0DDCFD', fontSize: 26, lineHeight: 28 },
  listContent: { flexGrow: 1, paddingBottom: 24 },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },
  itemName: { flex: 1, color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
  emptyCard: {
    flex: 1,
    minHeight: 300,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 26,
    paddingVertical: 32,
  },
  emptyIcon: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  emptyHeart: { color: '#0DDCFD', fontSize: 34 },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    lineHeight: 27,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 10,
    maxWidth: 270,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginTop: 22,
  },
  buttonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },
  buttonArrow: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 12,
    marginTop: -2,
  },
  deleteButton: {
    marginLeft: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
  },
  deleteButtonText: {
    color: '#FF4D4D',
    fontSize: 16,
  },
});
