import { Text, View } from "react-native";
import { GlassPanel } from "@/components/GlassPanel";

interface MetricCardProps {
  label: string;
  value: string;
  hint?: string;
  compact?: boolean;
}

export const MetricCard = ({ label, value, hint, compact = false }: MetricCardProps) => (
  <GlassPanel className={`flex-1 overflow-hidden px-4 py-4 ${compact ? "min-h-[104px]" : "min-h-[122px]"}`}>
    <View className="absolute right-0 top-0 h-20 w-20 rounded-full bg-black/[0.02]" style={{ transform: [{ translateX: 18 }, { translateY: -18 }] }} />
    <Text className="text-[10px] uppercase tracking-[1.8px] text-black/40">{label}</Text>
    <Text className={`mt-3 font-semibold tracking-[-0.5px] text-[#111111] ${compact ? "text-[22px] leading-7" : "text-[28px] leading-8"}`} numberOfLines={2}>
      {value}
    </Text>
    {hint ? (
      <Text className="mt-3 text-[12px] leading-5 text-black/50" numberOfLines={2}>
        {hint}
      </Text>
    ) : null}
  </GlassPanel>
);
