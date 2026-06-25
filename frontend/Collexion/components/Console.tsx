import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import type { ImageSourcePropType } from 'react-native';

type Props = {
  name: string;
  model?: string;
  edition?: string;
  color: string;
  condition: 'Mint' | 'Like New' | 'Good' | 'Fair';
  description?: string;
  manufacturer?: string;
  picture?: ImageSourcePropType;
  onPress?: () => void;
};

const Console = ({
  name,
  model,
  edition,
  color,
  condition,
  picture,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {picture ? (
          <Image source={picture} style={styles.image} resizeMode="contain" />
        ) : null}
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          {model ? <Text style={styles.meta}>Model: {model}</Text> : null}
          {edition ? <Text style={styles.meta}>Edition: {edition}</Text> : null}
          <Text style={styles.meta}>Color: {color}</Text>
          <Text style={styles.meta}>Condition: {condition}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Console;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    padding: 12,
    display: 'flex',
    marginBottom: 12,
    flexDirection: 'row',
    // alignItems: 'center',
  },
  image: {
    width: 72,
    height: 72,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  name: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  meta: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
    marginTop: 1,
  },
});
