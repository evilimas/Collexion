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
import Console from '@/components/Console';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

const Consoles = () => {
  const [search, setSearch] = useState('');
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const allConsoles = collection.filter((item) => item.type === 'Console');

  // Group consoles by name and count how many of each model there are
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

  const selectedItems = selectedName ? (grouped[selectedName] ?? []) : [];

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
            placeholder={
              selectedName
                ? 'Filter groups (tap Back to change)'
                : 'Search Consoles'
            }
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
          {selectedName ? (
            <Text style={styles.backText} onPress={() => setSelectedName(null)}>
              Back to Consoles
            </Text>
          ) : null}
          <ScrollView
            contentContainerStyle={selectedName ? styles.list : styles.grid}
            showsVerticalScrollIndicator={false}
          >
            {selectedName
              ? selectedItems.map((item) => (
                  <Link
                    key={item.id}
                    href={{
                      pathname: '/console-details',
                      params: {
                        name: item.name,
                        model: item.model,
                        edition: item.edition,
                        color: item.color,
                        condition: item.condition,
                        manufacturer: item.manufacturer,
                        description: item.description,
                      },
                    }}
                  >
                    <Console
                      name={item.name}
                      model={item.model}
                      edition={item.edition}
                      color={item.color}
                      condition={item.condition}
                      picture={item.picture}
                      manufacturer={item.manufacturer}
                      description={item.description}
                    />
                  </Link>
                ))
              : groups.map(([name, items]) => (
                  <ConsoleGroup
                    key={name}
                    name={name}
                    count={items.length}
                    picture={items[0].picture}
                    onPress={() => setSelectedName(name)}
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
  list: {
    paddingHorizontal: 5,
    paddingBottom: 20,
  },
  backText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    marginBottom: 10,
    // textDecorationLine: 'underline',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
});
