import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  ImageIcon,
  Pencil,
  Plus,
  Trash2,
  TrendingDown,
  TrendingUp,
  Upload,
  XCircle,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  ExternalBlob,
  SignalType,
  TradeStatus,
  Variant_success_failed,
} from "../../backend";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { Modal } from "../../components/ui/Modal";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { useBackend } from "../../hooks/useBackend";
import type { Signal, SignalFormData } from "../../types";

const defaultForm: SignalFormData = {
  pair: "",
  signalType: SignalType.buy,
  entryPrice: 0,
  stopLoss: 0,
  takeProfit: 0,
  confidence: 75,
  screenshotKey: undefined,
  tradeStatus: TradeStatus.pending,
};

function TradeStatusBadge({ status }: { status: TradeStatus }) {
  if (status === TradeStatus.success)
    return (
      <span className="badge-success gap-1.5 flex items-center">
        <CheckCircle2 className="h-3 w-3" /> SUCCESS
      </span>
    );
  if (status === TradeStatus.failed)
    return (
      <span className="badge-failed gap-1.5 flex items-center">
        <XCircle className="h-3 w-3" /> FAILED
      </span>
    );
  return <span className="badge-pending">PENDING</span>;
}

function ScreenshotUpload({
  value,
  onChange,
}: { value?: string; onChange: (key: string | undefined) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [isDragOver, setIsDragOver] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes);
      const key = blob.getDirectURL();
      setPreview(URL.createObjectURL(file));
      onChange(key);
    } catch {
      toast.error("Screenshot upload failed");
    } finally {
      setUploading(false);
    }
  }

  const hasImage = preview || value;

  return (
    <div className="space-y-2">
      <Label>Screenshot (optional)</Label>
      <button
        type="button"
        aria-label="Upload screenshot"
        className={`w-full rounded-lg border-2 border-dashed transition-smooth cursor-pointer text-left
          ${isDragOver ? "border-accent/70 bg-accent/5" : hasImage ? "border-border bg-secondary" : "border-input bg-muted/10 hover:border-accent/50 hover:bg-accent/5"}`}
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
        data-ocid="screenshot-upload"
      >
        {hasImage ? (
          <div className="flex items-center gap-3 p-3">
            <img
              src={preview ?? value}
              alt="Preview"
              className="h-16 w-16 rounded-lg object-cover border border-border shrink-0"
            />
            <div className="flex-1 min-w-0">
              {uploading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <LoadingSpinner size="sm" /> Uploading…
                </div>
              ) : (
                <>
                  <p className="text-sm font-semibold text-foreground">
                    Screenshot uploaded
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Click to replace
                  </p>
                </>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                setPreview(undefined);
                onChange(undefined);
              }}
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
            {uploading ? (
              <>
                <LoadingSpinner size="md" />
                <p className="text-sm text-muted-foreground mt-2">Uploading…</p>
              </>
            ) : (
              <>
                <div className="stat-icon-bg mb-3">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  Drop or click to upload
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG, WEBP · chart screenshot
                </p>
              </>
            )}
          </div>
        )}
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}

// ---- Optional Proof Upload (for Mark as Success) ----
function ProofUpload({
  proofFile,
  proofPreview,
  uploading,
  onFile,
  onClear,
}: {
  proofFile: File | null;
  proofPreview: string | null;
  uploading: boolean;
  onFile: (f: File) => void;
  onClear: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) onFile(f);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files[0];
    if (f?.type.startsWith("image/")) onFile(f);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-semibold text-foreground">
          Trade Proof
        </Label>
        <span className="text-xs text-muted-foreground bg-muted/50 border border-border px-2 py-0.5 rounded-full">
          Optional
        </span>
      </div>
      <p className="text-xs text-muted-foreground">
        Upload a proof screenshot for this successful trade — skip if not
        available.
      </p>

      <button
        type="button"
        aria-label="Upload proof image"
        className={`w-full rounded-lg border-2 border-dashed transition-smooth cursor-pointer text-left ${
          drag
            ? "border-emerald-500/60 bg-emerald-500/5"
            : proofFile || proofPreview
              ? "border-emerald-500/40 bg-emerald-500/5"
              : "border-border hover:border-emerald-500/40 hover:bg-emerald-500/3"
        }`}
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={handleDrop}
        data-ocid="proof-upload"
      >
        {proofFile || proofPreview ? (
          <div className="flex items-center gap-3 p-3">
            {proofPreview && (
              <img
                src={proofPreview}
                alt="Proof preview"
                className="h-14 w-14 rounded-lg object-cover border border-emerald-500/30 shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              {uploading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <LoadingSpinner size="sm" /> Uploading proof…
                </div>
              ) : (
                <>
                  <p className="text-sm font-semibold text-emerald-400">
                    Proof ready
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {proofFile?.name ?? "Image uploaded"} · Click to replace
                  </p>
                </>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-5 px-4 text-center">
            <div
              className="stat-icon-bg mb-2.5"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.25 142 / 0.15) 0%, oklch(0.65 0.25 142 / 0.08) 100%)",
              }}
            >
              <ImageIcon className="h-5 w-5 text-emerald-400" />
            </div>
            <p className="text-sm font-medium text-foreground">
              {drag ? "Drop proof image here" : "Drop or click to add proof"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Optional · JPG, PNG, WEBP
            </p>
          </div>
        )}
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}

