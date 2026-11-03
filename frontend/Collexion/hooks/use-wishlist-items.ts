import { useEffect, useState } from 'react';
import {
  deleteDoc,
  doc,
  collection as firestoreCollection,
  onSnapshot,
  query,
  updateDoc,
  where,
  getDocs,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';

export async function deleteWishlistItem(itemId: string) {
  if (!auth.currentUser) {
    throw new Error('You must be signed in to delete an item.');
  }

  await deleteDoc(doc(db, 'wishlist_items', itemId));
}

export async function itemsCount() {
  if (!auth.currentUser) {
    throw new Error('You must be signed in to get items count.');
  }

  const q = query(
    firestoreCollection(db, 'wishlist_items'),
    where('userId', '==', auth.currentUser.uid),
  );

  const snapshot = await getDocs(q);
  return snapshot.size;
}

// Live Firestore items added by the signed-in user via the "Add item" screen.
export function useWishlistItems() {
  const [wishlistItems, setItems] = useState<
    { id: string; name: string; createdAt: number }[]
  >([]);
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
        firestoreCollection(db, 'wishlist_items'),
        where('userId', '==', user.uid),
      );

      unsubscribeSnapshot = onSnapshot(
        q,
        (snapshot) => {
          const fetched = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name,
              createdAt: data.createdAt?.toMillis?.() ?? 0,
            };
          });
          fetched.sort((a, b) => b.createdAt - a.createdAt);
          setItems(fetched);
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

  return { wishlistItems, loading, error };
}
