import type { Message } from './types';

export const mockMessages: Record<string, Message[]> = {
  c1: [
    { id: 'c1m1', sessionId: 'c1', text: '各位，明早 10 点产品评审，请准时参加', time: '20:05', isMine: false },
    { id: 'c1m2', sessionId: 'c1', text: '好的，我会准时参加', time: '20:07', isMine: true },
    { id: 'c1m3', sessionId: 'c1', text: '收到，PPT 记得提前发一下', time: '20:10', isMine: false },
    { id: 'c1m4', sessionId: 'c1', text: '已发到群文件了', time: '20:12', isMine: true },
    { id: 'c1m5', sessionId: 'c1', text: '明早 10 点评审', time: '20:18', isMine: false },
  ],
  c2: [
    { id: 'c2m1', sessionId: 'c2', text: '那个需求文档发我一下', time: '19:30', isMine: false },
    { id: 'c2m2', sessionId: 'c2', text: '好，稍等一下', time: '19:35', isMine: true },
    { id: 'c2m3', sessionId: 'c2', text: '收到，稍后发你', time: '19:42', isMine: false },
  ],
  c3: [
    { id: 'c3m1', sessionId: 'c3', text: 'PR 已提交，麻烦 review 一下', time: '17:50', isMine: true },
    { id: 'c3m2', sessionId: 'c3', text: 'LGTM 👍', time: '17:58', isMine: false },
    { id: 'c3m3', sessionId: 'c3', text: '已合并到 develop', time: '18:09', isMine: false },
  ],
  c4: [
    { id: 'c4m1', sessionId: 'c4', text: '妈，周末回来吃饭吗？', time: '昨天 18:00', isMine: true },
    { id: 'c4m2', sessionId: 'c4', text: '当然，周末一起吃饭', time: '昨天 18:05', isMine: false },
    { id: 'c4m3', sessionId: 'c4', text: '我也去！', time: '昨天 18:10', isMine: false },
  ],
  c5: [
    { id: 'c5m1', sessionId: 'c5', text: '你到了吗？', time: '周二 19:00', isMine: false },
    { id: 'c5m2', sessionId: 'c5', text: '快了，还有5分钟', time: '周二 19:01', isMine: true },
    { id: 'c5m3', sessionId: 'c5', text: '地铁口见', time: '周二 19:02', isMine: false },
  ],
};
