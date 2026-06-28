import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { LeadCaptureModal } from "@/components/LeadCaptureModal";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { useAppSettings, useContactDetails } from "@/hooks/useQueries";
import { Headset, MessageCircle } from "lucide-react";

export default function LandingPage() {
  const { data: appSettings } = useAppSettings();
  const { data: contactDetails } = useContactDetails();

  const supportLabel =
    (appSettings as unknown as { buttons?: { support24_7?: string } })?.buttons
      ?.support24_7 || "24/7 Support";
  const chatLabel =
    (appSettings as unknown as { buttons?: { chatOnWhatsApp?: string } })
      ?.buttons?.chatOnWhatsApp || "Chat on WhatsApp";
  const whatsappNumber = contactDetails?.whatsapp || "";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <HeroSection />

      {/* Services */}
      <ServicesSection />

      {/* Why Choose */}
      <WhyChooseSection />

      {/* Contact */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-3 px-4 py-3 sm:hidden"
        style={{
          background: "oklch(var(--card) / 0.85)",
          backdropFilter: "blur(16px) saturate(1.2)",
          WebkitBackdropFilter: "blur(16px) saturate(1.2)",
          borderTop: "1px solid oklch(var(--border) / 0.3)",
          boxShadow: "0 -4px 24px oklch(0 0 0 / 0.1)",
        }}
      >
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-semibold text-xs transition-smooth"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.17 70 / 0.95) 0%, oklch(0.6 0.15 55 / 0.95) 100%)",
            color: "oklch(var(--primary-foreground))",
            boxShadow: "0 4px 16px oklch(var(--primary) / 0.35)",
          }}
          data-ocid="landing.floating_support_button"
        >
          <Headset className="h-3.5 w-3.5" />
          {supportLabel}
        </button>
        {whatsappNumber && (
          <a
            href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-semibold text-xs transition-smooth"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.17 70 / 0.95) 0%, oklch(0.6 0.15 55 / 0.95) 100%)",
              color: "oklch(var(--primary-foreground))",
              boxShadow: "0 4px 16px oklch(var(--primary) / 0.35)",
            }}
            data-ocid="landing.floating_whatsapp_button"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            {chatLabel}
          </a>
        )}
      </div>

      {/* Desktop floating buttons */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col gap-3">
        <button
          type="button"
          className="floating-action"
          data-ocid="landing.desktop_floating_support_button"
        >
          <Headset className="h-4 w-4" />
          {supportLabel}
        </button>
        {whatsappNumber && (
          <a
            href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="floating-action"
            data-ocid="landing.desktop_floating_whatsapp_button"
          >
            <MessageCircle className="h-4 w-4" />
            {chatLabel}
          </a>
        )}
      </div>

      <LeadCaptureModal />
    </div>
  );
}
