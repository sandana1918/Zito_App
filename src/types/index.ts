export type EventScenario = "aqi" | "platform" | "heat";

export interface WorkerProfile {
  id: string;
  workerId: string;
  name: string;
  age: number;
  occupation: string;
  phone: string;
  platform: string;
  registeredZone: string;
  fourWeekAverageDailyEarnings: number;
  weeklyBaselineEarnings: number;
  upiId: string;
  upiLinked: boolean;
  aadhaarLinkedPhoneVerified: boolean;
  protectionStatus: string;
  activeStatus: boolean;
  availabilityNote: string;
  policyActivatedAt: string;
}

export interface CoverageState {
  status: string;
  protectedThisWeek: number;
  remainingProtectedEarnings: number;
  weeklyProtectionAmount: number;
  earningsProtectedToday: number;
  weeklyPremium: number;
  dailyInstallmentAmount: number;
  premiumTier: string;
  premiumLockedAt: string;
  premiumWindowLabel: string;
  premiumCollectionLabel: string;
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
  payoutRail: string;
  settlementSeconds: number;
  oracleLayer: string;
  workStatusCheck: string;
  spoofingCheck: string;
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
  workerId: string;
  platform: string;
  registeredZone: string;
  averageDailyEarnings: number;
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
