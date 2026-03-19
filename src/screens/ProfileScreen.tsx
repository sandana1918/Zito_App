import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { BrandLogo } from "@/components/BrandLogo";
import { GlassPanel } from "@/components/GlassPanel";
import { OpsConsoleModal } from "@/components/OpsConsoleModal";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ScreenContainer } from "@/components/ScreenContainer";
import { StatusChip } from "@/components/StatusChip";
import { type } from "@/constants/typography";
import { useZitoData } from "@/hooks/useZitoData";
import { useAppSession } from "@/store/AppProvider";
import { formatCompactCurrency, formatDateTime, formatMetaLine } from "@/utils/format";
import type { EventScenario, WorkerProfile } from "@/types";

const detailRows = (worker: WorkerProfile) => [
  { label: "Blinkit worker ID", value: worker.workerId },
  { label: "Registered zone", value: worker.registeredZone },
  { label: "4-week daily average", value: formatCompactCurrency(worker.fourWeekAverageDailyEarnings) },
  { label: "Weekly baseline", value: formatCompactCurrency(worker.weeklyBaselineEarnings) },
  { label: "Linked UPI", value: worker.upiId },
  { label: "Phone", value: worker.phone }
];

const utilityItems = [
  { title: "App preferences", icon: "options-outline" },
  { title: "Notifications", icon: "notifications-outline" },
  { title: "Help and support", icon: "chatbubble-ellipses-outline" },
  { title: "Terms and privacy", icon: "document-text-outline" }
] as const;

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
        <Animated.View entering={FadeInDown.duration(420)}>
          <Pressable onPress={handleTap} className="self-start">
            <BrandLogo muted />
          </Pressable>
          <Text style={type.eyebrow} className="mt-8 text-black/36">Account</Text>
          <Text style={type.screenTitle} className="mt-3 text-[#111111]">Worker profile</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(80).duration(420)} className="mt-6">
          <GlassPanel className="overflow-hidden px-5 py-5">
            <View className="absolute right-[-24] top-[-20] h-28 w-28 rounded-full bg-black/[0.03]" />
            <View className="flex-row items-center justify-between gap-4">
              <View className="flex-row items-center gap-4">
                <View className="h-16 w-16 items-center justify-center rounded-[22px] border border-black/[0.08] bg-black/[0.03]">
                  <Ionicons name="person-outline" size={28} color="#111111" />
                </View>
                <View>
                  <Text style={type.sectionTitle} className="text-[#111111]">{worker.name}</Text>
                  <Text style={type.bodySmall} className="mt-1 text-black/56">{formatMetaLine(worker.occupation, worker.platform)}</Text>
                </View>
              </View>
              <StatusChip label={worker.protectionStatus} />
            </View>

            <View className="mt-6 flex-row gap-3">
              <View className="flex-1 rounded-[20px] border border-black/[0.06] bg-black/[0.02] px-4 py-4">
                <Text style={type.eyebrowTight} className="text-black/34">Identity</Text>
                <Text style={type.bodyStrong} className="mt-2 text-[#111111]">{worker.aadhaarLinkedPhoneVerified ? "Phone verified" : "Pending"}</Text>
              </View>
              <View className="flex-1 rounded-[20px] border border-black/[0.06] bg-black/[0.02] px-4 py-4">
                <Text style={type.eyebrowTight} className="text-black/34">Policy active</Text>
                <Text style={type.bodyStrong} className="mt-2 text-[#111111]">{formatDateTime(worker.policyActivatedAt)}</Text>
              </View>
            </View>
          </GlassPanel>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(140).duration(420)} className="mt-6">
          <GlassPanel className="px-5 py-5">
            <Text style={type.eyebrow} className="text-black/36">Account details</Text>
            <View className="mt-4 gap-4">
              {detailRows(worker).map((item, index, array) => (
                <View key={item.label} className={`flex-row items-start justify-between gap-4 ${index !== array.length - 1 ? "border-b border-black/[0.06] pb-4" : ""}`}>
                  <Text style={type.label} className="text-black/52">{item.label}</Text>
                  <Text style={type.body} className="max-w-[62%] text-right text-[#111111]">{item.value}</Text>
                </View>
              ))}
            </View>
          </GlassPanel>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(180).duration(420)} className="mt-6">
          <GlassPanel className="px-5 py-5">
            <Text style={type.eyebrow} className="text-black/36">Eligibility state</Text>
            <Text style={type.bodyStrong} className="mt-3 text-[#111111]">{worker.availabilityNote}</Text>
            <Text style={type.bodySmall} className="mt-2 text-black/56">This is the live work-state signal used when Zito evaluates AQI, heat, and outage payouts.</Text>
          </GlassPanel>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(420)} className="mt-6">
          <Text style={type.eyebrow} className="mb-4 text-black/36">Utilities</Text>
          <GlassPanel className="px-2 py-2">
            {utilityItems.map((item, index) => (
              <View key={item.title} className={`flex-row items-center justify-between rounded-[20px] px-3 py-3 ${index !== utilityItems.length - 1 ? "border-b border-black/[0.06]" : ""}`}>
                <View className="flex-row items-center gap-3">
                  <View className="h-10 w-10 items-center justify-center rounded-[14px] bg-black/[0.03]">
                    <Ionicons color="rgba(17,17,17,0.72)" name={item.icon as never} size={18} />
                  </View>
                  <Text style={type.body} className="text-[#111111]">{item.title}</Text>
                </View>
                <Ionicons color="rgba(17,17,17,0.26)" name="chevron-forward" size={18} />
              </View>
            ))}
          </GlassPanel>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(260).duration(420)} className="mt-6 gap-3">
          <GlassPanel className="px-5 py-5">
            <Text style={type.eyebrow} className="text-black/36">Session</Text>
            <Text style={type.bodyStrong} className="mt-3 text-[#111111]">Signed in</Text>
            <Text style={type.bodySmall} className="mt-2 text-black/56">Log out to return to account access.</Text>
          </GlassPanel>
          <PrimaryButton label={loggingOut ? "Signing out" : "Log out"} tone="secondary" onPress={handleLogout} disabled={loggingOut} />
        </Animated.View>
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
