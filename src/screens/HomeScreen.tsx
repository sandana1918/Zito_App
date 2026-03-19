import { useNavigation } from "@react-navigation/native";
import { Text, View, useWindowDimensions } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ConditionRow } from "@/components/ConditionRow";
import { GlassPanel } from "@/components/GlassPanel";
import { GradientCard } from "@/components/GradientCard";
import { IncidentCard } from "@/components/IncidentCard";
import { MetricCard } from "@/components/MetricCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ScreenContainer } from "@/components/ScreenContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { StatusChip } from "@/components/StatusChip";
import { useZitoData } from "@/hooks/useZitoData";
import { formatCompactCurrency, formatConditionTemperature, getGreetingName } from "@/utils/format";

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();
  const compact = width < 390;
  const { workerQuery, coverageQuery, conditionsQuery, historyQuery } = useZitoData();

  if (!workerQuery.data || !coverageQuery.data || !conditionsQuery.data || !historyQuery.data) {
    return <ScreenContainer />;
  }

  const worker = workerQuery.data;
  const coverage = coverageQuery.data;
  const conditions = conditionsQuery.data;
  const history = historyQuery.data;
  const latestIncident = history[0];

  return (
    <ScreenContainer>
      <Animated.View entering={FadeInDown.duration(450)}>
        <Text className="text-[13px] tracking-[2.4px] text-black/42">ZITO</Text>
        <Text className="mt-4 text-[32px] font-semibold text-[#111111]">Hi {getGreetingName(worker.name)}</Text>
        <Text className="mt-2 text-[15px] text-black/55">Protected this week</Text>
        <Text className={`mt-2 font-semibold text-[#111111] ${compact ? "text-[42px]" : "text-[48px]"}`}>{formatCompactCurrency(coverage.protectedThisWeek)}</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(120).duration(450)} className="mt-6">
        <GradientCard className="px-5 py-6">
          <View className="flex-row items-start justify-between gap-3">
            <View className="flex-1 pr-2">
              <Text className="text-[12px] uppercase tracking-[1.5px] text-black/50">Coverage active</Text>
              <Text className="mt-3 text-[28px] font-semibold leading-9 text-[#111111]">Protection is live</Text>
              <Text className="mt-3 text-[15px] leading-7 text-black/64">Monitoring live conditions and platform health across your registered zone.</Text>
            </View>
            <StatusChip label={coverage.status} />
          </View>

          <View className={`mt-6 gap-4 ${compact ? "" : "flex-row items-end justify-between"}`}>
            <View>
              <Text className="text-[12px] uppercase tracking-[1.3px] text-black/45">EV score</Text>
              <Text className="mt-2 text-[36px] font-semibold text-[#111111]">{coverage.evScore}</Text>
            </View>
            <View>
              <Text className="text-[12px] uppercase tracking-[1.3px] text-black/45">Risk band</Text>
              <Text className="mt-2 text-[20px] font-semibold text-[#111111]">{coverage.riskBand}</Text>
            </View>
          </View>

          <View className="mt-6 flex-row flex-wrap gap-2">
            <View className="rounded-full border border-black/[0.08] bg-black/[0.03] px-4 py-2">
              <Text className="text-[12px] uppercase tracking-[1.2px] text-black/50">Zone</Text>
              <Text className="mt-1 text-[13px] font-semibold text-[#111111]">Koramangala</Text>
            </View>
            <View className="rounded-full border border-black/[0.08] bg-black/[0.03] px-4 py-2">
              <Text className="text-[12px] uppercase tracking-[1.2px] text-black/50">Platform</Text>
              <Text className="mt-1 text-[13px] font-semibold text-[#111111]">Blinkit</Text>
            </View>
          </View>
        </GradientCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(180).duration(450)} className="mt-6">
        <SectionHeader title="Operating conditions" subtitle="Monitoring live conditions" />
        <ConditionRow aqi={`${conditions.aqi} ${conditions.aqiBand}`} temperature={formatConditionTemperature(conditions.temperature, conditions.heatBand)} platform={conditions.platformStatus} />
      </Animated.View>

      {latestIncident ? (
        <Animated.View entering={FadeInDown.delay(230).duration(450)} className="mt-6">
          <GlassPanel className="overflow-hidden px-5 py-5">
            <View className="absolute left-0 top-0 h-full w-1 rounded-full bg-[#111111]" />
            <Text className="text-[12px] uppercase tracking-[1.4px] text-black/50">Verified disruption</Text>
            <Text className="mt-3 text-[22px] font-semibold leading-8 text-[#111111]">{latestIncident.eventType} resolved automatically</Text>
            <Text className="mt-2 text-[14px] leading-6 text-black/60">{latestIncident.summary}</Text>
          </GlassPanel>
        </Animated.View>
      ) : null}

      <View className={`mt-6 gap-3 ${compact ? "" : "flex-row"}`}>
        <MetricCard label="Earnings protected today" value={formatCompactCurrency(coverage.earningsProtectedToday)} compact={compact} />
        <MetricCard label="Next premium" value={formatCompactCurrency(coverage.nextPremiumAmount)} hint={coverage.nextPremiumDueLabel} compact={compact} />
      </View>

      <View className={`mt-3 gap-3 ${compact ? "" : "flex-row"}`}>
        <MetricCard label="Last payout" value={latestIncident ? formatCompactCurrency(latestIncident.amount) : "No payout yet"} compact={compact} />
        <MetricCard label="Active zone" value="Koramangala" hint="Bengaluru" compact={compact} />
      </View>

      <View className="mt-6">
        <SectionHeader title="Recent activity" subtitle="Automatic incident decisions and credited payouts" />
        {latestIncident ? history.slice(0, 3).map((incident) => <IncidentCard key={incident.id} incident={incident} onPress={() => navigation.getParent()?.navigate("IncidentDetail", { incidentId: incident.id })} />) : (
          <GlassPanel className="px-5 py-5">
            <Text className="text-[18px] font-semibold text-[#111111]">Protection is active</Text>
            <Text className="mt-3 text-[14px] leading-6 text-black/58">Live monitoring is running across AQI, heat, and platform conditions in your zone.</Text>
          </GlassPanel>
        )}
      </View>

      <View className="mt-6">
        <SectionHeader title="Protection insight" subtitle="Live reading from your current coverage posture" />
        <GlassPanel className="px-5 py-5">
          <Text className="text-[17px] font-semibold leading-7 text-[#111111]">{coverage.insight}</Text>
          <Text className="mt-3 text-[14px] leading-6 text-black/58">No action is required while monitoring remains active.</Text>
        </GlassPanel>
      </View>

      <View className="mt-6">
        <PrimaryButton label="View protection details" tone="secondary" onPress={() => navigation.getParent()?.navigate("ProtectionDetails")} />
      </View>
    </ScreenContainer>
  );
};
