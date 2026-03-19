import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { BrandLogo } from "@/components/BrandLogo";
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
    setBusy(false);
  };

  return (
    <ScreenContainer>
      <Animated.View entering={FadeInDown.duration(420)}>
        <BrandLogo muted />
        <Text className="mt-8 text-[12px] uppercase tracking-[2px] text-black/36">Sign in</Text>
        <Text className="mt-4 text-[34px] font-semibold tracking-[-0.9px] text-[#111111]">Welcome back</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(120).duration(420)} className="mt-8 gap-6">
        <View className="border-b border-black/[0.08] pb-3">
          <Text className="mb-3 text-[11px] uppercase tracking-[1.8px] text-black/34">Phone number</Text>
          <TextInput
            className="text-[18px] text-[#111111]"
            keyboardType="phone-pad"
            placeholder="Enter phone number"
            placeholderTextColor="rgba(17,17,17,0.32)"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        <View className="border-b border-black/[0.08] pb-3">
          <Text className="mb-3 text-[11px] uppercase tracking-[1.8px] text-black/34">Passcode</Text>
          <TextInput
            className="text-[18px] text-[#111111]"
            placeholder="Enter passcode"
            placeholderTextColor="rgba(17,17,17,0.32)"
            secureTextEntry
            value={passcode}
            onChangeText={setPasscode}
          />
        </View>
      </Animated.View>

      <View className="mt-10 gap-3">
        <PrimaryButton label="Continue" onPress={handleSignIn} disabled={busy || !phone.trim() || !passcode.trim()} />
        <PrimaryButton label="Back" tone="ghost" onPress={() => navigation.goBack()} />
        {busy ? <ActivityIndicator color="#111111" /> : null}
      </View>
    </ScreenContainer>
  );
};
