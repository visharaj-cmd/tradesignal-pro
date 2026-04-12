import { e as createLucideIcon, u as useAuth, o as useSubscriptionStatus, p as useSubscription, q as useCertificateStatus, r as reactExports, j as jsxRuntimeExports, s as BadgeCheck, G as GoldenTickBadge, U as User, B as Button, X, c as ue, Z as Zap, k as CreditCard } from "./index-BO-jy2EA.js";
import { I as Input } from "./input-ChmVmaSS.js";
import { L as Label } from "./label-CY9wZVTR.js";
import { S as Skeleton } from "./skeleton-CbFgKOIp.js";
import { L as LoaderCircle } from "./loader-circle-D557w6Cq.js";
import { S as Shield } from "./shield-DXE4vu7A.js";
import { C as CircleCheck } from "./circle-check-DHfkSuxj.js";
import { P as Pencil } from "./pencil-DfNN76tp.js";
import { M as Mail } from "./mail-cAVUr2Sy.js";
import { C as Clock } from "./clock-BnWW5-NH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode);
function useCountdown(expiresAtNs) {
  const [remaining, setRemaining] = reactExports.useState(
    () => Math.max(0, Number(expiresAtNs / 1000000n) - Date.now())
  );
  reactExports.useEffect(() => {
    const id = setInterval(() => {
      setRemaining(Math.max(0, Number(expiresAtNs / 1000000n) - Date.now()));
    }, 1e3);
    return () => clearInterval(id);
  }, [expiresAtNs]);
  const totalSecs = Math.floor(remaining / 1e3);
  const pad = (n) => String(n).padStart(2, "0");
  return {
    h: pad(Math.floor(totalSecs / 3600)),
    m: pad(Math.floor(totalSecs % 3600 / 60)),
    s: pad(totalSecs % 60),
    expired: remaining === 0
  };
}
function AvatarDisplay({
  avatarUrl,
  username,
  name,
  isVerified,
  isDragOver,
  onClick
}) {
  const displayName = username || name || "U";
  const initials = displayName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick,
        className: "relative w-28 h-28 rounded-full overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 group",
        style: {
          background: isVerified ? "linear-gradient(135deg, oklch(0.62 0.22 22 / 0.8) 0%, oklch(0.72 0.19 220 / 0.6) 100%)" : "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.4) 0%, oklch(0.76 0.21 210 / 0.3) 100%)",
          padding: "3px"
        },
        "aria-label": "Change profile picture",
        "data-ocid": "avatar-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-full h-full rounded-full overflow-hidden transition-smooth ${isDragOver ? "opacity-60 scale-95" : ""}`,
              children: avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: avatarUrl,
                  alt: displayName,
                  className: "w-full h-full object-cover"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-card flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-3xl text-primary", children: initials }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-7 h-7 text-foreground" }) }),
          isDragOver && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-2 border-dashed border-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-7 h-7 text-primary" }) })
        ]
      }
    ),
    isVerified && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-card border-2 border-background flex items-center justify-center shadow-elevated",
        title: "Verified — Active Subscriber",
        "data-ocid": "verified-badge-avatar",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "w-6 h-6 text-red-500" })
      }
    )
  ] });
}
function SubscriptionStatusCard({
  isVerified,
  expiresAt
}) {
  const countdown = useCountdown(expiresAt ?? 0n);
  const hasExpiry = expiresAt !== null && expiresAt > 0n;
  const isExpired = hasExpiry && countdown.expired;
  if (isVerified && hasExpiry && !isExpired) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-premium relative overflow-hidden",
        "data-ocid": "subscription-status-card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-primary/5 pointer-events-none rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "stat-icon-bg w-11 h-11 shrink-0",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.65 0.25 142 / 0.25) 0%, oklch(0.65 0.25 142 / 0.1) 100%)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-emerald-400" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "Active Subscription" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Premium signals access" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-success shrink-0", children: "ACTIVE" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-4 bg-muted/30 border border-border/60 rounded-lg p-3 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Time remaining" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono font-bold text-foreground tabular-nums", children: [
                countdown.h,
                ":",
                countdown.m,
                ":",
                countdown.s
              ] })
            ] })
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-premium relative overflow-hidden",
      "data-ocid": "subscription-empty-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent pointer-events-none rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-start justify-between gap-4 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "stat-icon-bg w-11 h-11 shrink-0",
                style: {
                  background: "linear-gradient(135deg, oklch(0.72 0.22 68 / 0.2) 0%, oklch(0.72 0.22 68 / 0.1) 100%)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-amber-400" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: isExpired ? "Subscription Expired" : "No Active Subscription" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Subscribe to access live trading signals" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-failed shrink-0", children: isExpired ? "EXPIRED" : "NONE" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "gap-1.5 w-full h-10",
            onClick: () => {
              window.location.href = "/payment";
            },
            "data-ocid": "profile-renew-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4" }),
              isExpired ? "Renew Subscription — ₹1/day" : "Get Subscription — ₹1/day"
            ]
          }
        )
      ]
    }
  );
}
function InfoRow({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-3.5 border-b border-border last:border-b-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "stat-icon-bg w-9 h-9 shrink-0",
        style: {
          background: "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.12) 0%, oklch(0.72 0.19 220 / 0.06) 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate mt-0.5", children: value || "—" })
    ] })
  ] });
}
function Profile() {
  const { user, currentSession, profile, updateProfile, isLoading } = useAuth();
  const { data: isSubscribed, isLoading: subLoading } = useSubscriptionStatus();
  const { data: subscription } = useSubscription();
  const { hasCertificate } = useCertificateStatus();
  const fileInputRef = reactExports.useRef(null);
  const [editingUsername, setEditingUsername] = reactExports.useState(false);
  const [usernameInput, setUsernameInput] = reactExports.useState(
    () => profile.username || (currentSession == null ? void 0 : currentSession.name) || ""
  );
  const [usernameError, setUsernameError] = reactExports.useState("");
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [savedSuccess, setSavedSuccess] = reactExports.useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = reactExports.useState(false);
  const [isDragOver, setIsDragOver] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!editingUsername) {
      setUsernameInput(profile.username || (currentSession == null ? void 0 : currentSession.name) || "");
    }
  }, [profile.username, currentSession == null ? void 0 : currentSession.name, editingUsername]);
  const displayName = profile.username || (currentSession == null ? void 0 : currentSession.name) || "Trader";
  const email = (currentSession == null ? void 0 : currentSession.email) ?? (user == null ? void 0 : user.principal) ?? "";
  const isVerified = !!isSubscribed;
  const expiresAt = (subscription == null ? void 0 : subscription.expiresAt) ?? null;
  function handleAvatarClick() {
    var _a;
    (_a = fileInputRef.current) == null ? void 0 : _a.click();
  }
  async function handleAvatarChange(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      ue.error("Please select an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      ue.error("Image too large. Please choose an image under 2 MB.");
      return;
    }
    setIsUploadingAvatar(true);
    try {
      const reader = new FileReader();
      const dataUrl = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
      updateProfile(profile.username, dataUrl);
      ue.success("Profile picture updated!");
    } catch {
      ue.error("Failed to process image. Please try again.");
    } finally {
      setIsUploadingAvatar(false);
      e.target.value = "";
    }
  }
  function handleRemoveAvatar() {
    updateProfile(profile.username, null);
    ue.success("Profile picture removed.");
  }
  function startEditUsername() {
    setUsernameInput(profile.username || (currentSession == null ? void 0 : currentSession.name) || "");
    setUsernameError("");
    setSavedSuccess(false);
    setEditingUsername(true);
  }
  function cancelEditUsername() {
    setEditingUsername(false);
    setUsernameError("");
    setUsernameInput(profile.username || (currentSession == null ? void 0 : currentSession.name) || "");
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
    setTimeout(() => setSavedSuccess(false), 3e3);
    ue.success("Profile updated!");
  }
  if (isLoading || subLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6 space-y-6 max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-40 rounded-lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-60 rounded" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-6 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-28 h-28 rounded-full shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-36 rounded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48 rounded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 rounded" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-px w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 w-full rounded-lg" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-xl" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6 space-y-6 max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-heading-1 text-2xl", children: "Your Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Manage your account, profile picture, and subscription" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated rounded-xl p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-3",
            onDragOver: (e) => {
              e.preventDefault();
              setIsDragOver(true);
            },
            onDragLeave: () => setIsDragOver(false),
            onDrop: (e) => {
              e.preventDefault();
              setIsDragOver(false);
              const f = e.dataTransfer.files[0];
              if (f == null ? void 0 : f.type.startsWith("image/")) {
                const fakeEvent = {
                  target: { files: [f], value: "" }
                };
                handleAvatarChange(fakeEvent);
              }
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AvatarDisplay,
                {
                  avatarUrl: profile.avatarUrl,
                  username: profile.username,
                  name: (currentSession == null ? void 0 : currentSession.name) || "",
                  isVerified,
                  isDragOver,
                  onClick: handleAvatarClick
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: fileInputRef,
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  onChange: handleAvatarChange,
                  "data-ocid": "avatar-file-input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleAvatarClick,
                    className: "text-primary hover:text-primary/80 transition-colors font-medium",
                    disabled: isUploadingAvatar,
                    "data-ocid": "change-avatar-btn",
                    children: isUploadingAvatar ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }),
                      "Uploading…"
                    ] }) : "Change photo"
                  }
                ),
                profile.avatarUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "·" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleRemoveAvatar,
                      className: "text-muted-foreground hover:text-destructive transition-colors",
                      "data-ocid": "remove-avatar-btn",
                      children: "Remove"
                    }
                  )
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 text-center sm:text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center sm:justify-start gap-2 flex-wrap mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground truncate", children: displayName }),
            isVerified && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 bg-red-500/15 border border-red-500/30 rounded-full px-3 py-1 animate-pulse",
                title: "Active Subscriber — Verified",
                "data-ocid": "verified-badge",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "w-4 h-4" }),
                  "Verified"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(GoldenTickBadge, { show: hasCertificate, size: "md" })
          ] }),
          hasCertificate && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center sm:justify-start mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/25 rounded-full px-3 py-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GoldenTickBadge, { show: true, size: "sm" }),
            "Verified Trader — Certificate Holder"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: email }),
          isVerified ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5" }),
            "Active Subscriber · Full Access"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 border border-border rounded-full px-3 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "w-3.5 h-3.5" }),
            "Subscribe to get verified badge"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border mb-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-semibold text-foreground flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 text-muted-foreground" }),
            "Username",
            savedSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-emerald-400 font-normal ml-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
              "Saved!"
            ] })
          ] }),
          !editingUsername && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: startEditUsername,
              className: "flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors font-medium",
              "data-ocid": "edit-username-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3 h-3" }),
                "Edit"
              ]
            }
          )
        ] }),
        editingUsername ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: usernameInput,
              onChange: (e) => {
                setUsernameInput(e.target.value);
                setUsernameError("");
              },
              onKeyDown: (e) => {
                if (e.key === "Enter") saveUsername();
                if (e.key === "Escape") cancelEditUsername();
              },
              placeholder: "Enter your username",
              className: `h-11 input-premium w-full ${usernameError ? "input-invalid" : usernameInput.trim().length >= 2 ? "input-valid" : ""}`,
              autoFocus: true,
              maxLength: 32,
              "data-ocid": "username-input"
            }
          ),
          usernameError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: usernameError }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                onClick: saveUsername,
                disabled: isSaving,
                className: "gap-1.5 h-9",
                "data-ocid": "save-username-btn",
                children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }),
                  "Saving…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                  "Save changes"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: cancelEditUsername,
                className: "gap-1.5 h-9",
                "data-ocid": "cancel-username-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
                  "Cancel"
                ]
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: `text-sm font-medium bg-muted/30 border rounded-lg px-4 py-3 ${profile.username ? "text-foreground border-border input-valid" : "text-muted-foreground italic border-border"}`,
            children: profile.username || "No username set — click Edit to add one"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated rounded-xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "stat-label text-xs mb-4", children: "Account Information" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoRow,
        {
          icon: User,
          label: "Full Name",
          value: (currentSession == null ? void 0 : currentSession.name) || ""
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: Mail, label: "Email Address", value: email }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoRow,
        {
          icon: Shield,
          label: "Subscription Status",
          value: isVerified ? "Active — Verified Subscriber ✓" : "No active subscription"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: Clock, label: "Member Since", value: "TradeSignal Pro" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubscriptionStatusCard, { isVerified, expiresAt })
  ] });
}
export {
  Profile as default
};
