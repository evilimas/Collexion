import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  Button,
} from 'react-native';
import type { CollectionItem } from '@/data/newData';
import React, { useMemo, useState } from 'react';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { collection } from '@/data/newData';
import SelectDropdown from 'react-native-select-dropdown';

const AddItem = () => {
  const consoleOptions = [
    { title: 'Xbox Series S|X', value: 'Xbox Series S|X' },
    { title: 'PlayStation 5', value: 'PlayStation 5' },
    { title: 'Nintendo Switch', value: 'Nintendo Switch' },
    { title: 'Xbox One', value: 'Xbox One' },
    { title: 'PlayStation 4', value: 'PlayStation 4' },
    { title: 'Xbox 360', value: 'Xbox 360' },
  ];
  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Console',
        value: 'console',
      },
      {
        id: '2',
        label: 'Handheld',
        value: 'handheld',
      },
      {
        id: '3',
        label: 'Controller',
        value: 'controller',
      },
    ],
    [],
  );
  const radioButtonsCondition: RadioButtonProps[] = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Mint',
        value: 'mint',
      },
      {
        id: '2',
        label: 'Like New',
        value: 'like_new',
      },
      {
        id: '3',
        label: 'Good',
        value: 'good',
      },
      {
        id: '4',
        label: 'Fair',
        value: 'fair',
      },
    ],
    [],
  );
  const radioButtonsReshell: RadioButtonProps[] = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Yes',
        value: 'true',
      },
      {
        id: '2',
        label: 'No',
        value: 'false',
      },
    ],
    [],
  );

  const [collectionItem, setCollectionItem] = useState<CollectionItem>();
  const [type, setType] = useState<string>('1');
  const [condition, setCondition] = useState<string>('1');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [edition, setEdition] = useState<string>('');
  const [consoleName, setConsoleName] = useState<string>('');
  const [manufacturer, setManufacturer] = useState<string>('');
  const [reshell, setReshell] = useState<string>('2');

  const handleAddItem = () => {
    setCollectionItem({
      id: collection.length + 1 + '',
      type: type === '1' ? 'Console' : type === '2' ? 'Handheld' : 'Controller',
      condition:
        condition === '1'
          ? 'Mint'
          : condition === '2'
            ? 'Like New'
            : condition === '3'
              ? 'Good'
              : 'Fair',
      name,
      description,
      model,
      color,
      edition,
      consoleName,
      manufacturer,
      reshell: reshell === '1' ? true : false,
    });
    console.log(collectionItem);
    if (collectionItem) {
      collection.push(collectionItem);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/background3.jpg')}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.overlay}>
          <Text style={styles.text}>Add item to collection</Text>
          <View style={{ padding: 14 }}>
            <View>
              <RadioGroup
                layout="row"
                labelStyle={{
                  color: 'white',
                  fontSize: 17,
                  fontWeight: 'bold',
                }}
                radioButtons={radioButtons}
                onPress={setType}
                selectedId={type}
              />
            </View>
            <TextInput
              placeholder="* Name"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              style={styles.inputStyle}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              placeholder="Description"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              style={styles.inputStyle}
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              placeholder="Model"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              style={styles.inputStyle}
              value={model}
              onChangeText={setModel}
            />
            <TextInput
              placeholder="* Color"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              style={styles.inputStyle}
              value={color}
              onChangeText={setColor}
            />
            <View
              style={{
                borderColor: 'rgba(255, 255, 255, 0.5)',
                borderWidth: 1,
                borderRadius: 8,
                marginBottom: 10,
              }}
            >
              <RadioGroup
                layout="row"
                radioButtons={radioButtonsCondition}
                onPress={setCondition}
                selectedId={condition}
                labelStyle={{
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}
              />
            </View>
            <TextInput
              placeholder="* Edition"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              style={styles.inputStyle}
              value={edition}
              onChangeText={setEdition}
            />
            <TextInput
              placeholder="Console "
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              style={styles.inputStyle}
              value={consoleName}
              onChangeText={setConsoleName}
            />
            <TextInput
              placeholder="Manufacturer "
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              style={styles.inputStyle}
              value={manufacturer}
              onChangeText={setManufacturer}
            />
            <View
              style={{
                borderColor: 'rgba(255, 255, 255, 0.5)',
                borderWidth: 1,
                borderRadius: 8,
                marginBottom: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginBottom: 6,
                  marginLeft: 10,
                }}
              >
                Reshelled?
              </Text>
              <RadioGroup
                layout="row"
                radioButtons={radioButtonsReshell}
                onPress={setReshell}
                selectedId={reshell}
                labelStyle={{
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}
              />
            </View>
            <Button title="Add Item" onPress={handleAddItem} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default AddItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
  },

  image: {
    width: '100%',
    height: '100%',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 4 },
    textShadowRadius: 6,
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
  inputStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    marginBottom: 10,
  },
});
