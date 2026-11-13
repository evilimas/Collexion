import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import type { ImageSourcePropType } from 'react-native';

type Props = {
  name: string;
  otherName?: string;
  model?: string;
  edition?: string;
  color: string;
  condition: 'Unopened' | 'Mint' | 'Like New' | 'Good' | 'Fair' | 'Poor';
  withBox?: boolean;
  storage?: string;
  description?: string;
  manufacturer?: string;
  picture?: ImageSourcePropType;
  url?: string;
  localImageUri?: string;
  onPress?: () => void;
};

const Console = ({
  name,
  otherName,
  model,
  edition,
  color,
  condition,
  picture,
  onPress,
  withBox,
  description,
  localImageUri,
  url,
  manufacturer,
}: Props) => {
  const content = (
    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
      {picture ? (
        <Image
          source={
            localImageUri
              ? { uri: localImageUri }
              : url
                ? { uri: url }
                : picture
          }
          style={
            localImageUri
              ? styles.image
              : url
                ? styles.image
                : styles.placeholder
          }
          // resizeMode="cover"
          //           borderRadiusTopLeft={8}
        />
      ) : null}
      <View style={styles.content}>
        <Text style={styles.name}>{otherName ?? name}</Text>
        {edition ? <Text style={styles.meta}>{edition}</Text> : null}
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
    display: 'flex',
    marginBottom: 12,
    flexDirection: 'row',
    // alignItems: 'center',
  },
  image: {
    width: 125,
    height: 115,
    marginRight: 10,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 8,
  },
  name: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  meta: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12.5,
    marginTop: 1,
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
  placeholder: {
    width: 125,
    height: 115,
    marginRight: 10,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    resizeMode: 'contain',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});
