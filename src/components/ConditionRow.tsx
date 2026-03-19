import { Text, View, useWindowDimensions } from "react-native";
import { GlassPanel } from "@/components/GlassPanel";
import { StatusChip } from "@/components/StatusChip";

interface ConditionRowProps {
  aqi: string;
  temperature: string;
  platform: string;
}

export const ConditionRow = ({ aqi, temperature, platform }: ConditionRowProps) => {
  const { width } = useWindowDimensions();
  const compact = width < 390;
  const items = [
    { label: "AQI", value: aqi },
    { label: "Heat", value: temperature },
    { label: "Platform", value: platform }
  ];

  return (
    <View className={`gap-3 ${compact ? "" : "flex-row"}`}>
      {items.map((item) => (
        <GlassPanel key={item.label} className={`px-4 py-4 ${compact ? "" : "flex-1"}`}>
          <Text className="text-[11px] uppercase tracking-[1.1px] text-white/[0.45]">{item.label}</Text>
          <View className="mt-3 flex-row items-start justify-between gap-3">
            <Text className="flex-1 text-[14px] font-semibold leading-5 text-white">{item.value}</Text>
            <StatusChip
              label={
                item.value.includes("Online")
                  ? "Online"
                  : item.value.includes("Outage")
                    ? "Outage"
                    : item.value.includes("Critical") || item.value.includes("Severe")
                      ? "Critical"
                      : "Moderate"
              }
            />
          </View>
        </GlassPanel>
      ))}
    </View>
  );
};
