/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#101010',
    background: '#ededed',
    tint: '#07c160',
    icon: '#7a7a7a',
    tabIconDefault: '#7a7a7a',
    tabIconSelected: '#07c160',
    tabBarBackground: '#f9f9f9',
    card: '#ffffff',
    separator: '#d9d9d9',
    secondaryText: '#8a8a8a',
    badgeBackground: '#fa5151',
    badgeText: '#ffffff',
    avatarPlaceholder: '#c8c8c8',
  },
  dark: {
    text: '#ececec',
    background: '#111111',
    tint: '#07c160',
    icon: '#8d8d8d',
    tabIconDefault: '#8d8d8d',
    tabIconSelected: '#07c160',
    tabBarBackground: '#1a1a1a',
    card: '#1f1f1f',
    separator: '#2e2e2e',
    secondaryText: '#a0a0a0',
    badgeBackground: '#e25a5a',
    badgeText: '#ffffff',
    avatarPlaceholder: '#4a4a4a',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
