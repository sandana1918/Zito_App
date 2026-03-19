import * as Haptics from "expo-haptics";
import { Pressable, Text, View, type PressableProps } from "react-native";
import { type } from "@/constants/typography";

interface PrimaryButtonProps extends PressableProps {
  label: string;
  tone?: "primary" | "secondary" | "ghost";
}

export const PrimaryButton = ({ label, tone = "primary", style, ...props }: PrimaryButtonProps) => {
  const textClassName =
    tone === "primary" ? "text-white" : tone === "secondary" ? "text-[#111111]" : "text-black/60";

  return (
    <Pressable
      {...props}
      onPress={(event) => {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        props.onPress?.(event);
      }}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.92 : 1,
          transform: [{ scale: pressed ? 0.99 : 1 }],
          alignSelf: tone === "ghost" ? "flex-start" : "center"
        },
        style as never
      ]}
    >
      {tone === "primary" ? (
        <View className="min-w-[168px] rounded-[18px] bg-[#111111] px-5 py-[15px]">
          <Text style={type.button} className={`text-center ${textClassName}`} numberOfLines={1}>
            {label}
          </Text>
        </View>
      ) : tone === "secondary" ? (
        <View className="min-w-[156px] rounded-[18px] border border-black/[0.10] bg-white px-5 py-[15px]">
          <Text style={type.button} className={`text-center ${textClassName}`} numberOfLines={1}>
            {label}
          </Text>
        </View>
      ) : (
        <View className="px-3 py-[12px]">
          <Text style={type.button} className={`text-center ${textClassName}`} numberOfLines={1}>
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
};
