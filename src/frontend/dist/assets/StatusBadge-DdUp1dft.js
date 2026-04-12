import { j as jsxRuntimeExports, f as cn } from "./index-BO-jy2EA.js";
const variantClasses = {
  buy: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
  sell: "bg-rose-500/10 text-rose-400 border border-rose-500/30",
  active: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
  expired: "bg-muted text-muted-foreground border border-border",
  pending: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
  approved: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
  rejected: "bg-rose-500/10 text-rose-400 border border-rose-500/30",
  default: "bg-primary/10 text-primary border border-primary/30"
};
function StatusBadge({
  variant = "default",
  children,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold font-mono tracking-wide",
        variantClasses[variant],
        className
      ),
      children
    }
  );
}
export {
  StatusBadge as S
};
