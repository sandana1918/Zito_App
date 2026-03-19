import { useNavigation } from "@react-navigation/native";
import { Text, View, useWindowDimensions } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { EmptyState } from "@/components/EmptyState";
import { IncidentCard } from "@/components/IncidentCard";
import { MetricCard } from "@/components/MetricCard";
import { ScreenContainer } from "@/components/ScreenContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { useZitoData } from "@/hooks/useZitoData";
import { formatCompactCurrency } from "@/utils/format";

export const HistoryScreen = () => {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();
  const compact = width < 390;
  const { historyQuery } = useZitoData();

  if (!historyQuery.data) {
    return <ScreenContainer />;
  }

  const total = historyQuery.data.reduce((sum, incident) => sum + incident.amount, 0);

  return (
    <ScreenContainer>
      <Animated.View entering={FadeInDown.duration(450)}>
        <Text className="text-[34px] font-semibold text-[#111111]">Payout history</Text>
        <Text className="mt-3 text-[15px] leading-7 text-black/58">Every verified disruption and automatic credit is recorded here.</Text>
      </Animated.View>

      <View className={`mt-6 gap-3 ${compact ? "" : "flex-row"}`}>
        <MetricCard label="Total protected payouts" value={formatCompactCurrency(total)} compact={compact} />
        <MetricCard label="This week credited" value={formatCompactCurrency(total)} compact={compact} />
      </View>

      <View className="mt-6">
        <SectionHeader title="Transactions" />
        {historyQuery.data.length ? (
          historyQuery.data.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} onPress={() => navigation.getParent()?.navigate("IncidentDetail", { incidentId: incident.id })} />
          ))
        ) : (
          <EmptyState title="No payouts yet" body="When a verified disruption affects your working hours, the credited payout will appear here automatically." />
        )}
      </View>
    </ScreenContainer>
  );
};
