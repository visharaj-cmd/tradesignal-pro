import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { useBackend } from "./useBackend";

export function useCertificateStatus() {
  const { actor, isReady } = useBackend();
  const { user, currentSession } = useAuth();

  const userId = currentSession?.email ?? user?.principal ?? "";

  const { data, isLoading } = useQuery<boolean>({
    queryKey: ["hasCertificate", userId],
    queryFn: async () => {
      if (!actor) return false;
      try {
        // hasCertificate is available once the certificate feature is deployed
        const actorAny = actor as unknown as Record<string, unknown>;
        if (typeof actorAny.hasCertificate === "function") {
          return await (actorAny.hasCertificate as () => Promise<boolean>)();
        }
        return false;
      } catch {
        return false;
      }
    },
    enabled: isReady && !!userId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    hasCertificate: data ?? false,
    isLoading,
  };
}
