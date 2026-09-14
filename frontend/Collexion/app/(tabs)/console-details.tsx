import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Pressable,
  Alert,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
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
          <View style={styles.pictureContainer}>
            {url ? (
              <Image
                source={{ uri: url }}
                style={styles.detailImage}
                // resizeMode="cover"
              />
            ) : null}
          </View>

          <Text style={styles.detailName}>{name}</Text>
          {edition && <Text style={styles.detailEdition}> {edition}</Text>}
          <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              {model && (
                <>
                  <Text style={styles.detailInfo}>Model:</Text>
                  <Text style={styles.detailInfo}>{model}</Text>
                </>
              )}
            </View>
            <View style={styles.detailRow}>
              {color && (
                <>
                  <Text style={styles.detailInfo}>Color:</Text>
                  <Text style={styles.detailInfo}>{color}</Text>
                </>
              )}
            </View>

            <View style={styles.detailRow}>
              {condition && (
                <>
                  <Text style={styles.detailInfo}>Condition:</Text>
                  <Text style={styles.detailInfo}>{condition}</Text>
                </>
              )}
            </View>
            <View style={styles.detailRow}>
              {manufacturer && (
                <>
                  <Text style={styles.detailInfo}>Manufacturer:</Text>
                  <Text style={styles.detailInfo}>{manufacturer}</Text>
                </>
              )}
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailInfo}>Reshelled:</Text>
              <Text style={styles.detailInfo}>{reshell ? 'Yes' : 'No'}</Text>
            </View>
            <View style={styles.detailLastRow}>
              <Text style={styles.detailInfo}>With Box:</Text>
              <Text style={styles.detailInfo}>{withBox ? 'Yes' : 'No'}</Text>
            </View>
          </View>
          <View style={styles.detailCard}>
            <View style={styles.descriptionContainer}>
              {description && (
                <>
                  <Text style={styles.detailInfo}>Description:</Text>
                  <Text style={styles.detailInfo}>{description}</Text>
                </>
              )}
            </View>
          </View>
          <View style={styles.editButtons}>
            <Pressable style={styles.editBtn}>
              <View style={styles.actionContent}>
                <MaterialIcons name="edit" size={22} color="white" />
                <Text style={styles.editText}>Edit Item</Text>
              </View>
            </Pressable>
            <Pressable
              style={styles.deleteBtn}
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
              <View style={styles.actionContent}>
                <MaterialIcons name="delete-outline" size={22} color="red" />
                <Text style={styles.deleteText}>Delete Item</Text>
              </View>
            </Pressable>
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
    backgroundColor: 'rgba(0, 0, 0, 0.49)',
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
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 'auto',
    color: 'white',
  },

  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 10,
  },
  deleteText: {
    color: 'rgb(255, 34, 34)',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteBtn: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(192, 2, 2, 0.24)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 39, 39, 0.5)',
    marginBottom: 10,
  },
  detailCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    padding: 12,
    marginBottom: 10,
  },
  detailImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    marginBottom: 16,
    borderRadius: 8,
  },
  pictureContainer: {
    alignItems: 'center',
    borderRadius: 22,
  },
  detailName: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 4,
  },
  detailInfo: {
    color: 'rgb(255, 255, 255)',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 0,
  },
  detailEdition: {
    color: 'rgba(255, 255, 255, 0.69)',
    fontSize: 17,
    fontWeight: '600',
    padding: 0,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    marginBottom: 6,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    borderBottomWidth: 2,
  },
  detailLastRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: 2,
  },
  descriptionContainer: {},
});
