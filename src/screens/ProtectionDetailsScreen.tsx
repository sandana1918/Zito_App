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
import { useZitoData } from "@/hooks/useZitoData";
import { formatCompactCurrency } from "@/utils/format";
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
        <Text className="text-[12px] uppercase tracking-[2px] text-white/[0.40]">Protection plan</Text>
        <Text className="mt-3 text-[34px] font-semibold tracking-[-0.7px] text-white">Protection details</Text>
        <Text className="mt-3 text-[15px] leading-7 text-white/[0.58]">
          Clear coverage designed for working hours that depend on live city and platform conditions.
        </Text>
      </Animated.View>

      <GlassPanel className="mt-6 overflow-hidden px-5 py-5">
        <View className="absolute right-[-18] top-[-18] h-28 w-28 rounded-full bg-[#58A6FF]/[0.10]" />
        <View className="flex-row items-start justify-between gap-3">
          <View className="flex-1 pr-3">
            <Text className="text-[12px] uppercase tracking-[1.8px] text-white/[0.40]">Coverage active</Text>
            <Text className="mt-3 text-[24px] font-semibold tracking-[-0.5px] text-white">Weekly protection window is live</Text>
            <Text className="mt-3 text-[14px] leading-6 text-white/[0.60]">Verified disruptions are evaluated automatically, and credited support lands in the linked payout destination when eligibility is met.</Text>
          </View>
          <StatusChip label={coverage.status} />
        </View>
      </GlassPanel>

      <View className="mt-6 gap-3">
        <GlassPanel className="px-5 py-5">
          <SectionHeader title="What protection does" />
          <Text className="text-[15px] leading-7 text-white/[0.65]">
            Zito verifies covered disruptions in your registered zone and credits support automatically when the eligibility window is met.
          </Text>
        </GlassPanel>

        <GlassPanel className="px-5 py-5">
          <SectionHeader title="Covered categories" />
          <View className="gap-4">
            {coveredCategories.map((category) => (
              <View key={category.title} className="flex-row items-start gap-4 rounded-[24px] border border-white/[0.06] bg-white/[0.03] px-4 py-4">
                <IncidentGlyph scenario={category.key as EventScenario} size={44} />
                <View className="flex-1">
                  <Text className="text-[17px] font-semibold text-white">{category.title}</Text>
                  <Text className="mt-2 text-[13px] leading-5 text-white/[0.60]">{category.body}</Text>
                  <Text className="mt-3 text-[12px] uppercase tracking-[1.4px] text-white/[0.42]">{category.note}</Text>
                </View>
              </View>
            ))}
          </View>
        </GlassPanel>

        <GlassPanel className="px-5 py-5">
          <SectionHeader title="Plan setup" />
          <View className="gap-4">
            <View className="flex-row items-start justify-between gap-3 border-b border-white/[0.06] pb-4">
              <Text className="text-[12px] uppercase tracking-[1.6px] text-white/[0.38]">Registered zone</Text>
              <Text className="max-w-[60%] text-right text-[15px] leading-6 text-white/[0.80]">{worker.registeredZone}</Text>
            </View>
            <View className="flex-row items-start justify-between gap-3 border-b border-white/[0.06] pb-4">
              <Text className="text-[12px] uppercase tracking-[1.6px] text-white/[0.38]">Weekly protection amount</Text>
              <Text className="max-w-[60%] text-right text-[15px] leading-6 text-white/[0.80]">{formatCompactCurrency(coverage.weeklyProtectionAmount)}</Text>
            </View>
            <View className="flex-row items-start justify-between gap-3">
              <Text className="text-[12px] uppercase tracking-[1.6px] text-white/[0.38]">Payout destination</Text>
              <Text className="max-w-[60%] text-right text-[15px] leading-6 text-white/[0.80]">{worker.upiId}</Text>
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
