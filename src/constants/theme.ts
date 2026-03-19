export const colors = {
  ink: "#04050A",
  inkSoft: "#0B0D16",
  panel: "rgba(18, 20, 31, 0.92)",
  panelStrong: "rgba(25, 29, 46, 0.98)",
  stroke: "rgba(255,255,255,0.07)",
  strokeStrong: "rgba(255,255,255,0.14)",
  text: "#F7F8FC",
  muted: "#99A0BD",
  accent: "#6E63FF",
  electric: "#58A6FF",
  cobalt: "#7C8CFF",
  magenta: "#E06FFF",
  aqua: "#62D8C8",
  amber: "#C7A067",
  danger: "#FF6E8F",
  success: "#63D9A6"
};

export const gradients = {
  background: ["#03040A", "#070914", "#101428"],
  hero: ["#171C35", "#2D2A63", "#11141F"],
  glow: ["rgba(110,99,255,0.32)", "rgba(88,166,255,0.18)", "rgba(5,7,12,0)"],
  ambientTop: ["rgba(74,88,255,0.20)", "rgba(15,17,30,0)"],
  ambientBottom: ["rgba(224,111,255,0.12)", "rgba(4,5,10,0)"],
  success: ["#6F65FF", "#4EA8FF"],
  panel: ["rgba(20,23,37,0.98)", "rgba(11,13,22,0.98)"],
  tab: ["rgba(10,12,20,0.96)", "rgba(6,7,12,0.96)"]
};

export const statusColors: Record<string, string> = {
  Active: colors.success,
  Paid: colors.success,
  Medium: colors.amber,
  Elevated: colors.amber,
  Critical: colors.danger,
  Severe: colors.danger,
  High: colors.danger,
  Moderate: colors.amber,
  Online: colors.success,
  Outage: colors.danger
};
