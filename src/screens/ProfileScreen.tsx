import * as Haptics from "expo-haptics";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { GlassPanel } from "@/components/GlassPanel";
import { OpsConsoleModal } from "@/components/OpsConsoleModal";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ScreenContainer } from "@/components/ScreenContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { StatusChip } from "@/components/StatusChip";
import { profileSections } from "@/constants/content";
import { useZitoData } from "@/hooks/useZitoData";
import { useAppSession } from "@/store/AppProvider";
import { formatCompactCurrency, formatMetaLine } from "@/utils/format";
import type { EventScenario, WorkerProfile } from "@/types";

const detailRows = (worker: WorkerProfile) => [
  { label: "Registered zone", value: worker.registeredZone },
  { label: "Weekly baseline", value: formatCompactCurrency(worker.weeklyBaselineEarnings) },
  { label: "Linked UPI", value: worker.upiId },
  { label: "Phone", value: worker.phone }
];

export const ProfileScreen = () => {
  const { workerQuery, triggerEventMutation, resetMutation, runGuidedFlow } = useZitoData();
  const { opsConsoleVisible, openOpsConsole, closeOpsConsole, logout } = useAppSession();
  const [tapCount, setTapCount] = useState(0);
  const [loggingOut, setLoggingOut] = useState(false);

  if (!workerQuery.data) {
    return <ScreenContainer />;
  }

  const worker = workerQuery.data;
  const busy = triggerEventMutation.isPending || resetMutation.isPending;

  const handleTap = () => {
    void Haptics.selectionAsync();
    const next = tapCount + 1;
    setTapCount(next);
    setTimeout(() => setTapCount(0), 1800);
    if (next >= 5) {
      setTapCount(0);
      openOpsConsole();
    }
  };

  const trigger = async (scenario: EventScenario) => {
    await triggerEventMutation.mutateAsync(scenario);
    closeOpsConsole();
  };

  const reset = async () => {
    await resetMutation.mutateAsync();
    closeOpsConsole();
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    setLoggingOut(false);
  };

  return (
    <>
      <ScreenContainer>
        <Animated.View entering={FadeInDown.duration(450)}>
          <Pressable onPress={handleTap} className="self-start">
            <Text className="text-[13px] tracking-[2.2px] text-white/[0.40]">ZITO</Text>
          </Pressable>
          <Text className="mt-5 text-[34px] font-semibold tracking-[-0.7px] text-white">Profile</Text>
          <Text className="mt-3 text-[15px] leading-7 text-white/[0.58]">Protected worker details and payout destination for the active plan.</Text>
        </Animated.View>

        <GlassPanel className="mt-6 overflow-hidden px-5 py-5">
          <View className="absolute right-[-18] top-[-26] h-28 w-28 rounded-full bg-[#7A6BFF]/[0.10]" />
          <View className="flex-row items-start justify-between gap-3">
            <View className="flex-1 pr-2">
              <Text className="text-[12px] uppercase tracking-[2px] text-white/[0.40]">Protected worker</Text>
              <Text className="mt-3 text-[28px] font-semibold tracking-[-0.6px] text-white">{worker.name}</Text>
              <Text className="mt-2 text-[14px] leading-6 text-white/[0.58]">{formatMetaLine(worker.occupation, worker.platform)}</Text>
            </View>
            <StatusChip label={worker.protectionStatus} />
          </View>

          <View className="mt-6 rounded-[24px] border border-white/[0.08] bg-white/[0.03] px-4 py-4">
            <Text className="text-[11px] uppercase tracking-[1.8px] text-white/[0.42]">Coverage note</Text>
            <Text className="mt-2 text-[16px] leading-6 text-white">Protection is active for verified disruptions affecting active working hours in Koramangala.</Text>
          </View>

          <View className="mt-6 gap-4">
            {detailRows(worker).map((item, index) => (
              <View key={item.label} className={`flex-row items-start justify-between gap-3 ${index !== detailRows(worker).length - 1 ? "border-b border-white/[0.06] pb-4" : ""}`}>
                <Text className="flex-1 text-[12px] uppercase tracking-[1.6px] text-white/[0.38]">{item.label}</Text>
                <Text className="max-w-[60%] text-right text-[15px] leading-6 text-white/[0.82]">{item.value}</Text>
              </View>
            ))}
          </View>
        </GlassPanel>

        <View className="mt-6">
          <SectionHeader title="Preferences" subtitle="Controls, support, and policy surfaces" />
          <View className="gap-3">
            {profileSections.map((item) => (
              <GlassPanel key={item.title} className="overflow-hidden px-4 py-4">
                <View className="absolute right-[-16] top-[-14] h-16 w-16 rounded-full bg-white/[0.03]" />
                <Text className="text-[17px] font-semibold text-white">{item.title}</Text>
                <Text className="mt-2 text-[13px] leading-5 text-white/[0.56]">{item.subtitle}</Text>
              </GlassPanel>
            ))}
          </View>
        </View>

        <View className="mt-6 gap-3">
          <GlassPanel className="px-5 py-5">
            <Text className="text-[12px] uppercase tracking-[1.8px] text-white/[0.42]">Session</Text>
            <Text className="mt-2 text-[17px] font-semibold text-white">Signed in securely</Text>
            <Text className="mt-2 text-[13px] leading-5 text-white/[0.56]">Log out to return to the account access screen without affecting local protection data.</Text>
          </GlassPanel>
          <PrimaryButton label={loggingOut ? "Signing Out" : "Log Out"} tone="secondary" onPress={handleLogout} disabled={loggingOut} />
        </View>
      </ScreenContainer>

      <OpsConsoleModal
        busy={busy}
        visible={opsConsoleVisible}
        onClose={closeOpsConsole}
        onTrigger={trigger}
        onRunGuidedFlow={async () => {
          await runGuidedFlow();
          closeOpsConsole();
        }}
        onReset={reset}
      />
    </>
  );
};
