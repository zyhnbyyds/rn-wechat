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
  const avatarPlaceholder = useThemeColor({}, 'avatarPlaceholder');

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        通讯录
      </ThemedText>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled
        renderSectionHeader={({ section }) => (
          <View style={[styles.sectionHeader, { backgroundColor: separatorColor }]}>
            <ThemedText style={{ color: secondaryText }}>{section.title}</ThemedText>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: separatorColor }]} />}
        renderItem={({ item }) => (
          <View style={[styles.row, { backgroundColor: cardColor }]}>
            <View style={[styles.avatar, { backgroundColor: avatarPlaceholder }]} />
            <ThemedText>{item.name}</ThemedText>
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
  sectionHeader: {
    height: 28,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  row: {
    height: 52,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 6,
    backgroundColor: '#b8b8b8',
  },
  separator: {
    height: 0.5,
    marginLeft: 62,
  },
});
