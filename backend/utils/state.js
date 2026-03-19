const fs = require("fs");
const path = require("path");
const { createDefaultState, scenarioTemplates } = require("../mockData/seed");

const stateFilePath = path.join(__dirname, "..", "mockData", "state.json");

const readState = () => {
  if (!fs.existsSync(stateFilePath)) {
    const fallback = createDefaultState();
    fs.writeFileSync(stateFilePath, JSON.stringify(fallback, null, 2), "utf8");
    return fallback;
  }

  const raw = fs.readFileSync(stateFilePath, "utf8");
  return JSON.parse(raw);
};

const writeState = (state) => {
  fs.writeFileSync(stateFilePath, JSON.stringify(state, null, 2), "utf8");
};

const getPublicState = () => {
  const state = readState();
  return {
    worker: state.worker,
    coverage: state.coverage,
    conditions: state.conditions,
    risk: state.risk,
    history: state.incidents,
    meta: state.meta
  };
};

const premiumForBand = (band) => {
  if (band === "Elevated") {
    return 89;
  }

  if (band === "Medium") {
    return 69;
  }

  return 49;
};

const dailyInstallmentForPremium = (premium) => Math.ceil(premium / 7);

const registerWorker = (payload) => {
  const state = readState();
  const averageDailyEarnings = Number(payload.averageDailyEarnings) || state.worker.fourWeekAverageDailyEarnings;
  const weeklyBaselineEarnings = averageDailyEarnings * 7;
  const weeklyPremium = premiumForBand(state.coverage.riskBand);

  state.worker = {
    ...state.worker,
    name: payload.name || state.worker.name,
    phone: payload.phone || state.worker.phone,
    workerId: payload.workerId || state.worker.workerId,
    platform: payload.platform || state.worker.platform,
    registeredZone: payload.registeredZone || state.worker.registeredZone,
    fourWeekAverageDailyEarnings: averageDailyEarnings,
    weeklyBaselineEarnings,
    upiId: payload.upiId || state.worker.upiId,
    protectionStatus: "Active",
    upiLinked: true,
    aadhaarLinkedPhoneVerified: true,
    policyActivatedAt: new Date().toISOString()
  };

  state.coverage = {
    ...state.coverage,
    status: "Active",
    weeklyPremium,
    dailyInstallmentAmount: dailyInstallmentForPremium(weeklyPremium),
    nextPremiumAmount: dailyInstallmentForPremium(weeklyPremium),
    premiumTier: state.coverage.riskBand,
    insight: "Policy active. This week's premium is locked and collected automatically in daily micro-installments."
  };

  writeState(state);
  return getPublicState();
};

