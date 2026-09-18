import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import ConsoleGroup from '@/components/Consoles';
import Console from '@/components/Console';
import { Link } from 'expo-router';
import { useCollectionItems } from '@/hooks/use-collection-items';
import { IconSymbol } from '@/components/ui/icon-symbol';
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';

const Consoles = () => {
  const [search, setSearch] = useState('');
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const { items, error } = useCollectionItems();

  const allConsoles = items.filter((item) => item.type === 'Console');

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
          <Text style={styles.text}>Consoles</Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
            <Pressable
              style={styles.backText}
              onPress={() => setSelectedName(null)}
            >
              <MaterialIcons
                name="arrow-back"
                size={20}
                color="white"
                style={{ marginRight: 8 }}
              />
              <Text style={{ color: 'white' }}>Back to Consoles</Text>
            </Pressable>
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
                        id: item.id,
                        type: item.type,
                        name: item.name,
                        model: item.model,
                        edition: item.edition,
                        color: item.color,
                        condition: item.condition,
                        manufacturer: item.manufacturer,
                        storage: item.storage,
                        description: item.description,
                        url: item.url,
                        reshell: String(item.reshell),
                        withBox: String(item.withBox),
                        from: '/consoles',
                      },
                    }}
                    asChild
                  >
                    <Pressable style={{ width: '100%' }}>
                      <Console
                        name={item.name}
                        model={item.model}
                        edition={item.edition}
                        color={item.color}
                        condition={item.condition}
                        picture={item.picture}
                        manufacturer={item.manufacturer}
                        description={item.description}
                        url={item.url}
                        withBox={item.withBox}
                      />
                    </Pressable>
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
          <Text
            style={{
              color: 'white',
              fontSize: 17,
              textAlign: 'center',
              marginBottom: 4,
              textShadowColor: 'black',
              textShadowOffset: { width: 1, height: 4 },
              textShadowRadius: 6,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.5)',
              padding: 9,
              borderRadius: 8,
            }}
          >
            {`Total Consoles: ${allConsoles.length}`}
          </Text>
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
  // title: {
  //   color: 'white',
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   marginTop: 20,
  //   marginBottom: 12,
  //   textShadowColor: 'black',
  //   textShadowOffset: { width: 1, height: 4 },
  //   textShadowRadius: 6,
  // },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
    flexDirection: 'row',
    color: 'white',
    fontSize: 19,
    fontWeight: '600',
    marginLeft: 4,
    marginBottom: 10,
    // textDecorationLine: 'underline',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  errorText: {
    color: '#ffb3b3',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 8,
  },
});
