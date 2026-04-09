import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';

export type SystemNoticeProps = {
  title?: string;
  message: string;
  visible: boolean;
  onDismiss: () => void;
};

export function SystemNotice({
  title = '微信团队',
  message,
  visible,
  onDismiss,
}: SystemNoticeProps) {
  const translateY = useRef(new Animated.Value(-120)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const cardColor = useThemeColor({}, 'card');
  const separator = useThemeColor({}, 'separator');
  const secondaryText = useThemeColor({}, 'secondaryText');
  const tint = useThemeColor({}, 'tint');

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          damping: 18,
          stiffness: 160,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -120,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, translateY, opacity]);

  return (
    <Animated.View
      style={[styles.wrapper, { transform: [{ translateY }], opacity }]}
      pointerEvents={visible ? 'auto' : 'none'}>
      <View style={[styles.card, { backgroundColor: cardColor, borderColor: separator }]}>
        {/* 左侧图标 */}
        <View style={[styles.iconBox, { backgroundColor: tint }]}>
          <IconSymbol name="checkmark.seal.fill" size={20} color="#fff" />
        </View>

        {/* 内容区 */}
        <View style={styles.content}>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            {title}
          </ThemedText>
          <ThemedText style={[styles.message, { color: secondaryText }]} numberOfLines={2}>
            {message}
          </ThemedText>
        </View>

        {/* 关闭按钮 */}
        <Pressable
          onPress={onDismiss}
          hitSlop={12}
          style={({ pressed }) => [styles.closeBtn, pressed && styles.closeBtnPressed]}>
          <IconSymbol name="xmark" size={14} color={secondaryText} />
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 8,
    left: 12,
    right: 12,
    zIndex: 100,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 0.5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 14,
  },
  message: {
    fontSize: 13,
    lineHeight: 18,
  },
  closeBtn: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: 12,
  },
  closeBtnPressed: {
    opacity: 0.4,
  },
});
