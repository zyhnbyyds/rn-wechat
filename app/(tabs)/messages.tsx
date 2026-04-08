import { FlatList, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { chatSessions } from '@/constants/mock';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function MessagesScreen() {
  const separatorColor = useThemeColor({}, 'separator');
  const cardColor = useThemeColor({}, 'card');
  const secondaryText = useThemeColor({}, 'secondaryText');
  const badgeBackground = useThemeColor({}, 'badgeBackground');
  const badgeText = useThemeColor({}, 'badgeText');

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        聊天
      </ThemedText>
      <FlatList
        data={chatSessions}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: separatorColor }]} />}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: cardColor }]}>
            <View style={styles.rowMain}>
              <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
              <ThemedText style={{ color: secondaryText }}>{item.time}</ThemedText>
            </View>
            <View style={styles.rowMain}>
              <ThemedText style={{ color: secondaryText }}>{item.lastMessage}</ThemedText>
              {item.unreadCount > 0 ? (
                <View style={[styles.badge, { backgroundColor: badgeBackground }]}>
                  <ThemedText style={[styles.badgeText, { color: badgeText }]}>{item.unreadCount}</ThemedText>
                </View>
              ) : null}
            </View>
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
  title: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  card: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  rowMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    height: 0.5,
    marginLeft: 16,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
  },
});
