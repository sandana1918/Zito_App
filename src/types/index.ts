export type EventScenario = "aqi" | "platform" | "heat";

export interface WorkerProfile {
  id: string;
  name: string;
  age: number;
  occupation: string;
  phone: string;
  platform: string;
  registeredZone: string;
  weeklyBaselineEarnings: number;
  upiId: string;
  upiLinked: boolean;
  protectionStatus: string;
  activeStatus: boolean;
  availabilityNote: string;
}

export interface CoverageState {
  status: string;
  protectedThisWeek: number;
  weeklyProtectionAmount: number;
  earningsProtectedToday: number;
  nextPremiumAmount: number;
  nextPremiumDueLabel: string;
  evScore: number;
  riskBand: string;
  insight: string;
}

export interface ConditionsState {
  aqi: number;
  aqiBand: string;
  temperature: number;
  heatBand: string;
  platformStatus: string;
  platformDetail: string;
  updatedAt: string;
}

export interface RiskFactor {
  key: string;
  label: string;
  level: string;
  value: number;
  insight: string;
}

export interface RiskScore {
  score: number;
  band: string;
  trend: number[];
  explanation: string;
  factors: RiskFactor[];
}

export interface TimelineItemData {
  label: string;
  detail: string;
  at: string;
}

export interface Incident {
  id: string;
  scenario: EventScenario;
  title: string;
  eventType: string;
  amount: number;
  status: string;
  zone: string;
  threshold: string;
  measuredValue: string;
  shortReason: string;
  summary: string;
  sources: string[];
  oracleNote: string;
  eligibility: string;
  resolution: string;
  occurredAt: string;
  verifiedAt: string;
  creditedAt: string;
  payoutDestination: string;
  timeline: TimelineItemData[];
}

export interface DashboardSnapshot {
  worker?: WorkerProfile;
  coverage?: CoverageState;
  conditions?: ConditionsState;
  risk?: RiskScore;
  history?: Incident[];
  incident?: Incident;
  alreadyProcessed?: boolean;
}

export interface RegisterPayload {
  name: string;
  phone: string;
  platform: string;
  registeredZone: string;
  weeklyBaselineEarnings: number;
  upiId: string;
}

export type RootStackParamList = {
  Intro: undefined;
  SignIn: undefined;
  Onboarding: undefined;
  Main: undefined;
  IncidentDetail: { incidentId: string };
  ProtectionDetails: undefined;
};

export type RootTabParamList = {
  Home: undefined;
  History: undefined;
  Risk: undefined;
  Profile: undefined;
};
