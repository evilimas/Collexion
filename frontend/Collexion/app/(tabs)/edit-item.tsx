import {
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { File, Paths } from 'expo-file-system';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { deleteField } from 'firebase/firestore';
import { updateItem } from '@/hooks/use-collection-items';

const pickImage = async (setLocalImageUri: (uri: string) => void) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    quality: 0.7,
  });
  if (result.canceled) return;

  const picked = new File(result.assets[0].uri);
  const saved = new File(Paths.document, `${Date.now()}.jpg`);
  picked.copy(saved);

  setLocalImageUri(saved.uri);
};

const EditItemForm = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const itemId = params.id as string;
  const from = (params.from as string) || '/consoles';
  const initialLocalImageUri = Array.isArray(params.localImageUri)
    ? params.localImageUri[0]
    : params.localImageUri;

  const [name, setName] = useState((params.name as string) || '');
  const [otherName, setOtherName] = useState(
    (params.otherName as string) || '',
  );
  const [model, setModel] = useState((params.model as string) || '');
  const [color, setColor] = useState((params.color as string) || '');
  const [condition, setCondition] = useState(
    (params.condition as string) || '',
  );
  const [edition, setEdition] = useState((params.edition as string) || '');
  const [manufacturer, setManufacturer] = useState(
    (params.manufacturer as string) || '',
  );
  const [storage, setStorage] = useState((params.storage as string) || '');
  // const [forConsole, setForConsole] = useState(
  //   (params.forConsole as string) || '',
  // );
  const [canBeUsedOn, setCanBeUsedOn] = useState(
    (params.canBeUsedOn as string) || '',
  );
  const [description, setDescription] = useState(
    (params.description as string) || '',
  );
  const [url, setUrl] = useState((params.url as string) || '');
  const [localImageUri, setLocalImageUri] = useState(
    initialLocalImageUri || '',
  );
  const [reshell, setReshell] = useState(params.reshell === 'true');
  const [withBox, setWithBox] = useState(params.withBox === 'true');

  const [price, setPrice] = useState((params.price as string) || '');
  const [currency, setCurrency] = useState((params.currency as string) || '');

  const saveChanges = async () => {
    if (!name.trim() || !color.trim()) {
      Alert.alert('Missing information', 'Name and color are required.');
      return;
    }

    try {
      await updateItem(itemId, {
        type: params.type,
        name: name.trim(),
        otherName: otherName.trim() || '',
        model: model.trim(),
        color: color.trim(),
        condition: condition.trim(),
        edition: edition.trim(),
        manufacturer: manufacturer.trim(),
        storage: storage.trim(),
        localImageUri: localImageUri || '',
        // forConsole:
        //   params.type === 'Controller' ? forConsole.trim() : deleteField(),
        description: description.trim(),
        url: url.trim(),
        reshell,
        canBeUsedOn:
          params.type === 'Controller' ? canBeUsedOn.trim() : deleteField(),
        withBox,
      });
      router.replace({
        pathname: '/console-details',
        params: {
          id: itemId,
          type: params.type,
          name: name.trim(),
          otherName: otherName.trim() || '',
          model: model.trim(),
          color: color.trim(),
          condition: condition.trim(),
          edition: edition.trim(),
          manufacturer: manufacturer.trim(),
          storage: storage.trim(),
          // forConsole:
          //   params.type === 'Controller' ? forConsole.trim() : '',
          canBeUsedOn: params.type === 'Controller' ? canBeUsedOn.trim() : '',
          description: description.trim(),
          url: url.trim(),
          localImageUri: localImageUri || '',
          reshell: String(reshell),
          withBox: String(withBox),
          from,
        },
      });
    } catch (error) {
      Alert.alert(
        'Unable to update item',
        error instanceof Error ? error.message : 'Please try again.',
      );
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/images/background3.jpg')}
      resizeMode="cover"
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Edit Item</Text>

        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          style={styles.input}
          accessibilityLabel="Name"
          value={name}
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor="#aaa"
          editable={false}
        />
        {otherName && (
          <>
            <Text style={styles.inputLabel}>Other Name</Text>
            <TextInput
              style={styles.input}
              accessibilityLabel="Other Name"
              value={otherName}
              onChangeText={setOtherName}
              placeholder="Other Name"
              placeholderTextColor="#aaa"
            />
          </>
        )}
        <Text style={styles.inputLabel}>Model</Text>
        <TextInput
          style={styles.input}
          accessibilityLabel="Model"
          value={model}
          onChangeText={setModel}
          placeholder="Model"
          placeholderTextColor="#aaa"
        />
        <Text style={styles.inputLabel}>Color</Text>
        <TextInput
          style={styles.input}
          accessibilityLabel="Color"
          value={color}
          onChangeText={setColor}
          placeholder="Color"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.inputLabel}>Edition</Text>
        <TextInput
          style={styles.input}
          accessibilityLabel="Edition"
          value={edition}
          onChangeText={setEdition}
          placeholder="Edition"
          placeholderTextColor="#aaa"
        />
        <Text style={styles.inputLabel}>Manufacturer</Text>
        <TextInput
          style={styles.input}
          accessibilityLabel="Manufacturer"
          value={manufacturer}
          onChangeText={setManufacturer}
          placeholder="Manufacturer"
          placeholderTextColor="#aaa"
        />
        {params.type !== 'Controller' && (
          <>
            <Text style={styles.inputLabel}>Storage</Text>
            <TextInput
              style={styles.input}
              accessibilityLabel="Storage"
              value={storage}
              onChangeText={setStorage}
              placeholder="Storage"
              placeholderTextColor="#aaa"
            />
          </>
        )}
        {params.type === 'Controller' && (
          <>
            <Text style={styles.inputLabel}>Can be used on</Text>
            <TextInput
              style={styles.input}
              accessibilityLabel="Can be used on"
              value={canBeUsedOn}
              onChangeText={setCanBeUsedOn}
              placeholder="Can be used on"
              placeholderTextColor="#aaa"
            />
          </>
        )}
        <Text style={styles.inputLabel}>Image URL</Text>
        <TextInput
          style={styles.input}
          accessibilityLabel="Image URL"
          value={url}
          onChangeText={setUrl}
          placeholder="Image URL"
          placeholderTextColor="#aaa"
        />
        <Text style={styles.label}>Local Image</Text>
        <Pressable
          style={styles.dropdownButtonStyle}
          onPress={() => pickImage(setLocalImageUri)}
        >
          <Text style={styles.dropdownButtonTxtStyle}>
            {localImageUri ? 'Change photo' : 'Pick photo from phone'}
          </Text>
        </Pressable>
        {localImageUri && (
          <Image
            source={{ uri: localImageUri }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 8,
              marginBottom: 8,
            }}
          />
        )}

        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          style={[styles.input, styles.description]}
          accessibilityLabel="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
          placeholderTextColor="#aaa"
          multiline
        />
        <View style={styles.priceContainer}>
          <View style={styles.priceField}>
            <Text style={styles.inputLabel}>Price</Text>
            <TextInput
              style={styles.inputStylePrice}
              accessibilityLabel="Price"
              value={price}
              onChangeText={setPrice}
              placeholder="Price"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.priceField}>
            <Text style={styles.inputLabel}>Currency</Text>
            <TextInput
              style={styles.inputStylePrice}
              accessibilityLabel="Currency"
              value={currency}
              onChangeText={setCurrency}
              placeholder="Currency"
              placeholderTextColor="#aaa"
            />
          </View>
        </View>
        <Text style={styles.inputLabel}>Condition</Text>
        <TextInput
          style={styles.input}
          accessibilityLabel="Condition"
          value={condition}
          onChangeText={setCondition}
          placeholder="Condition"
          placeholderTextColor="#aaa"
        />

        <BooleanField label="Reshelled" value={reshell} onChange={setReshell} />
        <BooleanField label="With box" value={withBox} onChange={setWithBox} />

        <View style={[styles.buttonContainer]}>
          <Pressable style={styles.saveButton} onPress={saveChanges}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

