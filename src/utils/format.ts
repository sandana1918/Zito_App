export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);

export const formatCompactCurrency = (value: number) => formatCurrency(value).replace(".00", "");

export const formatDateTime = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(iso));

export const getGreetingName = (name: string) => name.split(" ")[0] || name;

export const getScenarioAccent = (scenario: string) => {
  switch (scenario) {
    case "aqi":
      return "#FF6C88";
    case "platform":
      return "#7A6BFF";
    case "heat":
      return "#F2B868";
    default:
      return "#3DA5FF";
  }
};

export const formatConditionTemperature = (value: number, band: string) => `${value}C ${band}`;
export const formatMetaLine = (left: string, right: string) => `${left} / ${right}`;
