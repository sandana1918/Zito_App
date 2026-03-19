import { useMemo, useState } from "react";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { BrandLogo } from "@/components/BrandLogo";
import { GlassPanel } from "@/components/GlassPanel";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ScreenContainer } from "@/components/ScreenContainer";
import { useZitoData } from "@/hooks/useZitoData";
import { useAppSession } from "@/store/AppProvider";
import { formatCompactCurrency, formatMetaLine } from "@/utils/format";
import type { RegisterPayload } from "@/types";

const initialForm: RegisterPayload = {
  name: "Raju Sharma",
  phone: "+91 98765 43210",
  platform: "Blinkit",
  registeredZone: "Koramangala, Bengaluru",
  weeklyBaselineEarnings: 4200,
  upiId: "raju@oksbi"
};

const fields = [
  { key: "name", label: "Full name", keyboardType: "default" },
  { key: "phone", label: "Phone number", keyboardType: "phone-pad" },
  { key: "platform", label: "Platform", keyboardType: "default" },
  { key: "registeredZone", label: "Zone", keyboardType: "default" },
  { key: "weeklyBaselineEarnings", label: "Weekly earnings", keyboardType: "number-pad" },
  { key: "upiId", label: "UPI ID", keyboardType: "default" }
] as const;

export const OnboardingScreen = () => {
  const { registerMutation } = useZitoData();
  const { completeOnboarding } = useAppSession();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);

  const progress = useMemo(() => [0, 1, 2].map((index) => index <= step), [step]);

  const activate = async () => {
    await registerMutation.mutateAsync(form);
    await completeOnboarding();
  };

  return (
    <ScreenContainer>
      <Animated.View entering={FadeInDown.duration(420)}>
        <BrandLogo muted />
        <View className="mb-8 mt-8 flex-row gap-2">
          {progress.map((filled, index) => (
            <View key={index} className={`h-[3px] flex-1 rounded-full ${filled ? "bg-[#111111]" : "bg-black/[0.08]"}`} />
          ))}
        </View>
      </Animated.View>

      {step === 0 ? (
        <Animated.View entering={FadeInDown.duration(420)} className="flex-1 justify-between">
          <View>
            <Text className="text-[12px] uppercase tracking-[2px] text-black/36">Create account</Text>
            <Text className="mt-4 text-[34px] font-semibold leading-[40px] tracking-[-0.9px] text-[#111111]">Set up protection.</Text>
            <Text className="mt-4 max-w-[280px] text-[15px] leading-7 text-black/56">Your work profile, registered zone, and payout destination.</Text>
          </View>

          <View className="gap-3">
            <Text className="text-[14px] text-black/62">Protection stays active once your account is set up.</Text>
            <Text className="text-[14px] text-black/62">Verified AQI, heat, and platform events are handled automatically.</Text>
          </View>

          <PrimaryButton label="Continue" onPress={() => setStep(1)} />
        </Animated.View>
      ) : null}

      {step === 1 ? (
        <Animated.View entering={FadeInDown.duration(420)}>
          <Text className="text-[12px] uppercase tracking-[2px] text-black/36">Details</Text>
          <Text className="mt-4 text-[32px] font-semibold tracking-[-0.8px] text-[#111111]">Worker profile</Text>

          <View className="mt-7 gap-5">
            {fields.map((field) => (
              <View key={field.key} className="border-b border-black/[0.08] pb-3">
                <Text className="mb-3 text-[11px] uppercase tracking-[1.8px] text-black/34">{field.label}</Text>
                <TextInput
                  className="text-[18px] text-[#111111]"
                  keyboardType={field.keyboardType as any}
                  placeholderTextColor="rgba(17,17,17,0.32)"
                  value={String(form[field.key as keyof RegisterPayload])}
                  onChangeText={(value) =>
                    setForm((current) => ({
                      ...current,
                      [field.key]: field.key === "weeklyBaselineEarnings" ? Number(value.replace(/[^0-9]/g, "")) || 0 : value
                    }))
                  }
                />
              </View>
            ))}
          </View>

          <View className="mt-8 gap-3">
            <PrimaryButton label="Continue" onPress={() => setStep(2)} />
            <PrimaryButton label="Back" tone="ghost" onPress={() => setStep(0)} />
          </View>
        </Animated.View>
      ) : null}

      {step === 2 ? (
        <Animated.View entering={FadeInDown.duration(420)} className="flex-1 justify-between">
          <View>
            <Text className="text-[12px] uppercase tracking-[2px] text-black/36">Review</Text>
            <Text className="mt-4 text-[32px] font-semibold tracking-[-0.8px] text-[#111111]">Activate protection</Text>

            <GlassPanel className="mt-7 px-5 py-5">
              <View>
                <Text className="text-[20px] font-semibold text-[#111111]">{form.name}</Text>
                <Text className="mt-2 text-[14px] text-black/58">{formatMetaLine(form.platform, form.registeredZone)}</Text>
              </View>
              <View className="my-5 h-px bg-black/[0.06]" />
              <View className="gap-4">
                <View className="flex-row items-start justify-between gap-3">
                  <Text className="text-[12px] uppercase tracking-[1.6px] text-black/34">Weekly earnings</Text>
                  <Text className="text-[15px] text-[#111111]">{formatCompactCurrency(form.weeklyBaselineEarnings)}</Text>
                </View>
                <View className="flex-row items-start justify-between gap-3">
                  <Text className="text-[12px] uppercase tracking-[1.6px] text-black/34">UPI</Text>
                  <Text className="text-[15px] text-[#111111]">{form.upiId}</Text>
                </View>
              </View>
            </GlassPanel>
          </View>

          <View className="gap-3">
            <PrimaryButton label="Activate protection" onPress={activate} disabled={registerMutation.isPending} />
            <PrimaryButton label="Back" tone="ghost" onPress={() => setStep(1)} />
            {registerMutation.isPending ? <ActivityIndicator color="#111111" /> : null}
          </View>
        </Animated.View>
      ) : null}
    </ScreenContainer>
  );
};
