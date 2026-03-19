import { Text, View, useWindowDimensions } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Svg, { Circle, Defs, Line, Path, Stop, LinearGradient as SvgGradient } from "react-native-svg";
import { GlassPanel } from "@/components/GlassPanel";
import { ScoreRing } from "@/components/ScoreRing";
import { ScreenContainer } from "@/components/ScreenContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { StatusChip } from "@/components/StatusChip";
import { useZitoData } from "@/hooks/useZitoData";
import { getScenarioAccent } from "@/utils/format";

const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

export const RiskScreen = () => {
  const { width } = useWindowDimensions();
  const chartWidth = Math.max(width - 72, 220);
  const chartHeight = 148;
  const compact = width < 390;
  const { riskQuery } = useZitoData();

  if (!riskQuery.data) {
    return <ScreenContainer />;
  }

  const risk = riskQuery.data;
  const max = Math.max(...risk.trend);
  const min = Math.min(...risk.trend);
  const points = risk.trend.map((value, index) => {
    const x = (index / Math.max(risk.trend.length - 1, 1)) * (chartWidth - 24) + 12;
    const y = chartHeight - 26 - ((value - min) / Math.max(max - min, 1)) * 84;
    return { x, y, value };
  });
  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1]?.x ?? 0} ${chartHeight - 18} L ${points[0]?.x ?? 0} ${chartHeight - 18} Z`;

  return (
    <ScreenContainer>
      <Animated.View entering={FadeInDown.duration(450)}>
        <Text className="text-[12px] uppercase tracking-[2px] text-black/40">Risk intelligence</Text>
        <Text className="mt-3 text-[34px] font-semibold tracking-[-0.7px] text-[#111111]">Risk posture</Text>
        <Text className="mt-3 text-[15px] leading-7 text-black/58">A live view of the conditions shaping your protected earning window.</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(120).duration(450)} className="mt-6 items-center">
        <GlassPanel className="w-full items-center px-5 py-6">
          <ScoreRing band={risk.band} score={risk.score} />
          <Text className="mt-6 max-w-[280px] text-center text-[14px] leading-6 text-black/60">{risk.explanation}</Text>
        </GlassPanel>
      </Animated.View>

      <View className="mt-6">
        <SectionHeader title="Breakdown" subtitle="How live conditions are contributing today" />
        <View className="gap-3">
          {risk.factors.map((factor) => (
            <GlassPanel key={factor.key} className="overflow-hidden px-4 py-4">
              <View className="absolute right-[-14] top-[-18] h-20 w-20 rounded-full" style={{ backgroundColor: `${getScenarioAccent(factor.key === "aqi" ? "aqi" : factor.key === "platform" ? "platform" : "heat")}14` }} />
              <View className={`gap-3 ${compact ? "" : "flex-row items-center justify-between"}`}>
                <View className="flex-1">
                  <Text className="text-[11px] uppercase tracking-[1.8px] text-black/42">{factor.label}</Text>
                  <Text className="mt-2 text-[18px] font-semibold leading-6 text-[#111111]">{factor.level} pressure</Text>
                  <Text className="mt-2 text-[13px] leading-5 text-black/56">{factor.insight}</Text>
                </View>
                <View className={`gap-2 ${compact ? "" : "items-end"}`}>
                  <StatusChip label={factor.level} />
                  <Text className="text-[26px] font-semibold tracking-[-0.5px] text-[#111111]">{factor.value}</Text>
                </View>
              </View>
            </GlassPanel>
          ))}
        </View>
      </View>

      <View className="mt-6">
        <SectionHeader title="7 day trend" subtitle="EV score drift over the current protection period" />
        <GlassPanel className="overflow-hidden px-4 py-5">
          <View className="absolute left-0 top-0 h-full w-full bg-black/[0.01]" />
          <Svg height={chartHeight} width={chartWidth}>
            <Defs>
              <SvgGradient id="trendFill" x1="0" x2="0" y1="0" y2="1">
                <Stop offset="0" stopColor="#2563EB" stopOpacity="0.18" />
                <Stop offset="1" stopColor="#2563EB" stopOpacity="0" />
              </SvgGradient>
              <SvgGradient id="trendStroke" x1="0" x2="1" y1="0" y2="0">
                <Stop offset="0" stopColor="#111111" />
                <Stop offset="0.5" stopColor="#2563EB" />
                <Stop offset="1" stopColor="#059669" />
              </SvgGradient>
            </Defs>
            {[0.25, 0.5, 0.75].map((ratio) => (
              <Line
                key={ratio}
                x1="12"
                x2={chartWidth - 12}
                y1={chartHeight - 18 - ratio * 90}
                y2={chartHeight - 18 - ratio * 90}
                stroke="rgba(17,24,39,0.06)"
                strokeDasharray="4 6"
              />
            ))}
            <Path d={areaPath} fill="url(#trendFill)" />
            <Path d={linePath} fill="none" stroke="url(#trendStroke)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {points.map((point, index) => (
              <Circle key={`${point.value}-${index}`} cx={point.x} cy={point.y} fill="#FFFFFF" r="5.5" stroke="#2563EB" strokeWidth="2" />
            ))}
          </Svg>
          <View className="mt-3 flex-row justify-between px-1">
            {risk.trend.map((value, index) => (
              <View key={`${value}-${index}`} className="items-center">
                <Text className="text-[11px] uppercase text-black/34">{dayLabels[index] || "D"}</Text>
                <Text className="mt-1 text-[11px] text-black/56">{value}</Text>
              </View>
            ))}
          </View>
        </GlassPanel>
      </View>
    </ScreenContainer>
  );
};
