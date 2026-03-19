import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { GlassPanel } from "@/components/GlassPanel";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ScreenContainer } from "@/components/ScreenContainer";
import { useAppSession } from "@/store/AppProvider";
import type { RootStackParamList } from "@/types";

export const SignInScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { signIn } = useAppSession();
  const [phone, setPhone] = useState("+91 98765 43210");
  const [passcode, setPasscode] = useState("4826");
  const [busy, setBusy] = useState(false);

  const handleSignIn = async () => {
    setBusy(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await signIn();
    navigation.reset({ index: 0, routes: [{ name: "Main" }] });
    setBusy(false);
  };

  return (
    <ScreenContainer>
      <Animated.View entering={FadeInDown.duration(450)}>
        <Text className="text-[12px] uppercase tracking-[2px] text-white/[0.40]">Account access</Text>
        <Text className="mt-3 text-[34px] font-semibold tracking-[-0.7px] text-white">Sign in</Text>
        <Text className="mt-3 text-[15px] leading-7 text-white/[0.58]">Return to your protected dashboard with your mobile number and secure passcode.</Text>
      </Animated.View>

      <GlassPanel className="mt-6 overflow-hidden px-5 py-5">
        <View className="absolute right-[-20] top-[-18] h-28 w-28 rounded-full bg-[#58A6FF]/[0.10]" />
        <View className="gap-4">
          <View>
            <Text className="mb-2 text-[12px] uppercase tracking-[1.4px] text-white/[0.42]">Mobile number</Text>
            <TextInput
              className="rounded-[20px] border border-white/[0.08] bg-white/[0.04] px-4 py-4 text-[16px] text-white"
              keyboardType="phone-pad"
              placeholder="Enter mobile number"
              placeholderTextColor="rgba(255,255,255,0.35)"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
          <View>
            <Text className="mb-2 text-[12px] uppercase tracking-[1.4px] text-white/[0.42]">Passcode</Text>
            <TextInput
              className="rounded-[20px] border border-white/[0.08] bg-white/[0.04] px-4 py-4 text-[16px] text-white"
              placeholder="Enter passcode"
              placeholderTextColor="rgba(255,255,255,0.35)"
              secureTextEntry
              value={passcode}
              onChangeText={setPasscode}
            />
          </View>
        </View>

        <View className="mt-6 rounded-[24px] border border-white/[0.08] bg-white/[0.03] px-4 py-4">
          <Text className="text-[11px] uppercase tracking-[1.8px] text-white/[0.42]">Protected account</Text>
          <Text className="mt-2 text-[15px] leading-6 text-white/[0.72]">Returning workers land directly into the live dashboard with active protection, incident history, and risk monitoring intact.</Text>
        </View>
      </GlassPanel>

      <View className="mt-6 gap-3">
        <PrimaryButton label="Continue To Dashboard" onPress={handleSignIn} disabled={busy || !phone.trim() || !passcode.trim()} />
        <PrimaryButton label="Back" tone="ghost" onPress={() => navigation.goBack()} />
        {busy ? <ActivityIndicator color="#9BC4FF" /> : null}
      </View>
    </ScreenContainer>
  );
};
