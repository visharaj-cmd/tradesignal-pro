import { useAppSettings } from "@/hooks/useQueries";
import {
  BookOpen,
  GraduationCap,
  Phone,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
  const { data: appSettings } = useAppSettings();

  // Backend AppSettings doesn't have hero/whyChoose/footer/buttons fields,
  // so we gracefully fall back to professional defaults.
  const settings = appSettings as unknown as {
    hero?: {
      headline?: string;
      subtitle?: string;
      ctaText?: string;
      ctaSecondaryText?: string;
    };
  } | null;

  const headline =
    settings?.hero?.headline || "Trusted Academic Support for IGNOU Students";
  const subtitle =
    settings?.hero?.subtitle ||
    "Empowering your academic journey with reliable resources, expert guidance, and comprehensive support services tailored for IGNOU learners.";
  const ctaText = settings?.hero?.ctaText || "Explore Services";

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-[80vh] px-4 py-24 text-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage:
            "url(/assets/generated/hero-ignou-services.dim_1024x1024.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Warm top glow */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.72 0.17 70 / 0.12), transparent)",
        }}
      />

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-[1]">
        <div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full orb-drift-1"
          style={{ filter: "blur(90px)" }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 w-[450px] h-[450px] rounded-full orb-drift-2"
          style={{ filter: "blur(80px)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        {/* Badge */}
        <div className="hero-badge mb-6" data-ocid="hero.badge">
          <GraduationCap className="h-3.5 w-3.5" />
          <span>IGNOU Student Services</span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-bold text-foreground mb-5 leading-tight tracking-tight">
          <span className="block text-4xl sm:text-5xl md:text-6xl">
            {headline.split(" for ")[0] || "Trusted Academic Support"}
          </span>
          {headline.includes(" for ") && (
            <span className="block text-4xl sm:text-5xl md:text-6xl mt-1">
              for <span className="text-gradient-gold">IGNOU</span> Students
            </span>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          {subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <motion.a
            href="#services"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="button-primary inline-flex items-center gap-2"
            data-ocid="hero.explore_services_button"
          >
            <BookOpen className="h-4 w-4" />
            {ctaText}
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="button-secondary inline-flex items-center gap-2"
            data-ocid="hero.contact_button"
          >
            <Phone className="h-4 w-4" />
            Contact Us
          </motion.a>
        </div>
      </motion.div>

      {/* Trust indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative z-10 mt-14 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground"
      >
        <div className="flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-primary" />
          <span>24/7 Support</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-success" />
          <span>Expert Guidance</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5 text-primary" />
          <span>Proven Results</span>
        </div>
      </motion.div>
    </section>
  );
}
