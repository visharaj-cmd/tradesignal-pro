import { e as createLucideIcon, r as reactExports, x as useComposedRefs, j as jsxRuntimeExports, X, f as cn, p as useSubscription, o as useSubscriptionStatus, a as useBackend, q as useCertificateStatus, h as useQuery, i as TradeStatus, G as GoldenTickBadge, B as Button, Z as Zap, T as TrendingUp, l as SignalType, b as useNavigate, k as CreditCard } from "./index-BO-jy2EA.js";
import { S as StatusBadge } from "./StatusBadge-DdUp1dft.js";
import { u as useLayoutEffect2, a as useControllableState, b as useId, P as Primitive, c as composeEventHandlers, d as Portal$1, h as hideOthers, e as createContextScope, R as ReactRemoveScroll, f as useFocusGuards, F as FocusScope, D as DismissableLayer, g as createSlot, i as createContext2, C as ChevronUp, j as ChevronDown } from "./index-Ce6i51uv.js";
import { I as Input } from "./input-ChmVmaSS.js";
import { R as RefreshCw } from "./refresh-cw-BpYGj7tn.js";
import { A as Activity, a as Trophy, T as Target } from "./trophy-CRr0hBxX.js";
import { C as CircleX } from "./circle-x-D6Yc5ibs.js";
import { T as TrendingDown } from "./trending-down-1k8RkAqL.js";
import { C as Clock } from "./clock-BnWW5-NH.js";
import { S as Search } from "./search-Da3a1oy2.js";
import { L as Lock } from "./lock-DdkyLmcb.js";
import { I as Image } from "./image-DVE4fG_F.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
];
const ChevronsUpDown = createLucideIcon("chevrons-up-down", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$1);
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
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function useStateMachine(initialState, machine) {
  return reactExports.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var Presence = (props) => {
  const { present, children } = props;
  const presence = usePresence(present);
  const child = typeof children === "function" ? children({ present: presence.isPresent }) : reactExports.Children.only(children);
  const ref = useComposedRefs(presence.ref, getElementRef(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? reactExports.cloneElement(child, { ref }) : null;
};
Presence.displayName = "Presence";
function usePresence(present) {
  const [node, setNode] = reactExports.useState();
  const stylesRef = reactExports.useRef(null);
  const prevPresentRef = reactExports.useRef(present);
  const prevAnimationNameRef = reactExports.useRef("none");
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  reactExports.useEffect(() => {
    const currentAnimationName = getAnimationName(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
  }, [state]);
  useLayoutEffect2(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName(styles);
      if (present) {
        send("MOUNT");
      } else if (currentAnimationName === "none" || (styles == null ? void 0 : styles.display) === "none") {
        send("UNMOUNT");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send("ANIMATION_OUT");
        } else {
          send("UNMOUNT");
        }
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  useLayoutEffect2(() => {
    if (node) {
      let timeoutId;
      const ownerWindow = node.ownerDocument.defaultView ?? window;
      const handleAnimationEnd = (event) => {
        const currentAnimationName = getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
        if (event.target === node && isCurrentAnimation) {
          send("ANIMATION_END");
          if (!prevPresentRef.current) {
            const currentFillMode = node.style.animationFillMode;
            node.style.animationFillMode = "forwards";
            timeoutId = ownerWindow.setTimeout(() => {
              if (node.style.animationFillMode === "forwards") {
                node.style.animationFillMode = currentFillMode;
              }
            });
          }
        }
      };
      const handleAnimationStart = (event) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationName(stylesRef.current);
        }
      };
      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);
      return () => {
        ownerWindow.clearTimeout(timeoutId);
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      send("ANIMATION_END");
    }
  }, [node, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state),
    ref: reactExports.useCallback((node2) => {
      stylesRef.current = node2 ? getComputedStyle(node2) : null;
      setNode(node2);
    }, [])
  };
}
function getAnimationName(styles) {
  return (styles == null ? void 0 : styles.animationName) || "none";
}
function getElementRef(element) {
  var _a, _b;
  let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var DIALOG_NAME = "Dialog";
var [createDialogContext] = createContextScope(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog$1 = (props) => {
  const {
    __scopeDialog,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true
  } = props;
  const triggerRef = reactExports.useRef(null);
  const contentRef = reactExports.useRef(null);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: DIALOG_NAME
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogProvider,
    {
      scope: __scopeDialog,
      triggerRef,
      contentRef,
      contentId: useId(),
      titleId: useId(),
      descriptionId: useId(),
      open,
      onOpenChange: setOpen,
      onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      modal,
      children
    }
  );
};
Dialog$1.displayName = DIALOG_NAME;
var TRIGGER_NAME = "DialogTrigger";
var DialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...triggerProps } = props;
    const context = useDialogContext(TRIGGER_NAME, __scopeDialog);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
DialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME, {
  forceMount: void 0
});
var DialogPortal$1 = (props) => {
  const { __scopeDialog, forceMount, children, container } = props;
  const context = useDialogContext(PORTAL_NAME, __scopeDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopeDialog, forceMount, children: reactExports.Children.map(children, (child) => /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children: child }) })) });
};
DialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "DialogOverlay";
var DialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
    return context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlayImpl, { ...overlayProps, ref: forwardedRef }) }) : null;
  }
);
DialogOverlay$1.displayName = OVERLAY_NAME;
var Slot = createSlot("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, shards: [context.contentRef], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-state": getState(context.open),
          ...overlayProps,
          ref: forwardedRef,
          style: { pointerEvents: "auto", ...overlayProps.style }
        }
      ) })
    );
  }
);
var CONTENT_NAME = "DialogContent";
var DialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }
);
DialogContent$1.displayName = CONTENT_NAME;
var DialogContentModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
    reactExports.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
          var _a;
          event.preventDefault();
          (_a = context.triggerRef.current) == null ? void 0 : _a.focus();
        }),
        onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault()
        )
      }
    );
  }
);
var DialogContentNonModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const hasInteractedOutsideRef = reactExports.useRef(false);
    const hasPointerDownOutsideRef = reactExports.useRef(false);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          var _a, _b;
          (_a = props.onCloseAutoFocus) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) (_b = context.triggerRef.current) == null ? void 0 : _b.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          var _a, _b;
          (_a = props.onInteractOutside) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = (_b = context.triggerRef.current) == null ? void 0 : _b.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      }
    );
  }
);
var DialogContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, __scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    useFocusGuards();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FocusScope,
        {
          asChild: true,
          loop: true,
          trapped: trapFocus,
          onMountAutoFocus: onOpenAutoFocus,
          onUnmountAutoFocus: onCloseAutoFocus,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            DismissableLayer,
            {
              role: "dialog",
              id: context.contentId,
              "aria-describedby": context.descriptionId,
              "aria-labelledby": context.titleId,
              "data-state": getState(context.open),
              ...contentProps,
              ref: composedRefs,
              onDismiss: () => context.onOpenChange(false)
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TitleWarning, { titleId: context.titleId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef, descriptionId: context.descriptionId })
      ] })
    ] });
  }
);
var TITLE_NAME = "DialogTitle";
var DialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...titleProps } = props;
    const context = useDialogContext(TITLE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
  }
);
DialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "DialogDescription";
var DialogDescription = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...descriptionProps } = props;
    const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.p, { id: context.descriptionId, ...descriptionProps, ref: forwardedRef });
  }
);
DialogDescription.displayName = DESCRIPTION_NAME;
var CLOSE_NAME = "DialogClose";
var DialogClose = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...closeProps } = props;
    const context = useDialogContext(CLOSE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
      }
    );
  }
);
DialogClose.displayName = CLOSE_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var TITLE_WARNING_NAME = "DialogTitleWarning";
var [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
  contentName: CONTENT_NAME,
  titleName: TITLE_NAME,
  docsSlug: "dialog"
});
var TitleWarning = ({ titleId }) => {
  const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
  const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
  reactExports.useEffect(() => {
    if (titleId) {
      const hasTitle = document.getElementById(titleId);
      if (!hasTitle) console.error(MESSAGE);
    }
  }, [MESSAGE, titleId]);
  return null;
};
var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
var DescriptionWarning = ({ contentRef, descriptionId }) => {
  const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
  const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;
  reactExports.useEffect(() => {
    var _a;
    const describedById = (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby");
    if (descriptionId && describedById) {
      const hasDescription = document.getElementById(descriptionId);
      if (!hasDescription) console.warn(MESSAGE);
    }
  }, [MESSAGE, contentRef, descriptionId]);
  return null;
};
var Root = Dialog$1;
var Portal = DialogPortal$1;
var Overlay = DialogOverlay$1;
var Content = DialogContent$1;
var Title = DialogTitle$1;
var Close = DialogClose;
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
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
  return {
    h: Math.floor(totalSecs / 3600),
    m: Math.floor(totalSecs % 3600 / 60),
    s: totalSecs % 60,
    expired: remaining === 0,
    totalSecs
  };
}
function SubscriptionCard({
  expiresAt,
  isActive
}) {
  const { h, m, s, expired, totalSecs } = useCountdown(expiresAt);
  const active = isActive && !expired;
  const pad = (n) => String(n).padStart(2, "0");
  const isWarning = totalSecs <= 1800 && totalSecs > 300;
  const isCritical = totalSecs <= 300 && totalSecs > 0;
  const timerColorClass = isCritical ? "timer-critical" : isWarning ? "timer-warning" : "text-primary";
  const separatorClass = isCritical ? "timer-critical" : isWarning ? "timer-warning" : "text-primary";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium h-full relative overflow-hidden", children: [
    active && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none rounded-xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-between mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "stat-icon-bg",
            style: {
              background: active ? "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.25) 0%, oklch(0.76 0.21 210 / 0.18) 100%)" : "linear-gradient(135deg, oklch(0.53 0.02 260 / 0.15) 0%, oklch(0.53 0.02 260 / 0.1) 100%)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Clock,
              {
                className: `w-5 h-5 ${active ? "text-primary" : "text-muted-foreground"}`
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label text-xs", children: "Subscription Timer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-semibold text-sm text-foreground", children: [
            "Plan:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: active ? "text-emerald-400" : "text-destructive",
                children: active ? "Active" : "Expired"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${active ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 animate-pulse" : "bg-destructive/10 border-destructive/30 text-destructive"}`,
          "data-ocid": "subscription-badge",
          children: [
            active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" }),
            active ? "Premium" : "Expired"
          ]
        }
      )
    ] }),
    active ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 mb-3", children: [
        { val: pad(h), label: "HRS" },
        { val: pad(m), label: "MIN" },
        { val: pad(s), label: "SEC" }
      ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `rounded-xl border px-3 py-2.5 min-w-[62px] text-center transition-all duration-300 ${isCritical ? "bg-destructive/10 border-destructive/30" : isWarning ? "bg-warning/10 border-warning/30" : "bg-primary/10 border-primary/20"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `timer-digit text-3xl ${timerColorClass}`,
                  style: { letterSpacing: "-0.02em" },
                  children: item.val
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground tracking-widest font-mono mt-0.5", children: item.label })
            ]
          }
        ),
        i < 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `font-bold text-2xl leading-none px-0.5 ${separatorClass}`,
            children: ":"
          }
        )
      ] }, item.label)) }),
      (isWarning || isCritical) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "p",
        {
          className: `text-xs font-medium flex items-center gap-1.5 ${isCritical ? "timer-critical" : "timer-warning"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5" }),
            isCritical ? "Critical: Subscription expiring very soon!" : "Time runs low, take action."
          ]
        }
      ),
      !isWarning && !isCritical && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
        "Time Remaining: ",
        pad(h),
        "H ",
        pad(m),
        "M ",
        pad(s),
        "S"
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your subscription has expired. Renew to access live signals." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "self-start gap-1.5 h-8",
          onClick: () => {
            window.location.href = "/payment";
          },
          "data-ocid": "renew-inline-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
            "Renew Now"
          ]
        }
      )
    ] })
  ] });
}
function TradeStatCard({
  label,
  value,
  icon: Icon,
  accent,
  stagger
}) {
  const accentStyles = {
    indigo: {
      iconGrad: "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.25) 0%, oklch(0.72 0.19 220 / 0.12) 100%)",
      textColor: "text-primary",
      borderColor: "border-l-primary"
    },
    success: {
      iconGrad: "linear-gradient(135deg, oklch(0.65 0.25 142 / 0.25) 0%, oklch(0.65 0.25 142 / 0.12) 100%)",
      textColor: "text-emerald-400",
      borderColor: "border-l-emerald-500"
    },
    destructive: {
      iconGrad: "linear-gradient(135deg, oklch(0.62 0.22 22 / 0.25) 0%, oklch(0.62 0.22 22 / 0.12) 100%)",
      textColor: "text-rose-400",
      borderColor: "border-l-rose-500"
    },
    cyan: {
      iconGrad: "linear-gradient(135deg, oklch(0.76 0.21 210 / 0.25) 0%, oklch(0.76 0.21 210 / 0.12) 100%)",
      textColor: "text-accent",
      borderColor: "border-l-accent"
    }
  };
  const style = accentStyles[accent];
  const staggerClass = `stagger-${stagger}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `stat-card-accent border-l-4 ${style.borderColor} ${staggerClass} animate-slide-in`,
      "data-ocid": "trade-stat-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "stat-icon-bg w-11 h-11",
              style: { background: style.iconGrad },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${style.textColor}` })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-mono opacity-40 ${style.textColor}`, children: "↗" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `stat-value text-3xl ${style.textColor} tabular-nums`, children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label text-xs mt-1", children: label })
      ]
    }
  );
}
function TradeStatusBadge({ status }) {
  if (status === TradeStatus.success) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-success", children: "SUCCESS" });
  }
  if (status === TradeStatus.failed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-failed", children: "FAILED" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-pending", children: "PENDING" });
}
function ScreenshotThumb({
  screenshotKey,
  pair,
  signal
}) {
  const [open, setOpen] = reactExports.useState(false);
  const imgUrl = screenshotKey.startsWith("http") ? screenshotKey : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setOpen(true),
        "aria-label": `View screenshot for ${pair}`,
        className: "inline-flex items-center gap-1 ml-1.5 opacity-70 hover:opacity-100 transition-smooth group",
        "data-ocid": "screenshot-thumb-btn",
        children: imgUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: imgUrl,
            alt: `${pair} screenshot`,
            className: "w-8 h-8 rounded-md object-cover border border-border ring-1 ring-primary/20 group-hover:ring-primary/60 group-hover:scale-110 transition-smooth shadow-sm"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3.5 h-3.5 text-primary" }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl card-modal p-0 overflow-hidden border-border/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "px-6 pt-5 pb-4 border-b border-border/60 bg-gradient-to-r from-card to-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display font-semibold text-foreground flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon-bg w-8 h-8 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }) }),
        pair,
        " Signal Details"
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
          {
            label: "Entry",
            value: signal.entryPrice.toFixed(4),
            color: "text-foreground"
          },
          {
            label: "Stop Loss",
            value: signal.stopLoss.toFixed(4),
            color: "text-rose-400"
          },
          {
            label: "Take Profit",
            value: signal.takeProfit.toFixed(4),
            color: "text-emerald-400"
          },
          {
            label: "Confidence",
            value: `${signal.confidence}%`,
            color: "text-primary"
          }
        ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-muted/30 border border-border rounded-lg p-3 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-1", children: item.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `font-mono font-bold text-base tabular-nums ${item.color}`,
                  children: item.value
                }
              )
            ]
          },
          item.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatusBadge,
            {
              variant: signal.signalType === SignalType.buy ? "buy" : "sell",
              children: signal.signalType === SignalType.buy ? "BUY" : "SELL"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TradeStatusBadge, { status: signal.tradeStatus })
        ] }),
        imgUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: imgUrl,
            alt: `${pair} full screenshot`,
            className: "w-full rounded-xl object-contain max-h-[55vh] border border-border shadow-elevated"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state py-10 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-icon mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-7 h-7" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Screenshot preview unavailable" })
        ] })
      ] })
    ] }) })
  ] });
}
function ConfidenceBar({ value }) {
  const color = value >= 90 ? "bg-emerald-500" : value >= 75 ? "bg-primary" : "bg-amber-500";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-muted rounded-full overflow-hidden min-w-[48px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-full rounded-full transition-all ${color}`,
        style: { width: `${value}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-foreground tabular-nums w-9 text-right", children: [
      value,
      "%"
    ] })
  ] });
}
function SortIcon({ active, dir }) {
  if (!active || dir === "none")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsUpDown, { className: "w-3 h-3 text-muted-foreground ml-1" });
  return dir === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3 h-3 text-primary ml-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3 text-primary ml-1" });
}
function SubscribeCTABanner() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative overflow-hidden rounded-xl border border-primary/30 mb-0",
      style: {
        background: "linear-gradient(135deg, oklch(0.18 0.04 265 / 0.95) 0%, oklch(0.22 0.06 260 / 0.95) 50%, oklch(0.16 0.05 270 / 0.95) 100%)"
      },
      "data-ocid": "subscribe-cta-banner",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col sm:flex-row items-start sm:items-center gap-4 px-5 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
                style: {
                  background: "linear-gradient(135deg, oklch(0.72 0.22 65 / 0.25) 0%, oklch(0.72 0.22 65 / 0.12) 100%)",
                  border: "1px solid oklch(0.72 0.22 65 / 0.35)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5 text-amber-400" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground leading-snug", children: "You are viewing past successful trades only." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Subscribe to access all live signals with entry, SL & TP in real time." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "shrink-0 gap-2 h-9 px-5 font-semibold text-sm shadow-elevated",
              onClick: () => navigate({ to: "/payment" }),
              "data-ocid": "subscribe-cta-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
                "Subscribe Now"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function SignalsTable({
  signals,
  isPublicView
}) {
  const [search, setSearch] = reactExports.useState("");
  const [sort, setSort] = reactExports.useState({
    key: "timestamp",
    dir: "desc"
  });
  function toggleSort(key) {
    setSort((prev) => {
      if (prev.key !== key) return { key, dir: "asc" };
      if (prev.dir === "asc") return { key, dir: "desc" };
      if (prev.dir === "desc") return { key, dir: "none" };
      return { key, dir: "asc" };
    });
  }
  const filtered = reactExports.useMemo(() => {
    let list = signals.filter(
      (s) => s.pair.toLowerCase().includes(search.toLowerCase())
    );
    if (sort.dir !== "none") {
      list = [...list].sort((a, b) => {
        let cmp = 0;
        if (sort.key === "pair") cmp = a.pair.localeCompare(b.pair);
        else if (sort.key === "confidence")
          cmp = Number(a.confidence) - Number(b.confidence);
        else cmp = Number(a.timestamp) - Number(b.timestamp);
        return sort.dir === "asc" ? cmp : -cmp;
      });
    }
    return list;
  }, [signals, search, sort]);
  function formatTs(ns) {
    return new Date(Number(ns / 1000000n)).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }
  const cols = [
    { key: "pair", label: "Pair", sortable: true },
    { key: "signal", label: "Signal", sortable: false },
    { key: "entry", label: "Entry", sortable: false },
    { key: "stopLoss", label: "SL", sortable: false },
    { key: "takeProfit", label: "TP", sortable: false },
    { key: "confidence", label: "Confidence", sortable: true },
    { key: "status", label: "Status", sortable: false },
    { key: "timestamp", label: "Timestamp", sortable: true }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-0 overflow-hidden", children: [
    isPublicView && /* @__PURE__ */ jsxRuntimeExports.jsx(SubscribeCTABanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-border bg-gradient-to-r from-muted/20 to-transparent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-heading-3 flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon-bg w-8 h-8 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }) }),
          isPublicView ? "Successful Trades" : "Trading Signals",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-primary/15 border border-primary/25 text-primary px-2 py-0.5 rounded-full font-mono", children: filtered.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 ml-10", children: isPublicView ? "Past verified successful trades — subscribe for live signals" : "Live signals with entry, SL & TP" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-64", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search pair...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9 h-9 text-sm input-premium",
            "data-ocid": "signals-search-input"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/30", children: cols.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: `px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider select-none ${col.sortable ? "cursor-pointer hover:text-foreground transition-colors" : ""}`,
          onClick: col.sortable ? () => toggleSort(col.key) : void 0,
          onKeyDown: col.sortable ? (e) => {
            if (e.key === "Enter" || e.key === " ")
              toggleSort(col.key);
          } : void 0,
          tabIndex: col.sortable ? 0 : void 0,
          role: col.sortable ? "button" : void 0,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center", children: [
            col.label,
            col.sortable && /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, { active: sort.key === col.key, dir: sort.dir })
          ] })
        },
        col.key
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 8, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state py-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-icon mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-8 h-8" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: search ? "No matching signals" : "No signals yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: search ? "Try a different search term." : "New signals will appear here as they are added." })
      ] }) }) }) : filtered.map((signal) => {
        const isBuy = signal.signalType === SignalType.buy;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "signal-row border-b border-border last:border-b-0 hover:bg-primary/5 transition-smooth group",
            "data-ocid": "signal-row",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-foreground group-hover:text-primary transition-smooth", children: signal.pair }),
                signal.screenshotKey && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ScreenshotThumb,
                  {
                    screenshotKey: signal.screenshotKey,
                    pair: signal.pair,
                    signal
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { variant: isBuy ? "buy" : "sell", children: isBuy ? "BUY" : "SELL" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 font-mono text-foreground tabular-nums text-sm", children: signal.entryPrice.toFixed(4) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 font-mono text-rose-400 tabular-nums text-sm", children: signal.stopLoss.toFixed(4) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 font-mono text-emerald-400 tabular-nums text-sm", children: signal.takeProfit.toFixed(4) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 w-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ConfidenceBar, { value: Number(signal.confidence) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TradeStatusBadge, { status: signal.tradeStatus }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-xs text-muted-foreground whitespace-nowrap font-mono", children: formatTs(signal.timestamp) })
            ]
          },
          String(signal.id)
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:hidden divide-y divide-border", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-icon mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-8 h-8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: search ? "No matching signals" : "No signals yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: search ? "Try a different search term." : "New signals will appear here." })
    ] }) : filtered.map((signal) => {
      const isBuy = signal.signalType === SignalType.buy;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-4 space-y-3 hover:bg-muted/10 transition-smooth",
          "data-ocid": "signal-row-mobile",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-foreground", children: signal.pair }),
                signal.screenshotKey && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ScreenshotThumb,
                  {
                    screenshotKey: signal.screenshotKey,
                    pair: signal.pair,
                    signal
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { variant: isBuy ? "buy" : "sell", children: isBuy ? "BUY" : "SELL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TradeStatusBadge, { status: signal.tradeStatus })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 text-xs bg-muted/20 rounded-lg p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-0.5 uppercase tracking-wide text-[10px]", children: "Entry" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-foreground tabular-nums font-medium", children: signal.entryPrice.toFixed(4) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-0.5 uppercase tracking-wide text-[10px]", children: "Stop Loss" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-rose-400 tabular-nums font-medium", children: signal.stopLoss.toFixed(4) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-0.5 uppercase tracking-wide text-[10px]", children: "Take Profit" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-emerald-400 tabular-nums font-medium", children: signal.takeProfit.toFixed(4) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ConfidenceBar, { value: Number(signal.confidence) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: formatTs(signal.timestamp) })
          ]
        },
        String(signal.id)
      );
    }) })
  ] });
}
function ExpiredState() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-premium text-center py-16 relative overflow-hidden",
      "data-ocid": "expired-state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 pointer-events-none rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "empty-state-icon mx-auto mb-5 w-20 h-20",
              style: {
                background: "oklch(0.72 0.22 68 / 0.15)",
                border: "1px solid oklch(0.72 0.22 68 / 0.3)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-10 h-10 text-amber-400" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-heading-2 mb-3", children: "Subscription Required" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-2 max-w-sm mx-auto", children: [
            "Your subscription has expired. Renew for",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "₹1/day" }),
            " to access live trading signals with entry, SL & TP levels."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-8 max-w-xs mx-auto", children: "Pay via UPI → Upload screenshot → Admin approves → Signals unlocked instantly" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "gap-2 h-12 px-10 font-semibold text-base shadow-elevated hover:shadow-premium transition-smooth",
              onClick: () => navigate({ to: "/payment" }),
              "data-ocid": "pay-now-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5" }),
                "Pay Now — ₹1/day"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function DashboardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: [0, 1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton w-11 h-11 rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-8 w-20 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-3 w-16 rounded" })
    ] }, k)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-4 w-32 rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-20 w-20 rounded-xl" }, i)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-5 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-4 w-24 rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-10 w-16 rounded" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-premium p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 space-y-3", children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-12 rounded" }, i)) }) })
  ] });
}
function Dashboard() {
  const {
    data: subscription,
    isLoading: subLoading,
    refetch: refetchSub
  } = useSubscription();
  const {
    data: isActive,
    isLoading: statusLoading,
    refetch: refetchStatus
  } = useSubscriptionStatus();
  const { actor, isReady } = useBackend();
  const { hasCertificate } = useCertificateStatus();
  const { data: signals, isLoading: signalsLoading } = useQuery({
    queryKey: ["signals"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSignals();
    },
    enabled: isReady && !!isActive,
    refetchInterval: 6e4
  });
  const { data: publicSignals, isLoading: publicSignalsLoading } = useQuery({
    queryKey: ["public-success-signals"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPublicSuccessSignals();
    },
    // Run whenever actor is ready AND user is NOT subscribed
    enabled: isReady && isActive === false,
    refetchInterval: 12e4
  });
  function handleRefresh() {
    refetchSub();
    refetchStatus();
  }
  const loading = subLoading || statusLoading;
  const allSignals = signals ?? [];
  const activeSignals = allSignals.filter((s) => s.isActive);
  const tradeStats = reactExports.useMemo(() => {
    const totalTrades = activeSignals.length;
    const successCount = activeSignals.filter(
      (s) => s.tradeStatus === TradeStatus.success
    ).length;
    const failedCount = activeSignals.filter(
      (s) => s.tradeStatus === TradeStatus.failed
    ).length;
    const completed = successCount + failedCount;
    const winRate = completed > 0 ? `${(successCount / completed * 100).toFixed(1)}%` : "--";
    return { totalTrades, successCount, failedCount, winRate };
  }, [activeSignals]);
  const avgConf = activeSignals.length ? Math.round(
    activeSignals.reduce((acc, s) => acc + Number(s.confidence), 0) / activeSignals.length
  ) : 0;
  const winRateAccent = tradeStats.winRate === "--" ? "cyan" : Number.parseFloat(tradeStats.winRate) >= 60 ? "success" : "destructive";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-heading-1 flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-7 h-7 text-primary" }),
          "Dashboard",
          /* @__PURE__ */ jsxRuntimeExports.jsx(GoldenTickBadge, { show: hasCertificate, size: "md" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 ml-9.5", children: "Monitor your trading signals and subscription status" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "gap-1.5 h-9 border-border/60 hover:border-primary/40 transition-smooth",
          onClick: handleRefresh,
          disabled: loading,
          "data-ocid": "dashboard-refresh-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              RefreshCw,
              {
                className: `w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`
              }
            ),
            "Refresh"
          ]
        }
      )
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardSkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "grid grid-cols-2 lg:grid-cols-4 gap-3",
          "data-ocid": "trade-stats-row",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TradeStatCard,
              {
                label: "Total Trades",
                value: tradeStats.totalTrades,
                icon: Activity,
                accent: "indigo",
                stagger: 1
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TradeStatCard,
              {
                label: "Successful",
                value: tradeStats.successCount,
                icon: Trophy,
                accent: "success",
                stagger: 2
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TradeStatCard,
              {
                label: "Failed Trades",
                value: tradeStats.failedCount,
                icon: CircleX,
                accent: "destructive",
                stagger: 3
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TradeStatCard,
              {
                label: "Win Rate",
                value: tradeStats.winRate,
                icon: Target,
                accent: winRateAccent,
                stagger: 4
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: subscription ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          SubscriptionCard,
          {
            expiresAt: subscription.expiresAt,
            isActive: subscription.isActive && !!isActive
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium flex items-center gap-4 h-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-amber-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "No active subscription" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Subscribe for ₹1/day to access live trading signals" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "shrink-0 gap-1.5",
              onClick: () => {
                window.location.href = "/payment";
              },
              "data-ocid": "get-started-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
                "Get Started"
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card-accent border-l-accent border-l-4 flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label text-xs", children: "Avg Confidence" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "stat-icon-bg w-10 h-10",
                style: {
                  background: isActive ? "linear-gradient(135deg, oklch(0.76 0.21 210 / 0.25) 0%, oklch(0.76 0.21 210 / 0.12) 100%)" : "linear-gradient(135deg, oklch(0.53 0.02 260 / 0.15) 0%, oklch(0.53 0.02 260 / 0.1) 100%)"
                },
                children: isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-4 h-4 text-muted-foreground" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-value text-3xl text-accent tabular-nums", children: isActive ? `${avgConf}%` : "—" }),
          isActive && avgConf > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full rounded-full transition-all",
              style: {
                width: `${avgConf}%`,
                background: "oklch(var(--accent))"
              }
            }
          ) })
        ] })
      ] }),
      isActive ? signalsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-premium p-5 space-y-3", children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-14 rounded-lg" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SignalsTable, { signals: activeSignals }) : isActive === false ? publicSignalsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-premium p-5 space-y-3", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-14 rounded-lg" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SignalsTable, { signals: publicSignals ?? [], isPublicView: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ExpiredState, {})
    ] })
  ] });
}
export {
  Dashboard as default
};
