import { View, Text, StyleSheet, ImageSourcePropType } from 'react-native';
import React from 'react';

type Props = {
  name: string;
  model?: string;
  edition?: string;
  reshell?: boolean;
  color: string;
  condition: 'Unopened' | 'Mint' | 'Like New' | 'Good' | 'Fair' | 'Poor';
  picture?: ImageSourcePropType;
  withBox?: boolean;
  description?: string;
  manufacturer?: string;
  url?: string;
};

const ConsoleDetails = ({
  name,
  model,
  edition,
  color,
  condition,
  picture,
  withBox,
  description,
  manufacturer,
  url,
  reshell,
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
        {manufacturer ? (
          <Text style={styles.meta}>Manufacturer: {manufacturer}</Text>
        ) : null}
        <Text style={styles.meta}>Condition: {condition}</Text>
        {withBox !== undefined ? (
          <Text style={styles.meta}>With Box: {withBox ? 'Yes' : 'No'}</Text>
        ) : null}
        {reshell !== undefined ? (
          <Text style={styles.meta}>Reshell: {reshell ? 'Yes' : 'No'}</Text>
        ) : null}

        {description ? (
          <Text style={styles.meta}>Description: {description}</Text>
        ) : null}
        {url ? <img src={url} alt="Console" /> : null}
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
