import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { chatSessions, mockMessages } from '@/constants/mock';
import type { Message } from '@/constants/mock/types';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const session = chatSessions.find((s) => s.id === id);
  const initialMessages: Message[] = mockMessages[id ?? ''] ?? [];
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const listRef = useRef<FlatList>(null);

  const cardColor = useThemeColor({}, 'card');
  const separatorColor = useThemeColor({}, 'separator');
  const secondaryText = useThemeColor({}, 'secondaryText');
  const tint = useThemeColor({}, 'tint');
  const inputBackground = useThemeColor({ light: '#f0f0f0', dark: '#2a2a2a' }, 'background');
  const inputTextColor = useThemeColor({}, 'text');
  const bubbleMineColor = '#95ec69';
  const bubbleOtherColor = cardColor;

  function handleSend() {
    const text = inputText.trim();
    if (!text) return;
    const newMsg: Message = {
      id: `new-${Date.now()}`,
      sessionId: id ?? '',
      text,
      time: '刚刚',
      isMine: true,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  }

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View
        style={[
          styles.header,
          { paddingTop: insets.top + 8, borderBottomColor: separatorColor },
        ]}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={26} color={secondaryText} />
        </Pressable>
        <ThemedText type="defaultSemiBold" style={styles.headerTitle} numberOfLines={1}>
          {session?.name ?? '聊天'}
        </ThemedText>
        <View style={styles.headerRight} />
      </View>

      {/* Message list */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
          renderItem={({ item, index }) => {
            const showTime =
              index === 0 ||
              messages[index - 1].time !== item.time;
            return (
              <View>
                {showTime && (
                  <ThemedText style={[styles.timeLabel, { color: secondaryText }]}>
                    {item.time}
                  </ThemedText>
                )}
                <View
                  style={[
                    styles.bubbleRow,
                    item.isMine ? styles.bubbleRowMine : styles.bubbleRowOther,
                  ]}>
                  {!item.isMine && (
                    <View
                      style={[
                        styles.avatar,
                        { backgroundColor: session?.avatarColor ?? '#aaa' },
                      ]}>
                      <ThemedText style={styles.avatarText}>
                        {session?.name?.charAt(0) ?? '?'}
                      </ThemedText>
                    </View>
                  )}
                  <View
                    style={[
                      styles.bubble,
                      item.isMine
                        ? [styles.bubbleMine, { backgroundColor: bubbleMineColor }]
                        : [styles.bubbleOther, { backgroundColor: bubbleOtherColor }],
                    ]}>
                    <ThemedText
                      style={[
                        styles.bubbleText,
                        item.isMine ? { color: '#000' } : undefined,
                      ]}>
                      {item.text}
                    </ThemedText>
                  </View>
                  {item.isMine && (
                    <View style={[styles.avatar, { backgroundColor: '#07c160' }]}>
                      <ThemedText style={styles.avatarText}>我</ThemedText>
                    </View>
                  )}
                </View>
              </View>
            );
          }}
        />

        {/* Input bar */}
        <View
          style={[
            styles.inputBar,
            {
              backgroundColor: cardColor,
              borderTopColor: separatorColor,
              paddingBottom: insets.bottom + 4,
            },
          ]}>
          <TextInput
            style={[styles.input, { backgroundColor: inputBackground, color: inputTextColor }]}
            placeholder="发送消息..."
            placeholderTextColor={secondaryText}
            value={inputText}
            onChangeText={setInputText}
            returnKeyType="send"
            onSubmitEditing={handleSend}
            multiline
          />
          <Pressable
            style={[styles.sendBtn, { backgroundColor: inputText.trim() ? tint : separatorColor }]}
            onPress={handleSend}
            disabled={!inputText.trim()}>
            <IconSymbol name="paperplane.fill" size={18} color="#fff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
  },
  backBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
  },
  headerRight: {
    width: 44,
  },
  messageList: {
    padding: 12,
    gap: 4,
  },
  timeLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 8,
  },
  bubbleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 4,
    gap: 8,
  },
  bubbleRowMine: {
    justifyContent: 'flex-end',
  },
  bubbleRowOther: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  bubble: {
    maxWidth: '65%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  bubbleMine: {
    borderTopRightRadius: 2,
  },
  bubbleOther: {
    borderTopLeftRadius: 2,
  },
  bubbleText: {
    fontSize: 15,
    lineHeight: 22,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingTop: 8,
    borderTopWidth: 0.5,
    gap: 8,
  },
  input: {
    flex: 1,
    minHeight: 36,
    maxHeight: 100,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 15,
    lineHeight: 20,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
