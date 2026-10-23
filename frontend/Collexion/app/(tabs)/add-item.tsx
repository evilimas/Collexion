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
import AutocompleteInput from '@/components/AutocompleteInput';
import {
  getModelSuggestions,
  getEditionSuggestions,
} from '@/lib/item-suggestions';
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
    'Nintendo Wii',
    'Nintendo WiiU',
    'Nintendo GameCube',
    'Xbox Series S|X',
    'Xbox One',
    'Xbox 360',
    'Xbox Original(OG)',
    'Other Console (Specify)',
  ];
  const handheldOptions: string[] = [
    'Nintendo Switch',
    'PlayStation Vita(PSV)',
    'PlayStation Portable(PSP)',
    'Nintendo 3DS',
    'Nintendo DS',
    'Game Boy Advance(GBA)',
    'Game Boy',
    'Game Boy Color(GBC)',
    'Game Gear',
    'Neo Geo Pocket',
    'Neo Geo Pocket Color',
    'Other Handheld (Specify)',
  ];
  const controllerOptions: string[] = [
    'DualSense(PS5)',
    'DualShock 4(PS4)',
    'Sixaxis/DualShock 3(PS3)',
    'DualShock 2(PS2)',
    'PlayStation 1 Controller(PS1)',
    'Xbox Series S|X Controller',
    'Xbox One Controller',
    'Xbox 360 Controller',
    'Xbox Original(OG) Controller',
    'Nintendo Wii Controller',
    'Nintendo WiiU Controller',
    'Nintendo Switch Controller',
    'Other Controller (Specify)',
  ];

  const manufacturerOptions: string[] = [
    'Sony',
    'Microsoft',
    'Nintendo',
    'Sega',
    'SNK',
    'Other',
  ];

  // const radioButtons: RadioButtonProps[] = useMemo(
  //   () => [
  //     {
  //       id: '1', // acts as primary key, should be unique and non-empty string
  //       label: 'Console',
  //       value: 'console',
  //       color: '#42d3d3', // selected inner circle
  //       borderColor: '#b0b3b2', // outer border

  //       borderSize: 2,
  //     },
  //     {
  //       id: '2',
  //       label: 'Handheld',
  //       value: 'handheld',
  //       color: '#42d3d3', // selected inner circle
  //       borderColor: '#b0b3b2', // outer border
  //       borderSize: 2,
  //     },
  //     {
  //       id: '3',
  //       label: 'Controller',
  //       value: 'controller',
  //       color: '#42d3d3', // selected inner circle
  //       borderColor: '#b0b3b2', // outer border
  //       borderSize: 2,
  //     },
  //   ],
  //   [],
  // );
  const typeOptions: { id: string; label: string }[] = [
    { id: '1', label: 'Console' },
    { id: '2', label: 'Handheld' },
    { id: '3', label: 'Controller' },
  ];

  const conditionOptions: { id: string; label: string }[] = [
    { id: '0', label: 'Unopened' },
    { id: '1', label: 'Mint' },
    { id: '2', label: 'Like New' },
    { id: '3', label: 'Good' },
    { id: '4', label: 'Fair' },
    { id: '5', label: 'Poor' },
  ];
  // const radioButtonsCondition: RadioButtonProps[] = useMemo(
  //   () => [
  //     {
  //       id: '0',
  //       label: 'Unopened',
  //       value: 'unopened',
  //       color: '#42d3d3', // selected inner circle
  //       borderColor: '#b0b3b2', // outer border
  //       borderSize: 2,
  //       containerStyle: { width: 120 },
  //     },
  //     {
  //       id: '1', // acts as primary key, should be unique and non-empty string
  //       label: 'Mint',
  //       value: 'mint',
  //       color: '#42d3d3', // selected inner circle
  //       borderColor: '#b0b3b2', // outer border
  //       borderSize: 2,
  //       containerStyle: { width: 80 },
  //     },
  //     {
  //       id: '2',
  //       label: 'Like New',
  //       color: '#42d3d3', // selected inner circle
  //       borderColor: '#b0b3b2', // outer border
  //       borderSize: 2,
  //       containerStyle: { width: 110 },
  //     },
  //     {
  //       id: '3',
  //       label: 'Good',
  //       value: 'good',
  //       color: '#42d3d3', // selected inner circle
  //       borderColor: '#b0b3b2', // outer border
  //       borderSize: 2,
  //       containerStyle: { width: 120 },
  //     },
  //     {
  //       id: '4',
  //       label: 'Fair',
  //       value: 'fair',
  //       color: '#42d3d3', // selected inner circle
  //       borderColor: '#b0b3b2', // outer border
  //       borderSize: 2,
  //       containerStyle: { width: 80 },
  //     },
  //     {
  //       id: '5',
  //       label: 'Poor',
  //       value: 'poor',
  //       color: '#42d3d3', // selected inner circle
  //       borderColor: '#b0b3b2', // outer border
  //       borderSize: 2,
  //       containerStyle: { width: 100 },
  //     },
  //   ],
  //   [],
  // );

  const radioButtonsReshell: { id: string; label: string }[] = [
    { id: '1', label: 'Yes' },
    { id: '2', label: 'No' },
  ];

  const radioButtonsWithBox: { id: string; label: string }[] = [
    { id: '1', label: 'Yes' },
    { id: '2', label: 'No' },
  ];
  // const radioButtonsReshell: RadioButtonProps[] = useMemo(
  //   () => [
  //     {
  //       id: '1', // acts as primary key, should be unique and non-empty string
  //       label: 'Yes',
  //       value: 'true',
  //       color: '#42d3d3', // selected inner circle
  //       borderColor: '#b0b3b2', // outer border
  //       borderSize: 2,
  //       selectedBorderColor: '#42d3d3', // selected outer border
  //     },
  //     {
  //       id: '2',
  //       label: 'No',
  //       value: 'false',
  //       color: '#42d3d3', // selected inner circle
  //       borderColor: '#b0b3b2', // outer border
  //       borderSize: 2,
  //       selectedBorderColor: '#42d3d3', // selected outer border
  //     },
  //   ],
  //   [],
  // );
  // const radioButtonsWithBox: RadioButtonProps[] = useMemo(
  //   () => [
  //     {
  //       id: '1', // acts as primary key, should be unique and non-empty string
  //       label: 'Yes',
  //       value: 'true',
  //       color: '#42d3d3', // selected inner circle
  //       borderColor: '#b0b3b2', // outer border
  //       borderSize: 2,
  //       selectedBorderColor: '#42d3d3', // selected outer border
  //     },
  //     {
  //       id: '2',
  //       label: 'No',
  //       value: 'false',
  //       color: '#42d3d3', // selected inner circle
  //       borderColor: '#b0b3b2', // outer border
  //       borderSize: 2,
  //       selectedBorderColor: '#42d3d3', // selected outer border
  //     },
  //   ],
  //   [],
  // );

  const autofillMap: Record<
    string,
    { manufacturer: string; forConsole?: string }
  > = {
    // Controllers
    'DualSense(PS5)': { manufacturer: 'Sony', forConsole: 'PS5' },
    'DualShock 4(PS4)': { manufacturer: 'Sony', forConsole: 'PS4' },
    'Sixaxis/DualShock 3(PS3)': { manufacturer: 'Sony', forConsole: 'PS3' },
    'DualShock 2(PS2)': { manufacturer: 'Sony', forConsole: 'PS2' },
    'Xbox Series S|X Controller': {
      manufacturer: 'Microsoft',
      forConsole: 'Xbox Series and Xbox One',
    },
    'Xbox One Controller': {
      manufacturer: 'Microsoft',
      forConsole: 'Xbox One and Xbox Series',
    },
    'Xbox 360 Controller': {
      manufacturer: 'Microsoft',
      forConsole: 'Xbox 360',
    },
    'Xbox Original(OG) Controller': {
      manufacturer: 'Microsoft',
      forConsole: 'Xbox Original',
    },
    'Nintendo Switch Controller': {
      manufacturer: 'Nintendo',
      forConsole: 'Nintendo Switch',
    },
    'PlayStation 1 Controller(PS1)': {
      manufacturer: 'Sony',
      forConsole: 'PS1 and PS2',
    },
    'Nintendo Wii Controller': {
      manufacturer: 'Nintendo',
      forConsole: 'Nintendo Wii and Wii U',
    },
    'Nintendo WiiU Controller': {
      manufacturer: 'Nintendo',
      forConsole: 'Nintendo Wii U',
    },
    // handhelds
    'PlayStation Vita(PSV)': {
      manufacturer: 'Sony',
    },
    'PlayStation Portable(PSP)': {
      manufacturer: 'Sony',
    },
    'Nintendo DS': {
      manufacturer: 'Nintendo',
    },
    'Nintendo 3DS': {
      manufacturer: 'Nintendo',
    },
    'Nintendo Switch': {
      manufacturer: 'Nintendo',
    },
    'Game Boy': {
      manufacturer: 'Nintendo',
    },
    'Game Boy Advance(GBA)': {
      manufacturer: 'Nintendo',
    },
    'Game Boy Color(GBC)': {
      manufacturer: 'Nintendo',
    },
    'Game Gear': {
      manufacturer: 'Sega',
    },
    'Neo Geo Pocket': {
      manufacturer: 'SNK',
    },
    'Neo Geo Pocket Color': {
      manufacturer: 'SNK',
    },
    // consoles
    'PlayStation 5': {
      manufacturer: 'Sony',
    },
    'PlayStation 4': {
      manufacturer: 'Sony',
    },
    'PlayStation 3': {
      manufacturer: 'Sony',
    },
    'PlayStation 2': {
      manufacturer: 'Sony',
    },
    'PlayStation 1': {
      manufacturer: 'Sony',
    },
    'Xbox Series S|X': {
      manufacturer: 'Microsoft',
    },
    'Xbox One': {
      manufacturer: 'Microsoft',
    },
    'Xbox 360': {
      manufacturer: 'Microsoft',
    },
    'Xbox Original(OG)': {
      manufacturer: 'Microsoft',
    },
    'Nintendo GameCube': {
      manufacturer: 'Nintendo',
    },
    'Nintendo Wii': {
      manufacturer: 'Nintendo',
    },
    'Nintendo WiiU': {
      manufacturer: 'Nintendo',
    },
  };

  const [type, setType] = useState<string>('1');
  const [condition, setCondition] = useState<string>('1');
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
  const [storage, setStorage] = useState<string>('');
  const [isConsoleSelectOpen, setIsConsoleSelectOpen] =
    useState<boolean>(false);
  const [isManufacturerSelectOpen, setIsManufacturerSelectOpen] =
    useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const selectedName =
    type === '1' ? consoleName : type === '2' ? handheldName : controllerName;

  const handleAddItem = async () => {
    setLoading(true);
    setSaving(true);
    const name =
      type === '1' ? consoleName : type === '2' ? handheldName : controllerName;
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Sign in required', 'Please sign in first.');
      setSaving(false);
      return;
    }
    if (
      !name ||
      !model.trim() ||
      !color.trim() ||
      !edition.trim() ||
      !manufacturer.trim() ||
      !condition.trim()
    ) {
      setTimeout(() => setSaving(false), 2500);
      return Alert.alert(
        'Missing information',
        // 'Select an item and enter its information .',
        'All fields with * are required.',
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
        ...(itemType === 'Controller' ? { forConsole: forConsole.trim() } : {}),
        // storage: storage.trim(),
        ...(itemType === 'Console' || itemType === 'Handheld'
          ? { storage: storage.trim() }
          : {}),
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
    } finally {
      setLoading(false);
      setTimeout(() => setSaving(false), 2500);
      resetInputs();
    }
  };

  const resetInputs = () => {
    setType('1'); // Reset type to default or initial value
    setConsoleName(''); // Reset console name
    setHandheldName(''); // Reset handheld name
    setControllerName(''); // Reset controller name
    setColor(''); // Reset color
    setModel(''); // Reset model
    setEdition(''); // Reset edition
    setUrl(''); // Reset URL
    setCondition('1'); // Reset condition to default
    setForConsole(''); // Reset for console
    setStorage(''); // Reset storage
    setManufacturer(''); // Reset manufacturer
    setDescription(''); // Reset description
    setReshell('2'); // Reset reshell to default
    setWithBox('2'); // Reset with box to default
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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.overlay}>
            <Text style={styles.text}>Add item to collection</Text>
            <View style={{ padding: 10 }}>
              <View style={styles.typeOptions}>
                {typeOptions.map((option) => (
                  <Pressable
                    key={option.id}
                    onPress={() => setType(option.id)}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: type === option.id }}
                    style={[
                      styles.typeOption,
                      type === option.id && styles.typeOptionSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.typeOptionText,
                        type === option.id && styles.typeOptionTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
              {/* <View>
                <RadioGroup
                  layout="row"
                  labelStyle={{
                    color: 'white',
                    fontSize: 17,
                    fontWeight: 'bold',
                    marginBottom: 1,
                  }}
                  radioButtons={radioButtons}
                  onPress={setType}
                  selectedId={type}
                />
              </View> */}

              {type === '1' && (
                <>
                  <Text style={styles.label}>Select Console*</Text>
                  <Pressable
                    style={styles.dropdownButtonStyle}
                    onPress={() => setIsConsoleSelectOpen(true)}
                  >
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {consoleName || 'Select console'}
                    </Text>
                  </Pressable>
                </>
              )}
              {type === '2' && (
                <>
                  <Text style={styles.label}>Select Handheld*</Text>
                  <Pressable
                    style={styles.dropdownButtonStyle}
                    onPress={() => setIsConsoleSelectOpen(true)}
                  >
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {handheldName || 'Select handheld'}
                    </Text>
                  </Pressable>
                </>
              )}
              {type === '3' && (
                <>
                  <Text style={styles.label}>Select Controller*</Text>
                  <Pressable
                    style={styles.dropdownButtonStyle}
                    onPress={() => setIsConsoleSelectOpen(true)}
                  >
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {controllerName || 'Select controller'}
                    </Text>
                  </Pressable>
                </>
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
                              const info = autofillMap[item];
                              if (info) {
                                setManufacturer(info.manufacturer);
                                if (info.forConsole) {
                                  setForConsole(info.forConsole);
                                }
                              }
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
                              const info = autofillMap[item];
                              if (info) {
                                setManufacturer(info.manufacturer);
                              }
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
              <Text style={styles.label}>Model*</Text>
              <AutocompleteInput
                placeholder="Model (e.g. Slim, Pro, OLED)"
                inputStyle={styles.inputStyle}
                value={model}
                onChangeText={setModel}
                suggestions={getModelSuggestions(selectedName)}
              />
              <Text style={styles.label}>Color*</Text>
              <TextInput
                placeholder="* Color (e.g. Red, Blue, Black)"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                style={styles.inputStyle}
                value={color}
                onChangeText={setColor}
              />

              <Text style={styles.label}>Edition*</Text>
              <AutocompleteInput
                placeholder="* Edition (e.g. Standard, Limited, Special)"
                inputStyle={styles.inputStyle}
                value={edition}
                onChangeText={setEdition}
                suggestions={getEditionSuggestions(selectedName, model)}
              />
              {type === '3' && (
                <>
                  <Text style={styles.label}>For What Console*</Text>
                  <TextInput
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    placeholder="* For What Console(PS5, Xbox One, etc.)"
                    style={styles.inputStyle}
                    value={forConsole}
                    onChangeText={setForConsole}
                  />
                </>
              )}
              {(type === '2' || type === '1') && (
                <>
                  <Text style={styles.label}>Storage Size</Text>
                  <TextInput
                    placeholder="Storage Size (e.g. 500GB, 1TB)"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    style={styles.inputStyle}
                    value={storage}
                    onChangeText={setStorage}
                  />
                </>
              )}
              <Text style={styles.label}>Manufacturer*</Text>
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
              <Text style={styles.label}>Description</Text>
              <TextInput
                placeholder="Description"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                style={styles.descriptionInputStyle}
                multiline={true}
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
              />
              <Text style={styles.label}>Image URL</Text>
              <TextInput
                placeholder="Image URL"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                style={styles.inputStyle}
                value={url}
                onChangeText={setUrl}
              />
              <Text style={styles.label}>Condition*</Text>
              <View
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  borderWidth: 1,
                  borderRadius: 8,
                  marginBottom: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
              >
                <View style={styles.conditionTypeOptions}>
                  {conditionOptions.map((option) => (
                    <Pressable
                      key={option.id}
                      onPress={() => setCondition(option.id)}
                      accessibilityRole="radio"
                      accessibilityState={{ selected: condition === option.id }}
                      style={[
                        styles.conditionTypeOption,
                        condition === option.id &&
                          styles.conditionTypeOptionSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.conditionTypeOptionText,
                          condition === option.id &&
                            styles.conditionTypeOptionTextSelected,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
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
                  justifyContent: 'space-between',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginLeft: 10,
                  }}
                >
                  Reshelled?
                </Text>
                <View style={styles.radioTypeOptions}>
                  {radioButtonsReshell.map((option) => (
                    <Pressable
                      key={option.id}
                      onPress={() => setReshell(option.id)}
                      accessibilityRole="radio"
                      accessibilityState={{ selected: reshell === option.id }}
                      style={[
                        styles.radioTypeOption,
                        reshell === option.id && styles.radioTypeOptionSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.radioTypeOptionText,
                          reshell === option.id &&
                            styles.radioTypeOptionTextSelected,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                {/* <RadioGroup
                  layout="row"
                  radioButtons={radioButtonsReshell}
                  onPress={setReshell}
                  selectedId={reshell}
                  labelStyle={{
                    color: 'white',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}
                /> */}
              </View>
              <View
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  borderWidth: 1,
                  borderRadius: 8,
                  marginBottom: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginBottom: 4,
                    marginLeft: 10,
                  }}
                >
                  With box?
                </Text>
                <View style={styles.radioTypeOptions}>
                  {radioButtonsWithBox.map((option) => (
                    <Pressable
                      key={option.id}
                      onPress={() => setWithBox(option.id)}
                      accessibilityRole="radio"
                      accessibilityState={{ selected: withBox === option.id }}
                      style={[
                        styles.radioTypeOption,
                        withBox === option.id && styles.radioTypeOptionSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.radioTypeOptionText,
                          withBox === option.id &&
                            styles.radioTypeOptionTextSelected,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                {/* <RadioGroup
                  layout="row"
                  radioButtons={radioButtonsWithBox}
                  onPress={setWithBox}
                  selectedId={withBox}
                  labelStyle={{
                    color: 'white',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}
                /> */}
              </View>
            </View>
          </View>
          <Text style={styles.labelBottom}>
            All marked fields with * are required
          </Text>
          <Pressable
            disabled={saving}
            onPress={handleAddItem}
            style={[styles.button, saving && styles.buttonDisabled]}
          >
            <Text style={styles.buttonText}>
              {saving ? 'Adding...' : 'Add Item'}
            </Text>
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
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',

    paddingHorizontal: 10,
  },

  image: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'SpaceGrotesk_600SemiBold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  inputStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    fontSize: 16,
    fontFamily: 'DMSans_700Bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    marginBottom: 8,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontFamily: 'DMSans_700Bold',
    marginBottom: 4,
  },
  labelBottom: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontFamily: 'DMSans_700Bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  descriptionInputStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    fontSize: 17,
    fontFamily: 'DMSans_700Bold',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    marginBottom: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#0DDCFD',
    marginBottom: 10,
    padding: 14,
    borderRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    width: '90%',
    alignSelf: 'center',
    // marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(13, 220, 253, 0.5)',
    opacity: 0.5,
  },

  buttonText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'DMSans_700Bold',
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
    marginBottom: 8,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 17,
    fontFamily: 'DMSans_700Bold',
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
    fontSize: 17,
    fontFamily: 'DMSans_500Medium',
    color: 'white',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  // type option styles
  typeOptions: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 17,
    // height: 100,
  },
  typeOption: {
    flex: 1,
    padding: 10,
    borderRadius: 15,
    // borderWidth: 1,
    // borderColor: 'rgba(255, 255, 255, 0.5)',
    // marginHorizontal: 5,
    alignItems: 'center',
    // width: '100%',
  },
  typeOptionSelected: {
    backgroundColor: '#0DDCFD',
    // backgroundColor: 'rgba(7, 0, 105, 0.8)',
    borderColor: '#48ffff',
    borderWidth: 1,
  },
  typeOptionText: {
    color: 'white',
    fontFamily: 'DMSans_700Bold',
    fontSize: 16,
  },
  typeOptionTextSelected: {
    color: 'black',
  },

  // reshell and with box option styles

  radioTypeOptions: {
    flexDirection: 'row',
    marginBottom: 0,
    borderRadius: 8,
  },
  radioTypeOption: {
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 8,
    // borderWidth: 1,
    // borderColor: 'rgba(255, 255, 255, 0.5)',
    // marginHorizontal: 5,
    alignItems: 'center',
    // width: '100%',
  },
  radioTypeOptionSelected: {
    backgroundColor: '#0DDCFD',
    // backgroundColor: 'rgba(7, 0, 105, 0.8)',
    borderColor: '#48ffff',
    borderWidth: 1,
  },
  radioTypeOptionText: {
    color: 'white',
    fontFamily: 'DMSans_700Bold',
    fontSize: 16,
  },
  radioTypeOptionTextSelected: {
    color: 'black',
  },

  // condition option styles
  conditionTypeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // flexDirection: '',
    justifyContent: 'space-between',
    marginBottom: 0,
    borderRadius: 8,
  },
  conditionTypeOption: {
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '33%',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  conditionTypeOptionSelected: {
    backgroundColor: '#0DDCFD',
    borderColor: '#48ffff',
    borderWidth: 1,
    // borderVerticalWidth: 1,
    // borderHorizontalWidth: 1,
  },
  conditionTypeOptionText: {
    color: 'white',
    fontFamily: 'DMSans_700Bold',
    fontSize: 16,
  },
  conditionTypeOptionTextSelected: {
    color: 'black',
  },
});
