import type { ImageSourcePropType } from 'react-native';

export function getItemPicture(
  itemType: 'Console' | 'Handheld' | 'Controller',
  name: string,
): ImageSourcePropType | undefined {
  const pictures: Record<string, ImageSourcePropType> = {
    'PlayStation 5': require('@/assets/images/ps5.png'),
    'PlayStation 4': require('@/assets/images/ps4.png'),
    'PlayStation 3': require('@/assets/images/ps3.png'),
    'PlayStation 2': require('@/assets/images/ps2.png'),
    'PlayStation 1': require('@/assets/images/ps1.png'),
    'Xbox Series S|X': require('@/assets/images/xboxseries.png'),
    'Xbox One': require('@/assets/images/xboxone.png'),
    'Xbox 360': require('@/assets/images/xbox3601.png'),
    'Xbox Original(OG)': require('@/assets/images/ogxbox.png'),
    'Nintendo Wii': require('@/assets/images/wii.png'),
    'Nintendo WiiU': require('@/assets/images/wiiu.png'),
    'Nintendo Switch': require('@/assets/images/nswitch.png'),
    'PlayStation Vita(PSV)': require('@/assets/images/psvita1.png'),
    'PlayStation Portable(PSP)': require('@/assets/images/psp.png'),
    'Nintendo 3DS': require('@/assets/images/3ds.png'),
    'Nintendo DS': require('@/assets/images/nds.png'),
    'Game Boy Advance(GBA)': require('@/assets/images/gba.png'),
    'Game Boy': require('@/assets/images/gameboy.png'),
    'Game Boy Color': require('@/assets/images/gameboycolor.png'),
    'Game Gear': require('@/assets/images/gamegear.png'),
    'Neo Geo Pocket': require('@/assets/images/neogeop.png'),
    'Neo Geo Pocket Color': require('@/assets/images/neogeopcolor.png'),
    'DualSense(PS5)': require('@/assets/images/dualsense1.png'),
    'DualShock 4(PS4)': require('@/assets/images/dualshock41.png'),
    'Sixaxis/DualShock 3(PS3)': require('@/assets/images/dualshock31.png'),
    'DualShock 2(PS2)': require('@/assets/images/dualshock21.png'),
    'Xbox Series S|X Controller': require('@/assets/images/xboxseries.png'),
    'Xbox One Controller': require('@/assets/images/xboxonecontroller.png'),
    'Xbox 360 Controller': require('@/assets/images/xbox360controller.png'),
    'Xbox Original(OG) Controller': require('@/assets/images/ogxbox.png'),
    'Nintendo Switch Controller': require('@/assets/images/nswitch.png'),
  };

  return pictures[name];
}