function BooleanField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.booleanRow}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.options}>
        {[true, false].map((option) => (
          <Pressable
            key={String(option)}
            style={[styles.option, value === option && styles.selectedOption]}
            onPress={() => onChange(option)}
          >
            <Text style={styles.optionText}>{option ? 'Yes' : 'No'}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const EditItem = () => {
  const params = useLocalSearchParams();

  return <EditItemForm key={String(params.id)} />;
};

export default EditItem;

const styles = StyleSheet.create({
  background: { flex: 1 },
  content: {
    flexGrow: 1,
    padding: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  title: {
    color: 'white',
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 18,
    marginTop: 40,
  },
  input: {
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    borderColor: 'rgba(255, 255, 255, 0.45)',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginBottom: 9,
    fontSize: 16,
  },
  description: { minHeight: 90, textAlignVertical: 'top' },
  booleanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  label: { color: 'white', fontSize: 16, fontWeight: '600' },
  inputLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  options: { flexDirection: 'row', gap: 8 },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.45)',
  },
  selectedOption: { backgroundColor: '#0a7ea4' },
  optionText: { color: 'white', fontWeight: '600' },

  buttonContainer: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#0a7ea4',
    color: 'black',
    padding: 14,
    borderRadius: 8,
    marginTop: 18,
  },
  cancelButton: {
    backgroundColor: 'rgba(192, 2, 2, 0.24)',
    borderColor: 'rgba(255, 39, 39, 0.5)',
    borderWidth: 1,
    padding: 14,
    borderRadius: 8,
    marginTop: 9,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
  },
  dropdownButtonStyle: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 17,
    fontFamily: 'DMSans_700Bold',
    color: 'white',
  },

  // price input container style
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  priceField: { width: '49%' },
  inputStylePrice: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 8,
    color: 'white',
  },
});
