import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import type { CollectionItem } from '@/data/newData';
import React, { useMemo, useState } from 'react';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { collection } from '@/data/newData';

const AddItem = () => {
  const consoleOptions: string[] = [
    'PlayStation 5',
    'PlayStation 4',
    'PlayStation 3',
    'PlayStation 2',
    'Xbox Series S|X',
    'Xbox One',
    'Xbox 360',
    'Xbox Original(OG)',
  ];
  const handheldOptions: string[] = [
    'Nintendo Switch',
    'PlayStation Vita(PSV)',
    'PlayStation Portable(PSP)',
    'Nintendo 3DS',
    'Nintendo DS',
    'Game Boy Advance(GBA)',
    'Game Boy',
  ];
  const controllerOptions: string[] = [
    'DualSense',
    'DualShock 4',
    'DualShock 3',
    'DualShock 2',
    'Xbox Series S|X Controller',
    'Xbox One Controller',
    'Xbox 360 Controller',
    'Xbox Original(OG) Controller',
    'Nintendo Switch Pro Controller',
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

  const [type, setType] = useState<string>('1');
  const [condition, setCondition] = useState<string>('1');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [edition, setEdition] = useState<string>('');
  const [consoleName, setConsoleName] = useState<string>('');
  const [handheldName, setHandheldName] = useState<string>('');
  const [controllerName, setControllerName] = useState<string>('');
  const [forConsole, setForConsole] = useState<string>('');
  const [manufacturer, setManufacturer] = useState<string>('');
  const [reshell, setReshell] = useState<string>('2');
  const [isConsoleSelectOpen, setIsConsoleSelectOpen] =
    useState<boolean>(false);

  const handleAddItem = () => {
    const newItem: CollectionItem = {
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
      name: consoleName || handheldName || controllerName,
      description,
      model,
      color,
      edition,
      forConsole,
      manufacturer,
      reshell: reshell === '1' ? true : false,
      picture: picture,
    };

    collection.push(newItem);
  };

  const picture = useMemo(() => {
    if (type === '1') {
      const consoleItem = collection.find((item) => item.name === consoleName);
      return consoleItem?.picture;
    } else if (type === '2') {
      const handheldItem = collection.find(
        (item) => item.name === handheldName,
      );
      return handheldItem?.picture;
    } else if (type === '3') {
      const controllerItem = collection.find(
        (item) => item.name === controllerName,
      );
      return controllerItem?.picture;
    }
  }, [type, consoleName, handheldName, controllerName, collection]);

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
            {type === '1' && (
              <Pressable
                style={styles.dropdownButtonStyle}
                onPress={() => setIsConsoleSelectOpen(true)}
              >
                <Text style={styles.dropdownButtonTxtStyle}>
                  {consoleName || 'Select console'}
                </Text>
              </Pressable>
            )}
            {type === '2' && (
              <Pressable
                style={styles.dropdownButtonStyle}
                onPress={() => setIsConsoleSelectOpen(true)}
              >
                <Text style={styles.dropdownButtonTxtStyle}>
                  {handheldName || 'Select handheld'}
                </Text>
              </Pressable>
            )}
            {type === '3' && (
              <Pressable
                style={styles.dropdownButtonStyle}
                onPress={() => setIsConsoleSelectOpen(true)}
              >
                <Text style={styles.dropdownButtonTxtStyle}>
                  {controllerName || 'Select controller'}
                </Text>
              </Pressable>
            )}
            <Modal
              visible={isConsoleSelectOpen}
              transparent
              animationType="fade"
              onRequestClose={() => setIsConsoleSelectOpen(false)}
            >
              <Pressable
                style={styles.modalBackdrop}
                onPress={() => setIsConsoleSelectOpen(false)}
              >
                <Pressable style={styles.dropdownMenuStyle}>
                  {type === '1' && (
                    <ScrollView>
                      {consoleOptions.map((item) => (
                        <Pressable
                          key={item}
                          style={styles.dropdownItemStyle}
                          onPress={() => {
                            setConsoleName(item);
                            setIsConsoleSelectOpen(false);
                          }}
                        >
                          <Text style={styles.dropdownItemTxtStyle}>
                            {item}
                          </Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  )}
                  {type === '3' && (
                    <ScrollView>
                      {controllerOptions.map((item) => (
                        <Pressable
                          key={item}
                          style={styles.dropdownItemStyle}
                          onPress={() => {
                            setControllerName(item);
                            setIsConsoleSelectOpen(false);
                          }}
                        >
                          <Text style={styles.dropdownItemTxtStyle}>
                            {item}
                          </Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  )}
                  {type === '2' && (
                    <ScrollView>
                      {handheldOptions.map((item) => (
                        <Pressable
                          key={item}
                          style={styles.dropdownItemStyle}
                          onPress={() => {
                            setHandheldName(item);
                            setIsConsoleSelectOpen(false);
                          }}
                        >
                          <Text style={styles.dropdownItemTxtStyle}>
                            {item}
                          </Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  )}
                </Pressable>
              </Pressable>
            </Modal>
            {/* <TextInput
              placeholder="* Name"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              style={styles.inputStyle}
              value={name}
              onChangeText={setName}
            /> */}
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
            {type === '3' && (
              <TextInput
                placeholder="For What Console "
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                style={styles.inputStyle}
                value={consoleName}
                onChangeText={setConsoleName}
              />
            )}
            <TextInput
              placeholder="Manufacturer "
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              style={styles.inputStyle}
              value={manufacturer}
              onChangeText={setManufacturer}
            />
            <TextInput
              placeholder="Description"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              style={styles.descriptionInputStyle}
              multiline={true}
              value={description}
              onChangeText={setDescription}
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
          </View>
        </View>
        <Pressable onPress={handleAddItem} style={styles.button}>
          <Text style={styles.buttonText}>Add Item</Text>
        </Pressable>
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
  descriptionInputStyle: {
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
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: 'rgb(9, 0, 141)',
    marginBottom: 10,
    padding: 14,
    borderRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // dropdown styles
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
    marginBottom: 10,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  dropdownMenuStyle: {
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    width: '90%',
    maxHeight: 320,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
