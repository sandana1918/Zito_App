import Constants from "expo-constants";
import { Platform } from "react-native";

const fallback = Platform.select({
  android: "http://10.0.2.2:4000",
  ios: "http://localhost:4000",
  default: "http://localhost:4000"
});

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  Constants.expoConfig?.extra?.apiUrl ||
  fallback ||
  "http://localhost:4000";

