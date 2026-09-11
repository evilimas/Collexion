import { useEffect, useState } from 'react';
import {
  deleteDoc,
  doc,
  collection as firestoreCollection,
  onSnapshot,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import type { CollectionItem } from '@/data/newData';
import { getItemPicture } from '@/lib/item-picture';

export async function deleteItem(itemId: string) {
  if (!auth.currentUser) {
    throw new Error('You must be signed in to delete an item.');
  }

  await deleteDoc(doc(db, 'collection_items', itemId));
}

export async function itemsCount() {
  if (!auth.currentUser) {
    throw new Error('You must be signed in to get items count.');
  }

  const q = query(
    firestoreCollection(db, 'collection_items'),
    where('userId', '==', auth.currentUser.uid),
  );

  const snapshot = await getDocs(q);
  return snapshot.size;
}
export async function consoleCount() {
  if (!auth.currentUser) {
    throw new Error('You must be signed in to get items count.');
  }

  const q = query(
    firestoreCollection(db, 'collection_items'),
    where('userId', '==', auth.currentUser.uid),
    where('type', '==', 'console'),
  );

  const snapshot = await getDocs(q);
  return snapshot.size;
}
export async function controllersCount() {
  if (!auth.currentUser) {
    throw new Error('You must be signed in to get items count.');
  }

  const q = query(
    firestoreCollection(db, 'collection_items'),
    where('userId', '==', auth.currentUser.uid),
    where('type', '==', 'controller'),
  );

  const snapshot = await getDocs(q);
  return snapshot.size;
}
export async function handheldsCount() {
  if (!auth.currentUser) {
    throw new Error('You must be signed in to get items count.');
  }

  const q = query(
    firestoreCollection(db, 'collection_items'),
    where('userId', '==', auth.currentUser.uid),
    where('type', '==', 'handheld'),
  );

  const snapshot = await getDocs(q);
  return snapshot.size;
}

// Live Firestore items added by the signed-in user via the "Add item" screen.
export function useCollectionItems() {
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribeSnapshot: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      unsubscribeSnapshot?.();

      if (!user) {
        setItems([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      // Sorted client-side to avoid requiring a composite Firestore index.
      const q = query(
        firestoreCollection(db, 'collection_items'),
        where('userId', '==', user.uid),
      );

      unsubscribeSnapshot = onSnapshot(
        q,
        (snapshot) => {
          const fetched = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              type: data.type,
              name: data.name,
              model: data.model || undefined,
              color: data.color,
              condition: data.condition,
              withBox: data.withBox,
              edition: data.edition || undefined,
              forConsole: data.forConsole || undefined,
              manufacturer: data.manufacturer || undefined,
              description: data.description || undefined,
              reshell: data.reshell,
              url: data.url || undefined,
              picture: getItemPicture(data.type, data.name),
              createdAt: data.createdAt?.toMillis?.() ?? 0,
            };
          });
          fetched.sort((a, b) => b.createdAt - a.createdAt);
          setItems(fetched as CollectionItem[]);
          setError(null);
          setLoading(false);
        },
        (err) => {
          console.error('useCollectionItems: onSnapshot error', err);
          setError(err.message);
          setLoading(false);
        },
      );
    });

    return () => {
      unsubscribeSnapshot?.();
      unsubscribeAuth();
    };
  }, []);

  return { items, loading, error };
}
