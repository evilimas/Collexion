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
  const content = (
    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
      {picture ? (
        <Image source={picture} style={styles.image} resizeMode="contain" />
      ) : null}
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        {model ? (
          <Text
            style={{
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: 13,
              marginTop: 1,
            }}
          >
            Model: {model}
          </Text>
        ) : null}
        {edition ? <Text style={styles.meta}>Edition: {edition}</Text> : null}
        <Text style={styles.meta}>Color: {color}</Text>
        <Text style={styles.meta}>Condition: {condition}</Text>
      </View>
    </View>
  );

  // When wrapped by a Link/Pressable (asChild), don't nest another touchable
  // on top of it: nested touchables can swallow single taps on Android.
  if (!onPress) {
    return <View style={styles.card}>{content}</View>;
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {content}
    </TouchableOpacity>
  );
};

export default Console;

const styles = StyleSheet.create({
  card: {
    width: '100%',
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
  text: {
    color: 'white',
    fontSize: 24,
  },
});
