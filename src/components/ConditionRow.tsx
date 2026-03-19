import { Text, View, useWindowDimensions } from "react-native";
import { GlassPanel } from "@/components/GlassPanel";
import { StatusChip } from "@/components/StatusChip";
import { type } from "@/constants/typography";

interface ConditionRowProps {
  aqi: string;
  aqiStatus: string;
  temperature: string;
  temperatureStatus: string;
  platform: string;
  platformStatus: string;
}

export const ConditionRow = ({ aqi, aqiStatus, temperature, temperatureStatus, platform, platformStatus }: ConditionRowProps) => {
  const { width } = useWindowDimensions();
  const compact = width < 390;
  const items = [
    { label: "AQI", value: aqi, status: aqiStatus },
    { label: "Heat", value: temperature, status: temperatureStatus },
    { label: "Platform", value: platform, status: platformStatus }
  ];

  return (
    <View className={`gap-3 ${compact ? "" : "flex-row"}`}>
      {items.map((item) => (
        <GlassPanel key={item.label} className={`px-4 py-4 ${compact ? "" : "flex-1"}`}>
          <Text style={type.eyebrowTight} className="text-black/45">{item.label}</Text>
          <View className="mt-3 flex-row items-start justify-between gap-3">
            <Text style={type.bodyStrong} className="flex-1 text-[#111111]">{item.value}</Text>
            <StatusChip label={item.status} />
          </View>
        </GlassPanel>
      ))}
    </View>
  );
};
