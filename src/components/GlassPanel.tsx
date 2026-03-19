import type { PropsWithChildren } from "react";
import { View, type ViewProps } from "react-native";

interface GlassPanelProps extends ViewProps {
  className?: string;
}

export const GlassPanel = ({ children, style, className = "", ...props }: PropsWithChildren<GlassPanelProps>) => (
  <View
    {...props}
    className={`rounded-[28px] border border-white/[0.08] bg-[#131723]/[0.94] ${className}`}
    style={[
      {
        shadowColor: "#000",
        shadowOpacity: 0.28,
        shadowRadius: 26,
        shadowOffset: { width: 0, height: 14 }
      },
      style
    ]}
  >
    <View style={{ position: "absolute", inset: 1, borderRadius: 27, borderWidth: 1, borderColor: "rgba(255,255,255,0.03)" }} />
    {children}
  </View>
);
