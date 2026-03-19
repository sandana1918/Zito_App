import { apiRequest } from "@/api/client";
import type {
  ConditionsState,
  CoverageState,
  DashboardSnapshot,
  EventScenario,
  Incident,
  RegisterPayload,
  RiskScore,
  WorkerProfile
} from "@/types";

export const zitoApi = {
  register: (payload: RegisterPayload) =>
    apiRequest<DashboardSnapshot>("/register", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  getWorker: () => apiRequest<WorkerProfile>("/worker"),
  getCoverage: () => apiRequest<CoverageState>("/coverage"),
  getConditions: () => apiRequest<ConditionsState>("/conditions"),
  getHistory: () => apiRequest<Incident[]>("/history"),
  getRiskScore: () => apiRequest<RiskScore>("/risk-score"),
  triggerEvent: (scenario: EventScenario) => {
    const path =
      scenario === "aqi"
        ? "/events/aqi"
        : scenario === "platform"
          ? "/events/platform-outage"
          : "/events/heat";

    return apiRequest<DashboardSnapshot>(path, {
      method: "POST"
    });
  },
  reset: () =>
    apiRequest<DashboardSnapshot>("/reset", {
      method: "POST"
    })
};

