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
    await updateProfile(user!, {
      displayName: name,
      photoURL: imageUrl,
    });
  };
  const auth = getAuth();
  const user = auth.currentUser;
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
            marginBottom: 20,
          }}
        />
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
        <Pressable style={styles.button} onPress={handleUpdateProfile}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    // justifyContent: 'center',
    // alignSelf: 'start',
    // justifySelf: 'start',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
