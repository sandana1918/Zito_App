const createIncidentTimeline = (scenario, occurredAt, verifiedAt, creditedAt, valueLine) => {
  const shared = [
    {
      label: "Event detected",
      detail: valueLine,
      at: occurredAt
    },
    {
      label: "Verification completed",
      detail:
        scenario === "aqi"
          ? "Dual environmental sources aligned for Koramangala."
          : scenario === "platform"
            ? "Platform service degradation confirmed during active work hours."
            : "Sustained heat threshold confirmed for the registered zone.",
      at: verifiedAt
    },
    {
      label: "Eligibility confirmed",
      detail:
        scenario === "platform"
          ? "Availability status remained active while orders were unavailable."
          : "Protection was active and recent work activity met the required window.",
      at: verifiedAt
    },
    {
      label: "Payout released",
      detail: "Funds were sent automatically to the linked UPI destination.",
      at: creditedAt
    }
  ];

  return shared;
};

const scenarioTemplates = {
  aqi: {
    id: "incident-aqi-koramangala",
    scenario: "aqi",
    title: "AQI Alert",
    eventType: "Severe AQI",
    amount: 340,
    status: "Paid",
    zone: "Koramangala",
    threshold: "AQI above 400",
    measuredValue: "AQI 412",
    shortReason: "Air quality deteriorated sharply across Koramangala.",
    summary: "Your protection covered this verified AQI event automatically.",
    sources: ["IQAir", "CPCB"],
    oracleNote: "Dual-source environmental verification completed.",
    eligibility:
      "Raju was recently active in the registered zone and protection remained active during the breach window.",
    resolution: "Payout credited automatically to linked UPI.",
    timelineFactory: (occurredAt, verifiedAt, creditedAt) =>
      createIncidentTimeline("aqi", occurredAt, verifiedAt, creditedAt, "AQI reached 412 across Koramangala.")
  },
  platform: {
    id: "incident-platform-outage-blinkit",
    scenario: "platform",
    title: "Platform Outage",
    eventType: "Platform Outage",
    amount: 220,
    status: "Paid",
    zone: "Koramangala",
    threshold: "Service unavailable for 52 minutes",
    measuredValue: "Blinkit outage / 52 min",
    shortReason: "Order allocation paused during active work hours.",
    summary: "Your protection covered this verified platform outage automatically.",
    sources: ["Blinkit Service Telemetry", "Zito Availability Graph"],
    oracleNote: "Platform service state aligned with worker availability signals.",
    eligibility:
      "Raju remained available for work while the platform was unable to dispatch orders.",
    resolution: "Payout credited automatically to linked UPI.",
    timelineFactory: (occurredAt, verifiedAt, creditedAt) =>
      createIncidentTimeline(
        "platform",
        occurredAt,
        verifiedAt,
        creditedAt,
        "Blinkit order flow was unavailable for 52 minutes during the active shift window."
      )
  },
  heat: {
    id: "incident-heat-koramangala",
    scenario: "heat",
    title: "Extreme Heat",
    eventType: "Extreme Heat",
    amount: 180,
    status: "Paid",
    zone: "Koramangala",
    threshold: "Temperature above 42C for 90 minutes",
    measuredValue: "43C sustained",
    shortReason: "Unsafe heat conditions persisted across the registered zone.",
    summary: "Your protection covered this verified extreme heat event automatically.",
    sources: ["IMD", "OpenWeather Grid"],
    oracleNote: "Sustained temperature threshold verified across the zone.",
    eligibility:
      "Protection was active and sustained heat conditions matched the configured payout criteria.",
    resolution: "Payout credited automatically to linked UPI.",
    timelineFactory: (occurredAt, verifiedAt, creditedAt) =>
      createIncidentTimeline(
        "heat",
        occurredAt,
        verifiedAt,
        creditedAt,
        "Temperature held at 43C across Koramangala for the required duration."
      )
  }
};

const createHistoricalIncident = ({
  id,
  scenario,
  title,
  eventType,
  amount,
  occurredAt,
  verifiedAt,
  creditedAt,
  shortReason,
  summary,
  threshold,
  measuredValue,
  sources,
  oracleNote,
  eligibility,
  resolution,
  detail
}) => ({
  id,
  scenario,
  title,
  eventType,
  amount,
  status: "Paid",
  zone: "Koramangala",
  threshold,
  measuredValue,
  shortReason,
  summary,
  sources,
  oracleNote,
  eligibility,
  resolution,
  occurredAt,
  verifiedAt,
  creditedAt,
  payoutDestination: "raju@oksbi",
  timeline: createIncidentTimeline(scenario, occurredAt, verifiedAt, creditedAt, detail)
});

