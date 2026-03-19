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
          ? "Oracle Consensus Layer aligned IQAir and CPCB for Koramangala."
          : scenario === "platform"
            ? "Platform outage aligned with availability telemetry during active hours."
            : "Sustained heat threshold confirmed across the covered zone.",
      at: verifiedAt
    },
    {
      label: "Eligibility confirmed",
      detail:
        scenario === "platform"
          ? "Active non-declining work status and genuine location checks remained clear."
          : "Active work status and M4 spoofing checks cleared within the required window.",
      at: verifiedAt
    },
    {
      label: "Payout released",
      detail: "Funds were sent to the linked UPI account through Razorpay UPI rails.",
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
    shortReason: "AQI crossed the covered threshold across Koramangala during working hours.",
    summary: "AQI 412 was verified in your zone and your payout was released automatically.",
    sources: ["IQAir", "CPCB"],
    oracleNote: "Oracle Consensus Layer marked the AQI threshold as breached after dual-source confirmation.",
    eligibility:
      "Policy was active, Blinkit work status stayed active and non-declining within the last 60 minutes, and GPS consistency cleared the M4 spoofing detector.",
    resolution: "Razorpay UPI payout completed automatically with no claim required.",
    payoutRail: "Razorpay UPI",
    settlementSeconds: 73,
    oracleLayer: "Oracle Consensus Layer",
    workStatusCheck: "Platform API confirmed active non-declining status in the last 60 minutes.",
    spoofingCheck: "M4 spoofing detector marked location behaviour as genuine.",
    timelineFactory: (occurredAt, verifiedAt, creditedAt) =>
      createIncidentTimeline("aqi", occurredAt, verifiedAt, creditedAt, "AQI reached 412 across Koramangala on Wednesday afternoon.")
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
    shortReason: "Blinkit dispatch was unavailable during active delivery hours.",
    summary: "Blinkit order flow paused while you remained available, so support was credited automatically.",
    sources: ["Blinkit Service Telemetry", "Zito Availability Graph"],
    oracleNote: "Platform state and worker availability remained aligned through the outage window.",
    eligibility:
      "Policy was active, Blinkit availability stayed active during the outage, and location checks remained consistent with genuine work activity.",
    resolution: "Payout was credited automatically to the linked UPI account.",
    payoutRail: "Razorpay UPI",
    settlementSeconds: 81,
    oracleLayer: "Trigger Engine",
    workStatusCheck: "Platform API showed availability during the affected window.",
    spoofingCheck: "M4 spoofing detector found no anomalies.",
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
    shortReason: "Unsafe heat conditions persisted across the covered zone.",
    summary: "Sustained heat crossed the covered threshold and support was credited automatically.",
    sources: ["IMD", "OpenWeather Grid"],
    oracleNote: "Sustained temperature threshold verified across Koramangala.",
    eligibility:
      "Policy was active, heat duration met the covered rule, and work activity checks remained eligible.",
    resolution: "Payout credited automatically to linked UPI.",
    payoutRail: "Razorpay UPI",
    settlementSeconds: 86,
    oracleLayer: "Weather Trigger Engine",
    workStatusCheck: "Recent work activity remained inside the eligibility window.",
    spoofingCheck: "M4 spoofing detector remained clear.",
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
  payoutRail,
  settlementSeconds,
  oracleLayer,
  workStatusCheck,
  spoofingCheck,
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
  payoutRail,
  settlementSeconds,
  oracleLayer,
  workStatusCheck,
  spoofingCheck,
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
    summary: "AQI 408 was verified in Koramangala and support was credited automatically.",
    sources: ["IQAir", "CPCB"],
    oracleNote: "Oracle Consensus Layer completed dual-source AQI verification.",
    eligibility: "Active work status and genuine location checks remained clear during the breach window.",
    resolution: "Payout credited automatically to linked UPI.",
    payoutRail: "Razorpay UPI",
    settlementSeconds: 79,
    oracleLayer: "Oracle Consensus Layer",
    workStatusCheck: "Platform API confirmed active work status during the breach window.",
    spoofingCheck: "M4 spoofing detector remained clear.",
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
    summary: "Support was credited after a verified Blinkit outage during active hours.",
    sources: ["Blinkit Service Telemetry", "Zito Availability Graph"],
    oracleNote: "Trigger Engine aligned the outage with worker availability.",
    eligibility: "Availability remained active and location checks matched genuine work activity.",
    resolution: "Payout credited automatically to linked UPI.",
    payoutRail: "Razorpay UPI",
    settlementSeconds: 84,
    oracleLayer: "Trigger Engine",
    workStatusCheck: "Availability remained active while dispatch volume dropped to zero.",
    spoofingCheck: "M4 spoofing detector remained clear.",
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
    summary: "Support was credited after sustained heat crossed the covered threshold.",
    sources: ["IMD", "OpenWeather Grid"],
    oracleNote: "Weather Trigger Engine verified sustained heat across Koramangala.",
    eligibility: "Protection was active and duration conditions matched the payout rule.",
    resolution: "Payout credited automatically to linked UPI.",
    payoutRail: "Razorpay UPI",
    settlementSeconds: 88,
    oracleLayer: "Weather Trigger Engine",
    workStatusCheck: "Recent work activity remained inside the required window.",
    spoofingCheck: "M4 spoofing detector remained clear.",
    detail: "Temperature held above 42C across Koramangala for the required duration."
  })
];

