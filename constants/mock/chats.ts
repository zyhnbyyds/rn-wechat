import type { ChatSession } from './types';

export const chatSessions: ChatSession[] = [
  { id: 'c1', name: '产品群', lastMessage: '明早 10 点评审', time: '20:18', unreadCount: 12 },
  { id: 'c2', name: '张三', lastMessage: '收到，稍后发你', time: '19:42', unreadCount: 1 },
  { id: 'c3', name: '前端团队', lastMessage: '已合并到 develop', time: '18:09', unreadCount: 0 },
  { id: 'c4', name: '家庭群', lastMessage: '周末一起吃饭', time: '昨天', unreadCount: 3 },
  { id: 'c5', name: '李四', lastMessage: '地铁口见', time: '周二', unreadCount: 0 },
];