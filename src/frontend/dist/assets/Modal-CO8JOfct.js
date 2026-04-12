import { r as reactExports, j as jsxRuntimeExports, B as Button, X, f as cn } from "./index-BO-jy2EA.js";
function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className
}) {
  const dialogRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  reactExports.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "dialog",
    {
      ref: dialogRef,
      className: "fixed inset-0 z-50 m-auto w-full max-w-lg rounded-xl border border-border bg-card shadow-elevated animate-slide-in backdrop:bg-background/80 backdrop:backdrop-blur-sm p-0",
      onKeyDown: (e) => {
        if (e.key === "Escape") onClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("w-full", className), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between border-b border-border px-6 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                id: "modal-title",
                className: "font-display text-lg font-semibold text-foreground",
                children: title
              }
            ),
            description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-muted-foreground", children: description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: onClose,
              "aria-label": "Close modal",
              className: "ml-4 shrink-0",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4", children })
      ] })
    }
  );
}
export {
  Modal as M
};
