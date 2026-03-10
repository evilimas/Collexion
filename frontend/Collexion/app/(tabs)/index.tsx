import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

import backgroundImage from '@/assets/images/background1.png';

const app = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.overlay}>
          <Image
            source={require('@/assets/images/logo2.png')}
            style={styles.logo}
          />
          <TextInput
            placeholder="Search for games, consoles, and more..."
            placeholderTextColor="white"
            style={styles.search}
          />

          <Link href="/(tabs)/consoles" style={styles.link}>
            Go to Explore
          </Link>
        </View>
      </ImageBackground>
    </View>
  );
};

export default app;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay - adjust opacity (0.0 to 1.0)
    width: '100%',
    height: '100%',
  },

  image: {
    width: '100%',
    height: '100%',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 4 },
    textShadowRadius: 6,

    resizeMode: 'cover',
  },
  logo: {
    width: '100%',
    height: 90,
    marginTop: 6,
    alignContent: 'center',
  },
  link: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 4,
  },
  search: {
    color: 'white',
    fontSize: 15,
    backgroundColor: 'rgba(56, 56, 56, 0.5)',
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 20,
  },
});
