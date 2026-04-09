import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

/** 是否运行在 Expo Go 中（SDK 53 起不支持远程推送） */
const isExpoGo = Constants.appOwnership === 'expo';

// 仅在非 Expo Go 环境下设置通知处理器
if (!isExpoGo) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

async function requestPermissionAndGetToken(): Promise<string | null> {
  if (!Device.isDevice) {
    return null;
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;

  if (existing !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return null;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: '默认通知',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#07c160',
    });
  }

  try {
    const token = await Notifications.getExpoPushTokenAsync();
    return token.data;
  } catch {
    // Expo Go 从 SDK 53 起不支持远程推送 token，忽略此错误
    return null;
  }
}

export type UsePushNotificationsResult = {
  /** Expo Push Token（真机上才有值） */
  expoPushToken: string | null;
  /** 最近收到的通知 */
  notification: Notifications.Notification | null;
  /** 手动发送一条本地通知（可用于测试） */
  sendLocalNotification: (title: string, body: string) => Promise<void>;
};

export function usePushNotifications(): UsePushNotificationsResult {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);

  const notificationListener = useRef<Notifications.EventSubscription | null>(null);
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    if (isExpoGo) return;

    requestPermissionAndGetToken().then(setExpoPushToken);

    notificationListener.current = Notifications.addNotificationReceivedListener((n) => {
      setNotification(n);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(() => {
      // 用户点击通知后的处理（可在此导航到具体页面）
    });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  async function sendLocalNotification(title: string, body: string) {
    if (isExpoGo) return;
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
      },
      trigger: null, // 立即发送
    });
  }

  return { expoPushToken, notification, sendLocalNotification };
}
