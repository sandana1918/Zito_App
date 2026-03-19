import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { Animated, Modal, Text, View } from "react-native";
import type { NavigationContainerRefWithCurrent } from "@react-navigation/native";
import { GlassPanel } from "@/components/GlassPanel";
import { PrimaryButton } from "@/components/PrimaryButton";
import { StatusChip } from "@/components/StatusChip";
import { gradients } from "@/constants/theme";
import { type } from "@/constants/typography";
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
      <LinearGradient colors={["rgba(245,245,242,0.94)", "rgba(239,242,239,0.98)"]} style={{ flex: 1, justifyContent: "center", padding: 20 }}>
        <GlassPanel className="overflow-hidden rounded-[36px] px-6 py-7">
          <LinearGradient colors={gradients.glow as [string, string, string]} style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
          <View className="mb-3 h-1.5 w-16 rounded-full bg-black/[0.08]" />
          <StatusChip label={incident.status} />
          <Text style={[type.sectionTitle, { fontSize: 30, lineHeight: 38 }]} className="mt-6 text-[#111111]">Disruption detected in your zone</Text>
          <Text style={[type.heroValue, { fontSize: 54, lineHeight: 58 }]} className="mt-4 text-[#111111]">{formatCompactCurrency(displayAmount)}</Text>
          <Text style={type.body} className="mt-3 text-black/70">{incident.summary}</Text>

          <View className="mt-7 gap-3 rounded-[24px] border border-black/[0.06] bg-black/[0.02] px-4 py-4">
            <Text style={type.bodySmall} className="text-black/68">Verified by {incident.sources.join(" and ")}</Text>
            <Text style={type.bodySmall} className="text-black/68">Sent to linked UPI / {incident.payoutDestination}</Text>
            <Text style={type.bodySmall} className="text-black/68">{incident.payoutRail} completed settlement in {incident.settlementSeconds} seconds</Text>
            <Text style={type.bodySmall} className="text-black/68">No action needed from you</Text>
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
