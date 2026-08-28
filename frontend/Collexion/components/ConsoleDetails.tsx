import { View, Text, StyleSheet, ImageSourcePropType } from 'react-native';
import React from 'react';

type Props = {
  name: string;
  model?: string;
  edition?: string;
  color: string;
  condition: 'Mint' | 'Like New' | 'Good' | 'Fair';
  picture?: ImageSourcePropType;
  description?: string;
  manufacturer?: string;
};

const ConsoleDetails = ({
  name,
  model,
  edition,
  color,
  condition,
  picture,
}: Props) => {
  return (
    <View>
      {/* {picture ? (
        <Image source={picture} resizeMode="contain" />
      ) : null} */}
      <View>
        <Text style={styles.name}>{name}</Text>
        {model ? <Text style={styles.meta}>Model: {model}</Text> : null}
        {edition ? <Text style={styles.meta}>Edition: {edition}</Text> : null}
        <Text style={styles.meta}>Color: {color}</Text>
        <Text style={styles.meta}>Condition: {condition}</Text>
      </View>
    </View>
  );
};

export default ConsoleDetails;

const styles = StyleSheet.create({
  name: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  meta: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 14,
    marginTop: 1,
  },
});
