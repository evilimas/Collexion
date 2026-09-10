import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Pressable,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { deleteItem } from '@/hooks/use-collection-items';

const ConsoleDetail = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const itemId = params.id as string;

  // Get console data from params
  const name = params.name as string;
  const model = params.model as string;
  const edition = params.edition as string;
  const color = params.color as string;
  const condition = params.condition as string;
  const manufacturer = params.manufacturer as string;
  const description = params.description as string;
  const url = params.url as string;
  const reshell = params.reshell === 'true'; // Convert string to boolean
  const withBox = params.withBox === 'true'; // Convert string to boolean
  const from = (params.from as string) || '/consoles';

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/background3.jpg')}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.overlay}>
          <Pressable
            onPress={() => router.push(from as any)}
            style={styles.backButton}
          >
            <Text style={styles.backText}>← Back</Text>
          </Pressable>

          <View style={styles.detailCard}>
            {url ? (
              <Image
                source={{ uri: url }}
                style={styles.detailImage}
                resizeMode="contain"
              />
            ) : null}
            <Text style={styles.detailName}>{name}</Text>
            {model && <Text style={styles.detailInfo}>Model: {model}</Text>}
            {edition && (
              <Text style={styles.detailInfo}>Edition: {edition}</Text>
            )}
            <Text style={styles.detailInfo}>Color: {color}</Text>
            <Text style={styles.detailInfo}>Condition: {condition}</Text>
            <Text style={styles.detailInfo}>Manufacturer: {manufacturer}</Text>
            <Text style={styles.detailInfo}>Description: {description}</Text>
            <Text style={styles.detailInfo}>
              Reshell: {reshell ? 'Yes' : 'No'}
            </Text>
            <Text style={styles.detailInfo}>
              With Box: {withBox ? 'Yes' : 'No'}
            </Text>
            <View style={styles.editButtons}>
              <Pressable style={styles.editBtn}>
                <Text style={styles.editText}>Edit Item</Text>
              </Pressable>
              <Pressable
                style={styles.editBtn}
                onPress={async () => {
                  try {
                    await deleteItem(itemId);
                    router.replace(from as any);
                  } catch (error) {
                    Alert.alert(
                      'Unable to delete item',
                      error instanceof Error
                        ? error.message
                        : 'Please try again.',
                    );
                  }
                }}
              >
                <Text style={styles.editText}>Delete Item</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ConsoleDetail;

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
    paddingTop: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 20,
    marginTop: 30,
  },

  editButtons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 20,
    color: 'white',
  },

  backText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  editText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  editBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 10,
  },
  detailCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    padding: 20,
  },
  detailImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  detailName: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  detailInfo: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 16,
    marginTop: 8,
  },
});
