import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { GlassPanel } from "@/components/GlassPanel";
import { IncidentGlyph } from "@/components/IncidentGlyph";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ScreenContainer } from "@/components/ScreenContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { StatusChip } from "@/components/StatusChip";
import { coveredCategories } from "@/constants/content";
import { type } from "@/constants/typography";
import { useZitoData } from "@/hooks/useZitoData";
import { formatCompactCurrency, formatDateTime } from "@/utils/format";
import type { EventScenario } from "@/types";

export const ProtectionDetailsScreen = () => {
  const navigation = useNavigation<any>();
  const { workerQuery, coverageQuery } = useZitoData();

  if (!workerQuery.data || !coverageQuery.data) {
    return <ScreenContainer />;
  }

  const worker = workerQuery.data;
  const coverage = coverageQuery.data;

  return (
    <ScreenContainer>
      <Animated.View entering={FadeInDown.duration(450)}>
        <Text style={type.eyebrow} className="text-black/40">Protection plan</Text>
        <Text style={type.screenTitle} className="mt-3 text-[#111111]">Protection details</Text>
        <Text style={type.body} className="mt-3 text-black/58">One weekly premium, daily micro-installments, and automatic payout decisions when verified disruption thresholds are breached.</Text>
      </Animated.View>

      <GlassPanel className="mt-6 overflow-hidden px-5 py-5">
        <View className="absolute right-[-18] top-[-18] h-28 w-28 rounded-full bg-black/[0.03]" />
        <View className="flex-row items-start justify-between gap-3">
          <View className="flex-1 pr-3">
            <Text style={type.eyebrow} className="text-black/40">Coverage active</Text>
            <Text style={type.sectionTitle} className="mt-3 text-[#111111]">This week's premium is locked</Text>
            <Text style={type.bodySmall} className="mt-3 text-black/60">EV Score is recomputed every Sunday at midnight from weather forecasts, AQI, platform uptime history, and your earnings variance.</Text>
          </View>
          <StatusChip label={coverage.status} />
        </View>
      </GlassPanel>

      <View className="mt-6 gap-3">
        <GlassPanel className="px-5 py-5">
          <SectionHeader title="How it works" />
          <Text style={type.body} className="text-black/65">Zito verifies covered disruptions in your registered zone, checks your recent work-state eligibility, and credits support automatically to your linked UPI account.</Text>
        </GlassPanel>

        <GlassPanel className="px-5 py-5">
          <SectionHeader title="Covered categories" />
          <View className="gap-4">
            {coveredCategories.map((category) => (
              <View key={category.title} className="flex-row items-start gap-4 rounded-[24px] border border-black/[0.06] bg-black/[0.02] px-4 py-4">
                <IncidentGlyph scenario={category.key as EventScenario} size={44} />
                <View className="flex-1">
                  <Text style={type.bodyStrong} className="text-[#111111]">{category.title}</Text>
                  <Text style={type.bodySmall} className="mt-2 text-black/60">{category.body}</Text>
                  <Text style={type.eyebrowTight} className="mt-3 text-black/42">{category.note}</Text>
                </View>
              </View>
            ))}
          </View>
        </GlassPanel>

        <GlassPanel className="px-5 py-5">
          <SectionHeader title="Weekly premium" />
          <View className="gap-4">
            <View className="flex-row items-start justify-between gap-3 border-b border-black/[0.06] pb-4">
              <Text style={type.eyebrow} className="text-black/38">Current premium</Text>
              <Text style={type.body} className="max-w-[60%] text-right text-[#111111]">{formatCompactCurrency(coverage.weeklyPremium)}</Text>
            </View>
            <View className="flex-row items-start justify-between gap-3 border-b border-black/[0.06] pb-4">
              <Text style={type.eyebrow} className="text-black/38">Daily collection</Text>
              <Text style={type.body} className="max-w-[60%] text-right text-[#111111]">{formatCompactCurrency(coverage.dailyInstallmentAmount)} from earnings</Text>
            </View>
            <View className="flex-row items-start justify-between gap-3 border-b border-black/[0.06] pb-4">
              <Text style={type.eyebrow} className="text-black/38">Locked at</Text>
              <Text style={type.body} className="max-w-[60%] text-right text-[#111111]">{formatDateTime(coverage.premiumLockedAt)}</Text>
            </View>
            <View className="flex-row items-start justify-between gap-3">
              <Text style={type.eyebrow} className="text-black/38">Current band</Text>
              <Text style={type.body} className="max-w-[60%] text-right text-[#111111]">{coverage.premiumTier}</Text>
            </View>
          </View>
        </GlassPanel>

        <GlassPanel className="px-5 py-5">
          <SectionHeader title="Plan setup" />
          <View className="gap-4">
            <View className="flex-row items-start justify-between gap-3 border-b border-black/[0.06] pb-4">
              <Text style={type.eyebrow} className="text-black/38">Worker ID</Text>
              <Text style={type.body} className="max-w-[60%] text-right text-[#111111]">{worker.workerId}</Text>
            </View>
            <View className="flex-row items-start justify-between gap-3 border-b border-black/[0.06] pb-4">
              <Text style={type.eyebrow} className="text-black/38">Registered zone</Text>
              <Text style={type.body} className="max-w-[60%] text-right text-[#111111]">{worker.registeredZone}</Text>
            </View>
            <View className="flex-row items-start justify-between gap-3 border-b border-black/[0.06] pb-4">
              <Text style={type.eyebrow} className="text-black/38">Identity</Text>
              <Text style={type.body} className="max-w-[60%] text-right text-[#111111]">{worker.aadhaarLinkedPhoneVerified ? "Aadhaar-linked phone confirmed" : "Verification pending"}</Text>
            </View>
            <View className="flex-row items-start justify-between gap-3">
              <Text style={type.eyebrow} className="text-black/38">Payout destination</Text>
              <Text style={type.body} className="max-w-[60%] text-right text-[#111111]">{worker.upiId}</Text>
            </View>
          </View>
        </GlassPanel>
      </View>

      <View className="mt-6">
        <PrimaryButton label="Close" tone="secondary" onPress={() => navigation.goBack()} />
      </View>
    </ScreenContainer>
  );
};
