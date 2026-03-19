import type { PropsWithChildren } from "react";
import { View, type ViewProps } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { gradients } from "@/constants/theme";

interface GradientCardProps extends PropsWithChildren<ViewProps> {
  colors?: string[];
  className?: string;
}

export const GradientCard = ({ children, colors = gradients.hero, style, className = "", ...props }: GradientCardProps) => (
  <LinearGradient colors={colors as [string, string, ...string[]]} end={{ x: 1, y: 1 }} start={{ x: 0, y: 0 }} style={[{ borderRadius: 30, overflow: "hidden" }, style]}>
    <LinearGradient colors={["rgba(255,255,255,0.6)", "rgba(255,255,255,0)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ position: "absolute", inset: 0 }} />
    <View {...props} className={`border border-black/[0.08] px-5 py-5 ${className}`}>
      {children}
    </View>
  </LinearGradient>
);
