import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View, type PressableProps } from "react-native";
import { gradients } from "@/constants/theme";

interface PrimaryButtonProps extends PressableProps {
  label: string;
  tone?: "primary" | "secondary" | "ghost";
}

export const PrimaryButton = ({ label, tone = "primary", style, ...props }: PrimaryButtonProps) => {
  const content = (
    <Text className={`text-center text-[14px] font-semibold uppercase tracking-[1.2px] ${tone === "ghost" ? "text-white/[0.80]" : "text-white"}`} numberOfLines={1}>
      {label}
    </Text>
  );

  return (
    <Pressable
      {...props}
      onPress={(event) => {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        props.onPress?.(event);
      }}
      style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.985 : 1 }] }, style as never]}
    >
      {tone === "primary" ? (
        <LinearGradient
          colors={gradients.success as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 22, paddingVertical: 17, paddingHorizontal: 22, overflow: "hidden" }}
        >
          <View className="absolute inset-0 bg-white/[0.04]" />
          {content}
        </LinearGradient>
      ) : (
        <View className={`rounded-[22px] px-5 py-[15px] ${tone === "secondary" ? "border border-white/[0.12] bg-white/[0.06]" : "bg-transparent"}`}>
          {content}
        </View>
      )}
    </Pressable>
  );
};