const buildScenarioUpdate = (scenario, currentState) => {
  if (scenario === "aqi") {
    return {
      coverage: {
        ...currentState.coverage,
        protectedThisWeek: 1540,
        remainingProtectedEarnings: 1540,
        evScore: 71,
        riskBand: "Elevated",
        premiumTier: "Elevated",
        weeklyPremium: 89,
        dailyInstallmentAmount: 13,
        nextPremiumAmount: 13,
        insight: "AQI risk is critical in Koramangala. Protection remains active and the payout rule has been executed."
      },
      conditions: {
        ...currentState.conditions,
        aqi: 412,
        aqiBand: "Critical",
        updatedAt: "2026-03-19T09:40:00.000Z"
      },
      risk: {
        ...currentState.risk,
        score: 71,
        band: "Elevated",
        trend: [54, 55, 57, 61, 64, 68, 71],
        explanation:
          "Your EV Score is recomputed every Sunday from forecasts, AQI, platform uptime history, and earnings variance to lock the coming week's premium.",
        factors: currentState.risk.factors.map((factor) =>
          factor.key === "aqi"
            ? {
                ...factor,
                level: "Severe",
                value: 92,
                insight: "AQI breached the payout threshold across Koramangala."
              }
            : factor
        )
      }
    };
  }

  if (scenario === "platform") {
    return {
      coverage: {
        ...currentState.coverage,
        protectedThisWeek: 1760,
        remainingProtectedEarnings: 1760,
        evScore: 68,
        riskBand: "Medium",
        premiumTier: "Medium",
        weeklyPremium: 69,
        dailyInstallmentAmount: 10,
        nextPremiumAmount: 10,
        insight: "Platform availability dropped during active hours. Protection remained active and the payout was released automatically."
      },
      conditions: {
        ...currentState.conditions,
        platformStatus: "Outage",
        platformDetail: "Blinkit dispatch was unavailable for 52 minutes.",
        updatedAt: "2026-03-19T12:25:00.000Z"
      },
      risk: {
        ...currentState.risk,
        score: 68,
        band: "Medium",
        trend: [54, 55, 57, 61, 60, 65, 68],
        explanation:
          "Your EV Score is recomputed every Sunday from forecasts, AQI, platform uptime history, and earnings variance to lock the coming week's premium.",
        factors: currentState.risk.factors.map((factor) =>
          factor.key === "platform"
            ? {
                ...factor,
                level: "High",
                value: 81,
                insight: "Dispatch services were unavailable during the active work window."
              }
            : factor
        )
      }
    };
  }

  return {
    coverage: {
      ...currentState.coverage,
      protectedThisWeek: 1940,
      remainingProtectedEarnings: 1940,
      evScore: 74,
      riskBand: "Elevated",
      premiumTier: "Elevated",
      weeklyPremium: 89,
      dailyInstallmentAmount: 13,
      nextPremiumAmount: 13,
      insight: "Heat conditions are severe in your zone. Protection remains active and the payout rule has been executed."
    },
    conditions: {
      ...currentState.conditions,
      temperature: 43,
      heatBand: "Severe",
      updatedAt: "2026-03-19T14:10:00.000Z"
    },
    risk: {
      ...currentState.risk,
      score: 74,
      band: "Elevated",
      trend: [54, 55, 57, 61, 64, 70, 74],
      explanation:
        "Your EV Score is recomputed every Sunday from forecasts, AQI, platform uptime history, and earnings variance to lock the coming week's premium.",
      factors: currentState.risk.factors.map((factor) =>
        factor.key === "weather"
          ? {
              ...factor,
              level: "High",
              value: 89,
              insight: "Sustained heat has pushed the payout threshold above the covered limit."
            }
          : factor
      )
    }
  };
};

const triggerScenario = (scenario) => {
  const state = readState();
  const template = scenarioTemplates[scenario];

  if (!template) {
    throw new Error(`Unknown scenario: ${scenario}`);
  }

  const existingIncident = state.incidents.find((item) => item.id === template.id);
  if (existingIncident) {
    return {
      ...getPublicState(),
      incident: existingIncident,
      alreadyProcessed: true
    };
  }

  const occurredAt =
    scenario === "aqi"
      ? "2026-03-19T09:28:00.000Z"
      : scenario === "platform"
        ? "2026-03-19T11:32:00.000Z"
        : "2026-03-19T13:05:00.000Z";
  const verifiedAt =
    scenario === "aqi"
      ? "2026-03-19T09:34:00.000Z"
      : scenario === "platform"
        ? "2026-03-19T12:18:00.000Z"
        : "2026-03-19T14:02:00.000Z";
  const creditedAt =
    scenario === "aqi"
      ? "2026-03-19T09:36:13.000Z"
      : scenario === "platform"
        ? "2026-03-19T12:21:21.000Z"
        : "2026-03-19T14:05:26.000Z";

  const incident = {
    ...template,
    occurredAt,
    verifiedAt,
    creditedAt,
    payoutDestination: state.worker.upiId,
    timeline: template.timelineFactory(occurredAt, verifiedAt, creditedAt)
  };

  const updates = buildScenarioUpdate(scenario, state);

  state.coverage = {
    ...updates.coverage
  };
  state.conditions = {
    ...updates.conditions
  };
  state.risk = {
    ...updates.risk
  };
  state.incidents = [incident, ...state.incidents];

  writeState(state);

  return {
    ...getPublicState(),
    incident,
    alreadyProcessed: false
  };
};

const resetState = () => {
  const nextState = createDefaultState();
  writeState(nextState);
  return getPublicState();
};

module.exports = {
  getPublicState,
  registerWorker,
  triggerScenario,
  resetState
};
