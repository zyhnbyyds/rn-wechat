import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { moments as initialMoments } from '@/constants/mock';
import type { Moment } from '@/constants/mock/types';
import { useThemeColor } from '@/hooks/use-theme-color';

const SCREEN_WIDTH = Dimensions.get('window').width;
const IMAGE_SIZE = (SCREEN_WIDTH - 16 - 48 - 12 - 4) / 3;

function ImageGrid({ images }: { images: string[] }) {
  const placeholderColor = useThemeColor({ light: '#d0d0d0', dark: '#3a3a3a' }, 'background');
  if (!images || images.length === 0) return null;
  const cols = images.length === 1 ? 1 : images.length === 4 ? 2 : 3;
  const imgSize = cols === 1 ? (SCREEN_WIDTH - 16 - 48 - 12) * 0.6 : IMAGE_SIZE;
  return (
    <View style={[styles.imageGrid, { gap: 4 }]}>
      {images.map((key) => (
        <View
          key={key}
          style={[
            styles.imagePlaceholder,
            { width: imgSize, height: imgSize, backgroundColor: placeholderColor },
          ]}
        />
      ))}
    </View>
  );
}

function MomentCard({
  item,
  onLike,
}: {
  item: Moment;
  onLike: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const secondaryText = useThemeColor({}, 'secondaryText');
  const separatorColor = useThemeColor({}, 'separator');
  const tint = useThemeColor({}, 'tint');
  const likeColor = useThemeColor({ light: '#576b95', dark: '#7a9fd4' }, 'text');

  const MAX_LINES = 4;
  const isLong = item.content.length > MAX_LINES * 20;

  return (
    <View style={styles.momentCard}>
      {/* Avatar column */}
      <View style={[styles.momentAvatar, { backgroundColor: item.avatarColor }]}>
        <ThemedText style={styles.momentAvatarText}>{item.author.charAt(0)}</ThemedText>
      </View>

      {/* Content column */}
      <View style={styles.momentContent}>
        <ThemedText style={[styles.momentAuthor, { color: likeColor }]}>{item.author}</ThemedText>

        <ThemedText
          style={styles.momentText}
          numberOfLines={expanded || !isLong ? undefined : MAX_LINES}>
          {item.content}
        </ThemedText>
        {isLong && (
          <Pressable onPress={() => setExpanded((v) => !v)}>
            <ThemedText style={[styles.expandBtn, { color: likeColor }]}>
              {expanded ? '收起' : '全文'}
            </ThemedText>
          </Pressable>
        )}

        {item.images && item.images.length > 0 && (
          <ImageGrid images={item.images} />
        )}

        <View style={styles.momentMeta}>
          <ThemedText style={[styles.momentTime, { color: secondaryText }]}>{item.time}</ThemedText>
          <View style={styles.momentActions}>
            <Pressable style={styles.actionBtn} onPress={() => onLike(item.id)}>
              <IconSymbol
                name={item.likedByMe ? 'heart.fill' : 'heart'}
                size={14}
                color={item.likedByMe ? tint : secondaryText}
              />
              <ThemedText
                style={[
                  styles.actionText,
                  { color: item.likedByMe ? tint : secondaryText },
                ]}>
                {item.likes}
              </ThemedText>
            </Pressable>
            <Pressable style={styles.actionBtn}>
              <IconSymbol name="message.fill" size={14} color={secondaryText} />
              <ThemedText style={[styles.actionText, { color: secondaryText }]}>
                {item.comments}
              </ThemedText>
            </Pressable>
          </View>
        </View>

        <View style={[styles.cardDivider, { backgroundColor: separatorColor }]} />
      </View>
    </View>
  );
}

export default function MomentsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [momentList, setMomentList] = useState<Moment[]>(initialMoments);
  const coverBg = useThemeColor({ light: '#3a3a3a', dark: '#1a1a1a' }, 'background');
  const cardColor = useThemeColor({}, 'card');
  const secondaryText = useThemeColor({}, 'secondaryText');

  function handleLike(id: string) {
    setMomentList((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        return {
          ...m,
          likedByMe: !m.likedByMe,
          likes: m.likedByMe ? m.likes - 1 : m.likes + 1,
        };
      })
    );
  }

  const ListHeader = (
    <View>
      {/* Cover photo */}
      <View style={[styles.cover, { backgroundColor: coverBg, paddingTop: insets.top }]}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={26} color="#fff" />
        </Pressable>
        <ThemedText style={styles.coverTitle}>朋友圈</ThemedText>
        {/* My avatar overlay */}
        <View style={[styles.myAvatarWrapper]}>
          <View style={[styles.myAvatar, { backgroundColor: '#07c160' }]}>
            <ThemedText style={styles.myAvatarText}>我</ThemedText>
          </View>
        </View>
      </View>
      {/* My name row */}
      <View style={[styles.myNameRow, { backgroundColor: cardColor }]}>
        <ThemedText style={[styles.myName, { color: secondaryText }]}>微信用户</ThemedText>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={momentList}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        renderItem={({ item }) => (
          <MomentCard item={item} onLike={handleLike} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 32,
  },
  cover: {
    height: 220,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 0,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  coverTitle: {
    position: 'absolute',
    bottom: 56,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  myAvatarWrapper: {
    position: 'absolute',
    right: 16,
    bottom: -28,
  },
  myAvatar: {
    width: 56,
    height: 56,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  myAvatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  myNameRow: {
    height: 44,
    paddingRight: 88,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  myName: {
    fontSize: 14,
    fontWeight: '600',
  },
  momentCard: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 12,
    paddingTop: 12,
    gap: 10,
  },
  momentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  momentAvatarText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  momentContent: {
    flex: 1,
    gap: 6,
  },
  momentAuthor: {
    fontSize: 15,
    fontWeight: '600',
  },
  momentText: {
    fontSize: 15,
    lineHeight: 22,
  },
  expandBtn: {
    fontSize: 14,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  imagePlaceholder: {
    borderRadius: 4,
  },
  momentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  momentTime: {
    fontSize: 12,
  },
  momentActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 28,
  },
  actionText: {
    fontSize: 13,
  },
  cardDivider: {
    height: 0.5,
    marginTop: 8,
  },
});

