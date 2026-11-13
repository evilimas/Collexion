import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { useState, useCallback } from 'react';
import { useCollectionItems } from '@/hooks/use-collection-items';
import { sendPasswordResetEmail, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { router, useRouter, useFocusEffect } from 'expo-router';

const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/auth');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Pressable onPress={handleLogout}>
      <Text style={styles.logout}>Logout</Text>
    </Pressable>
  );
};

const Profile = () => {
  const user = auth.currentUser;
  const email = user?.email ?? '';
  const [error, setError] = useState<string | null>(null);
  const { items } = useCollectionItems();
  const userEmail = user?.email || 'user@example.com';
  const [userName, setUserName] = useState(auth.currentUser?.displayName || 'UserName');

  const handleForgotPassword = async (email: string | undefined) => {
    Alert.alert(
      'Reset Password',
      'Are you sure you want to reset your password?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            if (!email) {
              setError('Enter your email first.');
              return;
            }
            try {
              await sendPasswordResetEmail(auth, email);
              setError(null);
              Alert.alert('Password reset email sent.');
            } catch (error) {
              setError(
                error instanceof Error
                  ? error.message
                  : 'Failed to send password reset email.',
              );
            }
          },
        },
      ],
    );
    return;
  };

  useFocusEffect(
    useCallback(() => {
      setUserName(auth.currentUser?.displayName || 'UserName');
    }, []),
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/background3.jpg')}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.overlay}>
          <Text style={styles.text}>Profile</Text>
          <ScrollView>
            <View style={styles.heading}>
              <View style={styles.headingLeft}>
                <Image
                  source={
                    user?.photoURL
                      ? { uri: user.photoURL }
                      : require('@/assets/images/user.png')
                  }
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              </View>
              <View style={styles.headingRight}>
                <Text style={styles.textHeader}>{userName}</Text>
                <Text style={styles.textHeaderemail}>{userEmail}</Text>
                <Text style={[styles.textHeaderemail]}>Member since:</Text>
                <Text
                  style={[
                    styles.textHeaderemail,
                    { fontSize: 12, color: 'white' },
                  ]}
                >
                  {user?.metadata.creationTime ?? 'Unknown'}
                </Text>
                <Text style={styles.textHeaderemail}>
                  {items.length} Items in collection
                </Text>
              </View>
            </View>
            <View>
              <Pressable
                style={styles.link}
                onPress={() => router.push('/wishlist')}
              >
                <Text style={styles.linkText}>Wishlist</Text>
                <Text style={styles.linkText}>&gt;</Text>
              </Pressable>
              <Pressable
                style={styles.link}
                onPress={() => router.push('/edit-profile')}
              >
                <Text style={styles.linkText}>Edit Profile</Text>
                <Text style={styles.linkText}>&gt;</Text>
              </Pressable>
              <Pressable
                style={styles.link}
                onPress={() => handleForgotPassword(email)}
              >
                <Text style={styles.linkText}>Change Password</Text>
                <Text style={styles.linkText}>&gt;</Text>
              </Pressable>

              <Pressable
                style={styles.link}
                onPress={() => router.push('/feedback')}
              >
                <Text style={styles.linkText}>Send Feedback</Text>
                <Text style={styles.linkText}>&gt;</Text>
              </Pressable>

              <Logout />
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 20,
  },

  image: {
    width: '100%',
    height: '100%',

    resizeMode: 'cover',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 43,
  },
  textHeader: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textHeaderemail: {
    color: 'white',
    fontSize: 16,
    marginBottom: 0,
  },
  linkContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
  },
  link: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  linkText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  searchInput: {
    color: 'white',
    fontSize: 15,
    backgroundColor: 'rgba(15, 15, 15, 0.5)',
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    marginBottom: 10,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    borderRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  headingLeft: {},
  headingRight: {},
  logout: {
    color: 'rgb(247, 0, 0)',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: 'rgba(168, 4, 4, 0.5)',
    width: '100%',
    textAlign: 'center',
  },
});
