import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zitoApi } from "@/api/zito";
import { useAppSession } from "@/store/AppProvider";
import type { DashboardSnapshot, EventScenario, RegisterPayload } from "@/types";

const keys = {
  worker: ["worker"] as const,
  coverage: ["coverage"] as const,
  conditions: ["conditions"] as const,
  history: ["history"] as const,
  risk: ["risk"] as const
};

const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useZitoData = () => {
  const queryClient = useQueryClient();
  const { enqueuePayout } = useAppSession();

  const applySnapshot = (snapshot: DashboardSnapshot) => {
    if (snapshot.worker) {
      queryClient.setQueryData(keys.worker, snapshot.worker);
    }
    if (snapshot.coverage) {
      queryClient.setQueryData(keys.coverage, snapshot.coverage);
    }
    if (snapshot.conditions) {
      queryClient.setQueryData(keys.conditions, snapshot.conditions);
    }
    if (snapshot.history) {
      queryClient.setQueryData(keys.history, snapshot.history);
    }
    if (snapshot.risk) {
      queryClient.setQueryData(keys.risk, snapshot.risk);
    }
  };

  const workerQuery = useQuery({ queryKey: keys.worker, queryFn: zitoApi.getWorker });
  const coverageQuery = useQuery({ queryKey: keys.coverage, queryFn: zitoApi.getCoverage });
  const conditionsQuery = useQuery({ queryKey: keys.conditions, queryFn: zitoApi.getConditions });
  const historyQuery = useQuery({ queryKey: keys.history, queryFn: zitoApi.getHistory });
  const riskQuery = useQuery({ queryKey: keys.risk, queryFn: zitoApi.getRiskScore });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => zitoApi.register(payload),
    onSuccess: applySnapshot
  });

  const triggerEventMutation = useMutation({
    mutationFn: (scenario: EventScenario) => zitoApi.triggerEvent(scenario),
    onSuccess: (snapshot) => {
      applySnapshot(snapshot);
      if (snapshot.incident && !snapshot.alreadyProcessed) {
        enqueuePayout(snapshot.incident);
      }
    }
  });

  const resetMutation = useMutation({
    mutationFn: zitoApi.reset,
    onSuccess: applySnapshot
  });

  const runGuidedFlow = async () => {
    const flow: EventScenario[] = ["aqi", "platform", "heat"];

    for (const scenario of flow) {
      await triggerEventMutation.mutateAsync(scenario);
      await pause(900);
    }
  };

  return {
    workerQuery,
    coverageQuery,
    conditionsQuery,
    historyQuery,
    riskQuery,
    registerMutation,
    triggerEventMutation,
    resetMutation,
    runGuidedFlow
  };
};

