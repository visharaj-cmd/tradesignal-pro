import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  Loader2,
  QrCode,
  Save,
  Shield,
  Upload,
} from "lucide-react";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../../backend";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { useBackend } from "../../hooks/useBackend";
import type { UpiConfigPublic } from "../../types";

const ADMIN_PASSWORD = "11760000";

export default function AdminSettings() {
  const {
    actor,
    isReady,
    isAnonymousPrincipal,
    iiLoginStatus,
    loginWithII,
    claimAdminRoleWithPassword,
  } = useBackend();
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);

  const [upiId, setUpiId] = useState("");
  const [upiIdTouched, setUpiIdTouched] = useState(false);
  const [upiSaved, setUpiSaved] = useState(false);
  const [qrFile, setQrFile] = useState<File | null>(null);
  const [qrPreview, setQrPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAdminRoleClaimed, setIsAdminRoleClaimed] = useState(false);
  const [isClaimingRole, setIsClaimingRole] = useState(false);
  const claimAttemptedRef = useRef(false);

  useEffect(() => {
    if (isAnonymousPrincipal || !actor || !isReady) return;
    if (claimAttemptedRef.current) return;
    claimAttemptedRef.current = true;
    setIsClaimingRole(true);
    claimAdminRoleWithPassword(ADMIN_PASSWORD)
      .then((granted) => {
        setIsAdminRoleClaimed(granted);
        if (!granted)
          toast.error("Admin role could not be granted. Please try again.");
      })
      .catch(() => toast.error("Failed to connect admin identity."))
      .finally(() => setIsClaimingRole(false));
  }, [isAnonymousPrincipal, actor, isReady, claimAdminRoleWithPassword]);

  useEffect(() => {
    if (isAnonymousPrincipal) {
      claimAttemptedRef.current = false;
      setIsAdminRoleClaimed(false);
    }
  }, [isAnonymousPrincipal]);

  const { data: config, isLoading } = useQuery<UpiConfigPublic>({
    queryKey: ["upi-config"],
    queryFn: async () => {
      if (!actor) throw new Error("Not ready");
      return actor.getUpiConfig();
    },
    enabled: isReady && isAdminRoleClaimed,
  });

  useEffect(() => {
    if (config?.upiId && !upiIdTouched) setUpiId(config.upiId);
  }, [config?.upiId, upiIdTouched]);

  const updateUpiMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Backend not ready");
      if (!id.trim()) throw new Error("UPI ID cannot be empty");
      return actor.updateUpiId(id.trim());
    },
    onSuccess: () => {
      toast.success("UPI ID updated");
      setUpiIdTouched(false);
      setUpiSaved(true);
      setTimeout(() => setUpiSaved(false), 2500);
      queryClient.invalidateQueries({ queryKey: ["upi-config"] });
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : String(err);
      if (
        msg.toLowerCase().includes("unauthorized") ||
        msg.toLowerCase().includes("only admin")
      ) {
        toast.error("Admin access required", {
          description: "Please reconnect your Internet Identity.",
        });
      } else {
        toast.error("Failed to update UPI ID", { description: msg });
      }
    },
  });

  const updateQrMutation = useMutation({
    mutationFn: async (file: File) => {
      if (!actor) throw new Error("Backend not ready");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes);
      return actor.updateQrCode(blob);
    },
    onSuccess: () => {
      toast.success("QR code updated");
      setQrFile(null);
      setQrPreview(null);
      queryClient.invalidateQueries({ queryKey: ["upi-config"] });
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : String(err);
      if (
        msg.toLowerCase().includes("unauthorized") ||
        msg.toLowerCase().includes("only admin")
      ) {
        toast.error("Admin access required", {
          description: "Please reconnect your Internet Identity.",
        });
      } else {
        toast.error("Failed to update QR code", { description: msg });
      }
    },
  });

  const handleQrChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      toast.error("Please select an image file (JPG, PNG, etc.)");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      toast.error("Image too large. Please upload a file under 5 MB.");
      return;
    }
    setQrFile(f);
    if (qrPreview) URL.revokeObjectURL(qrPreview);
    setQrPreview(URL.createObjectURL(f));
    e.target.value = "";
  };

  // ---- II Connect screen ----
  if (isAnonymousPrincipal) {
    const isLoggingIn = iiLoginStatus === "logging-in";
    return (
      <div className="p-6 max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-heading-2">Settings</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Configure payment details for users
          </p>
        </div>
        <div className="card-elevated p-8 flex flex-col items-center text-center space-y-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(var(--primary) / 0.18) 0%, oklch(var(--accent) / 0.12) 100%)",
              border: "1px solid oklch(var(--primary) / 0.25)",
            }}
          >
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-heading-3">One-Time Identity Verification</h2>
            <p className="text-sm text-muted-foreground max-w-sm">
              Connect your Internet Identity once to enable UPI and QR code
              updates. This links your device securely to admin privileges.
            </p>
          </div>
          <button
            type="button"
            className="button-primary h-11 px-6 text-sm flex items-center gap-2 disabled:opacity-50"
            onClick={loginWithII}
            disabled={isLoggingIn}
            data-ocid="admin-ii-connect-btn"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Connecting…
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" /> Connect Internet Identity
              </>
            )}
          </button>
          <p className="text-xs text-muted-foreground">
            You only need to do this once per device.
          </p>
        </div>
      </div>
    );
  }

  if (isClaimingRole || (!isAdminRoleClaimed && !claimAttemptedRef.current)) {
    return (
      <div className="p-6 max-w-2xl mx-auto flex items-center justify-center min-h-[40vh]">
        <div className="flex flex-col items-center gap-3">
          <LoadingSpinner size="lg" />
          <p className="text-sm text-muted-foreground">
            Authenticating admin identity…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-heading-2">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Configure payment details shown to subscribers
        </p>
      </div>

      {/* UPI ID section */}
      <div className="card-elevated p-0 overflow-hidden">
        <div className="border-b border-border px-5 py-4 flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{
              background:
                "linear-gradient(135deg, oklch(var(--primary) / 0.18) 0%, oklch(var(--accent) / 0.12) 100%)",
            }}
          >
            <span className="text-base">₹</span>
          </div>
          <div>
            <h2 className="text-heading-3">UPI ID</h2>
            <p className="text-xs text-muted-foreground">
              The UPI ID users will send payment to
            </p>
          </div>
        </div>

        <div className="p-5 space-y-3">
          {isLoading ? (
            <Skeleton className="h-11 w-full" />
          ) : (
            <>
              <div className="flex gap-2">
                <input
                  value={upiId}
                  onChange={(e) => {
                    setUpiId(e.target.value);
                    setUpiIdTouched(true);
                    setUpiSaved(false);
                  }}
                  placeholder="yourname@upi"
                  className="input-premium flex-1 font-mono"
                  data-ocid="upi-id-input"
                  disabled={updateUpiMutation.isPending}
                />
                <button
                  type="button"
                  className="button-primary h-11 px-4 text-sm flex items-center gap-2 shrink-0 disabled:opacity-50"
                  onClick={() => {
                    if (!upiId.trim()) {
                      toast.error("Please enter a UPI ID.");
                      return;
                    }
                    updateUpiMutation.mutate(upiId);
                  }}
                  disabled={
                    updateUpiMutation.isPending ||
                    !upiId.trim() ||
                    upiId.trim() === config?.upiId
                  }
                  data-ocid="save-upi-btn"
                >
                  {updateUpiMutation.isPending ? (
                    <>
                      <LoadingSpinner size="sm" /> Saving…
                    </>
                  ) : upiSaved ? (
                    <>
                      <CheckCircle2
                        className="h-4 w-4"
                        style={{ color: "oklch(var(--success))" }}
                      />{" "}
                      Saved
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" /> Save
                    </>
                  )}
                </button>
              </div>
              {config?.upiId && (
                <p className="text-xs text-muted-foreground">
                  Current:{" "}
                  <span className="font-mono text-foreground">
                    {config.upiId}
                  </span>
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* QR Code section */}
      <div className="card-elevated p-0 overflow-hidden">
        <div className="border-b border-border px-5 py-4 flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{
              background:
                "linear-gradient(135deg, oklch(var(--accent) / 0.18) 0%, oklch(var(--primary) / 0.1) 100%)",
            }}
          >
            <QrCode
              className="h-4.5 w-4.5"
              style={{ color: "oklch(var(--accent))" }}
            />
          </div>
          <div>
            <h2 className="text-heading-3">QR Code</h2>
            <p className="text-xs text-muted-foreground">
              The payment QR code shown to users
            </p>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            {/* Current QR */}
            <div className="shrink-0 flex flex-col items-center gap-2">
              <p className="text-xs text-label">Current QR</p>
              {isLoading ? (
                <Skeleton className="h-44 w-44 rounded-xl" />
              ) : config?.qrCodeBlob ? (
                <div
                  className="rounded-xl border border-border overflow-hidden p-2 bg-muted/10"
                  style={{ boxShadow: "0 0 20px oklch(var(--accent) / 0.08)" }}
                >
                  <img
                    src={config.qrCodeBlob.getDirectURL()}
                    alt="Current QR"
                    className="h-40 w-40 rounded-lg object-contain"
                    data-ocid="current-qr-image"
                  />
                </div>
              ) : (
                <div className="flex h-44 w-44 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/10">
                  <QrCode className="h-10 w-10 text-muted-foreground opacity-30" />
                </div>
              )}
            </div>

            {/* Upload zone */}
            <div className="flex-1 space-y-3 w-full">
              <p className="text-xs text-label">Upload New QR</p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleQrChange}
              />
              <button
                type="button"
                aria-label="Upload QR code"
                className={`w-full flex flex-col items-center justify-center rounded-xl border-2 border-dashed cursor-pointer transition-smooth min-h-[160px] px-4 py-6 text-center
                  ${isDragOver ? "border-accent/70 bg-accent/5 scale-[0.99]" : qrPreview ? "border-border bg-secondary" : "border-input bg-muted/10 hover:border-accent/40 hover:bg-accent/3"}`}
                onClick={() =>
                  !updateQrMutation.isPending && fileRef.current?.click()
                }
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragOver(false);
                  const f = e.dataTransfer.files[0];
                  if (f) {
                    const ev = {
                      target: { files: [f] },
                    } as unknown as ChangeEvent<HTMLInputElement>;
                    handleQrChange(ev);
                  }
                }}
                data-ocid="qr-upload"
              >
                {updateQrMutation.isPending ? (
                  <>
                    <LoadingSpinner size="md" />
                    <p className="text-sm text-muted-foreground mt-2">
                      Uploading…
                    </p>
                  </>
                ) : qrPreview ? (
                  <>
                    <img
                      src={qrPreview}
                      alt="Preview"
                      className="h-28 object-contain rounded-lg mb-2"
                    />
                    <p className="text-xs text-accent font-medium">
                      Click to choose a different image
                    </p>
                  </>
                ) : (
                  <>
                    <div className="stat-icon-bg mb-3">
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      Drop or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG, WEBP · max 5 MB
                    </p>
                  </>
                )}
              </button>

              {qrFile && !updateQrMutation.isPending && (
                <button
                  type="button"
                  className="button-primary w-full h-11 text-sm flex items-center justify-center gap-2"
                  onClick={() => updateQrMutation.mutate(qrFile)}
                  data-ocid="save-qr-btn"
                >
                  <Save className="h-4 w-4" /> Upload &amp; Save QR Code
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
