import { useMemo } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import Svg, { Circle, Defs, G, Stop, LinearGradient as SvgGradient } from "react-native-svg";

const STROKE = 11;

export const ScoreRing = ({ score, band }: { score: number; band: string }) => {
  const { width } = useWindowDimensions();
  const size = useMemo(() => Math.min(Math.max(width - 96, 190), 228), [width]);
  const radius = (size - STROKE) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - score / 100);

  return (
    <View className="items-center justify-center">
      <Svg height={size} width={size}>
        <Defs>
          <SvgGradient id="scoreStroke" x1="0" x2="1" y1="0" y2="1">
            <Stop offset="0" stopColor="#111111" />
            <Stop offset="0.55" stopColor="#2563EB" />
            <Stop offset="1" stopColor="#059669" />
          </SvgGradient>
          <SvgGradient id="scoreGlow" x1="0" x2="1" y1="0" y2="1">
            <Stop offset="0" stopColor="#111111" stopOpacity="0.06" />
            <Stop offset="1" stopColor="#2563EB" stopOpacity="0.03" />
          </SvgGradient>
        </Defs>
        <G opacity={0.98}>
          <Circle cx={size / 2} cy={size / 2} fill="transparent" r={radius + 6} stroke="url(#scoreGlow)" strokeWidth="8" />
          <Circle cx={size / 2} cy={size / 2} fill="transparent" r={radius} stroke="rgba(17,24,39,0.08)" strokeWidth={STROKE} />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#scoreStroke)"
            strokeLinecap="round"
            strokeWidth={STROKE}
            fill="transparent"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={strokeDashoffset}
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        </G>
      </Svg>
      <View className="absolute items-center px-6">
        <Text className="text-[11px] uppercase tracking-[2px] text-black/42">EV score</Text>
        <Text className={`mt-2 font-semibold tracking-[-1px] text-[#111111] ${size < 205 ? "text-[40px]" : "text-[48px]"}`}>{score}</Text>
        <Text className="mt-1 text-[14px] text-black/58">{band} risk posture</Text>
      </View>
    </View>
  );
};
