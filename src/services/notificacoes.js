import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Alert, Platform } from "react-native";
 
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
 
export const registrarParaNotificacoes = async (t) => {
  if (!Device.isDevice) return false;
 
  const { status: statusAtual } = await Notifications.getPermissionsAsync();
  let statusFinal = statusAtual;
 
  if (statusAtual !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    statusFinal = status;
  }
 
  if (statusFinal !== "granted") {
    Alert.alert(
      t("permissions.notification_denied_title"),
      t("permissions.notification_denied_msg")
    );
    return false;
  }
 
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }
 
  return true;
};

export const enviarNotificacaoBemVindo = async (t) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: t("notifications.welcome_title"),
      body: t("notifications.welcome_body"),
      sound: true,
    },
    trigger: null,
  });
};
 
export const enviarNotificacaoNotaCriada = async (titulo, t) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: t("notifications.note_created_title"),
      body: `"${titulo}" ${t("notifications.note_created_body")}`,
      sound: true,
    },
    trigger: null,
  });
};
 
export const enviarNotificacaoNotaAtualizada = async (titulo, t) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: t("notifications.note_updated_title"),
      body: `"${titulo}" ${t("notifications.note_updated_body")}`,
      sound: true,
    },
    trigger: null,
  });
};