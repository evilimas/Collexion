import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

import backgroundImage from '@/assets/images/background1.png';

type CollectionSquare = {
  id: string;
  name: string;
  image?: any;
  tab: string;
};

const homeCollections: CollectionSquare[] = [
  {
    id: '1',
    name: 'Consoles',
    image: require('@/assets/images/consoles.png'),
    tab: '/(tabs)/consoles',
  },
  {
    id: '2',
    name: 'Handhelds',
    image: require('@/assets/images/handhelds.png'),
    tab: '/(tabs)/handhelds',
  },
  {
    id: '3',
    name: 'Controllers',
    image: require('@/assets/images/controllers.png'),
    tab: '/(tabs)/controllers',
  },
];

const recentlyAdded: CollectionSquare[] = [
  {
    id: '1',
    name: 'Nintendo Switch OLED',
    image: '',
    tab: '/(tabs)/home',
  },
  {
    id: '2',
    name: 'Xbox Elite Controller Series 2',
    image: '',
    tab: '/(tabs)/home',
  },
  {
    id: '3',
    name: 'Playstation 5 Slim',
    image: '',
    tab: '/(tabs)/home',
  },
];

const Collections: CollectionSquare[] = [
  {
    id: '1',
    name: 'Nintendo',
    image: require('@/assets/images/nintendo2.png'),
    tab: '/(tabs)/home',
  },
  {
    id: '2',
    name: '    Xbox    ',
    image: require('@/assets/images/xbox.png'),
    tab: '/(tabs)/home',
  },
  {
    id: '3',
    name: 'Playstation',
    image: require('@/assets/images/playstation.png'),
    tab: '/(tabs)/home',
  },
];
const ConsoleCollections: CollectionSquare[] = [
  {
    id: '1',
    name: 'PS3',
    image: require('@/assets/images/ps3.svg'),
    tab: '/(tabs)/home',
  },
  {
    id: '2',
    name: 'PS4',
    image: require('@/assets/images/ps4.png'),
    tab: '/(tabs)/home',
  },
  {
    id: '3',
    name: 'PS5',
    image: require('@/assets/images/ps5.png'),
    tab: '/(tabs)/home',
  },
  {
    id: '4',
    name: 'Nintendo Switch',
    image: require('@/assets/images/nswitch.png'),
    tab: '/(tabs)/home',
  },
  {
    id: '5',
    name: 'Xbox Series',
    image: require('@/assets/images/xboxseries.png'),
    tab: '/(tabs)/home',
  },
  {
    id: '6',
    name: 'Xbox 360',
    image: require('@/assets/images/xbox3601.png'),
    tab: '/(tabs)/home',
  },
];

const app = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={backgroundImage}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.overlay}>
            <Image
              source={require('@/assets/images/logo3.png')}
              style={styles.logo}
            />
            <TextInput
              placeholder="🔍 Search for games, consoles, and more..."
              placeholderTextColor="gray"
              style={styles.search}
            />

            <Text style={styles.text}>Your Collection</Text>
            <View style={styles.collectionContainer}>
              {homeCollections.map((collection) => (
                <Link
                  key={collection.id}
                  href={collection.tab as any}
                  style={styles.link}
                >
                  <Image source={collection.image} style={styles.colImg} />
                  {collection.name}
                </Link>
              ))}
            </View>
            <Text style={styles.text}>Recently Added</Text>
            <View style={styles.recentlyContainer}>
              {recentlyAdded.map((item) => (
                <Link
                  key={item.id}
                  href={item.tab as any}
                  style={styles.recentLink}
                >
                  {/* <Image source={require('')} style={styles.colImg} />
                {item.name} */}
                  {item.name}
                </Link>
              ))}
            </View>
            <Text style={styles.text}>Collections</Text>
            <View style={styles.collectionContainer}>
              {Collections.map((collection) => (
                <Link
                  key={collection.id}
                  href={collection.tab as any}
                  style={styles.link}
                >
                  <Image source={collection.image} style={styles.colImg} />
                  {collection.name}
                </Link>
              ))}
            </View>
            <Text style={styles.text}>Collections by console</Text>
            <View style={styles.collectionContainerConsole}>
              {ConsoleCollections.map((collection) => (
                <Link
                  key={collection.id}
                  href={collection.tab as any}
                  style={styles.linkConsole}
                >
                  <Image
                    source={collection.image}
                    style={styles.colImgConsoles}
                  />
                  {collection.name}
                </Link>
              ))}
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

export default app;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  colImg: {
    width: 50,
    height: 50,
    // marginBottom: 1,
    resizeMode: 'contain',
    // objectFit: 'cover',
  },
  colImgConsoles: {
    width: 70,
    height: 70,
    // marginBottom: 1,
    resizeMode: 'contain',
    // objectFit: 'cover',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
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
    width: '50%',
    height: 80,
    marginTop: 10,
    alignContent: 'center',
    alignSelf: 'center',
  },
  link: {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 22,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
  },
  linkConsole: {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 22,
    paddingVertical: 10,
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    width: '32%',
    marginBottom: 7,
  },
  recentLink: {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 22,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    gap: 5,
  },
  search: {
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
    // width: '100%',
  },
  collectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    borderBottomColor: 'rgba(24, 24, 24, 0.5)',
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
  collectionContainerConsole: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
    // marginBottom: 10,
    borderBottomColor: 'rgba(24, 24, 24, 0.5)',
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
  recentlyContainer: {
    // flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    gap: 5,
    borderBottomColor: 'rgba(24, 24, 24, 0.5)',
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 10,
    // textAlign: 'center',
    marginTop: 8,
  },
});
