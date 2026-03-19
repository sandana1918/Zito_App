import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Incident } from "@/types";

const ONBOARDING_KEY = "zito:onboarding-complete";
const AUTH_KEY = "zito:authenticated";

interface AppContextValue {
  onboardingComplete: boolean | null;
  isAuthenticated: boolean | null;
  completeOnboarding: () => Promise<void>;
  signIn: () => Promise<void>;
  logout: () => Promise<void>;
  enqueuePayout: (incident: Incident) => void;
  activePayout: Incident | null;
  dismissPayout: () => void;
  opsConsoleVisible: boolean;
  openOpsConsole: () => void;
  closeOpsConsole: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider = ({ children }: React.PropsWithChildren) => {
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [payoutQueue, setPayoutQueue] = useState<Incident[]>([]);
  const [opsConsoleVisible, setOpsConsoleVisible] = useState(false);

  useEffect(() => {
    Promise.all([AsyncStorage.getItem(ONBOARDING_KEY), AsyncStorage.getItem(AUTH_KEY)]).then(([onboardingValue, authValue]) => {
      setOnboardingComplete(onboardingValue === "true");
      setIsAuthenticated(authValue === "true");
    });
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      onboardingComplete,
      isAuthenticated,
      completeOnboarding: async () => {
        await AsyncStorage.multiSet([
          [ONBOARDING_KEY, "true"],
          [AUTH_KEY, "true"]
        ]);
        setOnboardingComplete(true);
        setIsAuthenticated(true);
      },
      signIn: async () => {
        await AsyncStorage.multiSet([
          [ONBOARDING_KEY, "true"],
          [AUTH_KEY, "true"]
        ]);
        setOnboardingComplete(true);
        setIsAuthenticated(true);
      },
      logout: async () => {
        await AsyncStorage.removeItem(AUTH_KEY);
        setIsAuthenticated(false);
        setPayoutQueue([]);
        setOpsConsoleVisible(false);
      },
      enqueuePayout: (incident) => {
        setPayoutQueue((current) => {
          if (current.some((item) => item.id === incident.id)) {
            return current;
          }

          return [...current, incident];
        });
      },
      activePayout: payoutQueue[0] || null,
      dismissPayout: () => {
        setPayoutQueue((current) => current.slice(1));
      },
      opsConsoleVisible,
      openOpsConsole: () => setOpsConsoleVisible(true),
      closeOpsConsole: () => setOpsConsoleVisible(false)
    }),
    [isAuthenticated, onboardingComplete, opsConsoleVisible, payoutQueue]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppSession = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppSession must be used within AppProvider");
  }

  return context;
};
