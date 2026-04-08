import { useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { discoverEntries } from '@/constants/mock';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function DiscoverScreen() {
  const router = useRouter();
  const separatorColor = useThemeColor({}, 'separator');
  const cardColor = useThemeColor({}, 'card');
  const secondaryText = useThemeColor({}, 'secondaryText');
  const badgeBackground = useThemeColor({}, 'badgeBackground');
  const badgeText = useThemeColor({}, 'badgeText');

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        发现
      </ThemedText>
      <FlatList
        data={discoverEntries}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: separatorColor }]} />}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.row, { backgroundColor: cardColor }]}
            onPress={() => {
              if (item.title === '朋友圈') {
                router.push('/(tabs)/moments');
              }
            }}>
            <View style={styles.rowLeft}>
              <IconSymbol name="safari.fill" size={18} color={secondaryText} />
              <ThemedText>{item.title}</ThemedText>
            </View>
            <View style={styles.rowRight}>
              {item.badge ? (
                <View style={[styles.badge, { backgroundColor: badgeBackground }]}>
                  <ThemedText style={{ color: badgeText, fontSize: 11 }}>{item.badge}</ThemedText>
                </View>
              ) : null}
              <IconSymbol name="chevron.right" size={16} color={secondaryText} />
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
    paddingTop: 56,
  },
  title: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  row: {
    height: 52,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  separator: {
    height: 0.5,
    marginLeft: 16,
  },
});
