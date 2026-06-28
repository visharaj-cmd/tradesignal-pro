import { useAdmin } from "@/contexts/AdminContext";
import {
  useAddService,
  useAppSettings,
  useContactDetails,
  useDeleteLead,
  useDeleteService,
  useLeads,
  useServices,
  useSetContactDetails,
  useUpdateService,
} from "@/hooks/useQueries";
import type {
  ContactDetails,
  LandingPageSettings,
  ServiceItem,
  SocialLink,
  WhyChooseFeature,
} from "@/types";
import {
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Pencil,
  Phone,
  Plus,
  Save,
  Settings,
  ShieldCheck,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const defaultContact: ContactDetails = {
  phone: "+91 99999 99999",
  whatsapp: "+91 99999 99999",
  email: "support@ignou-services.com",
  address: "IGNOU Student Services Center, New Delhi, India — 110068",
  socialMedia: [
    { platform: "Facebook", url: "#" },
    { platform: "Instagram", url: "#" },
    { platform: "X", url: "#" },
    { platform: "YouTube", url: "#" },
  ],
};

const defaultAppSettings: LandingPageSettings = {
  hero: {
    headline: "IGNOU Student Support Services",
    subtitle: "Your trusted partner for all IGNOU academic needs",
    ctaText: "Get Started",
    ctaSecondaryText: "Learn More",
  },
  whyChoose: {
    sectionTitle: "Why Choose Us",
    sectionSubtitle: "We provide comprehensive support for IGNOU students",
    features: [
      {
        id: "1",
        title: "Expert Guidance",
        description: "Professional help",
        icon: "ShieldCheck",
      },
      {
        id: "2",
        title: "24/7 Support",
        description: "Always available",
        icon: "Phone",
      },
    ],
  },
  footer: {
    tagline: "IGNOU Student Services",
    trustedText: "Trusted by 10,000+ students",
    secureText: "100% Secure & Confidential",
    resultsText: "95% Success Rate",
    privacyPolicy: { label: "Privacy Policy", href: "#" },
    termsOfService: { label: "Terms of Service", href: "#" },
    faqLink: { label: "FAQ", href: "#" },
  },
  buttons: {
    support24_7: "24/7 Support",
    chatOnWhatsApp: "Chat on WhatsApp",
  },
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
  "ZoomOut",
];

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleString();
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<
    "leads" | "services" | "contact" | "settings"
  >("leads");
  const { isSuperAdmin } = useAdmin();

  const { data: services = [], isLoading: servicesLoading } = useServices();
  const servicesList = services as unknown as ServiceItem[];
  const { data: leads = [], isLoading: leadsLoading } = useLeads();
  const { data: contactData } = useContactDetails();

  const contact = contactData ?? defaultContact;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-heading-1 mb-1">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Manage leads, services, contact details, and settings for IGNOU
          Student Services.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-border/50 pb-1">
        {[
          { key: "leads" as const, label: "Leads", icon: Users },
          { key: "services" as const, label: "Services", icon: ClipboardList },
          { key: "contact" as const, label: "Contact", icon: Mail },
          { key: "settings" as const, label: "Settings", icon: Settings },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-smooth relative ${
              activeTab === key
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            data-ocid={`admin.tab_${key}`}
          >
            <Icon className="h-4 w-4" />
            {label}
            {activeTab === key && (
              <motion.div
                layoutId="admin-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "leads" && (
          <LeadsTab leads={leads} isLoading={leadsLoading} />
        )}
        {activeTab === "services" && (
          <ServicesTab services={servicesList} isLoading={servicesLoading} />
        )}
        {activeTab === "contact" && <ContactTab contact={contact} />}
        {activeTab === "settings" && (
          <SettingsTab isSuperAdmin={isSuperAdmin} />
        )}
      </motion.div>
    </div>
  );
}

/* ── Leads Tab ── */
function LeadsTab({
  leads,
  isLoading,
}: {
  leads: {
    id: bigint;
    fullName: string;
    contactNumber: string;
    timestamp: bigint;
  }[];
  isLoading: boolean;
}) {
  const deleteLead = useDeleteLead();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="empty-state" data-ocid="admin.leads.empty_state">
        <div className="empty-state-icon">
          <Users className="h-8 w-8" />
        </div>
        <h3 className="font-display font-semibold text-foreground text-lg">
          No Leads Yet
        </h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Captured leads will appear here once visitors submit their details
          through the popup.
        </p>
      </div>
    );
  }

  return (
    <div className="card-premium overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                Name
              </th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                Contact
              </th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                Date
              </th>
              <th className="text-right px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr
                key={String(lead.id)}
                className="border-b border-border/30 hover:bg-muted/20 transition-smooth"
                data-ocid={`admin.lead.item.${index + 1}`}
              >
                <td className="px-4 py-3 font-medium text-foreground">
                  {lead.fullName}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {lead.contactNumber}
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs">
                  {formatDate(lead.timestamp)}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Delete this lead?")) {
                        deleteLead.mutate(lead.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
                    aria-label="Delete lead"
                    data-ocid={`admin.lead.delete_button.${index + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Services Tab ── */
function ServicesTab({
  services,
  isLoading,
}: {
  services: ServiceItem[];
  isLoading: boolean;
}) {
  const [editing, setEditing] = useState<ServiceItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const addService = useAddService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Add button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            setIsAdding(true);
            setEditing(null);
          }}
          className="button-primary text-sm"
          data-ocid="admin.service.add_button"
        >
          <Plus className="h-4 w-4" />
          Add Service
        </button>
      </div>

      {/* Add/Edit form */}
      <AnimatePresence>
        {(isAdding || editing) && (
          <ServiceForm
            service={editing}
            onCancel={() => {
              setIsAdding(false);
              setEditing(null);
            }}
            onSave={(data) => {
              if (editing) {
                updateService.mutate(
                  { id: editing.id, ...data },
                  { onSuccess: () => setEditing(null) },
                );
              } else {
                addService.mutate(data, {
                  onSuccess: () => setIsAdding(false),
                });
              }
            }}
            isSubmitting={addService.isPending || updateService.isPending}
          />
        )}
      </AnimatePresence>

      {/* Services list */}
      {services.length === 0 ? (
        <div className="empty-state" data-ocid="admin.services.empty_state">
          <div className="empty-state-icon">
            <ClipboardList className="h-8 w-8" />
          </div>
          <h3 className="font-display font-semibold text-foreground text-lg">
            No Services
          </h3>
          <p className="text-muted-foreground text-sm">
            Add services to display them on the public site.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <div
              key={String(service.id)}
              className="service-card"
              data-ocid={`admin.service.item.${index + 1}`}
            >
              <div className="relative z-10 flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-semibold text-foreground truncate">
                    {service.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                    {service.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 font-mono">
                    Order: {String(service.order)} · Icon: {service.icon}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(service);
                      setIsAdding(false);
                    }}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth"
                    aria-label="Edit service"
                    data-ocid={`admin.service.edit_button.${index + 1}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Delete this service?")) {
                        deleteService.mutate(service.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
                    aria-label="Delete service"
                    data-ocid={`admin.service.delete_button.${index + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Service Form ── */
function ServiceForm({
  service,
  onCancel,
  onSave,
  isSubmitting,
}: {
  service: ServiceItem | null;
  onCancel: () => void;
  onSave: (data: {
    title: string;
    description: string;
    icon: string;
    order: bigint;
  }) => void;
  isSubmitting: boolean;
}) {
  const [title, setTitle] = useState(service?.title ?? "");
  const [description, setDescription] = useState(service?.description ?? "");
  const [iconName, setIconName] = useState(service?.icon ?? "ClipboardList");
  const [sortOrder, setSortOrder] = useState(String(service?.order ?? "0"));
  const [active, setActive] = useState(true);
  const [showIconDropdown, setShowIconDropdown] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  function validate() {
    const errs: { title?: string; description?: string } = {};
    if (!title.trim()) errs.title = "Title is required";
    if (!description.trim()) errs.description = "Description is required";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      title: title.trim(),
      description: description.trim(),
      icon: iconName.trim() || "ClipboardList",
      order: BigInt(sortOrder || "0"),
    });
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="card-premium p-5 space-y-4"
      onSubmit={handleSubmit}
      data-ocid="admin.service.form"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">
          {service ? "Edit Service" : "Add Service"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-smooth"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="service-title" className="text-label mb-1.5 block">
            Title
          </label>
          <input
            id="service-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-premium"
            placeholder="Service title"
          />
          {formErrors.title && (
            <p className="text-xs text-destructive mt-1">{formErrors.title}</p>
          )}
        </div>
        <div className="relative">
          <label htmlFor="service-icon" className="text-label mb-1.5 block">
            Icon Name
          </label>
          <div className="relative">
            <input
              id="service-icon"
              type="text"
              value={iconName}
              onChange={(e) => setIconName(e.target.value)}
              onFocus={() => setShowIconDropdown(true)}
              className="input-premium pr-10"
              placeholder="Select Lucide icon"
            />
            <button
              type="button"
              onClick={() => setShowIconDropdown((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-muted-foreground hover:text-foreground"
            >
              {showIconDropdown ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>
          <AnimatePresence>
            {showIconDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto card-premium p-2 space-y-1"
              >
                {LUCIDE_ICONS.filter((i) =>
                  i.toLowerCase().includes(iconName.toLowerCase()),
                ).map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => {
                      setIconName(icon);
                      setShowIconDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-smooth ${
                      iconName === icon
                        ? "bg-primary/15 text-primary"
                        : "text-foreground hover:bg-muted/30"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div>
        <label
          htmlFor="service-description"
          className="text-label mb-1.5 block"
        >
          Description
        </label>
        <textarea
          id="service-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-premium min-h-[80px] resize-y"
          placeholder="Service description"
        />
        {formErrors.description && (
          <p className="text-xs text-destructive mt-1">
            {formErrors.description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="service-order" className="text-label mb-1.5 block">
            Sort Order
          </label>
          <input
            id="service-order"
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="input-premium w-32"
            placeholder="0"
          />
        </div>
        <div className="flex items-center gap-3 pt-6">
          <input
            id="service-active"
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="w-4 h-4 rounded border-border accent-primary"
          />
          <label htmlFor="service-active" className="text-sm text-foreground">
            Active
          </label>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="button-secondary text-sm"
          data-ocid="admin.service.cancel_button"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="button-primary text-sm"
          data-ocid="admin.service.save_button"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Save className="h-4 w-4" />
              {service ? "Update" : "Save"}
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
}

/* ── Contact Tab ── */
function ContactTab({ contact }: { contact: ContactDetails }) {
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(contact.phone);
  const [whatsapp, setWhatsapp] = useState(contact.whatsapp);
  const [email, setEmail] = useState(contact.email);
  const [address, setAddress] = useState(contact.address);
  const [socialMedia, setSocialMedia] = useState<SocialLink[]>(
    contact.socialMedia.length > 0
      ? contact.socialMedia
      : defaultContact.socialMedia,
  );

  const setContactDetails = useSetContactDetails();

  useEffect(() => {
    setPhone(contact.phone);
    setWhatsapp(contact.whatsapp);
    setEmail(contact.email);
    setAddress(contact.address);
    setSocialMedia(
      contact.socialMedia.length > 0
        ? contact.socialMedia
        : defaultContact.socialMedia,
    );
  }, [contact]);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setContactDetails.mutate(
      {
        phone: phone.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim(),
        address: address.trim(),
        socialMedia: socialMedia.filter((s) => s.platform && s.url),
      },
      {
        onSuccess: () => setIsEditing(false),
      },
    );
  }

  function updateSocial(index: number, field: keyof SocialLink, value: string) {
    setSocialMedia((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
    );
  }

  function addSocial() {
    setSocialMedia((prev) => [...prev, { platform: "", url: "" }]);
  }

  function removeSocial(index: number) {
    setSocialMedia((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="button-secondary text-sm"
            data-ocid="admin.contact.edit_button"
          >
            <Pencil className="h-4 w-4" />
            Edit Contact Details
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="button-secondary text-sm"
            data-ocid="admin.contact.cancel_button"
          >
            <X className="h-4 w-4" />
            Cancel
          </button>
        )}
      </div>

      {isEditing ? (
        <motion.form
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-premium p-5 space-y-4"
          onSubmit={handleSave}
          data-ocid="admin.contact.form"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="contact-phone"
                className="text-label mb-1.5 block"
              >
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="contact-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-premium pl-10"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="contact-whatsapp"
                className="text-label mb-1.5 block"
              >
                WhatsApp
              </label>
              <div className="relative">
                <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="contact-whatsapp"
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="input-premium pl-10"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="contact-email" className="text-label mb-1.5 block">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-premium pl-10"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-address"
              className="text-label mb-1.5 block"
            >
              Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <textarea
                id="contact-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="input-premium pl-10 min-h-[60px] resize-y"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="social-media-section"
              className="text-label mb-1.5 block"
            >
              Social Media
            </label>
            <div id="social-media-section" className="space-y-2">
              {socialMedia.map((s, index) => (
                <div
                  key={`${s.platform}-${s.url}-${index}`}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={s.platform}
                    onChange={(e) =>
                      updateSocial(index, "platform", e.target.value)
                    }
                    placeholder="Platform"
                    className="input-premium flex-1"
                  />
                  <input
                    type="text"
                    value={s.url}
                    onChange={(e) => updateSocial(index, "url", e.target.value)}
                    placeholder="URL"
                    className="input-premium flex-[2]"
                  />
                  <button
                    type="button"
                    onClick={() => removeSocial(index)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addSocial}
              className="button-tertiary text-xs mt-2"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Social Link
            </button>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={setContactDetails.isPending}
              className="button-primary text-sm"
              data-ocid="admin.contact.save_button"
            >
              {setContactDetails.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </motion.form>
      ) : (
        <div className="card-premium p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm text-foreground">{contact.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="h-4 w-4 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">WhatsApp</p>
                <p className="text-sm text-foreground">{contact.whatsapp}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-primary shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm text-foreground">{contact.email}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Address</p>
              <p className="text-sm text-foreground">{contact.address}</p>
            </div>
          </div>
          {contact.socialMedia.length > 0 && (
            <div className="pt-3 border-t border-border/30">
              <p className="text-xs text-muted-foreground mb-2">Social Media</p>
              <div className="flex flex-wrap gap-2">
                {contact.socialMedia.map((s, i) => (
                  <span
                    key={`${s.platform}-${s.url}-${i}`}
                    className="px-3 py-1 rounded-full text-xs bg-secondary text-foreground border border-border"
                  >
                    {s.platform}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Settings Tab ── */
function SettingsTab({ isSuperAdmin }: { isSuperAdmin: boolean }) {
  useAppSettings();
  // Backend AppSettings (walletNetwork, walletAddress, etc.) is not LandingPageSettings.
  // Use default landing page settings for the admin editor until backend stores them.
  const appSettings: LandingPageSettings = defaultAppSettings;

  if (!isSuperAdmin) {
    return (
      <div className="card-premium p-8 text-center space-y-3">
        <ShieldCheck className="h-10 w-10 text-muted-foreground mx-auto" />
        <h3 className="font-display font-semibold text-foreground text-lg">
          Superadmin Only
        </h3>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Settings editing is restricted to superadmin users. Contact your
          administrator for access.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <HeroSettings settings={appSettings} />
      <WhyChooseSettings settings={appSettings} />
      <FooterSettings settings={appSettings} />
      <ButtonLabelsSettings settings={appSettings} />
    </div>
  );
}

function HeroSettings({ settings }: { settings: LandingPageSettings }) {
  const [isEditing, setIsEditing] = useState(false);
  const [headline, setHeadline] = useState(settings.hero.headline);
  const [subtitle, setSubtitle] = useState(settings.hero.subtitle);
  const [ctaText, setCtaText] = useState(settings.hero.ctaText);
  const [ctaSecondaryText, setCtaSecondaryText] = useState(
    settings.hero.ctaSecondaryText,
  );

  useEffect(() => {
    setHeadline(settings.hero.headline);
    setSubtitle(settings.hero.subtitle);
    setCtaText(settings.hero.ctaText);
    setCtaSecondaryText(settings.hero.ctaSecondaryText);
  }, [settings.hero]);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Hero settings saved (backend integration pending)");
    setIsEditing(false);
  }

  return (
    <div className="card-premium p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">
          Hero Content
        </h3>
        <button
          type="button"
          onClick={() => setIsEditing((v) => !v)}
          className="button-secondary text-xs"
          data-ocid="admin.settings.hero.edit_button"
        >
          {isEditing ? (
            <>
              <X className="h-3.5 w-3.5" /> Cancel
            </>
          ) : (
            <>
              <Pencil className="h-3.5 w-3.5" /> Edit
            </>
          )}
        </button>
      </div>
      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label htmlFor="hero-headline" className="text-label mb-1.5 block">
              Headline
            </label>
            <input
              id="hero-headline"
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="input-premium"
            />
          </div>
          <div>
            <label htmlFor="hero-subtitle" className="text-label mb-1.5 block">
              Subtitle
            </label>
            <input
              id="hero-subtitle"
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="input-premium"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="hero-cta" className="text-label mb-1.5 block">
                CTA Text
              </label>
              <input
                id="hero-cta"
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                className="input-premium"
              />
            </div>
            <div>
              <label
                htmlFor="hero-cta-secondary"
                className="text-label mb-1.5 block"
              >
                Secondary CTA
              </label>
              <input
                id="hero-cta-secondary"
                type="text"
                value={ctaSecondaryText}
                onChange={(e) => setCtaSecondaryText(e.target.value)}
                className="input-premium"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="button-primary text-sm"
              data-ocid="admin.settings.hero.save_button"
            >
              <Save className="h-4 w-4" /> Save
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground text-xs">Headline</span>
            <p className="text-foreground">{settings.hero.headline}</p>
          </div>
          <div>
            <span className="text-muted-foreground text-xs">Subtitle</span>
            <p className="text-foreground">{settings.hero.subtitle}</p>
          </div>
          <div>
            <span className="text-muted-foreground text-xs">CTA</span>
            <p className="text-foreground">{settings.hero.ctaText}</p>
          </div>
          <div>
            <span className="text-muted-foreground text-xs">Secondary CTA</span>
            <p className="text-foreground">{settings.hero.ctaSecondaryText}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function WhyChooseSettings({ settings }: { settings: LandingPageSettings }) {
  const [isEditing, setIsEditing] = useState(false);
  const [sectionTitle, setSectionTitle] = useState(
    settings.whyChoose.sectionTitle,
  );
  const [sectionSubtitle, setSectionSubtitle] = useState(
    settings.whyChoose.sectionSubtitle,
  );
  const [features, setFeatures] = useState<WhyChooseFeature[]>(
    settings.whyChoose.features,
  );

  useEffect(() => {
    setSectionTitle(settings.whyChoose.sectionTitle);
    setSectionSubtitle(settings.whyChoose.sectionSubtitle);
    setFeatures(settings.whyChoose.features);
  }, [settings.whyChoose]);

  function updateFeature(
    index: number,
    field: keyof WhyChooseFeature,
    value: string,
  ) {
    setFeatures((prev) =>
      prev.map((f, i) => (i === index ? { ...f, [field]: value } : f)),
    );
  }

  function addFeature() {
    setFeatures((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        title: "",
        description: "",
        icon: "ShieldCheck",
      },
    ]);
  }

  function removeFeature(index: number) {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Why Choose settings saved (backend integration pending)");
    setIsEditing(false);
  }

  return (
    <div className="card-premium p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">
          Why Choose Section
        </h3>
        <button
          type="button"
          onClick={() => setIsEditing((v) => !v)}
          className="button-secondary text-xs"
          data-ocid="admin.settings.whychoose.edit_button"
        >
          {isEditing ? (
            <>
              <X className="h-3.5 w-3.5" /> Cancel
            </>
          ) : (
            <>
              <Pencil className="h-3.5 w-3.5" /> Edit
            </>
          )}
        </button>
      </div>
      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="whychoose-title"
                className="text-label mb-1.5 block"
              >
                Section Title
              </label>
              <input
                id="whychoose-title"
                type="text"
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                className="input-premium"
              />
            </div>
            <div>
              <label
                htmlFor="whychoose-subtitle"
                className="text-label mb-1.5 block"
              >
                Section Subtitle
              </label>
              <input
                id="whychoose-subtitle"
                type="text"
                value={sectionSubtitle}
                onChange={(e) => setSectionSubtitle(e.target.value)}
                className="input-premium"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="whychoose-features"
              className="text-label mb-1.5 block"
            >
              Features
            </label>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div
                  key={`${feature.id}-${index}`}
                  className="flex items-start gap-2 p-3 rounded-xl border border-border/30 bg-secondary/30"
                >
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) =>
                        updateFeature(index, "title", e.target.value)
                      }
                      placeholder="Title"
                      className="input-premium text-sm"
                    />
                    <input
                      type="text"
                      value={feature.description}
                      onChange={(e) =>
                        updateFeature(index, "description", e.target.value)
                      }
                      placeholder="Description"
                      className="input-premium text-sm"
                    />
                    <input
                      type="text"
                      value={feature.icon}
                      onChange={(e) =>
                        updateFeature(index, "icon", e.target.value)
                      }
                      placeholder="Icon name"
                      className="input-premium text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth shrink-0 mt-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addFeature}
              className="button-tertiary text-xs mt-2"
            >
              <Plus className="h-3.5 w-3.5" /> Add Feature
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="button-primary text-sm"
              data-ocid="admin.settings.whychoose.save_button"
            >
              <Save className="h-4 w-4" /> Save
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground text-xs">Title</span>
              <p className="text-foreground">
                {settings.whyChoose.sectionTitle}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Subtitle</span>
              <p className="text-foreground">
                {settings.whyChoose.sectionSubtitle}
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-border/30">
            <p className="text-xs text-muted-foreground mb-2">
              Features ({settings.whyChoose.features.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {settings.whyChoose.features.map((f, i) => (
                <span
                  key={`${f.id}-${i}`}
                  className="px-3 py-1 rounded-full text-xs bg-secondary text-foreground border border-border"
                >
                  {f.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FooterSettings({ settings }: { settings: LandingPageSettings }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tagline, setTagline] = useState(settings.footer.tagline);
  const [trustedText, setTrustedText] = useState(settings.footer.trustedText);
  const [secureText, setSecureText] = useState(settings.footer.secureText);
  const [resultsText, setResultsText] = useState(settings.footer.resultsText);
  const [privacyLabel, setPrivacyLabel] = useState(
    settings.footer.privacyPolicy.label,
  );
  const [privacyHref, setPrivacyHref] = useState(
    settings.footer.privacyPolicy.href,
  );
  const [termsLabel, setTermsLabel] = useState(
    settings.footer.termsOfService.label,
  );
  const [termsHref, setTermsHref] = useState(
    settings.footer.termsOfService.href,
  );
  const [faqLabel, setFaqLabel] = useState(settings.footer.faqLink.label);
  const [faqHref, setFaqHref] = useState(settings.footer.faqLink.href);

  useEffect(() => {
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

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Footer settings saved (backend integration pending)");
    setIsEditing(false);
  }

  return (
    <div className="card-premium p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">
          Footer Content
        </h3>
        <button
          type="button"
          onClick={() => setIsEditing((v) => !v)}
          className="button-secondary text-xs"
          data-ocid="admin.settings.footer.edit_button"
        >
          {isEditing ? (
            <>
              <X className="h-3.5 w-3.5" /> Cancel
            </>
          ) : (
            <>
              <Pencil className="h-3.5 w-3.5" /> Edit
            </>
          )}
        </button>
      </div>
      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="footer-tagline"
                className="text-label mb-1.5 block"
              >
                Tagline
              </label>
              <input
                id="footer-tagline"
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="input-premium"
              />
            </div>
            <div>
              <label
                htmlFor="footer-trusted"
                className="text-label mb-1.5 block"
              >
                Trusted Text
              </label>
              <input
                id="footer-trusted"
                type="text"
                value={trustedText}
                onChange={(e) => setTrustedText(e.target.value)}
                className="input-premium"
              />
            </div>
            <div>
              <label
                htmlFor="footer-secure"
                className="text-label mb-1.5 block"
              >
                Secure Text
              </label>
              <input
                id="footer-secure"
                type="text"
                value={secureText}
                onChange={(e) => setSecureText(e.target.value)}
                className="input-premium"
              />
            </div>
            <div>
              <label
                htmlFor="footer-results"
                className="text-label mb-1.5 block"
              >
                Results Text
              </label>
              <input
                id="footer-results"
                type="text"
                value={resultsText}
                onChange={(e) => setResultsText(e.target.value)}
                className="input-premium"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="footer-links" className="text-label mb-1.5 block">
              Links
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <input
                  type="text"
                  value={privacyLabel}
                  onChange={(e) => setPrivacyLabel(e.target.value)}
                  placeholder="Privacy Label"
                  className="input-premium text-sm"
                />
                <input
                  type="text"
                  value={privacyHref}
                  onChange={(e) => setPrivacyHref(e.target.value)}
                  placeholder="Privacy URL"
                  className="input-premium text-sm"
                />
              </div>
              <div className="space-y-1">
                <input
                  type="text"
                  value={termsLabel}
                  onChange={(e) => setTermsLabel(e.target.value)}
                  placeholder="Terms Label"
                  className="input-premium text-sm"
                />
                <input
                  type="text"
                  value={termsHref}
                  onChange={(e) => setTermsHref(e.target.value)}
                  placeholder="Terms URL"
                  className="input-premium text-sm"
                />
              </div>
              <div className="space-y-1">
                <input
                  type="text"
                  value={faqLabel}
                  onChange={(e) => setFaqLabel(e.target.value)}
                  placeholder="FAQ Label"
                  className="input-premium text-sm"
                />
                <input
                  type="text"
                  value={faqHref}
                  onChange={(e) => setFaqHref(e.target.value)}
                  placeholder="FAQ URL"
                  className="input-premium text-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="button-primary text-sm"
              data-ocid="admin.settings.footer.save_button"
            >
              <Save className="h-4 w-4" /> Save
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-muted-foreground text-xs">Tagline</span>
              <p className="text-foreground">{settings.footer.tagline}</p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Trusted</span>
              <p className="text-foreground">{settings.footer.trustedText}</p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Secure</span>
              <p className="text-foreground">{settings.footer.secureText}</p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Results</span>
              <p className="text-foreground">{settings.footer.resultsText}</p>
            </div>
          </div>
          <div className="pt-2 border-t border-border/30 flex flex-wrap gap-2">
            <span className="px-2 py-1 rounded text-xs bg-secondary border border-border">
              {settings.footer.privacyPolicy.label}
            </span>
            <span className="px-2 py-1 rounded text-xs bg-secondary border border-border">
              {settings.footer.termsOfService.label}
            </span>
            <span className="px-2 py-1 rounded text-xs bg-secondary border border-border">
              {settings.footer.faqLink.label}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function ButtonLabelsSettings({ settings }: { settings: LandingPageSettings }) {
  const [isEditing, setIsEditing] = useState(false);
  const [support24_7, setSupport24_7] = useState(settings.buttons.support24_7);
  const [chatOnWhatsApp, setChatOnWhatsApp] = useState(
    settings.buttons.chatOnWhatsApp,
  );

  useEffect(() => {
    setSupport24_7(settings.buttons.support24_7);
    setChatOnWhatsApp(settings.buttons.chatOnWhatsApp);
  }, [settings.buttons]);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Button labels saved (backend integration pending)");
    setIsEditing(false);
  }

  return (
    <div className="card-premium p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">
          Button Labels
        </h3>
        <button
          type="button"
          onClick={() => setIsEditing((v) => !v)}
          className="button-secondary text-xs"
          data-ocid="admin.settings.buttons.edit_button"
        >
          {isEditing ? (
            <>
              <X className="h-3.5 w-3.5" /> Cancel
            </>
          ) : (
            <>
              <Pencil className="h-3.5 w-3.5" /> Edit
            </>
          )}
        </button>
      </div>
      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="btn-support" className="text-label mb-1.5 block">
                24/7 Support Label
              </label>
              <input
                id="btn-support"
                type="text"
                value={support24_7}
                onChange={(e) => setSupport24_7(e.target.value)}
                className="input-premium"
              />
            </div>
            <div>
              <label htmlFor="btn-whatsapp" className="text-label mb-1.5 block">
                Chat on WhatsApp Label
              </label>
              <input
                id="btn-whatsapp"
                type="text"
                value={chatOnWhatsApp}
                onChange={(e) => setChatOnWhatsApp(e.target.value)}
                className="input-premium"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="button-primary text-sm"
              data-ocid="admin.settings.buttons.save_button"
            >
              <Save className="h-4 w-4" /> Save
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground text-xs">24/7 Support</span>
            <p className="text-foreground">{settings.buttons.support24_7}</p>
          </div>
          <div>
            <span className="text-muted-foreground text-xs">
              Chat on WhatsApp
            </span>
            <p className="text-foreground">{settings.buttons.chatOnWhatsApp}</p>
          </div>
        </div>
      )}
    </div>
  );
}
