export type ChatSession = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  avatarColor: string;
};

export type Message = {
  id: string;
  sessionId: string;
  text: string;
  time: string;
  isMine: boolean;
};

export type Contact = {
  id: string;
  name: string;
  tag: string;
  avatarColor: string;
};

export type DiscoverEntry = {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  icon: string;
  group: number;
};

export type ProfileMenuItem = {
  id: string;
  title: string;
  subtitle?: string;
};

export type Moment = {
  id: string;
  author: string;
  avatarColor: string;
  content: string;
  images?: string[];
  time: string;
  likes: number;
  comments: number;
  likedByMe?: boolean;
};