import { Text, View } from "react-native";
import { GlassPanel } from "@/components/GlassPanel";
import { type } from "@/constants/typography";

interface MetricCardProps {
  label: string;
  value: string;
  hint?: string;
  compact?: boolean;
}

export const MetricCard = ({ label, value, hint, compact = false }: MetricCardProps) => (
  <GlassPanel className={`flex-1 overflow-hidden px-4 py-4 ${compact ? "min-h-[104px]" : "min-h-[122px]"}`}>
    <View className="absolute right-0 top-0 h-20 w-20 rounded-full bg-black/[0.02]" style={{ transform: [{ translateX: 18 }, { translateY: -18 }] }} />
    <Text style={type.eyebrowTight} className="text-black/40">{label}</Text>
    <Text style={compact ? type.metricValueCompact : type.metricValue} className="mt-3 text-[#111111]" numberOfLines={2}>
      {value}
    </Text>
    {hint ? (
      <Text style={type.bodySmall} className="mt-3 text-black/50" numberOfLines={2}>
        {hint}
      </Text>
    ) : null}
  </GlassPanel>
);
