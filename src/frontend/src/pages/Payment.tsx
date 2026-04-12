import { ExternalBlob } from "@/backend";
import type { TradeStats } from "@/backend";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useBackend } from "@/hooks/useBackend";
import { PaymentStatus } from "@/types";
import type { PaymentPublic, UpiConfigPublic } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  Copy,
  Hash,
  ImageIcon,
  Loader2,
  QrCode,
  Receipt,
  Shield,
  Star,
  Target,
  Trophy,
  Upload,
  User,
  Users,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ---- Helpers ----
function formatDate(ns: bigint) {
  return new Date(Number(ns / 1_000_000n)).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function hasPendingRecent(payments: PaymentPublic[]): boolean {
  const FIVE_MIN_NS = BigInt(5 * 60 * 1_000 * 1_000_000);
  const nowNs = BigInt(Date.now()) * 1_000_000n;
  return payments.some(
    (p) =>
      p.status === PaymentStatus.pending && nowNs - p.timestamp < FIVE_MIN_NS,
  );
}

// ---- Hooks ----
function useUpiConfig() {
  const { actor, isReady } = useBackend();
  return useQuery<UpiConfigPublic>({
    queryKey: ["upi-config"],
    queryFn: async () => {
      if (!actor) throw new Error("Not ready");
      return actor.getUpiConfig();
    },
    enabled: isReady,
  });
}

function useMyPayments() {
  const { actor, isReady, isRegistered } = useBackend();
  return useQuery<PaymentPublic[]>({
    queryKey: ["my-payments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyPayments();
    },
    enabled: isReady && isRegistered,
    refetchInterval: 30_000,
  });
}

function useTradeStats() {
  const { actor, isReady } = useBackend();
  return useQuery<TradeStats>({
    queryKey: ["trade-stats"],
    queryFn: async () => {
      if (!actor) throw new Error("Not ready");
      return actor.getTradeStats();
    },
    enabled: isReady,
    staleTime: 5 * 60_000,
  });
}

function useActiveSubscriberCount() {
  const { actor, isReady } = useBackend();
  return useQuery<bigint>({
    queryKey: ["active-subscriber-count"],
    queryFn: async () => {
      if (!actor) throw new Error("Not ready");
      return actor.getActiveSubscriberCount();
    },
    enabled: isReady,
    staleTime: 5 * 60_000,
  });
}

function useSubmitPayment() {
  const { actor, ensureUserRole, isAnonymousPrincipal } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      blob,
      utr,
      senderName,
    }: {
      blob: ExternalBlob;
      utr: string;
      senderName: string;
    }) => {
      if (!actor) throw new Error("Backend not ready");
      if (isAnonymousPrincipal) {
        throw new Error(
          "ANONYMOUS_PRINCIPAL: Please connect your Internet Identity to submit payments.",
        );
      }
      const registered = await ensureUserRole();
      if (!registered) {
        throw new Error(
          "ROLE_ASSIGN_FAILED: Unable to verify your account. Please refresh and try again.",
        );
      }
      return await actor.submitPayment(blob, utr, senderName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-payments"] });
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      queryClient.invalidateQueries({ queryKey: ["subscription-status"] });
    },
  });
}

const DEFAULT_UPI_ID = "6203460064@ptsbi";
const DEFAULT_QR_URL = "/assets/qr-code.jpg";

// ---- Trust Stats Bar ----
function TrustStatSkeleton() {
  return (
    <div className="rounded-xl p-4 border border-border/40 bg-card/50 flex items-center gap-3">
      <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
      <div className="space-y-1.5 flex-1">
        <Skeleton className="h-5 w-16 rounded" />
        <Skeleton className="h-3 w-24 rounded" />
      </div>
    </div>
  );
}

interface TrustStatCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
  accent: "green" | "gold" | "blue";
}