function ConfidenceSlider({
  value,
  onChange,
}: { value: number; onChange: (v: number) => void }) {
  const pct = value;
  const color =
    pct >= 75
      ? "oklch(var(--success))"
      : pct >= 50
        ? "oklch(var(--accent))"
        : "oklch(var(--pending))";
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>Confidence</Label>
        <span
          className="text-sm font-bold font-mono tabular-nums"
          style={{ color }}
        >
          {value}%
        </span>
      </div>
      <div className="relative pt-1">
        <input
          type="range"
          min={1}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{ accentColor: color }}
        />
        <div className="flex justify-between text-xs text-muted-foreground font-mono mt-1">
          <span>1%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}

function SignalForm({
  initial,
  onSubmit,
  isPending,
  onCancel,
}: {
  initial: SignalFormData;
  onSubmit: (data: SignalFormData) => void;
  isPending: boolean;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<SignalFormData>(initial);
  const set = <K extends keyof SignalFormData>(
    field: K,
    value: SignalFormData[K],
  ) => setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      {/* Pair + type */}
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 space-y-1.5">
          <Label htmlFor="pair">Trading Pair</Label>
          <input
            id="pair"
            placeholder="e.g. BTC/USDT"
            value={form.pair}
            onChange={(e) => set("pair", e.target.value)}
            required
            className="input-premium w-full font-mono"
            data-ocid="signal-pair-input"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Signal Type</Label>
          <Select
            value={form.signalType}
            onValueChange={(v) => set("signalType", v as SignalType)}
          >
            <SelectTrigger
              className="input-premium h-auto py-2.5"
              data-ocid="signal-type-select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={SignalType.buy}>
                <span className="flex items-center gap-2">
                  <TrendingUp className="h-3.5 w-3.5 text-success" /> BUY
                </span>
              </SelectItem>
              <SelectItem value={SignalType.sell}>
                <span className="flex items-center gap-2">
                  <TrendingDown className="h-3.5 w-3.5 text-destructive" /> SELL
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Trade Status</Label>
          <Select
            value={form.tradeStatus}
            onValueChange={(v) => set("tradeStatus", v as TradeStatus)}
          >
            <SelectTrigger className="input-premium h-auto py-2.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={TradeStatus.pending}>Pending</SelectItem>
              <SelectItem value={TradeStatus.success}>Success</SelectItem>
              <SelectItem value={TradeStatus.failed}>Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Price fields — 3 columns */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { id: "entry", label: "Entry Price", field: "entryPrice" as const },
          { id: "sl", label: "Stop Loss", field: "stopLoss" as const },
          { id: "tp", label: "Take Profit", field: "takeProfit" as const },
        ].map(({ id, label, field }) => (
          <div key={id} className="space-y-1.5">
            <Label htmlFor={id}>{label}</Label>
            <input
              id={id}
              type="number"
              step="any"
              value={form[field] || ""}
              onChange={(e) => set(field, Number(e.target.value))}
              required
              className="input-premium w-full font-mono text-sm"
              placeholder="0.00"
            />
          </div>
        ))}
      </div>

      {/* Confidence slider */}
      <ConfidenceSlider
        value={form.confidence}
        onChange={(v) => set("confidence", v)}
      />

      {/* Screenshot */}
      <ScreenshotUpload
        value={form.screenshotKey}
        onChange={(key) => set("screenshotKey", key)}
      />

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="button-secondary flex-1 h-10 text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="button-primary flex-1 h-10 text-sm flex items-center justify-center gap-2"
          data-ocid="signal-save-btn"
        >
          {isPending ? (
            <>
              <LoadingSpinner size="sm" /> Saving…
            </>
          ) : (
            "Save Signal"
          )}
        </button>
      </div>
    </form>
  );
}

