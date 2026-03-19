import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { Text, View } from "react-native";
import { GlassPanel } from "@/components/GlassPanel";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ScreenContainer } from "@/components/ScreenContainer";
import { StatusChip } from "@/components/StatusChip";
import { TimelineItem } from "@/components/TimelineItem";
import { useZitoData } from "@/hooks/useZitoData";
import { formatCompactCurrency, formatDateTime } from "@/utils/format";
import type { RootStackParamList } from "@/types";

export const IncidentDetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, "IncidentDetail">>();
  const { historyQuery } = useZitoData();

  if (!historyQuery.data) {
    return <ScreenContainer />;
  }

  const incident = historyQuery.data.find((item) => item.id === route.params.incidentId);

  if (!incident) {
    return <ScreenContainer />;
  }

  return (
    <ScreenContainer>
      <View className="gap-3">
        <Text className="text-[34px] font-semibold text-white">{incident.eventType}</Text>
        <StatusChip label={incident.status} />
        <Text className="text-[15px] leading-7 text-white/[0.58]">{incident.shortReason}</Text>
      </View>

      <GlassPanel className="mt-6 px-5 py-5">
        <Text className="text-[13px] uppercase tracking-[1.2px] text-white/[0.45]">Payout credited</Text>
        <Text className="mt-3 text-[40px] font-semibold text-white">{formatCompactCurrency(incident.amount)}</Text>
        <Text className="mt-2 text-[14px] leading-6 text-white/[0.60]">
          Credited on {formatDateTime(incident.creditedAt)} to {incident.payoutDestination}
        </Text>
      </GlassPanel>

      <View className="mt-6 gap-3">
        <GlassPanel className="px-5 py-5">
          <Text className="text-[13px] uppercase tracking-[1.2px] text-white/[0.45]">Event summary</Text>
          <Text className="mt-3 text-[17px] font-semibold leading-7 text-white">{incident.summary}</Text>
          <Text className="mt-4 text-[14px] leading-6 text-white/[0.62]">Threshold breached • {incident.threshold}</Text>
          <Text className="mt-2 text-[14px] leading-6 text-white/[0.62]">Measured value • {incident.measuredValue}</Text>
          <Text className="mt-2 text-[14px] leading-6 text-white/[0.62]">Zone • {incident.zone}</Text>
        </GlassPanel>

        <GlassPanel className="px-5 py-5">
          <Text className="text-[13px] uppercase tracking-[1.2px] text-white/[0.45]">Timeline</Text>
          <View className="mt-5">
            {incident.timeline.map((item, index) => (
              <TimelineItem key={`${item.label}-${index}`} {...item} isLast={index === incident.timeline.length - 1} />
            ))}
          </View>
        </GlassPanel>

        <GlassPanel className="px-5 py-5">
          <Text className="text-[13px] uppercase tracking-[1.2px] text-white/[0.45]">Verification sources</Text>
          <Text className="mt-3 text-[15px] leading-7 text-white/[0.65]">{incident.sources.join(" + ")}</Text>
          <Text className="mt-2 text-[14px] leading-6 text-white/[0.56]">{incident.oracleNote}</Text>
        </GlassPanel>

        <GlassPanel className="px-5 py-5">
          <Text className="text-[13px] uppercase tracking-[1.2px] text-white/[0.45]">Eligibility</Text>
          <Text className="mt-3 text-[14px] leading-6 text-white/[0.62]">{incident.eligibility}</Text>
        </GlassPanel>

        <GlassPanel className="px-5 py-5">
          <Text className="text-[13px] uppercase tracking-[1.2px] text-white/[0.45]">Resolution</Text>
          <Text className="mt-3 text-[14px] leading-6 text-white/[0.62]">{incident.resolution}</Text>
        </GlassPanel>
      </View>

      <View className="mt-6">
        <PrimaryButton label="Back" tone="secondary" onPress={() => navigation.goBack()} />
      </View>
    </ScreenContainer>
  );
};
