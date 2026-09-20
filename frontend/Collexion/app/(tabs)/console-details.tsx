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
  const type = params.type as string;
  const name = params.name as string;
  const model = params.model as string;
  const edition = params.edition as string;
  const color = params.color as string;
  const condition = params.condition as string;
  const manufacturer = params.manufacturer as string;
  const storage = params.storage as string;
  const forConsole = params.forConsole as string;
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
            <MaterialIcons
              name="arrow-back"
              size={20}
              color="white"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.backText}>Back</Text>
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
            {model && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabel}>
                  <MaterialIcons name="memory" size={20} color="white" />
                  <Text style={styles.detailInfo}>Model:</Text>
                </View>
                <Text style={styles.detailValue}>{model}</Text>
              </View>
            )}
            {color && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabel}>
                  <MaterialIcons name="color-lens" size={20} color="white" />
                  <Text style={styles.detailInfo}>Color:</Text>
                </View>
                <Text style={styles.detailValue}>{color}</Text>
              </View>
            )}
            {condition && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabel}>
                  <MaterialIcons name="grade" size={20} color="white" />
                  <Text style={styles.detailInfo}>Condition:</Text>
                </View>
                <Text style={styles.detailValue}>{condition}</Text>
              </View>
            )}
            {manufacturer && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabel}>
                  <MaterialIcons
                    name="account-balance"
                    size={20}
                    color="white"
                  />
                  <Text style={styles.detailInfo}>Manufacturer:</Text>
                </View>
                <Text style={styles.detailValue}>{manufacturer}</Text>
              </View>
            )}
            {storage && (
              <View style={styles.detailRow}>
                <View style={styles.detailLabel}>
                  <MaterialIcons name="storage" size={20} color="white" />
                  <Text style={styles.detailInfo}>Storage:</Text>
                </View>
                <Text style={styles.detailValue}>{storage}</Text>
              </View>
            )}
            <View style={styles.detailRow}>
              <View style={styles.detailLabel}>
                <MaterialIcons name="build" size={20} color="white" />
                <Text style={styles.detailInfo}>Reshelled:</Text>
              </View>
              <Text style={styles.detailValue}>{reshell ? 'Yes' : 'No'}</Text>
            </View>
            <View style={styles.detailLastRow}>
              <View style={styles.detailLabel}>
                <MaterialIcons name="border-all" size={20} color="white" />
                <Text style={styles.detailInfo}>With Box:</Text>
              </View>
              <Text style={styles.detailValue}>{withBox ? 'Yes' : 'No'}</Text>
            </View>
          </View>
          <View style={styles.detailCard}>
            <View style={styles.descriptionContainer}>
              {description && (
                <View style={styles.descriptionRow}>
                  <View style={styles.descriptionLabel}>
                    <MaterialIcons name="description" size={20} color="white" />
                  </View>
                  <View style={styles.descriptionTextContainer}>
                    <Text style={styles.detailInfo}>Description:</Text>
                    <Text style={styles.descriptionValue}>{description}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>
          <View style={styles.editButtons}>
            <Pressable
              style={styles.editBtn}
              onPress={() =>
                router.push({
                  pathname: '/edit-item',
                  params: {
                    id: itemId,
                    type,
                    name,
                    model,
                    edition,
                    color,
                    condition,
                    manufacturer,
                    storage,
                    forConsole,
                    description,
                    url,
                    reshell: String(reshell),
                    withBox: String(withBox),
                    from,
                  },
                })
              }
            >
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
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 10,
    marginTop: 14,
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
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 6,
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
    backgroundColor: 'rgba(94, 94, 94, 0.23)',
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
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    padding: 12,
    marginBottom: 5,
  },
  detailImage: {
    width: '100%',
    height: 280,
    resizeMode: 'cover',
    marginBottom: 8,
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
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    marginBottom: 5,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    borderBottomWidth: 1.4,
  },

  detailLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    flexShrink: 1,
  },

  detailInfo: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  detailValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
    marginLeft: 12,
    flexShrink: 1,
  },
  detailEdition: {
    color: 'rgba(255, 255, 255, 0.69)',
    fontSize: 17,
    fontWeight: '600',
    padding: 0,
    marginBottom: 16,
  },
  detailLastRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: 1,
  },
  descriptionTextContainer: {
    flexShrink: 1,
  },
  descriptionContainer: {},
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    // justifyContent: 'space-between',
    gap: 10,
    paddingVertical: 4,
  },
  descriptionLabel: {
    flexDirection: 'column',
    alignItems: 'center',
    // gap: 10,
    // flexShrink: 1,
    // color: 'white',
  },
  descriptionValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
