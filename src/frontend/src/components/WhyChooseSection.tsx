import { useAppSettings } from "@/hooks/useQueries";
import {
  Award,
  Clock,
  Headset,
  type LucideIcon,
  Shield,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const featureIconMap: Record<string, LucideIcon> = {
  award: Award,
  clock: Clock,
  headset: Headset,
  shield: Shield,
  star: Star,
  zap: Zap,
  expert: Award,
  support: Headset,
  trust: Shield,
  fast: Zap,
  quality: Star,
  time: Clock,
};

function getFeatureIcon(icon?: string): LucideIcon {
  if (!icon) return Star;
  const key = icon.toLowerCase().replace(/[^a-z]/g, "");
  return featureIconMap[key] || Star;
}

const defaultFeatures = [
  {
    id: "1",
    title: "Expert Guidance",
    description:
      "Our team consists of experienced IGNOU professionals who understand the curriculum inside and out.",
    icon: "award",
  },
  {
    id: "2",
    title: "24/7 Availability",
    description:
      "Get help whenever you need it. Our support team is available round the clock for all your queries.",
    icon: "clock",
  },
  {
    id: "3",
    title: "Personalized Support",
    description:
      "Every student is unique. We provide tailored solutions that match your specific academic needs.",
    icon: "headset",
  },
  {
    id: "4",
    title: "Trusted & Secure",
    description:
      "Your data and academic information are handled with the utmost confidentiality and security.",
    icon: "shield",
  },
  {
    id: "5",
    title: "Proven Results",
    description:
      "Thousands of students have achieved their academic goals with our reliable support services.",
    icon: "star",
  },
  {
    id: "6",
    title: "Fast Turnaround",
    description:
      "We understand deadlines. Our services are designed to deliver quality work within your time frame.",
    icon: "zap",
  },
];

export function WhyChooseSection() {
  const { data: appSettings } = useAppSettings();

  const settings = appSettings as unknown as {
    whyChoose?: {
      sectionTitle?: string;
      sectionSubtitle?: string;
      features?: {
        id?: string;
        title?: string;
        description?: string;
        icon?: string;
      }[];
    };
  } | null;

  const sectionTitle = settings?.whyChoose?.sectionTitle || "Why Choose VINAY?";
  const sectionSubtitle =
    settings?.whyChoose?.sectionSubtitle ||
    "We combine expertise, dedication, and personalized care to ensure your academic success at IGNOU.";
  const features =
    settings?.whyChoose?.features && settings.whyChoose.features.length > 0
      ? settings.whyChoose.features.map((f) => ({
          id: f.id || String(Math.random()),
          title: f.title || "",
          description: f.description || "",
          icon: f.icon || "star",
        }))
      : defaultFeatures;

  return (
    <section id="why-choose" className="relative py-20 px-4">
      {/* Warm glow background */}
      <div className="absolute inset-0 pointer-events-none section-warm-glow" />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 max-w-2xl mx-auto relative z-10"
      >
        <span className="text-label text-primary mb-3 block">Why Us</span>
        <h2 className="text-heading-2 mb-4">{sectionTitle}</h2>
        <p className="text-muted-foreground">{sectionSubtitle}</p>
      </motion.div>

      {/* Features grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
        {features.map((feature, index) => {
          const Icon = getFeatureIcon(feature.icon);
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <div
                className="why-choose-card h-full"
                data-ocid={`why_choose.item.${index + 1}`}
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="why-choose-icon mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
