import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { profileMenus } from '@/constants/mock';
import { useThemeColor } from '@/hooks/use-theme-color';

const MENU_ICONS: Record<string, { icon: string; color: string }> = {
  '服务':    { icon: 'square.grid.2x2.fill', color: '#07c160' },
  '收藏':    { icon: 'safari.fill',          color: '#fa8c16' },
  '朋友圈':  { icon: 'photo.on.rectangle.angled.fill', color: '#1890ff' },
  '卡包':    { icon: 'paperplane.fill',      color: '#722ed1' },
  '表情':    { icon: 'face.smiling',         color: '#fa5151' },
  '设置':    { icon: 'ellipsis.circle.fill', color: '#8a8a8a' },
};

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const separatorColor = useThemeColor({}, 'separator');
  const cardColor = useThemeColor({}, 'card');
  const secondaryText = useThemeColor({}, 'secondaryText');

  return (
    <ThemedView style={styles.container}>
      {/* Profile header */}
      <View style={[styles.profileCard, { backgroundColor: cardColor, paddingTop: insets.top + 16 }]}>
        <View style={[styles.avatar, { backgroundColor: '#07c160' }]}>
          <ThemedText style={styles.avatarInitial}>我</ThemedText>
        </View>
        <View style={styles.profileInfo}>
          <ThemedText type="defaultSemiBold" style={styles.name}>
            微信用户
          </ThemedText>
          <ThemedText style={[styles.wechatId, { color: secondaryText }]}>
            微信号: wechat_clone_demo
          </ThemedText>
          <ThemedText style={[styles.wechatId, { color: secondaryText }]}>
            个性签名：Hello, WeChat！
          </ThemedText>
        </View>
        <IconSymbol name="chevron.right" size={16} color={secondaryText} />
      </View>

      <View style={[styles.divider, { height: 8 }]} />

      <FlatList
        data={profileMenus}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, { backgroundColor: separatorColor }]} />
        )}
        renderItem={({ item }) => {
          const meta = MENU_ICONS[item.title];
          return (
            <View style={[styles.row, { backgroundColor: cardColor }]}>
              <View style={styles.rowLeft}>
                {meta ? (
                  <View style={[styles.iconBox, { backgroundColor: meta.color }]}>
                    <IconSymbol name={meta.icon as any} size={16} color="#fff" />
                  </View>
                ) : (
                  <View style={[styles.iconBox, { backgroundColor: '#aaa' }]} />
                )}
                <ThemedText style={styles.rowTitle}>{item.title}</ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={16} color={secondaryText} />
            </View>
          );
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileCard: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarInitial: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 19,
    fontWeight: '700',
  },
  wechatId: {
    fontSize: 13,
  },
  divider: {
    backgroundColor: 'transparent',
  },
  row: {
    height: 54,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: {
    fontSize: 16,
  },
  separator: {
    height: 0.5,
    marginLeft: 58,
  },
});

