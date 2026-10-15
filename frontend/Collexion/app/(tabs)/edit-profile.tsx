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
  const handleUpdateProfile = async () => {
    setLoading(true);
    setSaving(true);
    try {
      await updateProfile(user!, {
        displayName: name,
        photoURL: imageUrl,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setTimeout(() => setSaving(false), 2500);
    }
  };
  const auth = getAuth();
  const user = auth.currentUser;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(user?.displayName);
  //   const [password, setPassword] = useState(user?.password);
  const [imageUrl, setImageUrl] = useState(user?.photoURL);
  return (
    <ImageBackground
      source={require('@/assets/images/background3.jpg')}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.overlay}>
        <Text style={styles.header}>Edit Profile</Text>
        <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 50 }}>
          <Text
            style={{
              color: 'white',
              marginBottom: 10,
              fontSize: 16,
              textDecorationLine: 'underline',
            }}
          >
            Profile Picture
          </Text>
          <Image
            source={
              user?.photoURL
                ? { uri: user.photoURL }
                : require('@/assets/images/user.png')
            }
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginBottom: 10,
              //   marginTop: 50,
            }}
          />
        </View>
        <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 20 }}>
          <Text
            style={{
              color: 'white',
              marginBottom: 0,
              fontSize: 16,
              textDecorationLine: 'underline',
            }}
          >
            Name
          </Text>
          <Text style={{ color: 'white', fontSize: 24 }}>
            {user?.displayName}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginTop: 220,
          }}
        >
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#aaa"
            value={name ?? undefined}
            onChangeText={setName}
          />
          {/* <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
        /> */}
          {/* <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        /> */}
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
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    paddingTop: 40,
    alignItems: 'center',
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
    width: '80%',
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  buttonDisabled: {
    backgroundColor: '#555',
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
