import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';

function EditProfile() {
  const user = getAuth().currentUser;

  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(user?.displayName);
  const [imageUrl, setImageUrl] = useState(user?.photoURL);
  const [localImageUri, setLocalImageUri] = useState('');

  const handleUpdateProfile = async () => {
    setSaving(true);
    try {
      await updateProfile(user!, {
        displayName: name,
        photoURL: imageUrl,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setSaving(false), 3000);
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/images/background3.jpg')}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.overlay}>
        <Text style={styles.eyebrow}>YOUR ACCOUNT</Text>
        <Text style={styles.header}>Edit Profile</Text>
        <View style={styles.profileCard}>
          <Image
            source={
              user?.photoURL
                ? { uri: user.photoURL }
                : require('@/assets/images/user.png')
            }
            style={styles.avatar}
          />
          <Text style={styles.displayName}>
            {user?.displayName || 'No name yet'}
          </Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#aaa"
            value={name ?? undefined}
            onChangeText={setName}
          />
          <Text style={styles.label}>IMAGE URL</Text>
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            placeholderTextColor="#aaa"
            value={imageUrl ?? undefined}
            onChangeText={setImageUrl}
          />
          <Pressable
            disabled={saving}
            style={[styles.button, saving && styles.buttonDisabled]}
            onPress={handleUpdateProfile}
          >
            <Text style={styles.buttonText}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  eyebrow: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.8,
  },
  header: {
    fontSize: 34,
    fontWeight: '700',
    color: 'white',
    marginTop: 5,
    marginBottom: 24,
  },
  profileCard: {
    width: '88%',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.35)',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#0DDCFD',
    marginBottom: 14,
  },
  displayName: { color: 'white', fontSize: 22, fontWeight: '700' },
  form: { width: '88%', marginTop: 28 },
  label: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  image: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 40,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 48,
    fontSize: 15,
    color: 'white',
    backgroundColor: 'rgba(15, 15, 15, 0.6)',
    marginBottom: 16,
    width: '100%',
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderWidth: 1,
    borderColor: '#0DDCFD',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#0DDCFD', fontWeight: '700', fontSize: 15 },
});
