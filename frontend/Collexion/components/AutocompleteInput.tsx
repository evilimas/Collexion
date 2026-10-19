import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { filterSuggestions } from '@/lib/item-suggestions';

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  suggestions: string[];
  inputStyle: object;
};

const AutocompleteInput = ({
  placeholder,
  value,
  onChangeText,
  suggestions,
  inputStyle,
}: Props) => {
  const [focused, setFocused] = useState(false);
  const matches = focused ? filterSuggestions(suggestions, value) : [];

  return (
    <View>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
      />
      {matches.length > 0 && (
        <View style={styles.list}>
          {matches.map((item) => (
            <Pressable
              key={item}
              style={styles.item}
              onPress={() => {
                onChangeText(item);
                setFocused(false);
              }}
            >
              <Text style={styles.itemText}>{item}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  item: { paddingVertical: 10, paddingHorizontal: 16 },
  itemText: { color: 'white', fontSize: 15, fontFamily: 'DMSans_500Medium' },
});

export default AutocompleteInput;
