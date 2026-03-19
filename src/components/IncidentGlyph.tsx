import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import Svg, { Circle, Defs, Line, Path, Rect, Stop, LinearGradient as SvgGradient } from "react-native-svg";
import type { EventScenario } from "@/types";
import { getScenarioAccent } from "@/utils/format";

interface IncidentGlyphProps {
  scenario: EventScenario;
  size?: number;
}

const backgroundMap: Record<EventScenario, [string, string]> = {
  aqi: ["rgba(255,108,136,0.34)", "rgba(255,108,136,0.08)"],
  platform: ["rgba(122,107,255,0.34)", "rgba(122,107,255,0.08)"],
  heat: ["rgba(242,184,104,0.34)", "rgba(242,184,104,0.08)"]
};

export const IncidentGlyph = ({ scenario, size = 48 }: IncidentGlyphProps) => {
  const accent = getScenarioAccent(scenario);
  const colors = backgroundMap[scenario];

  return (
    <LinearGradient
      colors={colors}
      end={{ x: 1, y: 1 }}
      start={{ x: 0, y: 0 }}
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.38),
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)"
      }}
    >
      <View
        style={{
          position: "absolute",
          inset: 2,
          borderRadius: Math.round(size * 0.34),
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.04)"
        }}
      />
      <Svg height={size * 0.56} viewBox="0 0 28 28" width={size * 0.56}>
        <Defs>
          <SvgGradient id={`incident-${scenario}`} x1="0" x2="1" y1="0" y2="1">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.96" />
            <Stop offset="1" stopColor={accent} stopOpacity="0.94" />
          </SvgGradient>
        </Defs>
        {scenario === "aqi" ? (
          <>
            <Path d="M6 18c0-3.4 2.7-6 6.1-6 1.1 0 2 .2 3 .7.7-2.5 2.8-4.2 5.4-4.2 3.1 0 5.5 2.4 5.5 5.4 0 3.2-2.4 5.6-5.8 5.6H9.5C7.6 19.5 6 18 6 18Z" fill={`url(#incident-${scenario})`} opacity="0.95" transform="translate(-2 -2) scale(0.92)" />
            <Circle cx="10" cy="13.5" fill="#FFFFFF" opacity="0.22" r="1.2" />
            <Circle cx="14.5" cy="11.5" fill="#FFFFFF" opacity="0.18" r="1" />
            <Circle cx="17.5" cy="15" fill="#FFFFFF" opacity="0.22" r="1.1" />
          </>
        ) : null}
        {scenario === "platform" ? (
          <>
            <Rect fill="none" height="12" rx="2.8" stroke={`url(#incident-${scenario})`} strokeWidth="2" width="18" x="5" y="8" />
            <Line opacity="0.9" stroke={`url(#incident-${scenario})`} strokeLinecap="round" strokeWidth="2" x1="9" x2="19" y1="14" y2="14" />
            <Path d="M12 5.5h4" opacity="0.7" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="1.6" />
            <Circle cx="19.5" cy="19.5" fill={accent} r="1.5" />
          </>
        ) : null}
        {scenario === "heat" ? (
          <>
            <Circle cx="14" cy="14" fill="none" opacity="0.95" r="5.5" stroke={`url(#incident-${scenario})`} strokeWidth="2.2" />
            <Path d="M14 4.8v2.7M14 20.5v2.7M4.8 14h2.7M20.5 14h2.7M7.8 7.8l1.9 1.9M18.3 18.3l1.9 1.9M20.2 7.8l-1.9 1.9M9.7 18.3l-1.9 1.9" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="1.7" />
            <Circle cx="14" cy="14" fill={accent} opacity="0.3" r="2.6" />
          </>
        ) : null}
      </Svg>
    </LinearGradient>
  );
};
