import type { PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { gradients } from "@/constants/theme";

interface ScreenContainerProps extends PropsWithChildren {
  scroll?: boolean;
}

export const ScreenContainer = ({ children, scroll = true }: ScreenContainerProps) => {
  const content = <View className="flex-1 px-5 pb-32 pt-3">{children}</View>;

  return (
    <LinearGradient colors={gradients.background as [string, string, string]} style={{ flex: 1 }}>
      <View pointerEvents="none" style={{ position: "absolute", inset: 0 }}>
        <LinearGradient colors={gradients.ambientTop as [string, string]} style={{ position: "absolute", top: -40, left: -30, width: 280, height: 280, borderRadius: 280 }} />
        <LinearGradient colors={gradients.ambientBottom as [string, string]} style={{ position: "absolute", right: -60, bottom: 100, width: 260, height: 260, borderRadius: 260 }} />
        <View style={{ position: "absolute", top: 180, right: 24, width: 92, height: 92, borderRadius: 92, backgroundColor: "rgba(255,255,255,0.015)", borderWidth: 1, borderColor: "rgba(255,255,255,0.03)" }} />
      </View>
      <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
        {scroll ? (
          <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            {content}
          </ScrollView>
        ) : (
          content
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};
