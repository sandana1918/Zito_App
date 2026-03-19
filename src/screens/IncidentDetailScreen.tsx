import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { Text, View } from "react-native";
import { GlassPanel } from "@/components/GlassPanel";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ScreenContainer } from "@/components/ScreenContainer";
import { StatusChip } from "@/components/StatusChip";
import { TimelineItem } from "@/components/TimelineItem";
import { type } from "@/constants/typography";
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
        <Text style={type.eyebrow} className="text-black/40">Incident detail</Text>
        <Text style={type.screenTitle} className="text-[#111111]">{incident.eventType}</Text>
        <StatusChip label={incident.status} />
        <Text style={type.body} className="text-black/58">{incident.shortReason}</Text>
      </View>

      <GlassPanel className="mt-6 px-5 py-5">
        <Text style={type.eyebrow} className="text-black/45">Payout credited</Text>
        <Text style={[type.heroValue, { fontSize: 40, lineHeight: 44 }]} className="mt-3 text-[#111111]">{formatCompactCurrency(incident.amount)}</Text>
        <Text style={type.bodySmall} className="mt-2 text-black/60">Credited on {formatDateTime(incident.creditedAt)} to {incident.payoutDestination}</Text>
        <Text style={type.bodySmall} className="mt-2 text-black/60">{incident.payoutRail} settled the payout in {incident.settlementSeconds} seconds.</Text>
      </GlassPanel>

      <View className="mt-6 gap-3">
        <GlassPanel className="px-5 py-5">
          <Text style={type.eyebrow} className="text-black/45">Event summary</Text>
          <Text style={type.bodyStrong} className="mt-3 text-[#111111]">{incident.summary}</Text>
          <Text style={type.bodySmall} className="mt-4 text-black/62">Threshold breached / {incident.threshold}</Text>
          <Text style={type.bodySmall} className="mt-2 text-black/62">Measured value / {incident.measuredValue}</Text>
          <Text style={type.bodySmall} className="mt-2 text-black/62">Zone / {incident.zone}</Text>
        </GlassPanel>

        <GlassPanel className="px-5 py-5">
          <Text style={type.eyebrow} className="text-black/45">Timeline</Text>
          <View className="mt-5">
            {incident.timeline.map((item, index) => (
              <TimelineItem key={`${item.label}-${index}`} {...item} isLast={index === incident.timeline.length - 1} />
            ))}
          </View>
        </GlassPanel>

        <GlassPanel className="px-5 py-5">
          <Text style={type.eyebrow} className="text-black/45">Verification</Text>
          <Text style={type.body} className="mt-3 text-black/65">{incident.sources.join(" + ")}</Text>
          <Text style={type.bodySmall} className="mt-2 text-black/56">{incident.oracleNote}</Text>
          <Text style={type.bodySmall} className="mt-3 text-black/62">{incident.workStatusCheck}</Text>
          <Text style={type.bodySmall} className="mt-2 text-black/62">{incident.spoofingCheck}</Text>
        </GlassPanel>

        <GlassPanel className="px-5 py-5">
          <Text style={type.eyebrow} className="text-black/45">Eligibility</Text>
          <Text style={type.bodySmall} className="mt-3 text-black/62">{incident.eligibility}</Text>
        </GlassPanel>

        <GlassPanel className="px-5 py-5">
          <Text style={type.eyebrow} className="text-black/45">Resolution</Text>
          <Text style={type.bodySmall} className="mt-3 text-black/62">{incident.resolution}</Text>
          <Text style={type.bodySmall} className="mt-2 text-black/62">Decision layer / {incident.oracleLayer}</Text>
        </GlassPanel>
      </View>

      <View className="mt-6">
        <PrimaryButton label="Back" tone="secondary" onPress={() => navigation.goBack()} />
      </View>
    </ScreenContainer>
  );
};
