import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';

const AddItem = () => {
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

  const [type, setType] = useState<string>('1');
  const [condition, setCondition] = useState<string>('1');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');

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
              value={description}
              onChangeText={setDescription}
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
