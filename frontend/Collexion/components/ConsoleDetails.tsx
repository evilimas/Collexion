import { View, Text, ImageSourcePropType } from 'react-native';
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
        <Text>{name}</Text>
        {model ? <Text>Model: {model}</Text> : null}
        {edition ? <Text>Edition: {edition}</Text> : null}
        <Text>Color: {color}</Text>
        <Text>Condition: {condition}</Text>
      </View>
    </View>
  );
};

export default ConsoleDetails;
