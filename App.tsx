import "react-native-gesture-handler";
import "./global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useMemo } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigationContainerRef } from "@react-navigation/native";
import { PayoutModal } from "@/components/PayoutModal";
import { RootNavigator } from "@/navigation/RootNavigator";
import { AppProvider, useAppSession } from "@/store/AppProvider";
import type { RootStackParamList } from "@/types";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 30
    }
  }
});

const AppShell = () => {
  const navigationRef = useNavigationContainerRef<RootStackParamList>();
  const { activePayout, dismissPayout } = useAppSession();

  return (
    <>
      <RootNavigator navigationRef={navigationRef} />
      <PayoutModal incident={activePayout} navigationRef={navigationRef} onDismiss={dismissPayout} visible={Boolean(activePayout)} />
      <StatusBar style="dark" />
    </>
  );
};

export default function App() {
  const providers = useMemo(
    () => (
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <AppShell />
        </AppProvider>
      </QueryClientProvider>
    ),
    []
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>{providers}</SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

