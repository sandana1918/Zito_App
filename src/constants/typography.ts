import type { TextStyle } from "react-native";

export const fontFamilies = {
  uiRegular: "Inter_400Regular",
  uiMedium: "Inter_500Medium",
  uiSemiBold: "Inter_600SemiBold",
  uiBold: "Inter_700Bold",
  displayMedium: "Sora_500Medium",
  displaySemiBold: "Sora_600SemiBold",
  displayBold: "Sora_700Bold"
} as const;

export const type = {
  eyebrow: {
    fontFamily: fontFamilies.uiMedium,
    fontSize: 12,
    letterSpacing: 1.4,
    textTransform: "uppercase"
  } as TextStyle,
  eyebrowTight: {
    fontFamily: fontFamilies.uiMedium,
    fontSize: 11,
    letterSpacing: 1.1,
    textTransform: "uppercase"
  } as TextStyle,
  sectionTitle: {
    fontFamily: fontFamilies.displaySemiBold,
    fontSize: 22,
    letterSpacing: -0.4,
    lineHeight: 28
  } as TextStyle,
  screenTitle: {
    fontFamily: fontFamilies.displaySemiBold,
    fontSize: 34,
    letterSpacing: -0.9,
    lineHeight: 40
  } as TextStyle,
  heroHeading: {
    fontFamily: fontFamilies.displaySemiBold,
    fontSize: 32,
    letterSpacing: -0.8,
    lineHeight: 38
  } as TextStyle,
  heroValue: {
    fontFamily: fontFamilies.displayBold,
    fontSize: 48,
    letterSpacing: -1.4,
    lineHeight: 54
  } as TextStyle,
  cardTitle: {
    fontFamily: fontFamilies.displaySemiBold,
    fontSize: 28,
    letterSpacing: -0.6,
    lineHeight: 34
  } as TextStyle,
  metricValue: {
    fontFamily: fontFamilies.displaySemiBold,
    fontSize: 28,
    letterSpacing: -0.6,
    lineHeight: 34
  } as TextStyle,
  metricValueCompact: {
    fontFamily: fontFamilies.displaySemiBold,
    fontSize: 22,
    letterSpacing: -0.4,
    lineHeight: 28
  } as TextStyle,
  body: {
    fontFamily: fontFamilies.uiRegular,
    fontSize: 15,
    lineHeight: 24
  } as TextStyle,
  bodyStrong: {
    fontFamily: fontFamilies.uiSemiBold,
    fontSize: 16,
    lineHeight: 22
  } as TextStyle,
  bodySmall: {
    fontFamily: fontFamilies.uiRegular,
    fontSize: 14,
    lineHeight: 21
  } as TextStyle,
  label: {
    fontFamily: fontFamilies.uiMedium,
    fontSize: 13,
    lineHeight: 18
  } as TextStyle,
  button: {
    fontFamily: fontFamilies.uiSemiBold,
    fontSize: 15,
    lineHeight: 18
  } as TextStyle,
  chip: {
    fontFamily: fontFamilies.uiSemiBold,
    fontSize: 11,
    lineHeight: 14
  } as TextStyle,
  logo: {
    fontFamily: fontFamilies.displaySemiBold,
    fontSize: 18,
    letterSpacing: 2.6
  } as TextStyle,
  scoreValue: {
    fontFamily: fontFamilies.displayBold,
    fontSize: 48,
    letterSpacing: -1.2,
    lineHeight: 52
  } as TextStyle
};