const createSeedHistory = () => [
  createHistoricalIncident({
    id: "history-aqi-20260315",
    scenario: "aqi",
    title: "AQI Alert",
    eventType: "Severe AQI",
    amount: 340,
    occurredAt: "2026-03-15T10:12:00.000Z",
    verifiedAt: "2026-03-15T10:18:00.000Z",
    creditedAt: "2026-03-15T10:20:00.000Z",
    threshold: "AQI above 400",
    measuredValue: "AQI 408",
    shortReason: "Air quality moved into severe territory during delivery hours.",
    summary: "Automatic support was credited after a severe AQI breach in Koramangala.",
    sources: ["IQAir", "CPCB"],
    oracleNote: "Dual-source environmental verification completed.",
    eligibility: "Recent work activity and active protection status met the covered window.",
    resolution: "Payout credited automatically to linked UPI.",
    detail: "AQI reached 408 across Koramangala during the active delivery window."
  }),
  createHistoricalIncident({
    id: "history-platform-20260312",
    scenario: "platform",
    title: "Platform Outage",
    eventType: "Platform Outage",
    amount: 220,
    occurredAt: "2026-03-12T12:05:00.000Z",
    verifiedAt: "2026-03-12T12:44:00.000Z",
    creditedAt: "2026-03-12T12:47:00.000Z",
    threshold: "Service unavailable for 47 minutes",
    measuredValue: "Blinkit outage / 47 min",
    shortReason: "Dispatch services paused while Raju remained available for work.",
    summary: "Automatic support was credited after a verified platform outage during active hours.",
    sources: ["Blinkit Service Telemetry", "Zito Availability Graph"],
    oracleNote: "Platform service state aligned with worker availability signals.",
    eligibility: "Availability remained active while dispatch volume dropped to zero.",
    resolution: "Payout credited automatically to linked UPI.",
    detail: "Blinkit order flow was unavailable for 47 minutes during the active shift window."
  }),
  createHistoricalIncident({
    id: "history-heat-20260309",
    scenario: "heat",
    title: "Extreme Heat",
    eventType: "Extreme Heat",
    amount: 180,
    occurredAt: "2026-03-09T13:26:00.000Z",
    verifiedAt: "2026-03-09T14:09:00.000Z",
    creditedAt: "2026-03-09T14:12:00.000Z",
    threshold: "Temperature above 42C for 75 minutes",
    measuredValue: "42.8C sustained",
    shortReason: "Unsafe heat conditions persisted across the registered zone.",
    summary: "Automatic support was credited after sustained heat crossed the covered threshold.",
    sources: ["IMD", "OpenWeather Grid"],
    oracleNote: "Sustained temperature threshold verified across the zone.",
    eligibility: "Protection was active and temperature duration matched the payout rule.",
    resolution: "Payout credited automatically to linked UPI.",
    detail: "Temperature held above 42C across Koramangala for the required duration."
  })
];

const createDefaultState = () => ({
  worker: {
    id: "worker-raju-sharma",
    name: "Raju Sharma",
    age: 27,
    occupation: "Delivery Partner",
    phone: "+91 98765 43210",
    platform: "Blinkit",
    registeredZone: "Koramangala, Bengaluru",
    weeklyBaselineEarnings: 4200,
    upiId: "raju@oksbi",
    upiLinked: true,
    protectionStatus: "Active",
    activeStatus: true,
    availabilityNote: "Active within the required window"
  },
  coverage: {
    status: "Active",
    protectedThisWeek: 1200,
    weeklyProtectionAmount: 1200,
    earningsProtectedToday: 420,
    nextPremiumAmount: 69,
    nextPremiumDueLabel: "Tomorrow / 9:00 AM",
    evScore: 62,
    riskBand: "Medium",
    insight:
      "Monitoring live conditions across Koramangala. Protection remains active for verified disruptions."
  },
  conditions: {
    aqi: 118,
    aqiBand: "Moderate",
    temperature: 36,
    heatBand: "Elevated",
    platformStatus: "Online",
    platformDetail: "Orders are flowing normally in your shift window.",
    updatedAt: "2026-03-19T07:15:00.000Z"
  },
  risk: {
    score: 62,
    band: "Medium",
    trend: [54, 55, 57, 61, 58, 60, 62],
    explanation:
      "Your EV Score estimates the likelihood of disruption affecting your working income over the current protection period.",
    factors: [
      {
        key: "weather",
        label: "Weather Risk",
        level: "High",
        value: 74,
        insight: "Heat conditions are trending above the city baseline."
      },
      {
        key: "aqi",
        label: "AQI Risk",
        level: "Moderate",
        value: 58,
        insight: "Air quality remains watchful but within the covered zone range."
      },
      {
        key: "platform",
        label: "Platform Risk",
        level: "Moderate",
        value: 49,
        insight: "Platform stability is normal with minor recent latency."
      },
      {
        key: "earnings",
        label: "Earnings Volatility",
        level: "Moderate",
        value: 46,
        insight: "Your baseline earnings are stable over the current week."
      }
    ]
  },
  incidents: createSeedHistory(),
  meta: {
    lastResetAt: "2026-03-19T07:15:00.000Z"
  }
});

module.exports = {
  createDefaultState,
  scenarioTemplates
};
