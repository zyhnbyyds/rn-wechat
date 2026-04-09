import { useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { chatSessions } from '@/constants/mock';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function MessagesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const separatorColor = useThemeColor({}, 'separator');
  const cardColor = useThemeColor({}, 'card');
  const secondaryText = useThemeColor({}, 'secondaryText');
  const badgeBackground = useThemeColor({}, 'badgeBackground');
  const badgeText = useThemeColor({}, 'badgeText');

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={[styles.title, { paddingTop: insets.top + 8 }]}>
        聊天
      </ThemedText>
      <FlatList
        data={chatSessions}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, { backgroundColor: separatorColor }]} />
        )}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, { backgroundColor: cardColor }]}
            onPress={() => router.push(`/chat/${item.id}`)}>
            <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
              <ThemedText style={styles.avatarText}>{item.name.charAt(0)}</ThemedText>
            </View>
            <View style={styles.content}>
              <View style={styles.rowTop}>
                <ThemedText type="defaultSemiBold" style={styles.name} numberOfLines={1}>
                  {item.name}
                </ThemedText>
                <ThemedText style={[styles.time, { color: secondaryText }]}>{item.time}</ThemedText>
              </View>
              <View style={styles.rowBottom}>
                <ThemedText style={[styles.lastMsg, { color: secondaryText }]} numberOfLines={1}>
                  {item.lastMessage}
                </ThemedText>
                {item.unreadCount > 0 ? (
                  <View style={[styles.badge, { backgroundColor: badgeBackground }]}>
                    <ThemedText style={[styles.badgeText, { color: badgeText }]}>
                      {item.unreadCount > 99 ? '99+' : item.unreadCount}
                    </ThemedText>
                  </View>
                ) : null}
              </View>
            </View>
          </Pressable>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  card: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    flex: 1,
    gap: 3,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    flex: 1,
    fontSize: 16,
    marginRight: 8,
  },
  time: {
    fontSize: 12,
    flexShrink: 0,
  },
  lastMsg: {
    flex: 1,
    fontSize: 14,
    marginRight: 8,
  },
  separator: {
    height: 0.5,
    marginLeft: 72,
  },
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
  },
});

