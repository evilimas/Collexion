import {
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { updateItem } from '@/hooks/use-collection-items';

const EditItemForm = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const itemId = params.id as string;
  const from = (params.from as string) || '/consoles';

  const [name, setName] = useState((params.name as string) || '');
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
  const [forConsole, setForConsole] = useState(
    (params.forConsole as string) || '',
  );
  const [description, setDescription] = useState(
    (params.description as string) || '',
  );
  const [url, setUrl] = useState((params.url as string) || '');
  const [reshell, setReshell] = useState(params.reshell === 'true');
  const [withBox, setWithBox] = useState(params.withBox === 'true');

  const saveChanges = async () => {
    if (!name.trim() || !color.trim()) {
      Alert.alert('Missing information', 'Name and color are required.');
      return;
    }

    try {
      await updateItem(itemId, {
        type: params.type,
        name: name.trim(),
        model: model.trim(),
        color: color.trim(),
        condition: condition.trim(),
        edition: edition.trim(),
        manufacturer: manufacturer.trim(),
        storage: storage.trim(),
        forConsole: forConsole.trim(),
        description: description.trim(),
        url: url.trim(),
        reshell,
        withBox,
      });
      router.replace({
        pathname: '/console-details',
        params: {
          id: itemId,
          type: params.type,
          name: name.trim(),
          model: model.trim(),
          color: color.trim(),
          condition: condition.trim(),
          edition: edition.trim(),
          manufacturer: manufacturer.trim(),
          storage: storage.trim(),
          forConsole: forConsole.trim(),
          description: description.trim(),
          url: url.trim(),
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

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          value={model}
          onChangeText={setModel}
          placeholder="Model"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          value={color}
          onChangeText={setColor}
          placeholder="Color"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          value={condition}
          onChangeText={setCondition}
          placeholder="Condition"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          value={edition}
          onChangeText={setEdition}
          placeholder="Edition"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          value={manufacturer}
          onChangeText={setManufacturer}
          placeholder="Manufacturer"
          placeholderTextColor="#aaa"
        />
        {params.type !== 'Controller' && (
          <TextInput
            style={styles.input}
            value={storage}
            onChangeText={setStorage}
            placeholder="Storage"
            placeholderTextColor="#aaa"
          />
        )}
        {params.type === 'Controller' && (
          <TextInput
            style={styles.input}
            value={forConsole}
            onChangeText={setForConsole}
            placeholder="For console"
            placeholderTextColor="#aaa"
          />
        )}
        <TextInput
          style={styles.input}
          value={url}
          onChangeText={setUrl}
          placeholder="Image URL"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={[styles.input, styles.description]}
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
          placeholderTextColor="#aaa"
          multiline
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
  options: { flexDirection: 'row', gap: 8 },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.45)',
  },
  selectedOption: { backgroundColor: 'rgb(7, 0, 105)' },
  optionText: { color: 'white', fontWeight: '600' },

  buttonContainer: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: 'rgb(7, 0, 105)',
    padding: 14,
    borderRadius: 8,
    marginTop: 18,
  },
  cancelButton: {
    backgroundColor: 'rgba(90, 90, 90, 0.6)',
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
});
