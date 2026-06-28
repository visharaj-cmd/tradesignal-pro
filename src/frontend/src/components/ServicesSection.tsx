import { useServices } from "@/hooks/useQueries";
import {
  BookOpen,
  ClipboardList,
  FileText,
  GraduationCap,
  HeartHandshake,
  HelpCircle,
  Library,
  Lightbulb,
  type LucideIcon,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const iconMap: Record<string, LucideIcon> = {
  clipboardlist: ClipboardList,
  clipboard: ClipboardList,
  filetext: FileText,
  file: FileText,
  graduationcap: GraduationCap,
  exam: GraduationCap,
  heart: HeartHandshake,
  heartHandshake: HeartHandshake,
  counseling: HeartHandshake,
  library: Library,
  book: BookOpen,
  study: Library,
  users: Users,
  admission: Users,
  helpcircle: HelpCircle,
  help: HelpCircle,
  lightbulb: Lightbulb,
  idea: Lightbulb,
  mail: Mail,
  email: Mail,
  map: MapPin,
  location: MapPin,
  message: MessageCircle,
  whatsapp: MessageCircle,
  phone: Phone,
  call: Phone,
  shield: Shield,
  security: Shield,
  star: Star,
  rating: Star,
  trophy: Trophy,
  award: Trophy,
  zap: Zap,
  fast: Zap,
};

function getIcon(iconName?: string): LucideIcon {
  if (!iconName) return BookOpen;
  const key = iconName.toLowerCase().replace(/[^a-z]/g, "");
  return iconMap[key] || BookOpen;
}

export function ServicesSection() {
  const { data: services, isLoading } = useServices();

  const displayServices = services && services.length > 0 ? services : [];

  return (
    <section id="services" className="relative py-20 px-4 bg-muted/20">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 max-w-2xl mx-auto"
      >
        <span className="text-label text-primary mb-3 block">
          What We Offer
        </span>
        <h2 className="text-heading-2 mb-4">Our Services</h2>
        <p className="text-muted-foreground">
          Everything you need to succeed in your IGNOU academic journey, all in
          one place.
        </p>
      </motion.div>

      {/* Loading state */}
      {isLoading && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map(() => (
            <div
              key={crypto.randomUUID()}
              className="service-card h-full min-h-[200px] animate-pulse"
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-muted/40 mb-4" />
                <div className="h-5 w-1/2 bg-muted/40 rounded mb-2" />
                <div className="h-3 w-full bg-muted/30 rounded mb-1" />
                <div className="h-3 w-3/4 bg-muted/30 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Service cards grid */}
      {!isLoading && displayServices.length > 0 && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayServices.map((service, index) => {
            const Icon = getIcon(service.icon);
            return (
              <motion.div
                key={String(service.id)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <div
                  className="service-card h-full"
                  data-ocid={`services.item.${index + 1}`}
                >
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="service-icon-bg mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && displayServices.length === 0 && (
        <div className="empty-state" data-ocid="services.empty_state">
          <div className="empty-state-icon">
            <BookOpen className="h-7 w-7" />
          </div>
          <h3 className="font-display font-semibold text-foreground text-lg">
            No services available
          </h3>
          <p className="text-muted-foreground text-sm">
            Check back soon for our full range of IGNOU support services.
          </p>
        </div>
      )}
    </section>
  );
}
