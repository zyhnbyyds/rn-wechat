import * as Haptics from 'expo-haptics';
import React, { useCallback, useRef, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';

import ContactsScreen from './contacts';
import DiscoverScreen from './discover';
import MessagesScreen from './messages';
import ProfileScreen from './profile';

const TABS = [
  { name: 'messages', title: '聊天', headerTitle: '聊天', icon: 'message.fill' },
  { name: 'contacts', title: '通讯录', headerTitle: '通讯录', icon: 'person.2.fill' },
  { name: 'discover', title: '发现', headerTitle: '发现', icon: 'safari.fill' },
  { name: 'profile', title: '我', headerTitle: '', icon: 'person.crop.circle.fill' },
] as const;

export default function TabLayout() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const tabBarBg = useThemeColor({}, 'tabBarBackground');
  const separator = useThemeColor({}, 'separator');
  const tabIconSelected = useThemeColor({}, 'tabIconSelected');
  const tabIconDefault = useThemeColor({}, 'tabIconDefault');

  const onScrollEnd = useCallback(
    (e: { nativeEvent: { contentOffset: { x: number } } }) => {
      const index = Math.round(e.nativeEvent.contentOffset.x / width);
      setActiveIndex(index);
    },
    [width],
  );

  const goToTab = useCallback(
    (index: number) => {
      if (Platform.OS === 'ios') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      scrollRef.current?.scrollTo({ x: index * width, animated: false });
      setActiveIndex(index);
    },
    [width],
  );

  return (
    <ThemedView style={styles.root}>
      {/* 固定顶部标题栏 */}
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 10,
            backgroundColor: tabBarBg,
            borderBottomColor: separator,
          },
        ]}>
        {TABS[activeIndex].headerTitle ? (
          <ThemedText type="defaultSemiBold" style={styles.headerTitle}>
            {TABS[activeIndex].headerTitle}
          </ThemedText>
        ) : <View style={styles.headerTitlePlaceholder} />}
      </View>

      {/* 左右滑动页面区域 */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        onScrollEndDrag={onScrollEnd}
        scrollEventThrottle={16}
        directionalLockEnabled
        style={styles.pager}>
        <View style={{ width }}>
          <MessagesScreen />
        </View>
        <View style={{ width }}>
          <ContactsScreen />
        </View>
        <View style={{ width }}>
          <DiscoverScreen />
        </View>
        <View style={{ width }}>
          <ProfileScreen />
        </View>
      </ScrollView>

      {/* 固定底部 Tab 栏 */}
      <View
        style={[
          styles.tabBar,
          {
            paddingBottom: insets.bottom,
            backgroundColor: tabBarBg,
            borderTopColor: separator,
          },
        ]}>
        {TABS.map((tab, index) => (
          <Pressable key={tab.name} style={styles.tabItem} onPress={() => goToTab(index)}>
            <IconSymbol
              size={28}
              name={tab.icon}
              color={activeIndex === index ? tabIconSelected : tabIconDefault}
            />
            <ThemedText
              style={[
                styles.tabLabel,
                { color: activeIndex === index ? tabIconSelected : tabIconDefault },
              ]}>
              {tab.title}
            </ThemedText>
          </Pressable>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    fontSize: 18,
  },
  headerTitlePlaceholder: {
    backgroundColor: 'white',
    height: 20,
  },
  pager: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 2,
  },
  tabLabel: {
    fontSize: 13,
  },
});
