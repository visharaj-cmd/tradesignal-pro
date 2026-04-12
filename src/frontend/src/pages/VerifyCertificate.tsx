import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBackend } from "@/hooks/useBackend";
import {
  Award,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Search,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import type { CertificateRequestPublic } from "../types";

function formatDate(ns: bigint) {
  return new Date(Number(ns / 1_000_000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function CertResultCard({
  cert,
  certCode,
}: { cert: CertificateRequestPublic; certCode: string }) {
  return (
    <div
      className="rounded-2xl border border-emerald-500/25 p-6 space-y-5 animate-slide-in"
      style={{
        background:
          "linear-gradient(145deg, oklch(0.155 0.03 265 / 0.95) 0%, oklch(0.14 0.025 260 / 0.95) 100%)",
      }}
      data-ocid="cert-result-card"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.22 68 / 0.2) 0%, oklch(0.72 0.22 68 / 0.1) 100%)",
            border: "1px solid oklch(0.72 0.22 68 / 0.3)",
          }}
        >
          <Award className="w-6 h-6 text-amber-400" />
        </div>
        <div className="min-w-0">
          <p className="font-display font-bold text-lg text-foreground truncate">
            {cert.fullName}
          </p>
          <p className="text-xs text-muted-foreground">Verified Trader</p>
        </div>
        <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 ml-auto" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Certificate ID", value: certCode, mono: true },
          { label: "Status", value: "VERIFIED ✓", mono: false },
          { label: "Country", value: cert.country || "—", mono: false },
          {
            label: "Date Issued",
            value: formatDate(cert.updatedAt),
            mono: false,
          },
          { label: "State/Region", value: cert.state || "—", mono: false },
          { label: "Experience", value: cert.experience || "—", mono: false },
        ].map(({ label, value, mono }) => (
          <div
            key={label}
            className="bg-muted/20 rounded-lg p-3 border border-border/50"
          >
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
              {label}
            </p>
            <p
              className={`text-sm font-semibold text-foreground break-words ${mono ? "font-mono" : ""}`}
            >
              {value}
            </p>
          </div>
        ))}
      </div>
      <div
        className="flex items-center gap-3 rounded-xl border border-emerald-500/25 px-4 py-3"
        style={{ background: "oklch(0.65 0.25 142 / 0.06)" }}
      >
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-emerald-400">
            Certificate Verified ✓
          </p>
          <p className="text-xs text-emerald-400/70 mt-0.5">
            Issued and verified by TradeSignal Pro
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyCertificate() {
  const { actor, isReady } = useBackend();
  const [certCode, setCertCode] = useState("");
  const [result, setResult] = useState<
    CertificateRequestPublic | null | undefined
  >(undefined);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!certCode.trim()) {
      setError("Please enter a Certificate ID");
      return;
    }
    setError("");
    setSearching(true);
    setResult(undefined);
    try {
      if (!actor) {
        setError("Network not ready. Please wait.");
        return;
      }
      const a = actor as unknown as Record<string, unknown>;
      if (typeof a.verifyCertificate === "function") {
        const res = await (
          a.verifyCertificate as (
            code: string,
          ) => Promise<CertificateRequestPublic | null>
        )(certCode.trim());
        setResult(res);
      } else {
        setResult(null);
      }
    } catch {
      setResult(null);
    } finally {
      setSearching(false);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.13 0.04 265) 0%, oklch(0.11 0.035 260) 50%, oklch(0.12 0.03 255) 100%)",
      }}
    >
      {/* Header */}
      <header
        className="border-b border-border/50 px-6 py-4"
        style={{ background: "oklch(0.155 0.035 265 / 0.95)" }}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-primary/25"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.22) 0%, oklch(0.76 0.21 210 / 0.15) 100%)",
              }}
            >
              <Award className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-display font-bold text-sm text-foreground">
                TradeSignal Pro
              </p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Certificate Verification
              </p>
            </div>
          </div>
          <a
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Back to App
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center space-y-3">
            <div
              className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center border border-amber-500/30"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.22 68 / 0.2) 0%, oklch(0.72 0.22 68 / 0.1) 100%)",
              }}
            >
              <ShieldCheck className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Verify Certificate
            </h1>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Enter a Certificate ID to verify its authenticity and view holder
              details.
            </p>
          </div>

          <form
            onSubmit={handleVerify}
            className="rounded-2xl border border-border/50 p-6 space-y-4"
            style={{
              background:
                "linear-gradient(145deg, oklch(0.155 0.03 265 / 0.9) 0%, oklch(0.14 0.025 260 / 0.9) 100%)",
            }}
          >
            <div className="space-y-1.5">
              <Label
                htmlFor="cert-verify-input"
                className="text-sm font-semibold text-foreground"
              >
                Certificate ID
              </Label>
              <Input
                id="cert-verify-input"
                placeholder="e.g. TSP-2024-001"
                value={certCode}
                onChange={(e) => {
                  setCertCode(e.target.value);
                  setError("");
                  setResult(undefined);
                }}
                className="h-12 input-premium font-mono text-base"
                data-ocid="cert-code-input"
                autoComplete="off"
                autoFocus
              />
              {error && <p className="text-xs text-destructive">⚠ {error}</p>}
            </div>
            <Button
              type="submit"
              className="w-full h-12 font-semibold text-base gap-2 shadow-elevated"
              disabled={searching || !certCode.trim() || !isReady}
              data-ocid="verify-cert-btn"
            >
              {searching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Verifying…
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" /> Verify Certificate
                </>
              )}
            </Button>
          </form>

          {result !== undefined &&
            (result === null ? (
              <div
                className="rounded-2xl border border-rose-500/25 p-6 text-center space-y-3"
                style={{
                  background:
                    "linear-gradient(145deg, oklch(0.155 0.03 265 / 0.9) 0%, oklch(0.14 0.025 260 / 0.9) 100%)",
                }}
                data-ocid="cert-not-found"
              >
                <div className="w-12 h-12 rounded-xl bg-muted/30 border border-border mx-auto flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    Certificate not found
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    No approved certificate with ID{" "}
                    <code className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs">
                      {certCode}
                    </code>{" "}
                    found.
                  </p>
                </div>
              </div>
            ) : (
              <CertResultCard cert={result} certCode={certCode} />
            ))}

          {result === undefined && (
            <p className="text-center text-xs text-muted-foreground/60">
              Certificate IDs look like{" "}
              <code className="font-mono text-primary/60">TSP-2024-001</code>.
              Find yours on your dashboard.
            </p>
          )}
        </div>
      </main>

      <footer className="border-t border-border/40 py-4 text-center">
        <p className="text-[10px] text-muted-foreground/40">
          © {new Date().getFullYear()} TradeSignal Pro. Built with{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-muted-foreground/70 transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
