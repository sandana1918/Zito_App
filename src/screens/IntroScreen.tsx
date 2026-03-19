import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ScreenContainer } from "@/components/ScreenContainer";
import { gradients } from "@/constants/theme";
import type { RootStackParamList } from "@/types";

export const IntroScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenContainer scroll={false}>
      <View className="flex-1 justify-between pb-8 pt-10">
        <View>
          <Animated.View entering={FadeIn.duration(700)}>
            <LinearGradient colors={gradients.glow as [string, string, string]} style={{ position: "absolute", top: -60, left: -30, right: -30, height: 280, borderRadius: 200 }} />
            <View className="h-16 w-16 items-center justify-center rounded-[22px] border border-white/[0.10] bg-white/[0.08]">
              <Text className="text-[28px] font-semibold text-white">Z</Text>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(150).duration(700)} className="mt-12">
            <Text className="text-[48px] font-semibold tracking-[7px] text-white">ZITO</Text>
            <Text className="mt-5 text-[18px] leading-8 text-white/[0.68]">Income protection that works before you ask.</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(220).duration(700)} className="mt-10 gap-3">
            <View className="self-start rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2">
              <Text className="text-[12px] uppercase tracking-[1.4px] text-white/[0.52]">Always monitoring</Text>
            </View>
            <Text className="text-[30px] font-semibold leading-10 text-white">Built for the hours where lost time becomes lost income.</Text>
          </Animated.View>
        </View>

        <Animated.View entering={FadeInDown.delay(260).duration(700)}>
          <View className="mb-6 rounded-[30px] border border-white/[0.08] bg-white/[0.05] px-5 py-5">
            <Text className="text-[13px] uppercase tracking-[1.5px] text-white/[0.45]">Protected access</Text>
            <Text className="mt-3 text-[22px] font-semibold leading-8 text-white">Create your coverage account or return to the live protection dashboard.</Text>
          </View>
          <View className="gap-3">
            <PrimaryButton label="Create Account" onPress={() => navigation.navigate("Onboarding")} />
            <PrimaryButton label="Sign In" tone="secondary" onPress={() => navigation.navigate("SignIn")} />
          </View>
        </Animated.View>
      </View>
    </ScreenContainer>
  );
};
