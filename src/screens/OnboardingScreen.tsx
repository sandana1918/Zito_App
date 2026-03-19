import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { GlassPanel } from "@/components/GlassPanel";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ScreenContainer } from "@/components/ScreenContainer";
import { useZitoData } from "@/hooks/useZitoData";
import { useAppSession } from "@/store/AppProvider";
import { formatCompactCurrency } from "@/utils/format";
import type { RegisterPayload, RootStackParamList } from "@/types";

const initialForm: RegisterPayload = {
  name: "Raju Sharma",
  phone: "+91 98765 43210",
  platform: "Blinkit",
  registeredZone: "Koramangala, Bengaluru",
  weeklyBaselineEarnings: 4200,
  upiId: "raju@oksbi"
};

export const OnboardingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { registerMutation } = useZitoData();
  const { completeOnboarding } = useAppSession();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);

  const progress = useMemo(() => [0, 1, 2].map((index) => index <= step), [step]);

  const activate = async () => {
    await registerMutation.mutateAsync(form);
    await completeOnboarding();
    navigation.reset({ index: 0, routes: [{ name: "Main" }] });
  };

  return (
    <ScreenContainer>
      <View className="mb-8 flex-row gap-2">
        {progress.map((filled, index) => (
          <View key={index} className={`h-1.5 flex-1 rounded-full ${filled ? "bg-[#78A9FF]" : "bg-white/[0.10]"}`} />
        ))}
      </View>

      {step === 0 ? (
        <Animated.View entering={FadeInDown.duration(450)} className="flex-1 justify-between pb-2">
          <View>
            <Text className="text-[34px] font-semibold leading-[42px] text-white">Protection for every working hour</Text>
            <Text className="mt-5 text-[16px] leading-7 text-white/[0.62]">
              Zito watches for disruptions in your zone and automatically credits support when verified events affect your income.
            </Text>
          </View>
          <PrimaryButton label="Continue" onPress={() => setStep(1)} />
        </Animated.View>
      ) : null}

      {step === 1 ? (
        <Animated.View entering={FadeInDown.duration(450)}>
          <Text className="text-[30px] font-semibold text-white">Set up your protection</Text>
          <View className="mt-6 gap-3">
            {[
              { key: "name", label: "Full name" },
              { key: "phone", label: "Phone number" },
              { key: "platform", label: "Platform" },
              { key: "registeredZone", label: "Registered delivery zone" },
              { key: "weeklyBaselineEarnings", label: "Average weekly earnings" },
              { key: "upiId", label: "UPI ID" }
            ].map((field) => (
              <GlassPanel key={field.key} className="px-4 py-3">
                <Text className="mb-2 text-[12px] uppercase tracking-[1.1px] text-white/[0.45]">{field.label}</Text>
                <TextInput
                  className="text-[16px] text-white"
                  keyboardType="default"
                  placeholderTextColor="rgba(255,255,255,0.35)"
                  value={String(form[field.key as keyof RegisterPayload])}
                  onChangeText={(value) =>
                    setForm((current) => ({
                      ...current,
                      [field.key]: field.key === "weeklyBaselineEarnings" ? Number(value.replace(/[^0-9]/g, "")) || 0 : value
                    }))
                  }
                />
              </GlassPanel>
            ))}
          </View>
          <View className="mt-6 gap-3">
            <PrimaryButton label="Continue" onPress={() => setStep(2)} />
            <PrimaryButton label="Back" tone="ghost" onPress={() => setStep(0)} />
          </View>
        </Animated.View>
      ) : null}

      {step === 2 ? (
        <Animated.View entering={FadeInDown.duration(450)} className="flex-1 justify-between pb-2">
          <View>
            <Text className="text-[30px] font-semibold text-white">Activate protection</Text>
            <Text className="mt-4 text-[15px] leading-7 text-white/[0.62]">
              Your registered details are ready. Once active, Zito monitors verified disruptions in your zone automatically.
            </Text>
            <GlassPanel className="mt-6 px-5 py-5">
              <Text className="text-[13px] uppercase tracking-[1.2px] text-white/[0.45]">Coverage summary</Text>
              <View className="mt-4 gap-3">
                <Text className="text-[15px] leading-6 text-white">{form.name} • {form.platform}</Text>
                <Text className="text-[15px] leading-6 text-white/[0.70]">{form.registeredZone}</Text>
                <Text className="text-[15px] leading-6 text-white/[0.70]">Weekly baseline {formatCompactCurrency(form.weeklyBaselineEarnings)}</Text>
                <Text className="text-[15px] leading-6 text-white/[0.70]">Linked UPI • {form.upiId}</Text>
              </View>
            </GlassPanel>
          </View>
          <View className="gap-3">
            <PrimaryButton label="Activate Protection" onPress={activate} disabled={registerMutation.isPending} />
            <PrimaryButton label="Back" tone="ghost" onPress={() => setStep(1)} />
            {registerMutation.isPending ? <ActivityIndicator color="#9BC4FF" /> : null}
          </View>
        </Animated.View>
      ) : null}
    </ScreenContainer>
  );
};
