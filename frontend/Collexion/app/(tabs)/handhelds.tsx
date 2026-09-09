import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';
import { useCollectionItems } from '@/hooks/use-collection-items';
import ConsoleGroup from '@/components/Consoles';
import Console from '@/components/Console';

const Handhelds = () => {
  const [search, setSearch] = useState('');
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const { items, error } = useCollectionItems();

  const allHandhelds = items.filter((item) => item.type === 'Handheld');

  const grouped = allHandhelds.reduce(
    (acc, item) => {
      if (!acc[item.name]) acc[item.name] = [];
      acc[item.name].push(item);
      return acc;
    },
    {} as Record<string, typeof allHandhelds>,
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
          <Text style={styles.text}>Handhelds</Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TextInput
            placeholder={
              selectedName
                ? 'Filter groups (tap Back to change)'
                : 'Search Handhelds'
            }
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
          {selectedName ? (
            <Text style={styles.backText} onPress={() => setSelectedName(null)}>
              Back to Handhelds
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
                        url: item.url,
                        reshell: String(item.reshell),
                        withBox: String(item.withBox),
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
                      />
                    </Pressable>
                  </Link>
                ))
              : groups.map(([name, groupItems]) => (
                  <ConsoleGroup
                    key={name}
                    name={name}
                    count={groupItems.length}
                    picture={groupItems[0].picture}
                    onPress={() => setSelectedName(name)}
                  />
                ))}
          </ScrollView>
        </View>
      </ImageBackground>
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
