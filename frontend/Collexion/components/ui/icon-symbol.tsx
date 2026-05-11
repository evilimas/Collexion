// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SymbolWeight } from 'expo-symbols';

import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconSymbolName =
  | 'house.fill'
  | 'paperplane.fill'
  | 'chevron.left.forwardslash.chevron.right'
  | 'chevron.right'
  | 'console.fill'
  | 'handheld.fill'
  | 'controller.fill'
  | 'plus.circle.fill';

type IconConfig = {
  name: string;
  library: 'MaterialIcons' | 'MaterialCommunityIcons';
};

type IconMapping = Record<IconSymbolName, IconConfig>;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING: IconMapping = {
  'house.fill': { name: 'home', library: 'MaterialIcons' },
  'paperplane.fill': { name: 'send', library: 'MaterialIcons' },
  'chevron.left.forwardslash.chevron.right': {
    name: 'code',
    library: 'MaterialIcons',
  },
  'chevron.right': { name: 'chevron-right', library: 'MaterialIcons' },
  'console.fill': { name: 'tv', library: 'MaterialIcons' },
  'handheld.fill': {
    name: 'nintendo-game-boy',
    library: 'MaterialCommunityIcons',
  },
  'controller.fill': { name: 'sports-esports', library: 'MaterialIcons' },
  'plus.circle.fill': { name: 'add-circle', library: 'MaterialIcons' },
};

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const iconConfig = MAPPING[name];

  if (iconConfig.library === 'MaterialCommunityIcons') {
    return (
      <MaterialCommunityIcons
        color={color}
        size={size}
        name={iconConfig.name as any}
        style={style}
      />
    );
  }

  return (
    <MaterialIcons
      color={color}
      size={size}
      name={iconConfig.name as any}
      style={style}
    />
  );
}
