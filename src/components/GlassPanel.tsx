import type { PropsWithChildren } from "react";
import { View, type ViewProps } from "react-native";

interface GlassPanelProps extends ViewProps {
  className?: string;
}

export const GlassPanel = ({ children, style, className = "", ...props }: PropsWithChildren<GlassPanelProps>) => (
  <View
    {...props}
    className={`rounded-[28px] border border-black/[0.06] bg-white ${className}`}
    style={[
      {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 }
      },
      style
    ]}
  >
    <View style={{ position: "absolute", inset: 1, borderRadius: 27, borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" }} />
    {children}
  </View>
);
