import { Text, View } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";

interface BrandLogoProps {
  size?: number;
  withWordmark?: boolean;
  muted?: boolean;
}

export const BrandLogo = ({ size = 44, withWordmark = true, muted = false }: BrandLogoProps) => {
  const wordColor = muted ? "rgba(17,17,17,0.78)" : "#111111";
  const markColor = muted ? "rgba(17,17,17,0.88)" : "#111111";
  const borderColor = muted ? "rgba(17,17,17,0.10)" : "rgba(17,17,17,0.14)";
  const surfaceColor = muted ? "rgba(17,17,17,0.02)" : "rgba(17,17,17,0.04)";

  return (
    <View className="flex-row items-center gap-3">
      <Svg width={size} height={size} viewBox="0 0 44 44">
        <Rect x="1.5" y="1.5" width="41" height="41" rx="14" fill={surfaceColor} stroke={borderColor} />
        <Path
          d="M12 15.2c0-1.55 1.25-2.8 2.8-2.8h15.4v4.3H20.7l9.08 12.17c.28.39.43.85.43 1.35 0 1.55-1.25 2.8-2.8 2.8H12.1v-4.3h9.58l-9.2-12.3c-.31-.42-.48-.91-.48-1.47Z"
          fill={markColor}
        />
      </Svg>
      {withWordmark ? <Text style={{ color: wordColor }} className="text-[18px] font-semibold tracking-[3px]">ZITO</Text> : null}
    </View>
  );
};
