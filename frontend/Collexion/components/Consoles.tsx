import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import type { ImageSourcePropType } from 'react-native';

type Props = {
  name: string;
  count: number;
  picture?: ImageSourcePropType;
  onPress?: () => void;
};

const ConsoleGroup = ({ name, count, picture, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{count}</Text>
      </View>
      {picture ? (
        <Image source={picture} style={styles.cardImage} resizeMode="contain" />
      ) : (
        <View style={styles.cardImagePlaceholder} />
      )}
      <Text style={styles.cardName} numberOfLines={2}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default ConsoleGroup;

const styles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginBottom: 14,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  cardImagePlaceholder: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  cardName: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
