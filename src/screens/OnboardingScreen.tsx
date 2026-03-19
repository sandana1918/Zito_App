import { useMemo, useState } from "react";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { BrandLogo } from "@/components/BrandLogo";
import { GlassPanel } from "@/components/GlassPanel";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ScreenContainer } from "@/components/ScreenContainer";
import { type } from "@/constants/typography";
import { useZitoData } from "@/hooks/useZitoData";
import { useAppSession } from "@/store/AppProvider";
import { formatCompactCurrency, formatMetaLine } from "@/utils/format";
import type { RegisterPayload } from "@/types";

const initialForm: RegisterPayload = {
  name: "Raju Sharma",
  phone: "+91 98765 43210",
  workerId: "BLR-BLK-2841",
  platform: "Blinkit",
  registeredZone: "Koramangala, Bengaluru",
  averageDailyEarnings: 600,
  upiId: "raju@oksbi"
};

const fields = [
  { key: "name", label: "Full name", keyboardType: "default" },
  { key: "phone", label: "Phone number", keyboardType: "phone-pad" },
  { key: "workerId", label: "Blinkit worker ID", keyboardType: "default" },
  { key: "registeredZone", label: "Registered delivery zone", keyboardType: "default" },
  { key: "averageDailyEarnings", label: "4-week average daily earnings", keyboardType: "number-pad" },
  { key: "upiId", label: "UPI handle", keyboardType: "default" }
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
            <Text style={type.eyebrow} className="text-black/36">Create account</Text>
            <Text style={type.screenTitle} className="mt-4 text-[#111111]">Set up in under 3 minutes.</Text>
            <Text style={type.body} className="mt-4 max-w-[300px] text-black/56">Add your work profile, zone, daily earnings, and UPI handle. Aadhaar-linked phone verification turns protection on immediately.</Text>
          </View>

          <GlassPanel className="px-5 py-5">
            <Text style={type.eyebrow} className="text-black/34">What starts now</Text>
            <Text style={type.bodyStrong} className="mt-3 text-[#111111]">Zito computes your EV Score every Sunday, locks a weekly premium, and collects it in daily micro-installments from earnings.</Text>
          </GlassPanel>

          <PrimaryButton label="Continue" onPress={() => setStep(1)} />
        </Animated.View>
      ) : null}

      {step === 1 ? (
        <Animated.View entering={FadeInDown.duration(420)}>
          <Text style={type.eyebrow} className="text-black/36">Details</Text>
          <Text style={type.heroHeading} className="mt-4 text-[#111111]">Worker profile</Text>

          <View className="mt-7 gap-5">
            {fields.map((field) => (
              <View key={field.key} className="border-b border-black/[0.08] pb-3">
                <Text style={type.eyebrowTight} className="mb-3 text-black/34">{field.label}</Text>
                <TextInput
                  style={type.bodyStrong}
                  className="text-[#111111]"
                  keyboardType={field.keyboardType as any}
                  placeholderTextColor="rgba(17,17,17,0.32)"
                  value={String(form[field.key as keyof RegisterPayload])}
                  onChangeText={(value) =>
                    setForm((current) => ({
                      ...current,
                      [field.key]: field.key === "averageDailyEarnings" ? Number(value.replace(/[^0-9]/g, "")) || 0 : value
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
            <Text style={type.eyebrow} className="text-black/36">Review</Text>
            <Text style={type.heroHeading} className="mt-4 text-[#111111]">Activate protection</Text>

            <GlassPanel className="mt-7 px-5 py-5">
              <View>
                <Text style={type.bodyStrong} className="text-[#111111]">{form.name}</Text>
                <Text style={type.bodySmall} className="mt-2 text-black/58">{formatMetaLine(form.platform, form.registeredZone)}</Text>
              </View>
              <View className="my-5 h-px bg-black/[0.06]" />
              <View className="gap-4">
                <View className="flex-row items-start justify-between gap-3">
                  <Text style={type.eyebrow} className="text-black/34">Blinkit worker ID</Text>
                  <Text style={type.body} className="text-[#111111]">{form.workerId}</Text>
                </View>
                <View className="flex-row items-start justify-between gap-3">
                  <Text style={type.eyebrow} className="text-black/34">Average daily earnings</Text>
                  <Text style={type.body} className="text-[#111111]">{formatCompactCurrency(form.averageDailyEarnings)}</Text>
                </View>
                <View className="flex-row items-start justify-between gap-3">
                  <Text style={type.eyebrow} className="text-black/34">Weekly baseline</Text>
                  <Text style={type.body} className="text-[#111111]">{formatCompactCurrency(form.averageDailyEarnings * 7)}</Text>
                </View>
                <View className="flex-row items-start justify-between gap-3">
                  <Text style={type.eyebrow} className="text-black/34">UPI handle</Text>
                  <Text style={type.body} className="text-[#111111]">{form.upiId}</Text>
                </View>
                <View className="flex-row items-start justify-between gap-3">
                  <Text style={type.eyebrow} className="text-black/34">Identity</Text>
                  <Text style={type.body} className="text-[#111111]">Aadhaar-linked phone confirmed</Text>
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
