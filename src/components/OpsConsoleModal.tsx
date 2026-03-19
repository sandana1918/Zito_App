import { Modal, Text, View } from "react-native";
import { GlassPanel } from "@/components/GlassPanel";
import { PrimaryButton } from "@/components/PrimaryButton";
import type { EventScenario } from "@/types";

interface OpsConsoleModalProps {
  visible: boolean;
  busy: boolean;
  onClose: () => void;
  onTrigger: (scenario: EventScenario) => void;
  onRunGuidedFlow: () => void;
  onReset: () => void;
}

export const OpsConsoleModal = ({
  visible,
  busy,
  onClose,
  onTrigger,
  onRunGuidedFlow,
  onReset
}: OpsConsoleModalProps) => (
  <Modal transparent animationType="slide" visible={visible}>
    <View className="flex-1 justify-end bg-black/[0.55] px-4 pb-8">
      <GlassPanel className="rounded-[30px] border border-white/[0.12] bg-[#0B0F1D] px-5 py-6">
        <Text className="text-[22px] font-semibold text-white">Operations Console</Text>
        <Text className="mt-2 text-[14px] leading-6 text-white/[0.58]">
          Process a verified disruption storyline or restore the protected baseline.
        </Text>

        <View className="mt-6 gap-3">
          <PrimaryButton disabled={busy} label="Process AQI alert" tone="secondary" onPress={() => onTrigger("aqi")} />
          <PrimaryButton disabled={busy} label="Process platform outage" tone="secondary" onPress={() => onTrigger("platform")} />
          <PrimaryButton disabled={busy} label="Process heat event" tone="secondary" onPress={() => onTrigger("heat")} />
          <PrimaryButton disabled={busy} label="Run guided flow" onPress={onRunGuidedFlow} />
          <PrimaryButton disabled={busy} label="Restore baseline" tone="secondary" onPress={onReset} />
          <PrimaryButton label="Close" tone="ghost" onPress={onClose} />
        </View>
      </GlassPanel>
    </View>
  </Modal>
);

