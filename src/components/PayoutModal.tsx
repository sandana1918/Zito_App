import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { Animated, Modal, Text, View } from "react-native";
import type { NavigationContainerRefWithCurrent } from "@react-navigation/native";
import { GlassPanel } from "@/components/GlassPanel";
import { PrimaryButton } from "@/components/PrimaryButton";
import { StatusChip } from "@/components/StatusChip";
import { gradients } from "@/constants/theme";
import { formatCompactCurrency } from "@/utils/format";
import type { Incident, RootStackParamList } from "@/types";

interface PayoutModalProps {
  incident: Incident | null;
  visible: boolean;
  onDismiss: () => void;
  navigationRef: NavigationContainerRefWithCurrent<RootStackParamList>;
}

export const PayoutModal = ({ incident, visible, onDismiss, navigationRef }: PayoutModalProps) => {
  const amountAnimation = useRef(new Animated.Value(0)).current;
  const [displayAmount, setDisplayAmount] = useState(0);

  useEffect(() => {
    if (!incident || !visible) {
      amountAnimation.stopAnimation();
      amountAnimation.setValue(0);
      setDisplayAmount(0);
      return;
    }

    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    const listener = amountAnimation.addListener(({ value }) => {
      setDisplayAmount(Math.round(value));
    });

    Animated.timing(amountAnimation, {
      toValue: incident.amount,
      duration: 1100,
      useNativeDriver: false
    }).start();

    return () => {
      amountAnimation.removeListener(listener);
    };
  }, [amountAnimation, incident, visible]);

  if (!incident) {
    return null;
  }

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <LinearGradient colors={["rgba(4,5,10,0.98)", "rgba(8,10,18,0.99)"]} style={{ flex: 1, justifyContent: "center", padding: 20 }}>
        <GlassPanel className="overflow-hidden rounded-[36px] border border-white/[0.10] bg-[#0B0F1D] px-6 py-7">
          <LinearGradient colors={gradients.glow as [string, string, string]} style={{ position: "absolute", inset: 0 }} />
          <View className="mb-3 h-1.5 w-16 rounded-full bg-white/[0.08]" />
          <StatusChip label={incident.status} />
          <Text className="mt-6 text-[30px] font-semibold leading-[38px] text-white">Disruption detected in your zone</Text>
          <Text className="mt-4 text-[54px] font-semibold text-white">{formatCompactCurrency(displayAmount)}</Text>
          <Text className="mt-3 text-[16px] leading-7 text-white/[0.70]">{incident.summary}</Text>

          <View className="mt-7 gap-3 rounded-[24px] border border-white/[0.06] bg-white/[0.04] px-4 py-4">
            <Text className="text-[14px] text-white/[0.68]">Verified by {incident.sources.join(" and ")}</Text>
            <Text className="text-[14px] text-white/[0.68]">Sent to linked UPI / {incident.payoutDestination}</Text>
            <Text className="text-[14px] text-white/[0.68]">No action needed from you</Text>
          </View>

          <View className="mt-8 gap-3">
            <PrimaryButton label="View Incident" onPress={() => { onDismiss(); navigationRef.navigate("IncidentDetail", { incidentId: incident.id }); }} />
            <PrimaryButton label="Back to Home" tone="secondary" onPress={onDismiss} />
          </View>
        </GlassPanel>
      </LinearGradient>
    </Modal>
  );
};