// ---- Mark Success Modal ----
function MarkSuccessModal({
  signal,
  onClose,
  onConfirm,
  isPending,
}: {
  signal: Signal;
  onClose: () => void;
  onConfirm: (proofKey: string | null) => void;
  isPending: boolean;
}) {
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const [proofKey, setProofKey] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleProofFile(file: File) {
    setProofFile(file);
    setProofPreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes);
      setProofKey(blob.getDirectURL());
    } catch {
      toast.error("Failed to process proof image");
      setProofFile(null);
      setProofPreview(null);
      setProofKey(null);
    } finally {
      setUploading(false);
    }
  }

  function clearProof() {
    setProofFile(null);
    setProofPreview(null);
    setProofKey(null);
  }

  return (
    <Modal
      isOpen
      onClose={onClose}
      title="Mark Trade as Success ✅"
      description={`Confirm that ${signal.pair} trade was successful`}
    >
      <div className="space-y-4">
        {/* Trade summary */}
        <div className="bg-emerald-500/6 border border-emerald-500/20 rounded-xl px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">
              {signal.pair}
            </p>
            <p className="text-xs text-muted-foreground">
              {signal.signalType === SignalType.buy ? "BUY" : "SELL"} ·
              Confidence {Number(signal.confidence)}%
            </p>
          </div>
        </div>

        {/* Optional proof upload */}
        <ProofUpload
          proofFile={proofFile}
          proofPreview={proofPreview}
          uploading={uploading}
          onFile={handleProofFile}
          onClear={clearProof}
        />

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            className="button-secondary flex-1 h-10 text-sm"
            onClick={onClose}
            data-ocid="mark-success-cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex-1 h-10 text-sm flex items-center justify-center gap-2 rounded-lg font-semibold transition-fast disabled:opacity-50"
            style={{
              background: "oklch(var(--success))",
              color: "oklch(var(--success-foreground))",
            }}
            disabled={isPending || uploading}
            onClick={() => onConfirm(proofKey)}
            data-ocid="mark-success-confirm"
          >
            {isPending ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" /> Mark as Success
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default function AdminSignals() {
  const { actor, isReady } = useBackend();
  const queryClient = useQueryClient();
  const [showAdd, setShowAdd] = useState(false);
  const [editSignal, setEditSignal] = useState<Signal | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Signal | null>(null);
  // State for the optional-proof success modal
  const [successTarget, setSuccessTarget] = useState<Signal | null>(null);

  const { data: signals, isLoading } = useQuery<Signal[]>({
    queryKey: ["admin-signals"],
    queryFn: async () => (actor ? actor.listSignals() : []),
    enabled: isReady,
  });

  const addMutation = useMutation({
    mutationFn: async (data: SignalFormData) => {
      if (!actor) throw new Error("Not ready");
      return actor.addSignal({
        pair: data.pair,
        signalType: data.signalType,
        entryPrice: data.entryPrice,
        stopLoss: data.stopLoss,
        takeProfit: data.takeProfit,
        confidence: BigInt(data.confidence),
        screenshotKey: data.screenshotKey,
        tradeStatus: data.tradeStatus,
      });
    },
    onSuccess: () => {
      toast.success("Signal added");
      setShowAdd(false);
      queryClient.invalidateQueries({ queryKey: ["admin-signals"] });
    },
    onError: () => toast.error("Failed to add signal"),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: bigint; data: SignalFormData }) => {
      if (!actor) throw new Error("Not ready");
      return actor.updateSignal(id, {
        pair: data.pair,
        signalType: data.signalType,
        entryPrice: data.entryPrice,
        stopLoss: data.stopLoss,
        takeProfit: data.takeProfit,
        confidence: BigInt(data.confidence),
        screenshotKey: data.screenshotKey,
        tradeStatus: data.tradeStatus,
      });
    },
    onSuccess: () => {
      toast.success("Signal updated");
      setEditSignal(null);
      queryClient.invalidateQueries({ queryKey: ["admin-signals"] });
    },
    onError: () => toast.error("Failed to update signal"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not ready");
      return actor.deleteSignal(id);
    },
    onSuccess: () => {
      toast.success("Signal deleted");
      setDeleteTarget(null);
      queryClient.invalidateQueries({ queryKey: ["admin-signals"] });
    },
    onError: () => toast.error("Failed to delete signal"),
  });

  const outcomeMutation = useMutation({
    mutationFn: async ({
      id,
      status,
      proofKey,
    }: {
      id: bigint;
      status: Variant_success_failed;
      proofKey: string | null;
    }) => {
      if (!actor) throw new Error("Not ready");
      return actor.markTradeOutcome(id, status, proofKey);
    },
    onSuccess: (_, vars) => {
      toast.success(
        `Trade marked as ${vars.status === Variant_success_failed.success ? "Success ✅" : "Failed ❌"}`,
      );
      setSuccessTarget(null);
      queryClient.invalidateQueries({ queryKey: ["admin-signals"] });
    },
    onError: () => toast.error("Failed to update trade outcome"),
  });

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-heading-2">Signals</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage trading signals visible to subscribers
          </p>
        </div>
        <button
          type="button"
          className="button-primary h-10 px-4 text-sm flex items-center gap-2"
          onClick={() => setShowAdd(true)}
          data-ocid="add-signal-btn"
        >
          <Plus className="h-4 w-4" /> Add Signal
        </button>
      </div>

      <div className="card-premium p-0 overflow-hidden">
        {/* Table header */}
        {!isLoading && signals && signals.length > 0 && (
          <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-5 py-2.5 text-label text-xs border-b border-border bg-muted/20">
            <div className="w-10" />
            <div>Signal</div>
            <div className="w-24 text-right">Prices</div>
            <div className="w-24 text-center">Status</div>
            <div className="w-28 text-right">Actions</div>
          </div>
        )}

        {isLoading ? (
          <div className="p-4 space-y-3">
            {["a", "b", "c", "d"].map((k) => (
              <div key={k} className="skeleton h-16 w-full rounded-lg" />
            ))}
          </div>
        ) : !signals?.length ? (
          <div className="empty-state" data-ocid="signals-empty">
            <div className="empty-state-icon">
              <TrendingUp className="h-7 w-7" />
            </div>
            <p className="font-semibold text-foreground">No signals yet</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              Add your first trading signal to get started
            </p>
            <button
              type="button"
              className="button-primary mt-4 px-4 h-9 text-sm flex items-center gap-2"
              onClick={() => setShowAdd(true)}
            >
              <Plus className="h-4 w-4" /> Add Signal
            </button>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {signals.map((s) => {
              const isBuy = s.signalType === SignalType.buy;
              const isOutcomeLoading =
                outcomeMutation.isPending &&
                outcomeMutation.variables?.id === s.id;
              return (
                <div
                  key={s.id.toString()}
                  className="signal-row flex flex-wrap md:flex-nowrap items-center gap-3 px-5 py-4"
                  data-ocid={`signal-row-${s.id}`}
                >
                  {/* Thumbnail */}
                  <div className="shrink-0">
                    {s.screenshotKey ? (
                      <img
                        src={s.screenshotKey}
                        alt="Chart"
                        className="h-10 w-10 rounded-lg object-cover border border-border"
                      />
                    ) : (
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{
                          background: isBuy
                            ? "oklch(var(--success) / 0.12)"
                            : "oklch(var(--destructive) / 0.12)",
                        }}
                      >
                        {isBuy ? (
                          <TrendingUp
                            className="h-4 w-4"
                            style={{ color: "oklch(var(--success))" }}
                          />
                        ) : (
                          <TrendingDown
                            className="h-4 w-4"
                            style={{ color: "oklch(var(--destructive))" }}
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Signal info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-display font-bold text-foreground">
                        {s.pair}
                      </span>
                      <span
                        className={
                          isBuy
                            ? "badge-buy py-0.5 text-xs"
                            : "badge-sell py-0.5 text-xs"
                        }
                      >
                        {isBuy ? "BUY" : "SELL"}
                      </span>
                      {!s.isActive && (
                        <StatusBadge variant="expired">Inactive</StatusBadge>
                      )}
                      {/* Show proof indicator if proof was uploaded */}
                      {s.proofKey && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Proof
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground font-mono">
                      <span>E: {s.entryPrice}</span>
                      <span>SL: {s.stopLoss}</span>
                      <span>TP: {s.takeProfit}</span>
                      <span className="flex items-center gap-1">
                        <div
                          className="h-1.5 w-12 rounded-full overflow-hidden"
                          style={{ background: "oklch(var(--muted))" }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${Number(s.confidence)}%`,
                              background: "oklch(var(--accent))",
                            }}
                          />
                        </div>
                        {Number(s.confidence)}%
                      </span>
                    </div>
                  </div>

                  {/* Trade status */}
                  <div className="shrink-0" data-ocid={`trade-status-${s.id}`}>
                    <TradeStatusBadge status={s.tradeStatus} />
                  </div>

                  {/* Outcome actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {s.tradeStatus !== TradeStatus.success && (
                      <button
                        type="button"
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-fast disabled:opacity-50"
                        style={{
                          color: "oklch(var(--success))",
                          background: "oklch(var(--success) / 0.08)",
                          border: "1px solid oklch(var(--success) / 0.2)",
                        }}
                        disabled={isOutcomeLoading}
                        onClick={() => setSuccessTarget(s)}
                        data-ocid={`mark-success-${s.id}`}
                        aria-label="Mark Win"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Win</span>
                      </button>
                    )}
                    {s.tradeStatus !== TradeStatus.failed && (
                      <button
                        type="button"
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-fast disabled:opacity-50"
                        style={{
                          color: "oklch(var(--destructive))",
                          background: "oklch(var(--destructive) / 0.08)",
                          border: "1px solid oklch(var(--destructive) / 0.2)",
                        }}
                        disabled={isOutcomeLoading}
                        onClick={() =>
                          outcomeMutation.mutate({
                            id: s.id,
                            status: Variant_success_failed.failed,
                            proofKey: null,
                          })
                        }
                        data-ocid={`mark-failed-${s.id}`}
                        aria-label="Mark Loss"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Loss</span>
                      </button>
                    )}
                  </div>

                  {/* Edit / Delete */}
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-muted/30"
                      onClick={() => setEditSignal(s)}
                      aria-label="Edit"
                      data-ocid={`edit-signal-${s.id}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-destructive/10"
                      style={{ color: "oklch(var(--destructive))" }}
                      onClick={() => setDeleteTarget(s)}
                      aria-label="Delete"
                      data-ocid={`delete-signal-${s.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        title="Add Signal"
        description="Create a new trading signal"
      >
        <SignalForm
          initial={defaultForm}
          onSubmit={(d) => addMutation.mutate(d)}
          isPending={addMutation.isPending}
          onCancel={() => setShowAdd(false)}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editSignal}
        onClose={() => setEditSignal(null)}
        title="Edit Signal"
        description="Update signal details"
      >
        {editSignal && (
          <SignalForm
            initial={{
              pair: editSignal.pair,
              signalType: editSignal.signalType,
              entryPrice: editSignal.entryPrice,
              stopLoss: editSignal.stopLoss,
              takeProfit: editSignal.takeProfit,
              confidence: Number(editSignal.confidence),
              screenshotKey: editSignal.screenshotKey,
              tradeStatus: editSignal.tradeStatus,
            }}
            onSubmit={(d) =>
              updateMutation.mutate({ id: editSignal.id, data: d })
            }
            isPending={updateMutation.isPending}
            onCancel={() => setEditSignal(null)}
          />
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Signal"
        description={`Delete signal for ${deleteTarget?.pair ?? ""}? This cannot be undone.`}
      >
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            className="button-tertiary flex-1 h-10 text-sm border border-border"
            onClick={() => setDeleteTarget(null)}
            data-ocid="delete-signal-cancel"
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
            disabled={deleteMutation.isPending}
            onClick={() =>
              deleteTarget && deleteMutation.mutate(deleteTarget.id)
            }
            data-ocid="delete-signal-confirm"
          >
            {deleteMutation.isPending ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <Trash2 className="h-4 w-4" /> Confirm Delete
              </>
            )}
          </button>
        </div>
      </Modal>

      {/* Mark Success Modal (with optional proof upload) */}
      {successTarget && (
        <MarkSuccessModal
          signal={successTarget}
          onClose={() => setSuccessTarget(null)}
          onConfirm={(proofKey) =>
            outcomeMutation.mutate({
              id: successTarget.id,
              status: Variant_success_failed.success,
              proofKey,
            })
          }
          isPending={outcomeMutation.isPending}
        />
      )}
    </div>
  );
}
