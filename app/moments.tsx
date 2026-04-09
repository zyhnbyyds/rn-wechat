import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { moments } from '@/constants/mock';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function MomentsScreen() {
  const separatorColor = useThemeColor({}, 'separator');
  const cardColor = useThemeColor({}, 'card');
  const secondaryText = useThemeColor({}, 'secondaryText');

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        朋友圈
      </ThemedText>
      <FlatList
        data={moments}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: separatorColor }]} />}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: cardColor }]}>
            <ThemedText type="defaultSemiBold">{item.author}</ThemedText>
            <ThemedText style={styles.content}>{item.content}</ThemedText>
            <View style={styles.metaRow}>
              <ThemedText style={{ color: secondaryText }}>{item.time}</ThemedText>
              <View style={styles.actions}>
                <Pressable style={styles.actionBtn}>
                  <ThemedText style={{ color: secondaryText }}>赞 {item.likes}</ThemedText>
                </Pressable>
                <Pressable style={styles.actionBtn}>
                  <ThemedText style={{ color: secondaryText }}>评论 {item.comments}</ThemedText>
                </Pressable>
              </View>
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
    gap: 8,
  },
  content: {
    fontSize: 15,
    lineHeight: 22,
  },
  metaRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    height: 28,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  separator: {
    height: 0.5,
    marginLeft: 16,
  },
});
