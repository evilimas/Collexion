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
// import { Link } from 'expo-router';
import { collection, CollectionItem } from '@/data/newData';

const Handhelds = () => {
  const [handhelds, setHandhelds] = useState<CollectionItem[]>([]);

  useEffect(() => {
    const filteredHandhelds = collection.filter(
      (item) => item.type === 'Handheld',
    );
    setHandhelds(filteredHandhelds);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={require('@/assets/images/background3.jpg')}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.overlay}>
            <Text style={styles.text}>Handhelds</Text>
            <TextInput
              placeholder="Search Handhelds"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              style={styles.searchInput}
            />
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

export default Handhelds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',

    paddingHorizontal: 10,
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
