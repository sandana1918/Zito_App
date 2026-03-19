import { Pressable, Text, View, useWindowDimensions } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { GlassPanel } from "@/components/GlassPanel";
import { IncidentGlyph } from "@/components/IncidentGlyph";
import { StatusChip } from "@/components/StatusChip";
import { type } from "@/constants/typography";
import { formatCompactCurrency, formatDateTime, formatMetaLine } from "@/utils/format";
import type { Incident } from "@/types";

export const IncidentCard = ({ incident, onPress }: { incident: Incident; onPress?: () => void }) => {
  const { width } = useWindowDimensions();
  const compact = width < 390;

  return (
    <Animated.View entering={FadeInDown.duration(450)}>
      <Pressable onPress={onPress} style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.99 : 1 }] }]}>
        <GlassPanel className="mb-3 overflow-hidden px-4 py-4">
          <View className="absolute right-0 top-0 h-24 w-24 rounded-full bg-black/[0.03]" style={{ transform: [{ translateX: 24 }, { translateY: -20 }] }} />
          <View className={`gap-4 ${compact ? "" : "flex-row items-start justify-between"}`}>
            <View className="flex-1 flex-row items-start gap-3">
              <IncidentGlyph scenario={incident.scenario} />
              <View className="flex-1">
                <Text style={type.bodyStrong} className="text-[#111111]">{incident.title}</Text>
                <Text style={type.eyebrowTight} className="mt-1 text-black/42">
                  {formatMetaLine(incident.zone, formatDateTime(incident.creditedAt))}
                </Text>
                <Text style={type.bodySmall} className="mt-3 text-black/68">{incident.shortReason}</Text>
              </View>
            </View>
            <View className={`gap-2 ${compact ? "ml-[60px]" : "items-end"}`}>
              <StatusChip label={incident.status} />
              <Text style={type.metricValueCompact} className="text-[#111111]">{formatCompactCurrency(incident.amount)}</Text>
            </View>
          </View>
        </GlassPanel>
      </Pressable>
    </Animated.View>
  );
};
