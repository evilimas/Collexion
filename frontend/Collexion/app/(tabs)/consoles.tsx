import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  ScrollView,
} from 'react-native';
import { collection } from '@/data/newData';
import React, { useState } from 'react';
import ConsoleGroup from '@/components/Consoles';

const Consoles = () => {
  const [search, setSearch] = useState('');

  const allConsoles = collection.filter((item) => item.type === 'Console');

  // Group consoles by name (e.g. 2x PS4 → one card with badge "2")
  const grouped = allConsoles.reduce(
    (acc, item) => {
      if (!acc[item.name]) acc[item.name] = [];
      acc[item.name].push(item);
      return acc;
    },
    {} as Record<string, typeof allConsoles>,
  );

  const groups = Object.entries(grouped).filter(([name]) =>
    name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/background3.jpg')}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Consoles</Text>
          <TextInput
            placeholder="Search Consoles"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
          <ScrollView
            contentContainerStyle={styles.grid}
            showsVerticalScrollIndicator={false}
          >
            {groups.map(([name, items]) => (
              <ConsoleGroup
                key={name}
                name={name}
                count={items.length}
                picture={items[0].picture}
              />
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Consoles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 12,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 4 },
    textShadowRadius: 6,
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
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingBottom: 20,
  },
});
