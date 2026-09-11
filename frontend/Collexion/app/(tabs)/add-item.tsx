import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Modal,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import { useMemo, useState } from 'react';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { auth, db } from '@/lib/firebase';
import { getItemPicture } from '@/lib/item-picture';
import {
  addDoc,
  collection as firestoreCollection,
  serverTimestamp,
} from 'firebase/firestore';

const AddItem = () => {
  const consoleOptions: string[] = [
    'PlayStation 5',
    'PlayStation 4',
    'PlayStation 3',
    'PlayStation 2',
    'PlayStation 1',
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
    'Game Boy Color',
    'Game Gear',
    'Neo Geo Pocket',
    'Neo Geo Pocket Color',
  ];
  const controllerOptions: string[] = [
    'DualSense(PS5)',
    'DualShock 4(PS4)',
    'Sixaxis/DualShock 3(PS3)',
    'DualShock 2(PS2)',
    'Xbox Series S|X Controller',
    'Xbox One Controller',
    'Xbox 360 Controller',
    'Xbox Original(OG) Controller',
    'Nintendo Switch Controller',
  ];

  const manufacturerOptions: string[] = [
    'Sony',
    'Microsoft',
    'Nintendo',
    'Sega',
    'SNK',
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
        id: '0',
        label: 'Unopened',
        value: 'unopened',
        containerStyle: { width: 120 },
      },
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Mint',
        value: 'mint',
        containerStyle: { width: 80 },
      },
      {
        id: '2',
        label: 'Like New',
        value: 'like_new',
        containerStyle: { width: 110 },
      },
      {
        id: '3',
        label: 'Good',
        value: 'good',
        containerStyle: { width: 119 },
      },
      {
        id: '4',
        label: 'Fair',
        value: 'fair',
        containerStyle: { width: 80 },
      },
      {
        id: '5',
        label: 'Poor',
        value: 'poor',
        containerStyle: { width: 100 },
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
  const radioButtonsWithBox: RadioButtonProps[] = useMemo(
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
  // const [name, setName] = useState<string>('');
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
  const [url, setUrl] = useState<string>('');
  const [withBox, setWithBox] = useState<string>('2');
  const [isConsoleSelectOpen, setIsConsoleSelectOpen] =
    useState<boolean>(false);
  const [isManufacturerSelectOpen, setIsManufacturerSelectOpen] =
    useState<boolean>(false);

  const handleAddItem = async () => {
    const name =
      type === '1' ? consoleName : type === '2' ? handheldName : controllerName;
    const user = auth.currentUser;

    if (!user) return Alert.alert('Sign in required', 'Please sign in first.');
    if (!name || !color.trim()) {
      return Alert.alert(
        'Missing information',
        'Select an item and enter its color.',
      );
    }

    const itemType =
      type === '1' ? 'Console' : type === '2' ? 'Handheld' : 'Controller';
    const itemCondition =
      condition === '1'
        ? 'Mint'
        : condition === '2'
          ? 'Like New'
          : condition === '3'
            ? 'Good'
            : 'Fair';

    try {
      await addDoc(firestoreCollection(db, 'collection_items'), {
        userId: user.uid,
        type: itemType,
        name,
        model: model.trim(),
        color: color.trim(),
        condition: itemCondition,
        edition: edition.trim(),
        forConsole: forConsole.trim(),
        manufacturer: manufacturer.trim(),
        description: description.trim(),
        reshell: reshell === '1',
        picture: picture ?? null,
        url: url.trim(),
        withBox: withBox === '1',
        createdAt: serverTimestamp(),
      });
      Alert.alert('Saved', `${name} was added to your collection.`);
    } catch (error) {
      Alert.alert(
        'Unable to save item',
        error instanceof Error ? error.message : 'Please try again.',
      );
    }
  };

  const picture = getItemPicture(
    type === '1' ? 'Console' : type === '2' ? 'Handheld' : 'Controller',
    type === '1' ? consoleName : type === '2' ? handheldName : controllerName,
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/background3.jpg')}
        resizeMode="cover"
        style={styles.image}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.overlay}>
            <Text style={styles.text}>Add item to collection</Text>
            <View style={{ padding: 10 }}>
              <View>
                <RadioGroup
                  layout="row"
                  labelStyle={{
                    color: 'white',
                    fontSize: 16,
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
                placeholder="Model (e.g. Slim, Pro, OLED)"
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
                  display: 'flex',
                  flexDirection: 'column',
                  paddingVertical: 3,
                }}
              >
                <RadioGroup
                  layout="row"
                  containerStyle={{ marginBottom: 1, width: '90%' }}
                  radioButtons={radioButtonsCondition.slice(0, 3)}
                  onPress={setCondition}
                  selectedId={condition}
                  labelStyle={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginLeft: 7,
                  }}
                />
                <RadioGroup
                  layout="row"
                  containerStyle={{ width: '90%' }}
                  radioButtons={radioButtonsCondition.slice(3)}
                  onPress={setCondition}
                  selectedId={condition}
                  labelStyle={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginLeft: 7,
                  }}
                />
              </View>
              <TextInput
                placeholder="* Edition (e.g. Standard, Limited, Special)"
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
                  value={forConsole}
                  onChangeText={setForConsole}
                />
              )}
              <Pressable
                style={styles.dropdownButtonStyle}
                onPress={() => setIsManufacturerSelectOpen(true)}
              >
                <Text style={styles.dropdownButtonTxtStyle}>
                  {manufacturer || 'Select manufacturer'}
                </Text>
              </Pressable>
              <Modal
                visible={isManufacturerSelectOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setIsManufacturerSelectOpen(false)}
              >
                <Pressable
                  style={styles.modalBackdrop}
                  onPress={() => setIsManufacturerSelectOpen(false)}
                >
                  <Pressable style={styles.dropdownMenuStyle}>
                    <ScrollView>
                      {manufacturerOptions.map((item) => (
                        <Pressable
                          key={item}
                          style={styles.dropdownItemStyle}
                          onPress={() => {
                            setManufacturer(item);
                            setIsManufacturerSelectOpen(false);
                          }}
                        >
                          <Text style={styles.dropdownItemTxtStyle}>
                            {item}
                          </Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  </Pressable>
                </Pressable>
              </Modal>

              <TextInput
                placeholder="Description"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                style={styles.descriptionInputStyle}
                multiline={true}
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
              />
              <TextInput
                placeholder="Image URL"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                style={styles.inputStyle}
                value={url}
                onChangeText={setUrl}
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
                    fontSize: 15,
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
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginBottom: 6,
                    marginLeft: 10,
                  }}
                >
                  With box?
                </Text>
                <RadioGroup
                  layout="row"
                  radioButtons={radioButtonsWithBox}
                  onPress={setWithBox}
                  selectedId={withBox}
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
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default AddItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    // width: '100%',
    // height: '100%',
    paddingHorizontal: 10,
  },

  image: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    // paddingBottom: 14,
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
    fontSize: 17,
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
    backgroundColor: 'rgb(7, 0, 105)',
    marginBottom: 10,
    padding: 14,
    borderRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    width: '90%',
    alignSelf: 'center',
    // marginTop: 10,
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
