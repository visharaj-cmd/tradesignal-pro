import { GoldenTickBadge } from "@/components/GoldenTickBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useCertificateStatus } from "@/hooks/useCertificateStatus";
import {
  useSubscription,
  useSubscriptionStatus,
} from "@/hooks/useSubscription";
import {
  BadgeCheck,
  Camera,
  CheckCircle2,
  Clock,
  CreditCard,
  Loader2,
  Mail,
  Pencil,
  Shield,
  User,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";

// ---- Subscription countdown for profile ----
function useCountdown(expiresAtNs: bigint) {
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, Number(expiresAtNs / 1_000_000n) - Date.now()),
  );
  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(Math.max(0, Number(expiresAtNs / 1_000_000n) - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [expiresAtNs]);
  const totalSecs = Math.floor(remaining / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    h: pad(Math.floor(totalSecs / 3600)),
    m: pad(Math.floor((totalSecs % 3600) / 60)),
    s: pad(totalSecs % 60),
    expired: remaining === 0,
  };
}

// ---- Avatar component ----
function AvatarDisplay({
  avatarUrl,
  username,
  name,
  isVerified,
  isDragOver,
  onClick,
}: {
  avatarUrl: string | null;
  username: string;
  name: string;
  isVerified: boolean;
  isDragOver: boolean;
  onClick: () => void;
}) {
  const displayName = username || name || "U";
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={onClick}
        className="relative w-28 h-28 rounded-full overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 group"
        style={{
          background: isVerified
            ? "linear-gradient(135deg, oklch(0.62 0.22 22 / 0.8) 0%, oklch(0.72 0.19 220 / 0.6) 100%)"
            : "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.4) 0%, oklch(0.76 0.21 210 / 0.3) 100%)",
          padding: "3px",
        }}
        aria-label="Change profile picture"
        data-ocid="avatar-btn"
      >
        <div
          className={`w-full h-full rounded-full overflow-hidden transition-smooth ${isDragOver ? "opacity-60 scale-95" : ""}`}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-card flex items-center justify-center">
              <span className="font-display font-bold text-3xl text-primary">
                {initials}
              </span>
            </div>
          )}
        </div>
        <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Camera className="w-7 h-7 text-foreground" />
        </div>
        {isDragOver && (
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary flex items-center justify-center">
            <Camera className="w-7 h-7 text-primary" />
          </div>
        )}
      </button>

      {isVerified && (
        <div
          className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-card border-2 border-background flex items-center justify-center shadow-elevated"
          title="Verified — Active Subscriber"
          data-ocid="verified-badge-avatar"
        >
          <BadgeCheck className="w-6 h-6 text-red-500" />
        </div>
      )}
    </div>
  );
}

// ---- Subscription Status Card ----
function SubscriptionStatusCard({
  isVerified,
  expiresAt,
}: {
  isVerified: boolean;
  expiresAt: bigint | null;
}) {
  const countdown = useCountdown(expiresAt ?? 0n);
  const hasExpiry = expiresAt !== null && expiresAt > 0n;
  const isExpired = hasExpiry && countdown.expired;

  if (isVerified && hasExpiry && !isExpired) {
    return (
      <div
        className="card-premium relative overflow-hidden"
        data-ocid="subscription-status-card"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-primary/5 pointer-events-none rounded-xl" />
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="stat-icon-bg w-11 h-11 shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.25 142 / 0.25) 0%, oklch(0.65 0.25 142 / 0.1) 100%)",
              }}
            >
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="font-display font-semibold text-foreground">
                Active Subscription
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Premium signals access
              </p>
            </div>
          </div>
          <span className="badge-success shrink-0">ACTIVE</span>
        </div>
        <div className="relative mt-4 bg-muted/30 border border-border/60 rounded-lg p-3 flex items-center gap-3">
          <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Time remaining</p>
            <p className="font-mono font-bold text-foreground tabular-nums">
              {countdown.h}:{countdown.m}:{countdown.s}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="card-premium relative overflow-hidden"
      data-ocid="subscription-empty-card"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent pointer-events-none rounded-xl" />
      <div className="relative flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div
            className="stat-icon-bg w-11 h-11 shrink-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.22 68 / 0.2) 0%, oklch(0.72 0.22 68 / 0.1) 100%)",
            }}
          >
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="font-display font-semibold text-foreground">
              {isExpired ? "Subscription Expired" : "No Active Subscription"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Subscribe to access live trading signals
            </p>
          </div>
        </div>
        <span className="badge-failed shrink-0">
          {isExpired ? "EXPIRED" : "NONE"}
        </span>
      </div>
      <Button
        size="sm"
        className="gap-1.5 w-full h-10"
        onClick={() => {
          window.location.href = "/payment";
        }}
        data-ocid="profile-renew-btn"
      >
        <CreditCard className="w-4 h-4" />
        {isExpired
          ? "Renew Subscription — ₹1/day"
          : "Get Subscription — ₹1/day"}
      </Button>
    </div>
  );
}

