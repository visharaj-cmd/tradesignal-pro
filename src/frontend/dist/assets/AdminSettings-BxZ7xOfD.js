import { c as createLucideIcon, u as useAdmin, j as jsxRuntimeExports, ak as Link, S as ShieldCheck } from "./index-WNiHIFOH.js";
import { m as motion } from "./proxy-Cacrna30.js";
import { L as Lock } from "./lock-Kdp_IVmn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode);
function AdminSettings() {
  const { isSuperAdmin, adminRole } = useAdmin();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "mb-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/admin",
                className: "p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-smooth",
                "data-ocid": "admin.settings.back_link",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-heading-1", children: "Settings" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Manage application settings and configuration." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-premium p-8 text-center space-y-4", children: isSuperAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-10 w-10 text-primary mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg", children: "Superadmin Access" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm mx-auto", children: "You have full access to all settings. Use the Settings tab in the Admin Dashboard to edit hero content, why-choose section, footer, and button labels." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/admin",
          className: "button-primary text-sm inline-flex",
          "data-ocid": "admin.settings.goto_dashboard_button",
          children: "Go to Dashboard Settings"
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-10 w-10 text-muted-foreground mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg", children: "Access Restricted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm max-w-sm mx-auto", children: [
        "Settings editing is restricted to superadmin users only. Your current role: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "admin-badge", children: adminRole })
      ] })
    ] }) })
  ] });
}
export {
  AdminSettings as default
};
