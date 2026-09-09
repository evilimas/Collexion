import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Pressable,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const ConsoleDetail = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/background3.jpg')}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.overlay}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
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
  backText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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