function TrustStatCard({
  icon: Icon,
  value,
  label,
  accent,
}: TrustStatCardProps) {
  const styles = {
    green: {
      bg: "linear-gradient(135deg, oklch(0.65 0.25 142 / 0.18) 0%, oklch(0.65 0.25 142 / 0.08) 100%)",
      border: "border-emerald-500/25",
      text: "text-emerald-400",
      iconBg: "oklch(0.65 0.25 142 / 0.15)",
    },
    gold: {
      bg: "linear-gradient(135deg, oklch(0.72 0.22 68 / 0.18) 0%, oklch(0.72 0.22 68 / 0.08) 100%)",
      border: "border-amber-500/25",
      text: "text-amber-400",
      iconBg: "oklch(0.72 0.22 68 / 0.15)",
    },
    blue: {
      bg: "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.18) 0%, oklch(0.72 0.19 220 / 0.08) 100%)",
      border: "border-primary/25",
      text: "text-primary",
      iconBg: "oklch(0.72 0.19 220 / 0.15)",
    },
  };
  const s = styles[accent];
  return (
    <div
      className={`rounded-xl p-4 border ${s.border} flex items-center gap-3 flex-1 min-w-0`}
      style={{ background: s.bg }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: s.iconBg }}
      >
        <Icon className={`w-5 h-5 ${s.text}`} />
      </div>
      <div className="min-w-0">
        <p className={`font-display font-bold text-xl tabular-nums ${s.text}`}>
          {value}
        </p>
        <p className="text-xs text-muted-foreground truncate">{label}</p>
      </div>
    </div>
  );
}

function TrustStatsBar() {
  const { data: stats, isLoading: statsLoading } = useTradeStats();
  const { data: memberCount, isLoading: membersLoading } =
    useActiveSubscriberCount();

  const isLoading = statsLoading || membersLoading;

  const winRateStr = stats ? `${(stats.winRate * 100).toFixed(1)}%` : "--";
  const totalSignalsStr = stats ? String(Number(stats.totalSignals)) : "--";
  const memberCountStr = memberCount ? String(Number(memberCount)) : "--";

  return (
    <div
      className="rounded-2xl p-5 border border-border/40 mb-6"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.155 0.03 265 / 0.9) 0%, oklch(0.14 0.025 260 / 0.9) 100%)",
      }}
      data-ocid="trust-stats-bar"
    >
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-4 h-4 text-amber-400" />
        <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
          Trusted by Traders
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        {isLoading ? (
          <>
            <TrustStatSkeleton />
            <TrustStatSkeleton />
            <TrustStatSkeleton />
          </>
        ) : (
          <>
            <TrustStatCard
              icon={Target}
              value={winRateStr}
              label="Win Rate"
              accent="green"
            />
            <TrustStatCard
              icon={Users}
              value={memberCountStr}
              label="Active Members"
              accent="gold"
            />
            <TrustStatCard
              icon={Activity}
              value={totalSignalsStr}
              label="Total Signals"
              accent="blue"
            />
          </>
        )}
      </div>
    </div>
  );
}

