// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  'message.fill': 'chat',
  'person.2.fill': 'contacts',
  'safari.fill': 'explore',
  'camera.fill': 'photo-camera',
  'person.crop.circle.fill': 'account-circle',
  'photo.on.rectangle.angled.fill': 'photo-library',
  'play.rectangle.fill': 'play-circle-filled',
  'qrcode.viewfinder': 'qr-code-scanner',
  'iphone.shake': 'vibration',
  'newspaper.fill': 'article',
  'magnifyingglass': 'search',
  'location.fill': 'near-me',
  'square.grid.2x2.fill': 'apps',
  'ellipsis.circle.fill': 'more-horiz',
  'camera.viewfinder': 'center-focus-weak',
  'face.smiling': 'sentiment-satisfied-alt',
  'mic.fill': 'mic',
  'heart.fill': 'favorite',
  'heart': 'favorite-border',
} as unknown as IconMapping;

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
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
