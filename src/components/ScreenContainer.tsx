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
        <LinearGradient
          colors={["rgba(37,99,235,0.08)", "rgba(37,99,235,0.015)"]}
          style={{ position: "absolute", top: 180, right: 24, width: 92, height: 92, borderRadius: 92 }}
        />
        <LinearGradient
          colors={["rgba(5,150,105,0.13)", "rgba(5,150,105,0.02)"]}
          style={{ position: "absolute", bottom: 220, left: -18, width: 120, height: 120, borderRadius: 120 }}
        />
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