// ---- Step Indicator ----
function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { num: 1, label: "Copy UPI ID", icon: QrCode },
    { num: 2, label: "Fill Form", icon: Receipt },
    { num: 3, label: "Submit", icon: Upload },
  ];
  return (
    <div className="flex items-center gap-2 mb-5">
      {steps.map((s, i) => (
        <div key={s.num} className="flex items-center gap-2 flex-1">
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-smooth ${
                s.num <= step
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground border border-border"
              }`}
            >
              {s.num < step ? <CheckCircle2 className="w-3.5 h-3.5" /> : s.num}
            </div>
            <span
              className={`text-xs font-medium hidden sm:block ${
                s.num <= step ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`flex-1 h-px mx-2 ${s.num < step ? "bg-primary" : "bg-border"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ---- UPI Card ----
function UpiCard({ config }: { config: UpiConfigPublic }) {
  const [copied, setCopied] = useState(false);
  const qrUrl = config.qrCodeBlob
    ? config.qrCodeBlob.getDirectURL()
    : DEFAULT_QR_URL;
  const upiId = config.upiId?.trim() ? config.upiId : DEFAULT_UPI_ID;

  function copyUpi() {
    navigator.clipboard.writeText(upiId).then(() => {
      setCopied(true);
      toast.success("UPI ID copied!");
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <div
      className="rounded-2xl p-6 space-y-5 border border-border/50 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, oklch(0.16 0.04 265 / 0.95) 0%, oklch(0.14 0.03 260 / 0.95) 100%)",
      }}
    >
      {/* Subtle shimmer overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.98 0 0 / 0.03) 0%, transparent 50%)",
        }}
      />
      <div className="relative flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-lg text-foreground">
            Pay via UPI
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Scan QR code or copy the UPI ID below
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Amount
          </p>
          <p className="font-display font-bold text-4xl text-primary leading-none tabular-nums">
            ₹1
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">per day</p>
        </div>
      </div>

      {/* QR Code — large & prominent */}
      <div className="relative flex justify-center">
        <div
          className="rounded-2xl p-5 inline-block shadow-elevated relative"
          style={{
            background: "oklch(0.96 0 0)",
            border: "4px solid oklch(0.98 0 0 / 0.9)",
          }}
        >
          <img
            src={qrUrl}
            alt="UPI QR Code"
            className="w-52 h-52 object-contain rounded-xl"
            data-ocid="upi-qr-image"
          />
          {/* Corner QR icon badge */}
          <div className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-primary border-2 border-background flex items-center justify-center shadow-elevated">
            <QrCode className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
      </div>

      {/* UPI ID with animated copy */}
      <div
        className={`rounded-xl px-4 py-3.5 flex items-center justify-between gap-3 border transition-all duration-300 ${
          copied
            ? "border-emerald-500/40 bg-emerald-500/6"
            : "border-border/60 bg-muted/30"
        }`}
      >
        <div className="min-w-0">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
            UPI ID
          </p>
          <p
            className="font-mono text-sm font-bold text-foreground truncate"
            data-ocid="upi-id-text"
          >
            {upiId}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className={`shrink-0 gap-1.5 h-9 min-w-[90px] transition-all duration-300 font-semibold ${copied ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10" : "hover:border-primary/50"}`}
          onClick={copyUpi}
          data-ocid="copy-upi-btn"
        >
          {copied ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </Button>
      </div>

      {/* Instructions */}
      <div
        className="flex items-start gap-2.5 rounded-xl px-4 py-3 border border-amber-500/20"
        style={{ background: "oklch(0.72 0.22 68 / 0.06)" }}
      >
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-400/90 leading-relaxed">
          Pay exactly <strong>₹1</strong> and upload the payment screenshot with
          your UTR number for verification.
        </p>
      </div>

      {/* Trust badges row */}
      <div className="flex items-center gap-3 pt-1">
        {[
          { icon: Shield, label: "Secure Payment" },
          { icon: Trophy, label: "24h Activation" },
          { icon: Star, label: "Admin Verified" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-1.5 text-[11px] text-muted-foreground"
          >
            <Icon className="w-3 h-3 text-primary/60 shrink-0" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- File Drop Zone ----
interface FileDropZoneProps {
  file: File | null;
  onFile: (f: File) => void;
  progress: number | null;
  disabled?: boolean;
}

function FileDropZone({ file, onFile, progress, disabled }: FileDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDrag(false);
    if (disabled) return;
    const f = e.dataTransfer.files[0];
    if (!f?.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPG, PNG, etc.)");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      toast.error("Image too large. Please upload a screenshot under 5 MB.");
      return;
    }
    onFile(f);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      toast.error("Image too large. Please upload a screenshot under 5 MB.");
      return;
    }
    onFile(f);
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={`w-full border-2 border-dashed rounded-xl p-7 text-center transition-all duration-200 ${
        disabled
          ? "opacity-50 cursor-not-allowed border-border"
          : drag
            ? "border-primary bg-primary/8 cursor-copy shadow-inner"
            : file
              ? "border-emerald-500/50 bg-emerald-500/5 cursor-pointer"
              : "border-border hover:border-primary/50 hover:bg-primary/4 cursor-pointer"
      }`}
      onClick={() => !disabled && inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={handleDrop}
      data-ocid="screenshot-dropzone"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
        disabled={disabled}
        data-ocid="screenshot-file-input"
      />
      {file ? (
        <div className="space-y-2">
          <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
          <p className="text-sm font-semibold text-foreground truncate max-w-full">
            {file.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {(file.size / 1024).toFixed(1)} KB · Ready to upload
          </p>
          {progress !== null && (
            <div className="w-full bg-muted rounded-full h-2 mt-3">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          {!disabled && (
            <p className="text-xs text-primary mt-1 font-medium">
              Click to change image
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="w-12 h-12 rounded-full bg-muted/60 border border-border flex items-center justify-center mx-auto">
            <ImageIcon className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-semibold text-foreground">
            {drag ? "Drop screenshot here" : "Upload payment screenshot"}
          </p>
          <p className="text-xs text-muted-foreground">
            Drag &amp; drop or click to browse · JPG, PNG, WEBP · max 5 MB
          </p>
        </div>
      )}
    </button>
  );
}

// ---- Payment History ----
function PaymentHistory({ payments }: { payments: PaymentPublic[] }) {
  const variant = (s: PaymentStatus) => {
    if (s === PaymentStatus.approved) return "approved" as const;
    if (s === PaymentStatus.rejected) return "rejected" as const;
    return "pending" as const;
  };

  return (
    <div className="card-elevated rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center gap-3 bg-gradient-to-r from-muted/20 to-transparent">
        <div
          className="stat-icon-bg w-8 h-8 shrink-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.2) 0%, oklch(0.72 0.19 220 / 0.1) 100%)",
          }}
        >
          <Clock className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h2 className="font-display font-semibold text-foreground">
            Payment History
          </h2>
          <p className="text-xs text-muted-foreground">
            Your past payment submissions
          </p>
        </div>
        <span className="text-xs bg-primary/10 border border-primary/20 text-primary px-2.5 py-1 rounded-full font-mono ml-auto">
          {payments.length} {payments.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {payments.length === 0 ? (
        <div className="empty-state py-14" data-ocid="payments-empty">
          <div className="empty-state-icon mx-auto mb-4 w-16 h-16">
            <Receipt className="w-8 h-8" />
          </div>
          <p className="font-semibold text-foreground mb-1">No payments yet</p>
          <p className="text-sm text-muted-foreground max-w-xs">
            Submit your first payment above to activate your subscription.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {[
                    { label: "Sender Name", width: "w-1/4" },
                    { label: "UTR Number", width: "w-1/4" },
                    { label: "Status", width: "w-1/4" },
                    { label: "Date", width: "w-1/4" },
                  ].map((col) => (
                    <th
                      key={col.label}
                      className={`px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider ${col.width}`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr
                    key={String(p.id)}
                    className="signal-row border-b border-border last:border-b-0 hover:bg-primary/4"
                    data-ocid="payment-row"
                  >
                    <td className="px-4 py-4 text-foreground font-medium">
                      {p.senderName || (
                        <span className="text-muted-foreground italic text-xs">
                          —
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 font-mono text-sm text-foreground">
                      {p.utrNumber}
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <StatusBadge variant={variant(p.status)}>
                          {p.status.toString().toUpperCase()}
                        </StatusBadge>
                        {p.status === PaymentStatus.rejected &&
                          p.rejectionReason && (
                            <p className="text-xs text-muted-foreground mt-1 italic">
                              {p.rejectionReason}
                            </p>
                          )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-muted-foreground whitespace-nowrap font-mono">
                      {formatDate(p.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-border">
            {payments.map((p) => (
              <div
                key={String(p.id)}
                className="p-4 space-y-2.5 hover:bg-muted/10 transition-smooth"
                data-ocid="payment-row-mobile"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-sm text-foreground truncate font-medium">
                    {p.utrNumber}
                  </span>
                  <StatusBadge variant={variant(p.status)}>
                    {p.status.toString().toUpperCase()}
                  </StatusBadge>
                </div>
                {p.senderName && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <User className="w-3 h-3 shrink-0" />
                    <span>{p.senderName}</span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground font-mono">
                  {formatDate(p.timestamp)}
                </p>
                {p.status === PaymentStatus.rejected && p.rejectionReason && (
                  <p className="text-xs text-rose-400 italic">
                    {p.rejectionReason}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ---- Main Page ----
export default function Payment() {
  const { isReady, isAnonymousPrincipal, iiLoginStatus, loginWithII } =
    useBackend();
  const { data: upiConfig, isLoading: upiLoading } = useUpiConfig();
  const { data: payments = [], isLoading: paymentsLoading } = useMyPayments();
  const submitPayment = useSubmitPayment();

  const [utr, setUtr] = useState("");
  const [utrError, setUtrError] = useState("");
  const [utrTouched, setUtrTouched] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderNameError, setSenderNameError] = useState("");
  const [senderTouched, setSenderTouched] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const pendingBlocked = hasPendingRecent(payments);
  const isLoggingIn = iiLoginStatus === "logging-in";

  // Derive active step for indicator
  const activeStep: 1 | 2 | 3 = submitted ? 3 : utr && senderName ? 2 : 1;

  function validateUtr(val: string) {
    if (!val) return "UTR number is required";
    if (val.length < 8) return "UTR must be at least 8 characters";
    if (!/^[A-Za-z0-9]+$/.test(val))
      return "UTR must only contain letters and numbers";
    return "";
  }

  function validateSenderName(val: string) {
    if (!val.trim()) return "Sender name is required";
    if (val.trim().length < 2) return "Enter the full name on your UPI account";
    return "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isReady) {
      toast.error("Connecting to server, please wait a moment and try again.");
      return;
    }
    if (isAnonymousPrincipal) {
      toast.error("Please connect your Internet Identity first.", {
        description: "Click 'Connect with Internet Identity' to verify.",
      });
      return;
    }

    const utrErr = validateUtr(utr);
    const nameErr = validateSenderName(senderName);
    if (utrErr) setUtrError(utrErr);
    if (nameErr) setSenderNameError(nameErr);
    if (utrErr || nameErr) return;

    if (!file) {
      setFileError("Please upload your payment screenshot");
      return;
    }
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setFileError(
        "Screenshot must be under 5 MB. Please choose a smaller image.",
      );
      return;
    }
    if (pendingBlocked) return;

    try {
      setUploadProgress(0);
      let bytes: Uint8Array<ArrayBuffer>;
      try {
        bytes = new Uint8Array(await file.arrayBuffer());
      } catch (readErr) {
        console.error("[Payment] Failed to read file:", readErr);
        setFileError("Failed to read the screenshot. Please try again.");
        setUploadProgress(null);
        return;
      }

      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });

      await submitPayment.mutateAsync({
        blob,
        utr: utr.trim(),
        senderName: senderName.trim(),
      });
      setSubmitted(true);
      setUtr("");
      setSenderName("");
      setFile(null);
      setUploadProgress(null);
      toast.success("Payment submitted!", {
        description: "Admin will review and activate your subscription.",
      });
    } catch (err: unknown) {
      console.error("[Payment] Submit failed:", err);
      setUploadProgress(null);
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.startsWith("ROLE_ASSIGN_FAILED:")) {
        toast.error("Unable to verify your account.", {
          description: "Please refresh the page and try again.",
        });
      } else if (msg.startsWith("ANONYMOUS_PRINCIPAL:")) {
        toast.error("Identity not connected.", {
          description:
            "Please connect your Internet Identity using the button below.",
        });
      } else if (
        msg.toLowerCase().includes("unauthorized") ||
        msg.toLowerCase().includes("not authenticated") ||
        msg.toLowerCase().includes("not a user") ||
        msg.toLowerCase().includes("not registered")
      ) {
        toast.error("Account not verified — please refresh and try again.");
      } else if (
        msg.toLowerCase().includes("duplicate") ||
        msg.toLowerCase().includes("already submitted") ||
        msg.toLowerCase().includes("5 minutes") ||
        msg.toLowerCase().includes("recent")
      ) {
        toast.error(
          "You already submitted a payment recently. Please wait a few minutes.",
        );
      } else if (
        msg.toLowerCase().includes("upload") ||
        msg.toLowerCase().includes("object storage") ||
        msg.toLowerCase().includes("quota")
      ) {
        toast.error("Failed to upload screenshot. Please try a smaller image.");
      } else {
        toast.error("Failed to submit payment. Please try again.", {
          description:
            "Check your internet connection and try again in a moment.",
        });
      }
    }
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-heading-1 text-2xl flex items-center gap-2.5">
          <div
            className="stat-icon-bg w-9 h-9 shrink-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.25) 0%, oklch(0.76 0.21 210 / 0.18) 100%)",
            }}
          >
            <Zap className="w-4 h-4 text-primary" />
          </div>
          Payment
        </h1>
        <p className="text-sm text-muted-foreground mt-1 ml-11">
          Subscribe for ₹1/day to access live professional trading signals
        </p>
      </div>

      {/* Trust Stats Bar — live data from backend */}
      <TrustStatsBar />

      {/* UPI + Submit grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* UPI Card */}
        {upiLoading ? (
          <div className="rounded-2xl p-6 space-y-5 border border-border/50 bg-card/50">
            <div className="skeleton h-6 w-32 rounded" />
            <div className="flex justify-center">
              <div className="skeleton w-52 h-52 rounded-2xl" />
            </div>
            <div className="skeleton h-14 rounded-xl" />
          </div>
        ) : upiConfig ? (
          <UpiCard config={upiConfig} />
        ) : (
          <div className="rounded-2xl p-6 flex items-center justify-center text-sm text-muted-foreground border border-border/50 bg-card/50">
            UPI configuration not available. Please contact admin.
          </div>
        )}

        {/* Submit Form */}
        <div
          className="rounded-2xl p-6 space-y-5 border border-border/50"
          style={{
            background:
              "linear-gradient(145deg, oklch(0.155 0.03 265 / 0.9) 0%, oklch(0.14 0.025 260 / 0.9) 100%)",
          }}
        >
          <div>
            <h2 className="font-display font-bold text-lg text-foreground">
              Confirm Payment
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Complete the form below to submit your payment
            </p>
          </div>

          <StepIndicator step={activeStep} />

          {/* II connect prompt */}
          {isAnonymousPrincipal && (
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-primary/6 border border-primary/25 rounded-xl px-4 py-3.5"
              data-ocid="ii-connect-banner"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Shield className="w-4 h-4 text-primary shrink-0" />
                <p className="text-xs text-foreground/80">
                  Connect your Internet Identity to submit — your UPI details
                  above are ready to pay.
                </p>
              </div>
              <Button
                size="sm"
                onClick={loginWithII}
                disabled={isLoggingIn}
                className="shrink-0 gap-1.5 h-9 text-xs"
                data-ocid="ii-connect-inline-btn"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" /> Connecting…
                  </>
                ) : (
                  <>
                    <Shield className="w-3 h-3" /> Connect Identity
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Pending blocked */}
          {pendingBlocked && (
            <div
              className="flex items-start gap-3 bg-amber-500/6 border border-amber-500/25 rounded-xl px-4 py-3.5"
              data-ocid="pending-warning"
            >
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-amber-400 mb-0.5">
                  Payment Pending Review
                </p>
                <p className="text-xs text-amber-400/80">
                  Your payment is being reviewed by admin. You'll be notified
                  once approved. Please wait before submitting again.
                </p>
              </div>
            </div>
          )}

          {/* Success message */}
          {submitted && !pendingBlocked && (
            <div
              className="flex items-start gap-3 bg-emerald-500/6 border border-emerald-500/25 rounded-xl px-4 py-3.5"
              data-ocid="payment-success"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-emerald-400 mb-0.5">
                  Payment Submitted!
                </p>
                <p className="text-xs text-emerald-400/80">
                  Admin will verify and activate your subscription shortly.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* UTR Input */}
            <div className="space-y-1.5">
              <Label
                htmlFor="utr-input"
                className="text-sm font-semibold text-foreground flex items-center gap-1.5"
              >
                <Hash className="w-3.5 h-3.5 text-muted-foreground" />
                UTR / Reference Number
              </Label>
              <Input
                id="utr-input"
                type="text"
                placeholder="e.g. 401234567890"
                value={utr}
                onChange={(e) => {
                  setUtr(e.target.value);
                  setUtrError("");
                }}
                onBlur={() => {
                  setUtrTouched(true);
                  setUtrError(validateUtr(utr));
                }}
                className={`font-mono h-11 input-premium w-full ${utrError ? "input-invalid" : utrTouched && !utrError && utr ? "input-valid" : ""}`}
                disabled={pendingBlocked}
                data-ocid="utr-input"
                autoComplete="off"
              />
              {utrError && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <span>⚠</span> {utrError}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Find the UTR/transaction ID in your UPI app's payment receipt
              </p>
            </div>

            {/* Sender Name */}
            <div className="space-y-1.5">
              <Label
                htmlFor="sender-name-input"
                className="text-sm font-semibold text-foreground flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-muted-foreground" />
                Sender Name
                <span className="text-xs text-amber-400 font-normal ml-1">
                  (name used for UPI payment)
                </span>
              </Label>
              <Input
                id="sender-name-input"
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={senderName}
                onChange={(e) => {
                  setSenderName(e.target.value);
                  setSenderNameError("");
                }}
                onBlur={() => {
                  setSenderTouched(true);
                  setSenderNameError(validateSenderName(senderName));
                }}
                className={`h-11 input-premium w-full ${senderNameError ? "input-invalid" : senderTouched && !senderNameError && senderName ? "input-valid" : ""}`}
                disabled={pendingBlocked}
                data-ocid="sender-name-input"
                autoComplete="name"
              />
              {senderNameError && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <span>⚠</span> {senderNameError}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Enter the account holder name shown in your UPI app
              </p>
            </div>

            {/* Screenshot Upload */}
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-muted-foreground" />
                Payment Screenshot
              </Label>
              <FileDropZone
                file={file}
                onFile={(f) => {
                  setFile(f);
                  setFileError("");
                }}
                progress={uploadProgress}
                disabled={pendingBlocked}
              />
              {fileError && (
                <p className="text-xs text-destructive">{fileError}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 font-semibold text-base gap-2 shadow-elevated hover:shadow-premium transition-smooth"
              disabled={
                submitPayment.isPending || pendingBlocked || isLoggingIn
              }
              data-ocid="submit-payment-btn"
            >
              {submitPayment.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {uploadProgress !== null
                    ? `Uploading ${uploadProgress}%...`
                    : "Submitting..."}
                </>
              ) : isAnonymousPrincipal ? (
                <>
                  <Shield className="w-4 h-4" />
                  Connect Identity to Submit
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Submit Payment
                </>
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Payment History */}
      {!isAnonymousPrincipal &&
        (paymentsLoading ? (
          <div className="card-elevated rounded-xl p-5 space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="skeleton h-14 rounded-lg" />
            ))}
          </div>
        ) : (
          <PaymentHistory payments={payments} />
        ))}
    </div>
  );
}
