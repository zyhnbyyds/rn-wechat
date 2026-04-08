import { FlatList, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { profileMenus } from '@/constants/mock';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function ProfileScreen() {
  const separatorColor = useThemeColor({}, 'separator');
  const cardColor = useThemeColor({}, 'card');
  const secondaryText = useThemeColor({}, 'secondaryText');
  const avatarPlaceholder = useThemeColor({}, 'avatarPlaceholder');

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.profileCard, { backgroundColor: cardColor }]}>
        <View style={[styles.avatar, { backgroundColor: avatarPlaceholder }]} />
        <View style={styles.profileInfo}>
          <ThemedText type="defaultSemiBold" style={styles.name}>
            微信用户
          </ThemedText>
          <ThemedText style={{ color: secondaryText }}>微信号: wechat_clone_demo</ThemedText>
        </View>
      </View>

      <FlatList
        data={profileMenus}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: separatorColor }]} />}
        renderItem={({ item }) => (
          <View style={[styles.row, { backgroundColor: cardColor }]}>
            <ThemedText>{item.title}</ThemedText>
            <IconSymbol name="chevron.right" size={16} color={secondaryText} />
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 56,
  },
  profileCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 10,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    marginBottom: 4,
  },
  row: {
    height: 52,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  separator: {
    height: 0.5,
    marginLeft: 16,
  },
});
