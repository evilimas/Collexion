import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';

import backgroundImage from '@/assets/images/background.avif';

const app = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.text}>Collexion</Text>
      </ImageBackground>
    </View>
  );
};

export default app;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '100%',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 4 },
    textShadowRadius: 6,
    // flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'white',

    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
