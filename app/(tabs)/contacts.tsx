import { SectionList, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { contacts } from '@/constants/mock';
import { useThemeColor } from '@/hooks/use-theme-color';

const sections = Array.from(new Set(contacts.map((item) => item.tag))).map((tag) => ({
  title: tag,
  data: contacts.filter((item) => item.tag === tag),
}));

export default function ContactsScreen() {
  const separatorColor = useThemeColor({}, 'separator');
  const cardColor = useThemeColor({}, 'card');
  const secondaryText = useThemeColor({}, 'secondaryText');

  return (
    <ThemedView style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled
        renderSectionHeader={({ section }) => (
          <View style={[styles.sectionHeader, { backgroundColor: separatorColor }]}>
            <ThemedText style={[styles.sectionTitle, { color: secondaryText }]}>
              {section.title}
            </ThemedText>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, { backgroundColor: separatorColor }]} />
        )}
        renderItem={({ item }) => (
          <View style={[styles.row, { backgroundColor: cardColor }]}>
            <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
              <ThemedText style={styles.avatarText}>{item.name.charAt(0)}</ThemedText>
            </View>
            <ThemedText style={styles.name}>{item.name}</ThemedText>
          </View>
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
  sectionHeader: {
    height: 28,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  row: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  name: {
    fontSize: 16,
  },
  separator: {
    height: 0.5,
    marginLeft: 66,
  },
});

