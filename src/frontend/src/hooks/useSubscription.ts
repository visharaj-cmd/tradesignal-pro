import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { SubscriptionPublic } from "../types";
import { useBackend } from "./useBackend";

export function useSubscription() {
  const { actor, isReady } = useBackend();

  return useQuery<SubscriptionPublic | null>({
    queryKey: ["subscription"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMySubscription();
    },
    enabled: isReady,
    refetchInterval: 30_000,
  });
}

export function useSubscriptionStatus() {
  const { actor, isReady } = useBackend();

  return useQuery<boolean>({
    queryKey: ["subscription-status"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.checkSubscriptionStatus();
    },
    enabled: isReady,
    refetchInterval: 60_000,
  });
}

export function useActivateSubscription() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      if (!actor) throw new Error("Backend not ready");
      const { Principal } = await import("@icp-sdk/core/principal");
      await actor.activateUserSubscription(Principal.fromText(userId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      queryClient.invalidateQueries({ queryKey: ["subscription-status"] });
    },
  });
}
