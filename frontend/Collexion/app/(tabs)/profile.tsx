import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { useEffect, useState } from 'react';

const userName = 'User';

const Profile = () => {
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
            <View>
              <Text style={styles.link}>Hi {userName}</Text>
            </View>
            <View>
              <Text style={styles.link}>Edit Profile</Text>
              <Text style={styles.link}>Change Password</Text>
              <Text style={styles.link}>Privacy Settings</Text>
              <Text style={styles.link}>Notification Settings</Text>
              <Text style={styles.link}>Connected Accounts</Text>
              <Text style={styles.link}>Payment Methods</Text>
              <Text style={styles.link}>Order History</Text>
              <Text style={styles.link}>Wishlist</Text>
              <Text style={styles.link}>Saved Items</Text>
              <Text style={styles.link}>Logout</Text>
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
    marginTop: 20,
  },
  linkContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
  },
  link: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    marginBottom: 10,
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
});