const createDefaultState = () => ({
  worker: {
    id: "worker-raju-sharma",
    workerId: "BLR-BLK-2841",
    name: "Raju Sharma",
    age: 27,
    occupation: "Delivery Partner",
    phone: "+91 98765 43210",
    platform: "Blinkit",
    registeredZone: "Koramangala, Bengaluru",
    fourWeekAverageDailyEarnings: 600,
    weeklyBaselineEarnings: 4200,
    upiId: "raju@oksbi",
    upiLinked: true,
    aadhaarLinkedPhoneVerified: true,
    protectionStatus: "Active",
    activeStatus: true,
    availabilityNote: "Active non-declining within the required 60 minute window",
    policyActivatedAt: "2026-03-16T05:34:00.000Z"
  },
  coverage: {
    status: "Active",
    protectedThisWeek: 1200,
    remainingProtectedEarnings: 1200,
    weeklyProtectionAmount: 1200,
    earningsProtectedToday: 420,
    weeklyPremium: 69,
    dailyInstallmentAmount: 10,
    premiumTier: "Medium",
    premiumLockedAt: "2026-03-15T18:30:00.000Z",
    premiumWindowLabel: "Locked for Mar 16 to Mar 22",
    premiumCollectionLabel: "Collected in daily micro-installments from earnings",
    nextPremiumAmount: 10,
    nextPremiumDueLabel: "Next micro-installment / Tonight 11:30 PM",
    evScore: 62,
    riskBand: "Medium",
    insight:
      "Sunday premium is locked for the week. Zito is monitoring AQI, heat, uptime, and earnings variance automatically."
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
      "Your EV Score is recomputed every Sunday from forecasts, AQI, platform uptime history, and your earnings variance to lock the coming week's premium.",
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
        insight: "Air quality remains watchful but inside the covered range."
      },
      {
        key: "platform",
        label: "Platform Risk",
        level: "Moderate",
        value: 49,
        insight: "Platform uptime is stable with minor recent latency."
      },
      {
        key: "earnings",
        label: "Earnings Volatility",
        level: "Moderate",
        value: 46,
        insight: "Four-week daily earnings remain stable through the current cycle."
      }
    ]
  },
  incidents: createSeedHistory(),
  meta: {
    currentCycleStart: "2026-03-15T18:30:00.000Z",
    currentCycleEndsAt: "2026-03-22T18:29:59.000Z",
    lastResetAt: "2026-03-19T07:15:00.000Z"
  }
});

module.exports = {
  createDefaultState,
  scenarioTemplates
};
