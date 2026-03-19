import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { BrandLogo } from "@/components/BrandLogo";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ScreenContainer } from "@/components/ScreenContainer";
import { gradients } from "@/constants/theme";
import type { RootStackParamList } from "@/types";

export const IntroScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenContainer scroll={false}>
      <View className="flex-1 justify-between pb-8 pt-8">
        <View>
          <Animated.View entering={FadeIn.duration(650)}>
            <LinearGradient colors={gradients.glow as [string, string, string]} style={{ position: "absolute", top: -90, left: -60, right: -20, height: 240, borderRadius: 220 }} />
            <BrandLogo />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(120).duration(650)} className="mt-16">
            <Text className="text-[42px] font-semibold leading-[48px] tracking-[-1.1px] text-[#111111]">Automatic protection for gig workers.</Text>
            <Text className="mt-5 max-w-[290px] text-[16px] leading-7 text-black/56">Verified disruptions trigger payout automatically.</Text>
          </Animated.View>
        </View>

        <Animated.View entering={FadeInDown.delay(220).duration(650)}>
          <View className="gap-3">
            <PrimaryButton label="Create account" onPress={() => navigation.navigate("Onboarding")} />
            <PrimaryButton label="Sign in" tone="secondary" onPress={() => navigation.navigate("SignIn")} />
          </View>
        </Animated.View>
      </View>
    </ScreenContainer>
  );
};
