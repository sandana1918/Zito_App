import type { PropsWithChildren } from "react";
import { View, type ViewProps } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { gradients } from "@/constants/theme";

interface GradientCardProps extends PropsWithChildren<ViewProps> {
  colors?: string[];
  className?: string;
}

export const GradientCard = ({ children, colors = gradients.hero, style, className = "", ...props }: GradientCardProps) => (
  <LinearGradient
    colors={colors as [string, string, ...string[]]}
    end={{ x: 1, y: 1 }}
    start={{ x: 0, y: 0 }}
    style={[
      {
        borderRadius: 30,
        overflow: "hidden",
        shadowColor: "#111111",
        shadowOpacity: 0.04,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
        elevation: 3
      },
      style
    ]}
  >
    <LinearGradient
      colors={["rgba(255,255,255,0.72)", "rgba(255,255,255,0.16)", "rgba(255,255,255,0)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ position: "absolute", inset: 0 }}
    />
    <View {...props} className={`border border-black/[0.08] bg-white/[0.22] px-5 py-5 ${className}`}>
      {children}
    </View>
  </LinearGradient>
);
