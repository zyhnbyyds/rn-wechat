export type ChatSession = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
};

export type Contact = {
  id: string;
  name: string;
  tag: string;
};

export type DiscoverEntry = {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
};

export type ProfileMenuItem = {
  id: string;
  title: string;
  subtitle?: string;
};

export type Moment = {
  id: string;
  author: string;
  content: string;
  time: string;
  likes: number;
  comments: number;
};