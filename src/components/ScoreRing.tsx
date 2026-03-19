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
            <Stop offset="0" stopColor="#8B78FF" />
            <Stop offset="0.55" stopColor="#6EB8FF" />
            <Stop offset="1" stopColor="#89F0D0" />
          </SvgGradient>
          <SvgGradient id="scoreGlow" x1="0" x2="1" y1="0" y2="1">
            <Stop offset="0" stopColor="#8B78FF" stopOpacity="0.24" />
            <Stop offset="1" stopColor="#6EB8FF" stopOpacity="0.05" />
          </SvgGradient>
        </Defs>
        <G opacity={0.92}>
          <Circle cx={size / 2} cy={size / 2} fill="transparent" r={radius + 6} stroke="url(#scoreGlow)" strokeWidth="8" />
          <Circle cx={size / 2} cy={size / 2} fill="transparent" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth={STROKE} />
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
        <Text className="text-[11px] uppercase tracking-[2px] text-white/[0.42]">EV score</Text>
        <Text className={`mt-2 font-semibold tracking-[-1px] text-white ${size < 205 ? "text-[40px]" : "text-[48px]"}`}>{score}</Text>
        <Text className="mt-1 text-[14px] text-white/[0.58]">{band} risk posture</Text>
      </View>
    </View>
  );
};