// ---- Info Row ----
function InfoRow({
  icon: Icon,
  label,
  value,
}: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-3.5 border-b border-border last:border-b-0">
      <div
        className="stat-icon-bg w-9 h-9 shrink-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.12) 0%, oklch(0.72 0.19 220 / 0.06) 100%)",
        }}
      >
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
          {label}
        </p>
        <p className="text-sm font-medium text-foreground truncate mt-0.5">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

// ---- Main ----
export default function Profile() {
  const { user, currentSession, profile, updateProfile, isLoading } = useAuth();
  const { data: isSubscribed, isLoading: subLoading } = useSubscriptionStatus();
  const { data: subscription } = useSubscription();
  const { hasCertificate } = useCertificateStatus();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editingUsername, setEditingUsername] = useState(false);
  const [usernameInput, setUsernameInput] = useState(
    () => profile.username || currentSession?.name || "",
  );
  const [usernameError, setUsernameError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    if (!editingUsername) {
      setUsernameInput(profile.username || currentSession?.name || "");
    }
  }, [profile.username, currentSession?.name, editingUsername]);

  const displayName = profile.username || currentSession?.name || "Trader";
  const email = currentSession?.email ?? user?.principal ?? "";
  const isVerified = !!isSubscribed;
  const expiresAt = subscription?.expiresAt ?? null;

  function handleAvatarClick() {
    fileInputRef.current?.click();
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image too large. Please choose an image under 2 MB.");
      return;
    }
    setIsUploadingAvatar(true);
    try {
      const reader = new FileReader();
      const dataUrl = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
      updateProfile(profile.username, dataUrl);
      toast.success("Profile picture updated!");
    } catch {
      toast.error("Failed to process image. Please try again.");
    } finally {
      setIsUploadingAvatar(false);
      e.target.value = "";
    }
  }

  function handleRemoveAvatar() {
    updateProfile(profile.username, null);
    toast.success("Profile picture removed.");
  }

  function startEditUsername() {
    setUsernameInput(profile.username || currentSession?.name || "");
    setUsernameError("");
    setSavedSuccess(false);
    setEditingUsername(true);
  }

  function cancelEditUsername() {
    setEditingUsername(false);
    setUsernameError("");
    setUsernameInput(profile.username || currentSession?.name || "");
  }

  async function saveUsername() {
    const trimmed = usernameInput.trim();
    if (!trimmed) {
      setUsernameError("Username cannot be empty.");
      return;
    }
    if (trimmed.length < 2) {
      setUsernameError("Username must be at least 2 characters.");
      return;
    }
    if (trimmed.length > 32) {
      setUsernameError("Username must be 32 characters or less.");
      return;
    }
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 300));
    updateProfile(trimmed, profile.avatarUrl);
    setEditingUsername(false);
    setIsSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
    toast.success("Profile updated!");
  }

  if (isLoading || subLoading) {
    return (
      <div className="p-4 sm:p-6 space-y-6 max-w-2xl mx-auto">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40 rounded-lg" />
          <Skeleton className="h-4 w-60 rounded" />
        </div>
        <div className="card-premium p-6 space-y-5">
          <div className="flex gap-5">
            <Skeleton className="w-28 h-28 rounded-full shrink-0" />
            <div className="space-y-3 flex-1">
              <Skeleton className="h-7 w-36 rounded" />
              <Skeleton className="h-4 w-48 rounded" />
              <Skeleton className="h-4 w-24 rounded" />
            </div>
          </div>
          <Skeleton className="h-px w-full" />
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-heading-1 text-2xl">Your Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account, profile picture, and subscription
        </p>
      </div>

      {/* Profile Card */}
      <div className="card-elevated rounded-xl p-6">
        {/* Avatar + Name section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
          <div
            className="flex flex-col items-center gap-3"
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
              const f = e.dataTransfer.files[0];
              if (f?.type.startsWith("image/")) {
                const fakeEvent = {
                  target: { files: [f], value: "" },
                } as unknown as React.ChangeEvent<HTMLInputElement>;
                handleAvatarChange(fakeEvent);
              }
            }}
          >
            <AvatarDisplay
              avatarUrl={profile.avatarUrl}
              username={profile.username}
              name={currentSession?.name || ""}
              isVerified={isVerified}
              isDragOver={isDragOver}
              onClick={handleAvatarClick}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
              data-ocid="avatar-file-input"
            />
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={handleAvatarClick}
                className="text-primary hover:text-primary/80 transition-colors font-medium"
                disabled={isUploadingAvatar}
                data-ocid="change-avatar-btn"
              >
                {isUploadingAvatar ? (
                  <span className="flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Uploading…
                  </span>
                ) : (
                  "Change photo"
                )}
              </button>
              {profile.avatarUrl && (
                <>
                  <span className="text-border">·</span>
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    data-ocid="remove-avatar-btn"
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Name + badges */}
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap mb-2">
              <h2 className="font-display font-bold text-2xl text-foreground truncate">
                {displayName}
              </h2>
              {isVerified && (
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 bg-red-500/15 border border-red-500/30 rounded-full px-3 py-1 animate-pulse"
                  title="Active Subscriber — Verified"
                  data-ocid="verified-badge"
                >
                  <BadgeCheck className="w-4 h-4" />
                  Verified
                </span>
              )}
              <GoldenTickBadge show={hasCertificate} size="md" />
            </div>
            {hasCertificate && (
              <div className="flex items-center justify-center sm:justify-start mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/25 rounded-full px-3 py-1">
                  <GoldenTickBadge show size="sm" />
                  Verified Trader — Certificate Holder
                </span>
              </div>
            )}
            <p className="text-sm text-muted-foreground mb-3">{email}</p>
            {isVerified ? (
              <div className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1.5">
                <Shield className="w-3.5 h-3.5" />
                Active Subscriber · Full Access
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 border border-border rounded-full px-3 py-1.5">
                <BadgeCheck className="w-3.5 h-3.5" />
                Subscribe to get verified badge
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-border mb-5" />

        {/* Edit Username */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-muted-foreground" />
              Username
              {savedSuccess && (
                <span className="flex items-center gap-1 text-xs text-emerald-400 font-normal ml-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Saved!
                </span>
              )}
            </Label>
            {!editingUsername && (
              <button
                type="button"
                onClick={startEditUsername}
                className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                data-ocid="edit-username-btn"
              >
                <Pencil className="w-3 h-3" />
                Edit
              </button>
            )}
          </div>

          {editingUsername ? (
            <div className="space-y-2">
              <Input
                value={usernameInput}
                onChange={(e) => {
                  setUsernameInput(e.target.value);
                  setUsernameError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveUsername();
                  if (e.key === "Escape") cancelEditUsername();
                }}
                placeholder="Enter your username"
                className={`h-11 input-premium w-full ${usernameError ? "input-invalid" : usernameInput.trim().length >= 2 ? "input-valid" : ""}`}
                autoFocus
                maxLength={32}
                data-ocid="username-input"
              />
              {usernameError && (
                <p className="text-xs text-destructive">{usernameError}</p>
              )}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={saveUsername}
                  disabled={isSaving}
                  className="gap-1.5 h-9"
                  data-ocid="save-username-btn"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Saving…
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Save changes
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={cancelEditUsername}
                  className="gap-1.5 h-9"
                  data-ocid="cancel-username-btn"
                >
                  <X className="w-3.5 h-3.5" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p
              className={`text-sm font-medium bg-muted/30 border rounded-lg px-4 py-3 ${profile.username ? "text-foreground border-border input-valid" : "text-muted-foreground italic border-border"}`}
            >
              {profile.username || "No username set — click Edit to add one"}
            </p>
          )}
        </div>
      </div>

      {/* Account Info */}
      <div className="card-elevated rounded-xl p-5">
        <h3 className="stat-label text-xs mb-4">Account Information</h3>
        <InfoRow
          icon={User}
          label="Full Name"
          value={currentSession?.name || ""}
        />
        <InfoRow icon={Mail} label="Email Address" value={email} />
        <InfoRow
          icon={Shield}
          label="Subscription Status"
          value={
            isVerified
              ? "Active — Verified Subscriber ✓"
              : "No active subscription"
          }
        />
        <InfoRow icon={Clock} label="Member Since" value="TradeSignal Pro" />
      </div>

      {/* Subscription Status */}
      <SubscriptionStatusCard isVerified={isVerified} expiresAt={expiresAt} />
    </div>
  );
}
