import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useRef, useState } from "react";
import { createActor } from "../backend";
import type { backendInterface } from "../backend";

interface UseBackendResult {
  actor: backendInterface | null;
  isReady: boolean;
  isRegistered: boolean;
  isAnonymousPrincipal: boolean;
  iiLoginStatus: string;
  ensureUserRole: () => Promise<boolean>;
  claimAdminRoleWithPassword: (password: string) => Promise<boolean>;
  claimSuperAdminRoleWithPassword: (password: string) => Promise<boolean>;
  loginWithII: () => void;
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export function useBackend(): UseBackendResult {
  const { actor, isFetching } = useActor(createActor);
  const { identity, login, loginStatus } = useInternetIdentity();
  const [isRegistered, setIsRegistered] = useState(false);
  const registrationAttemptedRef = useRef(false);

  const isAnonymousPrincipal =
    !identity || identity.getPrincipal().isAnonymous();

  const ensureUserRole = useCallback(async (): Promise<boolean> => {
    if (!actor) {
      console.warn("[useBackend] ensureUserRole called but actor not ready");
      return false;
    }

    if (isAnonymousPrincipal) {
      console.warn(
        "[useBackend] ensureUserRole: anonymous principal — Internet Identity login required",
      );
      return false;
    }

    const MAX_RETRIES = 3;
    const BASE_DELAY_MS = 1000;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        await actor.selfRegister();
        setIsRegistered(true);
        console.log(
          `[useBackend] ensureUserRole succeeded on attempt ${attempt + 1}`,
        );
        return true;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.warn(
          `[useBackend] ensureUserRole attempt ${attempt + 1} failed:`,
          msg,
        );

        if (attempt < MAX_RETRIES) {
          const delay = BASE_DELAY_MS * 2 ** attempt;
          console.log(`[useBackend] Retrying in ${delay}ms...`);
          await sleep(delay);
        }
      }
    }

    console.error("[useBackend] ensureUserRole: all retries exhausted");
    return false;
  }, [actor, isAnonymousPrincipal]);

  const claimAdminRoleWithPassword = useCallback(
    async (password: string): Promise<boolean> => {
      if (!actor) {
        console.warn(
          "[useBackend] claimAdminRoleWithPassword: actor not ready",
        );
        return false;
      }
      if (isAnonymousPrincipal) {
        console.warn(
          "[useBackend] claimAdminRoleWithPassword: anonymous principal",
        );
        return false;
      }
      try {
        const granted = await actor.claimAdminRole(password);
        console.log("[useBackend] claimAdminRoleWithPassword:", granted);
        return granted;
      } catch (err) {
        console.error("[useBackend] claimAdminRoleWithPassword failed:", err);
        return false;
      }
    },
    [actor, isAnonymousPrincipal],
  );

  const claimSuperAdminRoleWithPassword = useCallback(
    async (password: string): Promise<boolean> => {
      if (!actor) {
        console.warn(
          "[useBackend] claimSuperAdminRoleWithPassword: actor not ready",
        );
        return false;
      }
      if (isAnonymousPrincipal) {
        console.warn(
          "[useBackend] claimSuperAdminRoleWithPassword: anonymous principal",
        );
        return false;
      }
      try {
        const granted = await actor.claimAdminRole(password);
        console.log("[useBackend] claimSuperAdminRoleWithPassword:", granted);
        return granted;
      } catch (err) {
        console.error(
          "[useBackend] claimSuperAdminRoleWithPassword failed:",
          err,
        );
        return false;
      }
    },
    [actor, isAnonymousPrincipal],
  );

  useEffect(() => {
    if (!actor || isFetching || isAnonymousPrincipal) return;
    if (registrationAttemptedRef.current) return;
    registrationAttemptedRef.current = true;

    actor
      .selfRegister()
      .then(() => {
        setIsRegistered(true);
        console.log("[useBackend] Auto-registered user role on actor ready");
      })
      .catch((err) => {
        console.warn("[useBackend] auto-register failed:", err);
      });
  }, [actor, isFetching, isAnonymousPrincipal]);

  useEffect(() => {
    if (!actor || isAnonymousPrincipal) {
      registrationAttemptedRef.current = false;
      setIsRegistered(false);
    }
  }, [actor, isAnonymousPrincipal]);

  return {
    actor: actor ?? null,
    isReady: !!actor && !isFetching,
    isRegistered,
    isAnonymousPrincipal,
    iiLoginStatus: loginStatus,
    ensureUserRole,
    claimAdminRoleWithPassword,
    claimSuperAdminRoleWithPassword,
    loginWithII: login,
  };
}
