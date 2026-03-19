export const colors = {
  ink: "#F5F5F2",
  inkSoft: "#FFFFFF",
  panel: "rgba(255,255,255,0.96)",
  panelStrong: "rgba(255,255,255,0.98)",
  stroke: "rgba(17,24,39,0.08)",
  strokeStrong: "rgba(17,24,39,0.12)",
  text: "#111111",
  muted: "#6B7280",
  accent: "#111111",
  electric: "#2563EB",
  cobalt: "#3B82F6",
  magenta: "#E879F9",
  aqua: "#10B981",
  amber: "#D97706",
  danger: "#DC2626",
  success: "#16A34A"
};

export const gradients = {
  background: ["#F5F5F2", "#FFFFFF", "#F3F4F6"],
  hero: ["#FFFFFF", "#F3F4F6", "#ECEFF3"],
  glow: ["rgba(17,24,39,0.06)", "rgba(17,24,39,0.02)", "rgba(255,255,255,0)"],
  ambientTop: ["rgba(17,24,39,0.05)", "rgba(255,255,255,0)"],
  ambientBottom: ["rgba(59,130,246,0.05)", "rgba(255,255,255,0)"],
  success: ["#111111", "#232323"],
  panel: ["rgba(255,255,255,0.98)", "rgba(248,250,252,0.98)"],
  tab: ["rgba(255,255,255,0.98)", "rgba(248,250,252,0.98)"]
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
