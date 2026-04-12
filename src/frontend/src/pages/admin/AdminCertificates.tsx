import { ExternalBlob } from "@/backend";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useBackend } from "@/hooks/useBackend";
import type { CertificateRequestPublic, MasterTemplate } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  Award,
  CheckCircle2,
  Clock,
  Eye,
  ImageIcon,
  Loader2,
  RefreshCw,
  Upload,
  XCircle,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

type FilterTab = "all" | "pending" | "approved" | "rejected";

function formatDate(ns: bigint) {
  return new Date(Number(ns / 1_000_000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function CertStatusBadge({ status }: { status: string }) {
  if (status === "approved")
    return (
      <StatusBadge variant="approved" className="gap-1">
        <CheckCircle2 className="w-3 h-3" /> APPROVED
      </StatusBadge>
    );
  if (status === "rejected")
    return (
      <StatusBadge variant="rejected" className="gap-1">
        <XCircle className="w-3 h-3" /> REJECTED
      </StatusBadge>
    );
  return (
    <StatusBadge variant="pending" className="gap-1">
      <Clock className="w-3 h-3" /> PENDING
    </StatusBadge>
  );
}

// ---- Master Template ----
function MasterTemplateSection() {
  const { actor, isReady } = useBackend();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const { data: template } = useQuery<MasterTemplate | null>({
    queryKey: ["master-template"],
    queryFn: async () => {
      if (!actor) return null;
      const a = actor as unknown as Record<string, unknown>;
      if (typeof a.getMasterTemplate === "function")
        return await (
          a.getMasterTemplate as () => Promise<MasterTemplate | null>
        )();
      return null;
    },
    enabled: isReady,
  });

  const uploadMut = useMutation({
    mutationFn: async (f: File) => {
      if (!actor) throw new Error("Not ready");
      const bytes = new Uint8Array(await f.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes);
      const a = actor as unknown as Record<string, unknown>;
      if (typeof a.updateMasterTemplate === "function")
        await (a.updateMasterTemplate as (b: unknown) => Promise<void>)(blob);
    },
    onSuccess: () => {
      toast.success("Master template updated!");
      queryClient.invalidateQueries({ queryKey: ["master-template"] });
      setFile(null);
    },
    onError: () => toast.error("Failed to update template"),
  });

  return (
    <div
      className="rounded-xl border border-border/50 p-5 space-y-4"
      style={{
        background:
          "linear-gradient(145deg, oklch(0.155 0.03 265 / 0.9) 0%, oklch(0.14 0.025 260 / 0.9) 100%)",
      }}
      data-ocid="master-template-section"
    >
      <div>
        <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-amber-400" /> Master Certificate
          Template
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Upload PNG/PDF. System auto-injects Name, Date, Certificate ID on
          approval.
        </p>
      </div>
      {template?.blob && (
        <div className="rounded-lg overflow-hidden border border-border/40">
          <img
            src={template.blob.getDirectURL()}
            alt="Template"
            className="w-full max-h-40 object-contain bg-muted/10"
          />
          <p className="text-[10px] text-muted-foreground px-3 py-2">
            Current template ·{" "}
            {template.updatedAt ? formatDate(template.updatedAt) : ""}
          </p>
        </div>
      )}
      <div className="flex items-center gap-3">
        <input
          ref={fileRef}
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setFile(f);
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5 h-9"
          onClick={() => fileRef.current?.click()}
          data-ocid="select-template-btn"
        >
          <Upload className="w-3.5 h-3.5" />
          {file ? file.name : "Select Template File"}
        </Button>
        {file && (
          <Button
            size="sm"
            className="gap-1.5 h-9"
            onClick={() => uploadMut.mutate(file)}
            disabled={uploadMut.isPending}
            data-ocid="upload-template-btn"
          >
            {uploadMut.isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Upload className="w-3.5 h-3.5" />
            )}{" "}
            Upload
          </Button>
        )}
      </div>
    </div>
  );
}

// ---- Approve Modal ----
function ApproveModal({
  cert,
  onClose,
  onApprove,
  loading,
}: {
  cert: CertificateRequestPublic;
  onClose: () => void;
  onApprove: (cert: CertificateRequestPublic, file: File | null) => void;
  loading: boolean;
}) {
  const [mode, setMode] = useState<"auto" | "custom">("auto");
  const [customFile, setCustomFile] = useState<File | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-label="Close"
      />
      <div
        className="relative w-full max-w-md rounded-2xl border border-border p-6 space-y-5 shadow-premium z-10"
        style={{
          background:
            "linear-gradient(145deg, oklch(0.17 0.04 265) 0%, oklch(0.15 0.035 260) 100%)",
        }}
      >
        <div>
          <h3 className="font-display font-bold text-lg text-foreground">
            Approve Certificate
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            For:{" "}
            <span className="text-foreground font-medium">{cert.fullName}</span>{" "}
            · {cert.certCode}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {(["auto", "custom"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded-lg px-3 py-2.5 text-xs font-semibold transition-all ${mode === m ? "bg-primary/15 border border-primary/30 text-primary" : "border border-border text-muted-foreground hover:border-primary/20"}`}
            >
              {m === "auto"
                ? "🤖 Auto-generate (Default)"
                : "📄 Custom Upload (VIP)"}
            </button>
          ))}
        </div>
        {mode === "auto" && (
          <div
            className="rounded-xl border border-emerald-500/20 px-4 py-3 space-y-1.5"
            style={{ background: "oklch(0.65 0.25 142 / 0.06)" }}
          >
            <p className="text-xs font-semibold text-emerald-400">
              Will auto-inject:
            </p>
            {[
              `Name: ${cert.fullName}`,
              `Date: ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}`,
              `Certificate ID: ${cert.certCode}`,
            ].map((l) => (
              <p key={l} className="text-xs text-muted-foreground font-mono">
                ✓ {l}
              </p>
            ))}
          </div>
        )}
        {mode === "custom" && (
          <div className="space-y-2">
            <input
              ref={ref}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setCustomFile(f);
              }}
            />
            <button
              type="button"
              className={`w-full border-2 border-dashed rounded-xl p-5 text-center transition-all ${customFile ? "border-emerald-500/50 bg-emerald-500/5" : "border-border hover:border-primary/40"}`}
              onClick={() => ref.current?.click()}
            >
              {customFile ? (
                <p className="text-sm font-medium text-emerald-400">
                  {customFile.name}
                </p>
              ) : (
                <div className="space-y-1">
                  <ImageIcon className="w-6 h-6 text-muted-foreground mx-auto" />
                  <p className="text-xs text-muted-foreground">
                    Click to upload custom certificate (PNG/PDF)
                  </p>
                </div>
              )}
            </button>
          </div>
        )}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-10"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 h-10 bg-emerald-600 hover:bg-emerald-500 gap-1.5"
            disabled={loading || (mode === "custom" && !customFile)}
            onClick={() =>
              onApprove(cert, mode === "custom" ? customFile : null)
            }
            data-ocid="confirm-approve-btn"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}{" "}
            Approve
          </Button>
        </div>
      </div>
    </div>
  );
}

// ---- Reject Modal ----
function RejectModal({
  cert,
  onClose,
  onReject,
  loading,
}: {
  cert: CertificateRequestPublic;
  onClose: () => void;
  onReject: (cert: CertificateRequestPublic, reason: string) => void;
  loading: boolean;
}) {
  const [reason, setReason] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-label="Close"
      />
      <div
        className="relative w-full max-w-md rounded-2xl border border-border p-6 space-y-5 shadow-premium z-10"
        style={{
          background:
            "linear-gradient(145deg, oklch(0.17 0.04 265) 0%, oklch(0.15 0.035 260) 100%)",
        }}
      >
        <div>
          <h3 className="font-display font-bold text-lg text-foreground">
            Reject Certificate
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            For:{" "}
            <span className="text-foreground font-medium">{cert.fullName}</span>
          </p>
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="rejection-reason-textarea"
            className="text-sm font-semibold text-foreground"
          >
            Rejection Reason{" "}
            <span className="text-xs font-normal text-muted-foreground">
              (shown to user)
            </span>
          </label>
          <Textarea
            id="rejection-reason-textarea"
            placeholder="e.g. Screenshots are not clear, please resubmit"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-[80px] input-premium resize-none"
            data-ocid="rejection-reason-input"
          />
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-10"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="flex-1 h-10 gap-1.5"
            onClick={() => onReject(cert, reason)}
            disabled={loading}
            data-ocid="confirm-reject-btn"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}{" "}
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}

// ---- Main ----
export default function AdminCertificates() {
  const { actor, isReady } = useBackend();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<FilterTab>("all");
  const [approveModal, setApproveModal] =
    useState<CertificateRequestPublic | null>(null);
  const [rejectModal, setRejectModal] =
    useState<CertificateRequestPublic | null>(null);

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery<CertificateRequestPublic[]>({
    queryKey: ["admin-certificates"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const a = actor as unknown as Record<string, unknown>;
        if (typeof a.listAllCertificateRequests === "function")
          return await (
            a.listAllCertificateRequests as () => Promise<
              CertificateRequestPublic[]
            >
          )();
        return [];
      } catch {
        return [];
      }
    },
    enabled: isReady,
  });

  const approveMut = useMutation({
    mutationFn: async ({
      cert,
      file,
    }: { cert: CertificateRequestPublic; file: File | null }) => {
      if (!actor) throw new Error("Not ready");
      let customBlob: unknown = null;
      if (file) {
        const bytes = new Uint8Array(await file.arrayBuffer());
        customBlob = ExternalBlob.fromBytes(bytes);
      }
      const a = actor as unknown as Record<string, unknown>;
      if (typeof a.approveCertificate === "function")
        return await (
          a.approveCertificate as (
            id: bigint,
            b: unknown,
          ) => Promise<CertificateRequestPublic>
        )(cert.id, customBlob);
      throw new Error("approveCertificate not available");
    },
    onSuccess: () => {
      toast.success("Certificate approved!");
      setApproveModal(null);
      queryClient.invalidateQueries({ queryKey: ["admin-certificates"] });
      queryClient.invalidateQueries({ queryKey: ["my-certificates"] });
      queryClient.invalidateQueries({ queryKey: ["hasCertificate"] });
    },
    onError: () => toast.error("Failed to approve"),
  });

  const rejectMut = useMutation({
    mutationFn: async ({
      cert,
      reason,
    }: { cert: CertificateRequestPublic; reason: string }) => {
      if (!actor) throw new Error("Not ready");
      const a = actor as unknown as Record<string, unknown>;
      if (typeof a.rejectCertificate === "function")
        return await (
          a.rejectCertificate as (
            id: bigint,
            r: string,
          ) => Promise<CertificateRequestPublic>
        )(cert.id, reason);
      throw new Error("rejectCertificate not available");
    },
    onSuccess: () => {
      toast.success("Certificate rejected");
      setRejectModal(null);
      queryClient.invalidateQueries({ queryKey: ["admin-certificates"] });
      queryClient.invalidateQueries({ queryKey: ["my-certificates"] });
    },
    onError: () => toast.error("Failed to reject"),
  });

  const all = requests;
  const filtered = tab === "all" ? all : all.filter((r) => r.status === tab);
  const pendingCount = all.filter((r) => r.status === "pending").length;
  const approvedCount = all.filter((r) => r.status === "approved").length;
  const rejectedCount = all.filter((r) => r.status === "rejected").length;

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: "All", count: all.length },
    { key: "pending", label: "Pending", count: pendingCount },
    { key: "approved", label: "Approved", count: approvedCount },
    { key: "rejected", label: "Rejected", count: rejectedCount },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-heading-1 flex items-center gap-2.5 text-2xl">
            <Award className="w-7 h-7 text-amber-400" /> Certificate Requests
          </h1>
          <p className="text-sm text-muted-foreground mt-1 ml-9.5">
            Review and manage trader certificate applications
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 h-9"
          onClick={() => refetch()}
          data-ocid="admin-certs-refresh-btn"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </Button>
      </div>

      {/* Master Template */}
      <MasterTemplateSection />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total", value: all.length, color: "text-primary" },
          { label: "Pending", value: pendingCount, color: "text-amber-400" },
          {
            label: "Approved",
            value: approvedCount,
            color: "text-emerald-400",
          },
          { label: "Rejected", value: rejectedCount, color: "text-rose-400" },
        ].map((s) => (
          <div
            key={s.label}
            className="card-elevated rounded-xl p-4 text-center"
          >
            <p className={`text-2xl font-bold tabular-nums ${s.color}`}>
              {s.value}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-muted/20 rounded-xl p-1 w-fit border border-border/40">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${tab === t.key ? "bg-card text-foreground shadow-sm border border-border/60" : "text-muted-foreground hover:text-foreground"}`}
            data-ocid={`filter-tab-${t.key}`}
          >
            {t.label}
            <span className="bg-muted/50 text-muted-foreground rounded-full px-1.5 py-0.5 text-[10px] font-mono">
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* List */}
      {isLoading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="card-elevated rounded-xl py-16 flex flex-col items-center gap-3 text-center"
          data-ocid="certs-empty-state"
        >
          <Award className="w-10 h-10 text-muted-foreground/40" />
          <p className="font-semibold text-foreground">
            No {tab === "all" ? "" : tab} requests
          </p>
          <p className="text-sm text-muted-foreground">
            Applications will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((req) => (
            <div
              key={String(req.id)}
              className={`card-elevated rounded-xl p-5 border ${req.status === "pending" ? "border-amber-500/15" : "border-border/40"}`}
              data-ocid="admin-cert-row"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-foreground">
                      {req.fullName}
                    </p>
                    <CertStatusBadge status={req.status} />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span>
                      📍 {req.state}, {req.country}
                    </span>
                    <span>📅 {formatDate(req.createdAt)}</span>
                    <span>🎓 {req.experience || "Not specified"}</span>
                    <span className="font-mono">ID: {req.certCode}</span>
                    {req.email && (
                      <span className="truncate">✉ {req.email}</span>
                    )}
                    <span className="font-mono">UTR: {req.utrNumber}</span>
                  </div>
                  {(req.screenshot1Key || req.screenshot2Key) && (
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {
                          [req.screenshot1Key, req.screenshot2Key].filter(
                            Boolean,
                          ).length
                        }{" "}
                        trade screenshot(s) ·{" "}
                        {req.paymentScreenshotKey
                          ? "1 payment screenshot"
                          : "no payment screenshot"}
                      </span>
                    </div>
                  )}
                  {req.status === "rejected" && req.rejectionReason && (
                    <div className="flex items-start gap-1.5 text-xs text-rose-400 bg-rose-500/8 border border-rose-500/20 rounded-lg px-3 py-2">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>{req.rejectionReason}</span>
                    </div>
                  )}
                  {req.status === "approved" && req.autoInjectData && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        Auto-generated · {req.autoInjectData.certCode} ·{" "}
                        {req.autoInjectData.issueDate}
                      </span>
                    </div>
                  )}
                </div>
                {req.status === "pending" && (
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-9 gap-1.5 border-rose-500/30 text-rose-400 hover:bg-rose-500/10"
                      onClick={() => setRejectModal(req)}
                      data-ocid="reject-cert-btn"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </Button>
                    <Button
                      size="sm"
                      className="h-9 gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white"
                      onClick={() => setApproveModal(req)}
                      data-ocid="approve-cert-btn"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {approveModal && (
        <ApproveModal
          cert={approveModal}
          onClose={() => setApproveModal(null)}
          onApprove={(cert, file) => approveMut.mutate({ cert, file })}
          loading={approveMut.isPending}
        />
      )}
      {rejectModal && (
        <RejectModal
          cert={rejectModal}
          onClose={() => setRejectModal(null)}
          onReject={(cert, reason) => rejectMut.mutate({ cert, reason })}
          loading={rejectMut.isPending}
        />
      )}
    </div>
  );
}
