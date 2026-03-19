import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { GlassPanel } from "@/components/GlassPanel";
import { gradients } from "@/constants/theme";

interface EmptyStateProps {
  title: string;
  body: string;
}

export const EmptyState = ({ title, body }: EmptyStateProps) => (
  <GlassPanel className="overflow-hidden px-6 py-8">
    <LinearGradient
      colors={["rgba(110,99,255,0.18)", "rgba(88,166,255,0.08)", "rgba(0,0,0,0)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ position: "absolute", inset: 0 }}
    />
    <View className="items-center">
      <View className="h-16 w-16 items-center justify-center rounded-[22px] border border-white/[0.10] bg-white/[0.06]">
        <LinearGradient colors={gradients.success as [string, string]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ height: 28, width: 28, borderRadius: 999 }} />
      </View>
      <Text className="mt-5 text-center text-[12px] uppercase tracking-[2px] text-white/[0.42]">Monitoring live</Text>
      <Text className="mt-3 text-center text-[20px] font-semibold leading-7 text-white">{title}</Text>
      <Text className="mt-3 max-w-[280px] text-center text-[14px] leading-6 text-white/[0.60]">{body}</Text>
    </View>
  </GlassPanel>
);
