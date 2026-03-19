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
import { type } from "@/constants/typography";
import { useZitoData } from "@/hooks/useZitoData";
import { formatCompactCurrency, getGreetingName } from "@/utils/format";

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
        <Text style={type.eyebrow} className="text-black/42">ZITO</Text>
        <Text style={type.heroHeading} className="mt-4 text-[#111111]">Hi {getGreetingName(worker.name)}</Text>
        <Text style={type.body} className="mt-2 text-black/55">Protected this week</Text>
        <Text
          style={[type.heroValue, compact ? { fontSize: 42, lineHeight: 46 } : null]}
          className="mt-2 text-[#111111]"
        >
          {formatCompactCurrency(coverage.remainingProtectedEarnings)}
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(120).duration(450)} className="mt-6">
        <GradientCard className="px-5 py-6">
          <View className="flex-row items-start justify-between gap-3">
            <View className="flex-1 pr-2">
              <Text style={type.eyebrow} className="text-black/50">Coverage active</Text>
              <Text style={[type.sectionTitle, { fontSize: 24, lineHeight: 30 }]} className="mt-3 text-[#111111]">Weekly premium locked</Text>
              <Text style={type.body} className="mt-3 text-black/64">Protection is running for this week's cycle.</Text>
            </View>
            <StatusChip label={coverage.status} />
          </View>

          <View className={`mt-6 gap-4 ${compact ? "" : "flex-row items-end justify-between"}`}>
            <View>
              <Text style={type.eyebrow} className="text-black/45">EV score</Text>
              <Text style={[type.metricValue, { fontSize: 36, lineHeight: 40 }]} className="mt-2 text-[#111111]">{coverage.evScore}</Text>
            </View>
            <View>
              <Text style={type.eyebrow} className="text-black/45">Band</Text>
              <Text style={type.bodyStrong} className="mt-2 text-[#111111]">{coverage.premiumTier}</Text>
            </View>
          </View>

          <View className="mt-6 flex-row flex-wrap gap-2">
            <View className="rounded-full border border-black/[0.08] bg-black/[0.03] px-4 py-2">
              <Text style={type.eyebrowTight} className="text-black/50">Zone</Text>
              <Text style={type.label} className="mt-1 text-[#111111]">Koramangala</Text>
            </View>
            <View className="rounded-full border border-black/[0.08] bg-black/[0.03] px-4 py-2">
              <Text style={type.eyebrowTight} className="text-black/50">Platform</Text>
              <Text style={type.label} className="mt-1 text-[#111111]">{worker.platform}</Text>
            </View>
          </View>
        </GradientCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(180).duration(450)} className="mt-6">
        <Text style={type.eyebrow} className="mb-4 text-black/50">Operating conditions</Text>
        <ConditionRow aqi={`${conditions.aqi}`} aqiStatus={conditions.aqiBand} temperature={`${conditions.temperature}\u00B0C`} temperatureStatus={conditions.heatBand} platform={conditions.platformStatus} platformStatus={conditions.platformStatus} />
      </Animated.View>

      {latestIncident ? (
        <Animated.View entering={FadeInDown.delay(230).duration(450)} className="mt-6">
          <GlassPanel className="overflow-hidden px-5 py-5">
            <View className="absolute left-0 top-0 h-full w-1 rounded-full bg-[#111111]" />
            <Text style={type.eyebrow} className="text-black/50">Last verified disruption</Text>
            <Text style={type.sectionTitle} className="mt-3 text-[#111111]">{latestIncident.eventType} paid automatically</Text>
            <Text style={type.bodySmall} className="mt-2 text-black/60">{latestIncident.summary}</Text>
          </GlassPanel>
        </Animated.View>
      ) : null}

      <View className={`mt-6 gap-3 ${compact ? "" : "flex-row"}`}>
        <MetricCard label="Today's protected earnings" value={formatCompactCurrency(coverage.earningsProtectedToday)} compact={compact} />
        <MetricCard label="Weekly premium" value={formatCompactCurrency(coverage.weeklyPremium)} hint={coverage.premiumWindowLabel} compact={compact} />
      </View>

      <View className={`mt-3 gap-3 ${compact ? "" : "flex-row"}`}>
        <MetricCard label="Today's premium debit" value={formatCompactCurrency(coverage.dailyInstallmentAmount)} hint={coverage.premiumCollectionLabel} compact={compact} />
        <MetricCard label="Last payout" value={latestIncident ? formatCompactCurrency(latestIncident.amount) : "No payout yet"} hint={latestIncident ? latestIncident.eventType : undefined} compact={compact} />
      </View>

      <View className="mt-6">
        <SectionHeader title="Payout history" subtitle="Automatic incident decisions and credited payouts" />
        {latestIncident ? history.slice(0, 3).map((incident) => <IncidentCard key={incident.id} incident={incident} onPress={() => navigation.getParent()?.navigate("IncidentDetail", { incidentId: incident.id })} />) : (
          <GlassPanel className="px-5 py-5">
            <Text style={type.bodyStrong} className="text-[#111111]">Protection is active</Text>
            <Text style={type.bodySmall} className="mt-3 text-black/58">Monitoring is running across AQI, extreme heat, and platform uptime in your zone.</Text>
          </GlassPanel>
        )}
      </View>

      <View className="mt-6">
        <SectionHeader title="Coverage insight" subtitle="Current policy posture" />
        <GlassPanel className="px-5 py-5">
          <Text style={type.bodyStrong} className="text-[#111111]">{coverage.insight}</Text>
          <Text style={type.bodySmall} className="mt-3 text-black/58">There is nothing to configure. Protection is already running in the background.</Text>
        </GlassPanel>
      </View>

      <View className="mt-6">
        <PrimaryButton label="View protection details" tone="secondary" onPress={() => navigation.getParent()?.navigate("ProtectionDetails")} />
      </View>
    </ScreenContainer>
  );
};



