import type { ImageSourcePropType } from 'react-native';

export type ConsoleItem = {
  id: string;
  name: string;
  model: string;
  color: string;
  condition: 'Mint' | 'Like New' | 'Good' | 'Fair';
  edition?: string;
  picture: ImageSourcePropType;
};

export type ControllerItem = {
  id: string;
  name: string;
  console: string;
  color: string;
  condition: 'Mint' | 'Like New' | 'Good' | 'Fair';
  picture: ImageSourcePropType;
};

export type HandheldItem = {
  id: string;
  name: string;
  model: string;
  color: string;
  condition: 'Mint' | 'Like New' | 'Good' | 'Fair';
  picture: ImageSourcePropType;
};

// Tabs-only data: every console listed here is owned by you.
export const consoles: ConsoleItem[] = [
  {
    id: '1',
    name: 'PS3',
    model: 'Slim',
    color: 'Standard Black',
    condition: 'Good',
    picture: require('@/assets/images/ps3.png'),
  },
  {
    id: '2',
    name: 'Xbox 360',
    model: 'S',
    color: 'Standard Black',
    condition: 'Good',
    picture: require('@/assets/images/xbox360.png'),
  },
  {
    id: '3',
    name: 'Nintendo Switch',
    model: 'OLED',
    color: 'Black',
    condition: 'Like New',
    picture: require('@/assets/images/nswitch.png'),
  },
  {
    id: '4',
    name: 'PlayStation 4',
    model: 'Pro',
    color: 'Standard Black',
    condition: 'Good',
    picture: require('@/assets/images/ps4.png'),
  },
  {
    id: '5',
    name: 'PlayStation 4',
    model: 'Fat',
    edition: 'Destiny 2 Edition',
    color: 'White',
    condition: 'Good',
    picture: require('@/assets/images/ps4.png'),
  },
  {
    id: '6',
    name: 'PlayStation 5',
    model: 'Slim',
    color: 'White',
    condition: 'Like New',
    picture: require('@/assets/images/ps5.png'),
  },
  {
    id: '7',
    name: 'Xbox Series X',
    model: '1TB',
    color: 'Carbon Black',
    condition: 'Mint',
    picture: require('@/assets/images/xboxseries.png'),
  },
  {
    id: '8',
    name: 'Nintendo 64',
    model: 'NUS-001',
    color: 'Charcoal Gray',
    condition: 'Good',
    picture: require('@/assets/images/nintendo2.png'),
  },
];

export const controllers: ControllerItem[] = [
  {
    id: '1',
    name: 'Xbox Elite Controller Series 2',
    console: 'Xbox Series X',
    color: 'Black',
    condition: 'Like New',
    picture: require('@/assets/images/controllers.png'),
  },
  {
    id: '2',
    name: 'DualShock 4',
    console: 'PlayStation 4',
    color: 'Midnight Blue',
    condition: 'Good',
    picture: require('@/assets/images/playstation.png'),
  },
  {
    id: '3',
    name: 'Switch Pro Controller',
    console: 'Nintendo Switch',
    color: 'Black',
    condition: 'Like New',
    picture: require('@/assets/images/nintendo.png'),
  },
  {
    id: '4',
    name: 'Xbox 360 Wireless Controller',
    console: 'Xbox 360',
    color: 'White',
    condition: 'Good',
    picture: require('@/assets/images/xbox.png'),
  },
];

export const handhelds: HandheldItem[] = [
  {
    id: '1',
    name: 'Nintendo Switch',
    model: 'OLED',
    color: 'White',
    condition: 'Like New',
    picture: require('@/assets/images/handhelds.png'),
  },
  {
    id: '2',
    name: 'Nintendo Switch Lite',
    model: 'Lite',
    color: 'Turquoise',
    condition: 'Good',
    picture: require('@/assets/images/nswitch.png'),
  },
  {
    id: '3',
    name: 'PS Vita',
    model: '1000 model',
    color: 'Black',
    condition: 'Good',
    picture: require('@/assets/images/ps3.png'),
  },
];
