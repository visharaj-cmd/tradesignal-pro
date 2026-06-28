import { c as createLucideIcon, r as reactExports, u as useAdmin, j as jsxRuntimeExports, U as Users, C as ClipboardList, M as Mail, d as Settings, X, S as ShieldCheck, b as ue } from "./index-WNiHIFOH.js";
import { d as useServices, e as useLeads, u as useContactDetails, f as useDeleteLead, g as useAddService, h as useUpdateService, i as useDeleteService, A as AnimatePresence, j as useSetContactDetails, P as Phone, M as MessageCircle, a as MapPin, b as useAppSettings } from "./index-B6NYecR0.js";
import { m as motion } from "./proxy-Cacrna30.js";
import { L as LoaderCircle } from "./loader-circle-zbmAspcE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$2);
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
const defaultContact = {
  phone: "+91 99999 99999",
  whatsapp: "+91 99999 99999",
  email: "support@ignou-services.com",
  address: "IGNOU Student Services Center, New Delhi, India — 110068",
  socialMedia: [
    { platform: "Facebook", url: "#" },
    { platform: "Instagram", url: "#" },
    { platform: "X", url: "#" },
    { platform: "YouTube", url: "#" }
  ]
};
const defaultAppSettings = {
  hero: {
    headline: "IGNOU Student Support Services",
    subtitle: "Your trusted partner for all IGNOU academic needs",
    ctaText: "Get Started",
    ctaSecondaryText: "Learn More"
  },
  whyChoose: {
    sectionTitle: "Why Choose Us",
    sectionSubtitle: "We provide comprehensive support for IGNOU students",
    features: [
      {
        id: "1",
        title: "Expert Guidance",
        description: "Professional help",
        icon: "ShieldCheck"
      },
      {
        id: "2",
        title: "24/7 Support",
        description: "Always available",
        icon: "Phone"
      }
    ]
  },
  footer: {
    tagline: "IGNOU Student Services",
    trustedText: "Trusted by 10,000+ students",
    secureText: "100% Secure & Confidential",
    resultsText: "95% Success Rate",
    privacyPolicy: { label: "Privacy Policy", href: "#" },
    termsOfService: { label: "Terms of Service", href: "#" },
    faqLink: { label: "FAQ", href: "#" }
  },
  buttons: {
    support24_7: "24/7 Support",
    chatOnWhatsApp: "Chat on WhatsApp"
  }
};
const LUCIDE_ICONS = [
  "BookOpen",
  "FileText",
  "GraduationCap",
  "ClipboardList",
  "ShieldCheck",
  "Phone",
  "Mail",
  "MapPin",
  "Users",
  "Award",
  "CheckCircle",
  "Clock",
  "Globe",
  "Heart",
  "HelpCircle",
  "Home",
  "Info",
  "Key",
  "Layers",
  "Lightbulb",
  "Lock",
  "MessageCircle",
  "Monitor",
  "Paperclip",
  "PenTool",
  "Printer",
  "RefreshCw",
  "Search",
  "Send",
  "Settings",
  "Star",
  "ThumbsUp",
  "TrendingUp",
  "Upload",
  "User",
  "Video",
  "Wifi",
  "Zap",
  "Briefcase",
  "Calculator",
  "Calendar",
  "Camera",
  "CreditCard",
  "Database",
  "Edit",
  "Eye",
  "Flag",
  "Folder",
  "Gift",
  "Headphones",
  "Image",
  "Inbox",
  "Link",
  "List",
  "Menu",
  "Mic",
  "Music",
  "Package",
  "PieChart",
  "Radio",
  "Scissors",
  "Share2",
  "ShoppingBag",
  "Smartphone",
  "Sun",
  "Tablet",
  "Tag",
  "Target",
  "Terminal",
  "Tool",
  "Truck",
  "Tv",
  "Type",
  "Umbrella",
  "Watch",
  "Activity",
  "Anchor",
  "Aperture",
  "Archive",
  "AtSign",
  "BarChart",
  "Battery",
  "Bell",
  "Bluetooth",
  "Box",
  "Brush",
  "Bug",
  "CameraOff",
  "Cast",
  "Check",
  "ChevronDown",
  "ChevronLeft",
  "ChevronRight",
  "ChevronUp",
  "Chrome",
  "Circle",
  "Cloud",
  "CloudRain",
  "Code",
  "Codepen",
  "Codesandbox",
  "Coffee",
  "Columns",
  "Command",
  "Compass",
  "Copy",
  "CornerDownLeft",
  "CornerDownRight",
  "CornerLeftDown",
  "CornerLeftUp",
  "CornerRightDown",
  "CornerRightUp",
  "CornerUpLeft",
  "CornerUpRight",
  "Cpu",
  "Crop",
  "Crosshair",
  "Database",
  "Delete",
  "Disc",
  "Divide",
  "DivideCircle",
  "DivideSquare",
  "DollarSign",
  "Download",
  "DownloadCloud",
  "Dribbble",
  "Droplet",
  "Edit2",
  "Edit3",
  "ExternalLink",
  "EyeOff",
  "Facebook",
  "FastForward",
  "Feather",
  "Figma",
  "File",
  "FileMinus",
  "FilePlus",
  "FileX",
  "Film",
  "Filter",
  "Flag",
  "FolderMinus",
  "FolderPlus",
  "Framer",
  "Frown",
  "Gamepad2",
  "Gauge",
  "Gavel",
  "GitBranch",
  "GitCommit",
  "GitMerge",
  "GitPullRequest",
  "Github",
  "Gitlab",
  "Glasses",
  "Globe2",
  "Grid",
  "HardDrive",
  "Hash",
  "Headphones",
  "Hexagon",
  "Highlighter",
  "History",
  "Home",
  "Image",
  "Inbox",
  "Indent",
  "Instagram",
  "Italic",
  "Key",
  "Languages",
  "Laptop",
  "Layout",
  "LifeBuoy",
  "Link2",
  "Linkedin",
  "List",
  "Loader",
  "Lock",
  "LogIn",
  "LogOut",
  "Mail",
  "Map",
  "MapPin",
  "Maximize",
  "Maximize2",
  "Megaphone",
  "Meh",
  "Menu",
  "MessageCircle",
  "MessageSquare",
  "Mic",
  "MicOff",
  "Minimize",
  "Minimize2",
  "Minus",
  "MinusCircle",
  "MinusSquare",
  "Monitor",
  "Moon",
  "MoreHorizontal",
  "MoreVertical",
  "MousePointer",
  "MousePointer2",
  "MousePointerClick",
  "Move",
  "Music",
  "Navigation",
  "Navigation2",
  "Octagon",
  "Option",
  "Outdent",
  "Package",
  "Paperclip",
  "Pause",
  "PauseCircle",
  "PenTool",
  "Percent",
  "Phone",
  "PhoneCall",
  "PhoneForwarded",
  "PhoneIncoming",
  "PhoneMissed",
  "PhoneOff",
  "PhoneOutgoing",
  "PieChart",
  "Play",
  "PlayCircle",
  "Plus",
  "PlusCircle",
  "PlusSquare",
  "Pocket",
  "Power",
  "Printer",
  "Radio",
  "RefreshCw",
  "Repeat",
  "Rewind",
  "RotateCcw",
  "RotateCw",
  "Rss",
  "Save",
  "Scissors",
  "Search",
  "Send",
  "Server",
  "Settings",
  "Share",
  "Share2",
  "Shield",
  "ShieldOff",
  "ShoppingBag",
  "ShoppingCart",
  "Shuffle",
  "Sidebar",
  "SkipBack",
  "SkipForward",
  "Slack",
  "Slash",
  "Sliders",
  "Smartphone",
  "Smile",
  "Speaker",
  "Square",
  "Star",
  "StopCircle",
  "Sun",
  "Sunrise",
  "Sunset",
  "Table",
  "Tablet",
  "Tag",
  "Target",
  "Terminal",
  "Thermometer",
  "ThumbsDown",
  "ThumbsUp",
  "ToggleLeft",
  "ToggleRight",
  "Tool",
  "Trash",
  "Trash2",
  "Trello",
  "TrendingDown",
  "TrendingUp",
  "Triangle",
  "Truck",
  "Tv",
  "Twitch",
  "Twitter",
  "Type",
  "Umbrella",
  "Underline",
  "Unlock",
  "Upload",
  "UploadCloud",
  "User",
  "UserCheck",
  "UserMinus",
  "UserPlus",
  "UserX",
  "Users",
  "Video",
  "VideoOff",
  "Voicemail",
  "Volume",
  "Volume1",
  "Volume2",
  "VolumeX",
  "Watch",
  "Wifi",
  "WifiOff",
  "Wind",
  "X",
  "XCircle",
  "XOctagon",
  "XSquare",
  "Youtube",
  "Zap",
  "ZapOff",
  "ZoomIn",
  "ZoomOut"
];
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleString();
}
function AdminDashboard() {
  const [activeTab, setActiveTab] = reactExports.useState("leads");
  const { isSuperAdmin } = useAdmin();
  const { data: services = [], isLoading: servicesLoading } = useServices();
  const servicesList = services;
  const { data: leads = [], isLoading: leadsLoading } = useLeads();
  const { data: contactData } = useContactDetails();
  const contact = contactData ?? defaultContact;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "mb-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-heading-1 mb-1", children: "Admin Dashboard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Manage leads, services, contact details, and settings for IGNOU Student Services." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 mb-6 border-b border-border/50 pb-1", children: [
      { key: "leads", label: "Leads", icon: Users },
      { key: "services", label: "Services", icon: ClipboardList },
      { key: "contact", label: "Contact", icon: Mail },
      { key: "settings", label: "Settings", icon: Settings }
    ].map(({ key, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(key),
        className: `flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-smooth relative ${activeTab === key ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
        "data-ocid": `admin.tab_${key}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
          label,
          activeTab === key && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              layoutId: "admin-tab-indicator",
              className: "absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
            }
          )
        ]
      },
      key
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        children: [
          activeTab === "leads" && /* @__PURE__ */ jsxRuntimeExports.jsx(LeadsTab, { leads, isLoading: leadsLoading }),
          activeTab === "services" && /* @__PURE__ */ jsxRuntimeExports.jsx(ServicesTab, { services: servicesList, isLoading: servicesLoading }),
          activeTab === "contact" && /* @__PURE__ */ jsxRuntimeExports.jsx(ContactTab, { contact }),
          activeTab === "settings" && /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsTab, { isSuperAdmin })
        ]
      },
      activeTab
    )
  ] });
}
function LeadsTab({
  leads,
  isLoading
}) {
  const deleteLead = useDeleteLead();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  if (leads.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", "data-ocid": "admin.leads.empty_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-8 w-8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg", children: "No Leads Yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm", children: "Captured leads will appear here once visitors submit their details through the popup." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-premium overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider", children: "Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider", children: "Contact" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider", children: "Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: leads.map((lead, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "border-b border-border/30 hover:bg-muted/20 transition-smooth",
        "data-ocid": `admin.lead.item.${index + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: lead.fullName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: lead.contactNumber }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs", children: formatDate(lead.timestamp) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                if (confirm("Delete this lead?")) {
                  deleteLead.mutate(lead.id);
                }
              },
              className: "p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth",
              "aria-label": "Delete lead",
              "data-ocid": `admin.lead.delete_button.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
            }
          ) })
        ]
      },
      String(lead.id)
    )) })
  ] }) }) });
}
function ServicesTab({
  services,
  isLoading
}) {
  const [editing, setEditing] = reactExports.useState(null);
  const [isAdding, setIsAdding] = reactExports.useState(false);
  const addService = useAddService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => {
          setIsAdding(true);
          setEditing(null);
        },
        className: "button-primary text-sm",
        "data-ocid": "admin.service.add_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          "Add Service"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: (isAdding || editing) && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ServiceForm,
      {
        service: editing,
        onCancel: () => {
          setIsAdding(false);
          setEditing(null);
        },
        onSave: (data) => {
          if (editing) {
            updateService.mutate(
              { id: editing.id, ...data },
              { onSuccess: () => setEditing(null) }
            );
          } else {
            addService.mutate(data, {
              onSuccess: () => setIsAdding(false)
            });
          }
        },
        isSubmitting: addService.isPending || updateService.isPending
      }
    ) }),
    services.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", "data-ocid": "admin.services.empty_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-8 w-8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg", children: "No Services" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Add services to display them on the public site." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: services.map((service, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "service-card",
        "data-ocid": `admin.service.item.${index + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-foreground truncate", children: service.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 line-clamp-2", children: service.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2 font-mono", children: [
              "Order: ",
              String(service.order),
              " · Icon: ",
              service.icon
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setEditing(service);
                  setIsAdding(false);
                },
                className: "p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth",
                "aria-label": "Edit service",
                "data-ocid": `admin.service.edit_button.${index + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  if (confirm("Delete this service?")) {
                    deleteService.mutate(service.id);
                  }
                },
                className: "p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth",
                "aria-label": "Delete service",
                "data-ocid": `admin.service.delete_button.${index + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] })
        ] })
      },
      String(service.id)
    )) })
  ] });
}
function ServiceForm({
  service,
  onCancel,
  onSave,
  isSubmitting
}) {
  const [title, setTitle] = reactExports.useState((service == null ? void 0 : service.title) ?? "");
  const [description, setDescription] = reactExports.useState((service == null ? void 0 : service.description) ?? "");
  const [iconName, setIconName] = reactExports.useState((service == null ? void 0 : service.icon) ?? "ClipboardList");
  const [sortOrder, setSortOrder] = reactExports.useState(String((service == null ? void 0 : service.order) ?? "0"));
  const [active, setActive] = reactExports.useState(true);
  const [showIconDropdown, setShowIconDropdown] = reactExports.useState(false);
  const [formErrors, setFormErrors] = reactExports.useState({});
  function validate() {
    const errs = {};
    if (!title.trim()) errs.title = "Title is required";
    if (!description.trim()) errs.description = "Description is required";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      title: title.trim(),
      description: description.trim(),
      icon: iconName.trim() || "ClipboardList",
      order: BigInt(sortOrder || "0")
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.form,
    {
      initial: { opacity: 0, y: -8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      className: "card-premium p-5 space-y-4",
      onSubmit: handleSubmit,
      "data-ocid": "admin.service.form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: service ? "Edit Service" : "Add Service" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onCancel,
              className: "p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-smooth",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "service-title", className: "text-label mb-1.5 block", children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "service-title",
                type: "text",
                value: title,
                onChange: (e) => setTitle(e.target.value),
                className: "input-premium",
                placeholder: "Service title"
              }
            ),
            formErrors.title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: formErrors.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "service-icon", className: "text-label mb-1.5 block", children: "Icon Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "service-icon",
                  type: "text",
                  value: iconName,
                  onChange: (e) => setIconName(e.target.value),
                  onFocus: () => setShowIconDropdown(true),
                  className: "input-premium pr-10",
                  placeholder: "Select Lucide icon"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowIconDropdown((v) => !v),
                  className: "absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-muted-foreground hover:text-foreground",
                  children: showIconDropdown ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showIconDropdown && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: -4 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -4 },
                className: "absolute z-50 mt-1 w-full max-h-48 overflow-y-auto card-premium p-2 space-y-1",
                children: LUCIDE_ICONS.filter(
                  (i) => i.toLowerCase().includes(iconName.toLowerCase())
                ).map((icon) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setIconName(icon);
                      setShowIconDropdown(false);
                    },
                    className: `w-full text-left px-3 py-2 rounded-lg text-sm transition-smooth ${iconName === icon ? "bg-primary/15 text-primary" : "text-foreground hover:bg-muted/30"}`,
                    children: icon
                  },
                  icon
                ))
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "service-description",
              className: "text-label mb-1.5 block",
              children: "Description"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "service-description",
              value: description,
              onChange: (e) => setDescription(e.target.value),
              className: "input-premium min-h-[80px] resize-y",
              placeholder: "Service description"
            }
          ),
          formErrors.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: formErrors.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "service-order", className: "text-label mb-1.5 block", children: "Sort Order" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "service-order",
                type: "number",
                value: sortOrder,
                onChange: (e) => setSortOrder(e.target.value),
                className: "input-premium w-32",
                placeholder: "0"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "service-active",
                type: "checkbox",
                checked: active,
                onChange: (e) => setActive(e.target.checked),
                className: "w-4 h-4 rounded border-border accent-primary"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "service-active", className: "text-sm text-foreground", children: "Active" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onCancel,
              className: "button-secondary text-sm",
              "data-ocid": "admin.service.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: isSubmitting,
              className: "button-primary text-sm",
              "data-ocid": "admin.service.save_button",
              children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
                service ? "Update" : "Save"
              ] })
            }
          )
        ] })
      ]
    }
  );
}
function ContactTab({ contact }) {
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [phone, setPhone] = reactExports.useState(contact.phone);
  const [whatsapp, setWhatsapp] = reactExports.useState(contact.whatsapp);
  const [email, setEmail] = reactExports.useState(contact.email);
  const [address, setAddress] = reactExports.useState(contact.address);
  const [socialMedia, setSocialMedia] = reactExports.useState(
    contact.socialMedia.length > 0 ? contact.socialMedia : defaultContact.socialMedia
  );
  const setContactDetails = useSetContactDetails();
  reactExports.useEffect(() => {
    setPhone(contact.phone);
    setWhatsapp(contact.whatsapp);
    setEmail(contact.email);
    setAddress(contact.address);
    setSocialMedia(
      contact.socialMedia.length > 0 ? contact.socialMedia : defaultContact.socialMedia
    );
  }, [contact]);
  function handleSave(e) {
    e.preventDefault();
    setContactDetails.mutate(
      {
        phone: phone.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim(),
        address: address.trim(),
        socialMedia: socialMedia.filter((s) => s.platform && s.url)
      },
      {
        onSuccess: () => setIsEditing(false)
      }
    );
  }
  function updateSocial(index, field, value) {
    setSocialMedia(
      (prev) => prev.map((s, i) => i === index ? { ...s, [field]: value } : s)
    );
  }
  function addSocial() {
    setSocialMedia((prev) => [...prev, { platform: "", url: "" }]);
  }
  function removeSocial(index) {
    setSocialMedia((prev) => prev.filter((_, i) => i !== index));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: !isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setIsEditing(true),
        className: "button-secondary text-sm",
        "data-ocid": "admin.contact.edit_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }),
          "Edit Contact Details"
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setIsEditing(false),
        className: "button-secondary text-sm",
        "data-ocid": "admin.contact.cancel_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          "Cancel"
        ]
      }
    ) }),
    isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.form,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        className: "card-premium p-5 space-y-4",
        onSubmit: handleSave,
        "data-ocid": "admin.contact.form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "contact-phone",
                  className: "text-label mb-1.5 block",
                  children: "Phone"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "contact-phone",
                    type: "tel",
                    value: phone,
                    onChange: (e) => setPhone(e.target.value),
                    className: "input-premium pl-10"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "contact-whatsapp",
                  className: "text-label mb-1.5 block",
                  children: "WhatsApp"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "contact-whatsapp",
                    type: "tel",
                    value: whatsapp,
                    onChange: (e) => setWhatsapp(e.target.value),
                    className: "input-premium pl-10"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "contact-email", className: "text-label mb-1.5 block", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "contact-email",
                  type: "email",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  className: "input-premium pl-10"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "contact-address",
                className: "text-label mb-1.5 block",
                children: "Address"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "contact-address",
                  value: address,
                  onChange: (e) => setAddress(e.target.value),
                  className: "input-premium pl-10 min-h-[60px] resize-y"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "social-media-section",
                className: "text-label mb-1.5 block",
                children: "Social Media"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "social-media-section", className: "space-y-2", children: socialMedia.map((s, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      value: s.platform,
                      onChange: (e) => updateSocial(index, "platform", e.target.value),
                      placeholder: "Platform",
                      className: "input-premium flex-1"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      value: s.url,
                      onChange: (e) => updateSocial(index, "url", e.target.value),
                      placeholder: "URL",
                      className: "input-premium flex-[2]"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeSocial(index),
                      className: "p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                    }
                  )
                ]
              },
              `${s.platform}-${s.url}-${index}`
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: addSocial,
                className: "button-tertiary text-xs mt-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
                  "Add Social Link"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: setContactDetails.isPending,
              className: "button-primary text-sm",
              "data-ocid": "admin.contact.save_button",
              children: setContactDetails.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
                "Save Changes"
              ] })
            }
          ) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-primary shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: contact.phone })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4 text-primary shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "WhatsApp" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: contact.whatsapp })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 text-primary shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: contact.email })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: contact.address })
        ] })
      ] }),
      contact.socialMedia.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 border-t border-border/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Social Media" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: contact.socialMedia.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "px-3 py-1 rounded-full text-xs bg-secondary text-foreground border border-border",
            children: s.platform
          },
          `${s.platform}-${s.url}-${i}`
        )) })
      ] })
    ] })
  ] });
}
function SettingsTab({ isSuperAdmin }) {
  useAppSettings();
  const appSettings = defaultAppSettings;
  if (!isSuperAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-8 text-center space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-10 w-10 text-muted-foreground mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg", children: "Superadmin Only" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm mx-auto", children: "Settings editing is restricted to superadmin users. Contact your administrator for access." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSettings, { settings: appSettings }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhyChooseSettings, { settings: appSettings }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FooterSettings, { settings: appSettings }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ButtonLabelsSettings, { settings: appSettings })
  ] });
}
function HeroSettings({ settings }) {
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [headline, setHeadline] = reactExports.useState(settings.hero.headline);
  const [subtitle, setSubtitle] = reactExports.useState(settings.hero.subtitle);
  const [ctaText, setCtaText] = reactExports.useState(settings.hero.ctaText);
  const [ctaSecondaryText, setCtaSecondaryText] = reactExports.useState(
    settings.hero.ctaSecondaryText
  );
  reactExports.useEffect(() => {
    setHeadline(settings.hero.headline);
    setSubtitle(settings.hero.subtitle);
    setCtaText(settings.hero.ctaText);
    setCtaSecondaryText(settings.hero.ctaSecondaryText);
  }, [settings.hero]);
  function handleSave(e) {
    e.preventDefault();
    ue.success("Hero settings saved (backend integration pending)");
    setIsEditing(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-5 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Hero Content" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setIsEditing((v) => !v),
          className: "button-secondary text-xs",
          "data-ocid": "admin.settings.hero.edit_button",
          children: isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
            " Cancel"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
            " Edit"
          ] })
        }
      )
    ] }),
    isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "hero-headline", className: "text-label mb-1.5 block", children: "Headline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "hero-headline",
            type: "text",
            value: headline,
            onChange: (e) => setHeadline(e.target.value),
            className: "input-premium"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "hero-subtitle", className: "text-label mb-1.5 block", children: "Subtitle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "hero-subtitle",
            type: "text",
            value: subtitle,
            onChange: (e) => setSubtitle(e.target.value),
            className: "input-premium"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "hero-cta", className: "text-label mb-1.5 block", children: "CTA Text" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "hero-cta",
              type: "text",
              value: ctaText,
              onChange: (e) => setCtaText(e.target.value),
              className: "input-premium"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "hero-cta-secondary",
              className: "text-label mb-1.5 block",
              children: "Secondary CTA"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "hero-cta-secondary",
              type: "text",
              value: ctaSecondaryText,
              onChange: (e) => setCtaSecondaryText(e.target.value),
              className: "input-premium"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "submit",
          className: "button-primary text-sm",
          "data-ocid": "admin.settings.hero.save_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
            " Save"
          ]
        }
      ) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Headline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: settings.hero.headline })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Subtitle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: settings.hero.subtitle })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "CTA" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: settings.hero.ctaText })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Secondary CTA" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: settings.hero.ctaSecondaryText })
      ] })
    ] })
  ] });
}
function WhyChooseSettings({ settings }) {
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [sectionTitle, setSectionTitle] = reactExports.useState(
    settings.whyChoose.sectionTitle
  );
  const [sectionSubtitle, setSectionSubtitle] = reactExports.useState(
    settings.whyChoose.sectionSubtitle
  );
  const [features, setFeatures] = reactExports.useState(
    settings.whyChoose.features
  );
  reactExports.useEffect(() => {
    setSectionTitle(settings.whyChoose.sectionTitle);
    setSectionSubtitle(settings.whyChoose.sectionSubtitle);
    setFeatures(settings.whyChoose.features);
  }, [settings.whyChoose]);
  function updateFeature(index, field, value) {
    setFeatures(
      (prev) => prev.map((f, i) => i === index ? { ...f, [field]: value } : f)
    );
  }
  function addFeature() {
    setFeatures((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        title: "",
        description: "",
        icon: "ShieldCheck"
      }
    ]);
  }
  function removeFeature(index) {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  }
  function handleSave(e) {
    e.preventDefault();
    ue.success("Why Choose settings saved (backend integration pending)");
    setIsEditing(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-5 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Why Choose Section" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setIsEditing((v) => !v),
          className: "button-secondary text-xs",
          "data-ocid": "admin.settings.whychoose.edit_button",
          children: isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
            " Cancel"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
            " Edit"
          ] })
        }
      )
    ] }),
    isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "whychoose-title",
              className: "text-label mb-1.5 block",
              children: "Section Title"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "whychoose-title",
              type: "text",
              value: sectionTitle,
              onChange: (e) => setSectionTitle(e.target.value),
              className: "input-premium"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "whychoose-subtitle",
              className: "text-label mb-1.5 block",
              children: "Section Subtitle"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "whychoose-subtitle",
              type: "text",
              value: sectionSubtitle,
              onChange: (e) => setSectionSubtitle(e.target.value),
              className: "input-premium"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "whychoose-features",
            className: "text-label mb-1.5 block",
            children: "Features"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: features.map((feature, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-2 p-3 rounded-xl border border-border/30 bg-secondary/30",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    value: feature.title,
                    onChange: (e) => updateFeature(index, "title", e.target.value),
                    placeholder: "Title",
                    className: "input-premium text-sm"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    value: feature.description,
                    onChange: (e) => updateFeature(index, "description", e.target.value),
                    placeholder: "Description",
                    className: "input-premium text-sm"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    value: feature.icon,
                    onChange: (e) => updateFeature(index, "icon", e.target.value),
                    placeholder: "Icon name",
                    className: "input-premium text-sm"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => removeFeature(index),
                  className: "p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth shrink-0 mt-1",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                }
              )
            ]
          },
          `${feature.id}-${index}`
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: addFeature,
            className: "button-tertiary text-xs mt-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
              " Add Feature"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "submit",
          className: "button-primary text-sm",
          "data-ocid": "admin.settings.whychoose.save_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
            " Save"
          ]
        }
      ) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: settings.whyChoose.sectionTitle })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Subtitle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: settings.whyChoose.sectionSubtitle })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-border/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-2", children: [
          "Features (",
          settings.whyChoose.features.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: settings.whyChoose.features.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "px-3 py-1 rounded-full text-xs bg-secondary text-foreground border border-border",
            children: f.title
          },
          `${f.id}-${i}`
        )) })
      ] })
    ] })
  ] });
}
function FooterSettings({ settings }) {
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [tagline, setTagline] = reactExports.useState(settings.footer.tagline);
  const [trustedText, setTrustedText] = reactExports.useState(settings.footer.trustedText);
  const [secureText, setSecureText] = reactExports.useState(settings.footer.secureText);
  const [resultsText, setResultsText] = reactExports.useState(settings.footer.resultsText);
  const [privacyLabel, setPrivacyLabel] = reactExports.useState(
    settings.footer.privacyPolicy.label
  );
  const [privacyHref, setPrivacyHref] = reactExports.useState(
    settings.footer.privacyPolicy.href
  );
  const [termsLabel, setTermsLabel] = reactExports.useState(
    settings.footer.termsOfService.label
  );
  const [termsHref, setTermsHref] = reactExports.useState(
    settings.footer.termsOfService.href
  );
  const [faqLabel, setFaqLabel] = reactExports.useState(settings.footer.faqLink.label);
  const [faqHref, setFaqHref] = reactExports.useState(settings.footer.faqLink.href);
  reactExports.useEffect(() => {
    setTagline(settings.footer.tagline);
    setTrustedText(settings.footer.trustedText);
    setSecureText(settings.footer.secureText);
    setResultsText(settings.footer.resultsText);
    setPrivacyLabel(settings.footer.privacyPolicy.label);
    setPrivacyHref(settings.footer.privacyPolicy.href);
    setTermsLabel(settings.footer.termsOfService.label);
    setTermsHref(settings.footer.termsOfService.href);
    setFaqLabel(settings.footer.faqLink.label);
    setFaqHref(settings.footer.faqLink.href);
  }, [settings.footer]);
  function handleSave(e) {
    e.preventDefault();
    ue.success("Footer settings saved (backend integration pending)");
    setIsEditing(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-5 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Footer Content" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setIsEditing((v) => !v),
          className: "button-secondary text-xs",
          "data-ocid": "admin.settings.footer.edit_button",
          children: isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
            " Cancel"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
            " Edit"
          ] })
        }
      )
    ] }),
    isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "footer-tagline",
              className: "text-label mb-1.5 block",
              children: "Tagline"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "footer-tagline",
              type: "text",
              value: tagline,
              onChange: (e) => setTagline(e.target.value),
              className: "input-premium"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "footer-trusted",
              className: "text-label mb-1.5 block",
              children: "Trusted Text"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "footer-trusted",
              type: "text",
              value: trustedText,
              onChange: (e) => setTrustedText(e.target.value),
              className: "input-premium"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "footer-secure",
              className: "text-label mb-1.5 block",
              children: "Secure Text"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "footer-secure",
              type: "text",
              value: secureText,
              onChange: (e) => setSecureText(e.target.value),
              className: "input-premium"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "footer-results",
              className: "text-label mb-1.5 block",
              children: "Results Text"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "footer-results",
              type: "text",
              value: resultsText,
              onChange: (e) => setResultsText(e.target.value),
              className: "input-premium"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "footer-links", className: "text-label mb-1.5 block", children: "Links" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: privacyLabel,
                onChange: (e) => setPrivacyLabel(e.target.value),
                placeholder: "Privacy Label",
                className: "input-premium text-sm"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: privacyHref,
                onChange: (e) => setPrivacyHref(e.target.value),
                placeholder: "Privacy URL",
                className: "input-premium text-sm"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: termsLabel,
                onChange: (e) => setTermsLabel(e.target.value),
                placeholder: "Terms Label",
                className: "input-premium text-sm"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: termsHref,
                onChange: (e) => setTermsHref(e.target.value),
                placeholder: "Terms URL",
                className: "input-premium text-sm"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: faqLabel,
                onChange: (e) => setFaqLabel(e.target.value),
                placeholder: "FAQ Label",
                className: "input-premium text-sm"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: faqHref,
                onChange: (e) => setFaqHref(e.target.value),
                placeholder: "FAQ URL",
                className: "input-premium text-sm"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "submit",
          className: "button-primary text-sm",
          "data-ocid": "admin.settings.footer.save_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
            " Save"
          ]
        }
      ) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Tagline" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: settings.footer.tagline })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Trusted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: settings.footer.trustedText })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Secure" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: settings.footer.secureText })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Results" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: settings.footer.resultsText })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-border/30 flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 rounded text-xs bg-secondary border border-border", children: settings.footer.privacyPolicy.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 rounded text-xs bg-secondary border border-border", children: settings.footer.termsOfService.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 rounded text-xs bg-secondary border border-border", children: settings.footer.faqLink.label })
      ] })
    ] })
  ] });
}
function ButtonLabelsSettings({ settings }) {
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [support24_7, setSupport24_7] = reactExports.useState(settings.buttons.support24_7);
  const [chatOnWhatsApp, setChatOnWhatsApp] = reactExports.useState(
    settings.buttons.chatOnWhatsApp
  );
  reactExports.useEffect(() => {
    setSupport24_7(settings.buttons.support24_7);
    setChatOnWhatsApp(settings.buttons.chatOnWhatsApp);
  }, [settings.buttons]);
  function handleSave(e) {
    e.preventDefault();
    ue.success("Button labels saved (backend integration pending)");
    setIsEditing(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-5 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Button Labels" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setIsEditing((v) => !v),
          className: "button-secondary text-xs",
          "data-ocid": "admin.settings.buttons.edit_button",
          children: isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
            " Cancel"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
            " Edit"
          ] })
        }
      )
    ] }),
    isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "btn-support", className: "text-label mb-1.5 block", children: "24/7 Support Label" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "btn-support",
              type: "text",
              value: support24_7,
              onChange: (e) => setSupport24_7(e.target.value),
              className: "input-premium"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "btn-whatsapp", className: "text-label mb-1.5 block", children: "Chat on WhatsApp Label" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "btn-whatsapp",
              type: "text",
              value: chatOnWhatsApp,
              onChange: (e) => setChatOnWhatsApp(e.target.value),
              className: "input-premium"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "submit",
          className: "button-primary text-sm",
          "data-ocid": "admin.settings.buttons.save_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
            " Save"
          ]
        }
      ) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "24/7 Support" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: settings.buttons.support24_7 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Chat on WhatsApp" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: settings.buttons.chatOnWhatsApp })
      ] })
    ] })
  ] });
}
export {
  AdminDashboard as default
};
