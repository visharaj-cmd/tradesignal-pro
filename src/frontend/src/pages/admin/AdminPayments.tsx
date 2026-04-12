import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  CheckCircle,
  CreditCard,
  Eye,
  User,
  UserCheck,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { Modal } from "../../components/ui/Modal";
import { StatusBadge as Badge } from "../../components/ui/StatusBadge";
import { useBackend } from "../../hooks/useBackend";
import { useActivateSubscription } from "../../hooks/useSubscription";
import { PaymentStatus } from "../../types";
import type { PaymentPublic } from "../../types";

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateShort(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <Badge
      variant={
        status === PaymentStatus.pending
          ? "pending"
          : status === PaymentStatus.approved
            ? "approved"
            : "rejected"
      }
    >
      {status}
    </Badge>
  );
}

export default function AdminPayments() {
  const { actor, isReady } = useBackend();
  const queryClient = useQueryClient();
  const activateSub = useActivateSubscription();
  const [viewPayment, setViewPayment] = useState<PaymentPublic | null>(null);
  const [rejectModal, setRejectModal] = useState<PaymentPublic | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const { data: payments, isLoading } = useQuery<PaymentPublic[]>({
    queryKey: ["admin-payments"],
    queryFn: async () => (actor ? actor.listAllPayments() : []),
    enabled: isReady,
  });

  const approveMutation = useMutation({
    mutationFn: async (payment: PaymentPublic) => {
      if (!actor) throw new Error("Not ready");
      await actor.approvePayment(payment.id);
      await activateSub.mutateAsync(payment.userId.toText());
    },
    onSuccess: () => {
      toast.success("Payment approved & subscription activated");
      queryClient.invalidateQueries({ queryKey: ["admin-payments"] });
    },
    onError: () => toast.error("Failed to approve payment"),
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ id, reason }: { id: bigint; reason: string }) => {
      if (!actor) throw new Error("Not ready");
      return actor.rejectPayment(id, reason);
    },
    onSuccess: () => {
      toast.success("Payment rejected");
      setRejectModal(null);
      setRejectReason("");
      queryClient.invalidateQueries({ queryKey: ["admin-payments"] });
    },
    onError: () => toast.error("Failed to reject payment"),
  });

  const pending =
    payments?.filter((p) => p.status === PaymentStatus.pending) ?? [];
  const others =
    payments?.filter((p) => p.status !== PaymentStatus.pending) ?? [];
  const sorted = [...pending, ...others];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-heading-2">Payments</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Review and approve user payment submissions
        </p>
      </div>

      {/* Pending banner */}
      {!isLoading && pending.length > 0 && (
        <div
          className="flex items-start sm:items-center gap-3 px-4 py-3.5 rounded-xl border"
          style={{
            background: "oklch(var(--pending) / 0.07)",
            borderColor: "oklch(var(--pending) / 0.3)",
          }}
          data-ocid="pending-payments-banner"
        >
          <AlertCircle
            className="h-5 w-5 shrink-0 mt-0.5 sm:mt-0"
            style={{ color: "oklch(var(--pending))" }}
          />
          <div>
            <p
              className="text-sm font-semibold"
              style={{ color: "oklch(var(--pending))" }}
            >
              {pending.length} payment{pending.length > 1 ? "s" : ""} awaiting
              review
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Review and approve or reject the pending submissions below
            </p>
          </div>
        </div>
      )}

      {/* Payments list */}
      <div className="card-premium p-0 overflow-hidden">
        {/* Column headers */}
        {!isLoading && sorted.length > 0 && (
          <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-2.5 text-label text-xs border-b border-border bg-muted/20">
            <div>Sender / UTR</div>
            <div className="text-center">Date</div>
            <div className="text-center">Status</div>
            <div className="text-right">Actions</div>
          </div>
        )}

        {isLoading ? (
          <div className="p-4 space-y-3">
            {["a", "b", "c", "d"].map((k) => (
              <Skeleton key={k} className="h-16 w-full" />
            ))}
          </div>
        ) : !sorted.length ? (
          <div className="empty-state" data-ocid="payments-empty">
            <div className="empty-state-icon">
              <CreditCard className="h-7 w-7" />
            </div>
            <p className="font-semibold text-foreground">No payments yet</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              Payment submissions will appear here for review
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {sorted.map((p) => (
              <div
                key={p.id.toString()}
                className="signal-row flex flex-wrap sm:flex-nowrap items-center gap-3 px-5 py-4"
                data-ocid={`payment-row-${p.id}`}
              >
                {/* Sender/UTR */}
                <div className="flex-1 min-w-0 space-y-0.5">
                  {p.senderName && (
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="text-sm font-semibold text-foreground">
                        {p.senderName}
                      </span>
                    </div>
                  )}
                  <div className="font-mono text-xs text-muted-foreground">
                    UTR: {p.utrNumber}
                  </div>
                  {p.rejectionReason && (
                    <div
                      className="text-xs font-mono mt-0.5"
                      style={{ color: "oklch(var(--destructive))" }}
                    >
                      Reason: {p.rejectionReason}
                    </div>
                  )}
                </div>

                {/* Date */}
                <div className="text-xs text-muted-foreground font-mono shrink-0 hidden sm:block">
                  {formatDateShort(p.timestamp)}
                </div>

                {/* Status */}
                <div className="shrink-0">
                  <PaymentStatusBadge status={p.status} />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-fast"
                    style={{
                      background: "oklch(var(--muted) / 0.5)",
                      color: "oklch(var(--foreground))",
                      border: "1px solid oklch(var(--border))",
                    }}
                    onClick={() => setViewPayment(p)}
                    aria-label="View details"
                    data-ocid={`view-payment-${p.id}`}
                  >
                    <Eye className="h-3.5 w-3.5" /> View
                  </button>

                  {p.status === PaymentStatus.pending && (
                    <>
                      <button
                        type="button"
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-fast disabled:opacity-50"
                        style={{
                          background: "oklch(var(--success) / 0.12)",
                          color: "oklch(var(--success))",
                          border: "1px solid oklch(var(--success) / 0.3)",
                        }}
                        onClick={() => approveMutation.mutate(p)}
                        disabled={approveMutation.isPending}
                        data-ocid={`approve-payment-${p.id}`}
                      >
                        {approveMutation.isPending ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          <CheckCircle className="h-3.5 w-3.5" />
                        )}
                        Approve
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-fast"
                        style={{
                          background: "oklch(var(--destructive) / 0.08)",
                          color: "oklch(var(--destructive))",
                          border: "1px solid oklch(var(--destructive) / 0.25)",
                        }}
                        onClick={() => setRejectModal(p)}
                        data-ocid={`reject-payment-${p.id}`}
                      >
                        <XCircle className="h-3.5 w-3.5" /> Reject
                      </button>
                    </>
                  )}

                  {p.status === PaymentStatus.approved && (
                    <button
                      type="button"
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-fast disabled:opacity-50"
                      style={{
                        background: "oklch(var(--primary) / 0.1)",
                        color: "oklch(var(--primary))",
                        border: "1px solid oklch(var(--primary) / 0.25)",
                      }}
                      onClick={() => activateSub.mutate(p.userId.toText())}
                      disabled={activateSub.isPending}
                      data-ocid={`activate-sub-${p.id}`}
                    >
                      <UserCheck className="h-3.5 w-3.5" /> Re-activate
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Details Modal */}
      <Modal
        isOpen={!!viewPayment}
        onClose={() => setViewPayment(null)}
        title="Payment Details"
      >
        {viewPayment && (
          <div className="space-y-4">
            {/* Screenshot — full width prominent */}
            <div className="rounded-xl overflow-hidden border border-border bg-muted/10">
              <img
                src={viewPayment.screenshotBlob.getDirectURL()}
                alt="Payment screenshot"
                className="w-full max-h-72 object-contain"
              />
            </div>

            {/* Info grid */}
            <div className="rounded-xl border border-border overflow-hidden divide-y divide-border/50">
              {[
                viewPayment.senderName && {
                  label: "Sender Name",
                  icon: <User className="h-3.5 w-3.5" />,
                  value: viewPayment.senderName,
                },
                {
                  label: "UTR Number",
                  icon: null,
                  value: (
                    <span className="font-mono text-foreground text-xs">
                      {viewPayment.utrNumber}
                    </span>
                  ),
                },
                {
                  label: "Date",
                  icon: null,
                  value: formatDate(viewPayment.timestamp),
                },
                {
                  label: "Status",
                  icon: null,
                  value: <PaymentStatusBadge status={viewPayment.status} />,
                },
                viewPayment.rejectionReason && {
                  label: "Rejection Reason",
                  icon: null,
                  value: (
                    <span style={{ color: "oklch(var(--destructive))" }}>
                      {viewPayment.rejectionReason}
                    </span>
                  ),
                },
              ]
                .filter(Boolean)
                .map((row) => {
                  const r = row as {
                    label: string;
                    icon: React.ReactNode;
                    value: React.ReactNode;
                  };
                  return (
                    <div
                      key={r.label}
                      className="flex items-center justify-between gap-3 px-4 py-3"
                    >
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        {r.icon}
                        {r.label}
                      </span>
                      <span className="text-sm text-foreground font-semibold text-right">
                        {r.value}
                      </span>
                    </div>
                  );
                })}
            </div>

            {/* Quick actions */}
            {viewPayment.status === PaymentStatus.pending && (
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  className="button-tertiary flex-1 h-10 text-sm border border-border"
                  onClick={() => {
                    setRejectModal(viewPayment);
                    setViewPayment(null);
                  }}
                >
                  <XCircle
                    className="h-4 w-4 inline mr-1.5"
                    style={{ color: "oklch(var(--destructive))" }}
                  />
                  Reject
                </button>
                <button
                  type="button"
                  className="flex-1 h-10 text-sm flex items-center justify-center gap-2 rounded-lg font-semibold transition-fast disabled:opacity-50"
                  style={{
                    background: "oklch(var(--success))",
                    color: "oklch(var(--success-foreground))",
                  }}
                  disabled={approveMutation.isPending}
                  onClick={() => {
                    approveMutation.mutate(viewPayment);
                    setViewPayment(null);
                  }}
                >
                  {approveMutation.isPending ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" /> Approve
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={!!rejectModal}
        onClose={() => {
          setRejectModal(null);
          setRejectReason("");
        }}
        title="Reject Payment"
        description="Provide a reason so the user can resubmit correctly"
      >
        {rejectModal && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Rejection reason</Label>
              <Textarea
                id="reason"
                placeholder="e.g. UTR number doesn't match, screenshot unclear…"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={3}
                className="input-premium resize-none w-full"
                data-ocid="rejection-reason"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                className="button-tertiary flex-1 h-10 text-sm border border-border"
                onClick={() => {
                  setRejectModal(null);
                  setRejectReason("");
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="flex-1 h-10 text-sm flex items-center justify-center gap-2 rounded-lg font-semibold transition-fast disabled:opacity-50"
                style={{
                  background: "oklch(var(--destructive))",
                  color: "oklch(var(--destructive-foreground))",
                }}
                disabled={rejectMutation.isPending || !rejectReason.trim()}
                onClick={() =>
                  rejectMutation.mutate({
                    id: rejectModal.id,
                    reason: rejectReason,
                  })
                }
                data-ocid="confirm-reject-btn"
              >
                {rejectMutation.isPending ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <XCircle className="h-4 w-4" /> Reject Payment
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
