import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Pressable,
} from 'react-native';
import React from 'react';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useCollectionItems } from '@/hooks/use-collection-items';
import Console from '@/components/Console';

// Generic list screen for "tap a brand/console tile, see everything matching it".
const CollectionList = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const kind = params.kind as 'manufacturer' | 'name';
  const value = params.value as string;
  const title = (params.title as string) || value;

  const { items, error } = useCollectionItems();

  // value can hold several names/manufacturers separated by commas
  const values = value.split(',').map((v) => v.trim().toLowerCase());

  const matches = items.filter((item) => {
    if (kind === 'manufacturer') {
      return values.includes((item.manufacturer ?? '').toLowerCase());
    }

    const name = item.name.toLowerCase();
    const forConsole = (item.forConsole ?? '').toLowerCase();
    // substring match so e.g. "DualSense(PS5)" matches the "PS5" filter
    return values.some((v) => name.includes(v) || forConsole.includes(v));
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/background3.jpg')}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.overlay}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <MaterialIcons
              name="arrow-back"
              size={20}
              color="white"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.backText}>Back</Text>
          </Pressable>
          <Text style={styles.text}>{title}</Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <ScrollView
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          >
            {matches.length === 0 ? (
              <Text style={styles.emptyText}>No items found for {title}.</Text>
            ) : (
              matches.map((item) => (
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
                      forConsole: item.forConsole,
                      description: item.description,
                      url: item.url,
                      reshell: String(item.reshell),
                      withBox: String(item.withBox),
                      from: '/(tabs)',
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
            )}
          </ScrollView>
          <Text style={styles.totalText}>{`Total: ${matches.length}`}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CollectionList;

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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backText: {
    color: 'white',
    fontSize: 15,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  errorText: {
    color: '#ff6b6b',
    marginBottom: 10,
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginTop: 30,
  },
  list: {
    gap: 10,
    paddingBottom: 10,
  },
  totalText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    padding: 9,
    borderRadius: 8,
  },
});
