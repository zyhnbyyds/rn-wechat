import { useRouter } from 'expo-router';
import { Pressable, SectionList, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { discoverEntries } from '@/constants/mock';
import { useThemeColor } from '@/hooks/use-theme-color';

const ICON_COLORS: Record<string, string> = {
  'd1': '#07c160',
  'd2': '#fa8c16',
  'd3': '#1890ff',
  'd4': '#ff4d4f',
  'd5': '#52c41a',
  'd6': '#722ed1',
  'd7': '#eb2f96',
  'd8': '#13c2c2',
};

const groups = Array.from(new Set(discoverEntries.map((e) => e.group))).map((g) => ({
  key: String(g),
  data: discoverEntries.filter((e) => e.group === g),
}));

export default function DiscoverScreen() {
  const router = useRouter();
  const separatorColor = useThemeColor({}, 'separator');
  const cardColor = useThemeColor({}, 'card');
  const secondaryText = useThemeColor({}, 'secondaryText');
  const badgeBackground = useThemeColor({}, 'badgeBackground');
  const badgeText = useThemeColor({}, 'badgeText');

  function handlePress(title: string) {
    if (title === '朋友圈') {
      router.push('/moments');
    }
  }

  return (
    <ThemedView style={styles.container}>
      <SectionList
        sections={groups}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        SectionSeparatorComponent={() => (
          <View style={[styles.groupSeparator]} />
        )}
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, { backgroundColor: separatorColor }]} />
        )}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.row, { backgroundColor: cardColor }]}
            onPress={() => handlePress(item.title)}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconBox, { backgroundColor: ICON_COLORS[item.id] ?? '#999' }]}>
                <IconSymbol
                  name={item.icon as any}
                  size={16}
                  color="#fff"
                />
              </View>
              <ThemedText style={styles.rowTitle}>{item.title}</ThemedText>
            </View>
            <View style={styles.rowRight}>
              {item.badge ? (
                <View style={[styles.badge, { backgroundColor: badgeBackground }]}>
                  <ThemedText style={[styles.badgeText, { color: badgeText }]}>
                    {item.badge}
                  </ThemedText>
                </View>
              ) : null}
              <IconSymbol name="chevron.right" size={16} color={secondaryText} />
            </View>
          </Pressable>
        )}
        renderSectionHeader={() => null}
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
  badgeText: {
    fontSize: 11,
  },
  separator: {
    height: 0.5,
    marginLeft: 58,
  },
  groupSeparator: {
    height: 8,
  },
});

