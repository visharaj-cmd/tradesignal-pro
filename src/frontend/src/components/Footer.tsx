import { useAppSettings } from "@/hooks/useQueries";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const platformIcons: Record<string, React.ReactNode> = {
  facebook: <Facebook className="h-4 w-4" />,
  instagram: <Instagram className="h-4 w-4" />,
  twitter: <Twitter className="h-4 w-4" />,
  x: <Twitter className="h-4 w-4" />,
  youtube: <Youtube className="h-4 w-4" />,
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { data: appSettings } = useAppSettings();

  const settings = appSettings as unknown as {
    footer?: {
      tagline?: string;
      trustedText?: string;
      secureText?: string;
      resultsText?: string;
      privacyPolicy?: { label?: string; href?: string };
      termsOfService?: { label?: string; href?: string };
      faqLink?: { label?: string; href?: string };
    };
  } | null;

  const tagline =
    settings?.footer?.tagline || "IGNOU | University Student Services";
  const trustedText = settings?.footer?.trustedText || "Trusted Service";
  const secureText = settings?.footer?.secureText || "Secure Process";
  const resultsText = settings?.footer?.resultsText || "Best Results";
  const privacyLabel =
    settings?.footer?.privacyPolicy?.label || "Privacy Policy";
  const privacyHref =
    settings?.footer?.privacyPolicy?.href || "javascript:void(0)";
  const termsLabel =
    settings?.footer?.termsOfService?.label || "Terms of Service";
  const termsHref =
    settings?.footer?.termsOfService?.href || "javascript:void(0)";
  const faqLabel = settings?.footer?.faqLink?.label || "FAQ";
  const faqHref = settings?.footer?.faqLink?.href || "javascript:void(0)";

  return (
    <footer className="w-full border-t border-border/40 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <span className="footer-badge" data-ocid="footer.trusted_badge">
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
            {trustedText}
          </span>
          <span className="footer-badge" data-ocid="footer.secure_badge">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {secureText}
          </span>
          <span className="footer-badge" data-ocid="footer.results_badge">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {resultsText}
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href={privacyHref}
              className="footer-link"
              data-ocid="footer.privacy_link"
            >
              {privacyLabel}
            </a>
            <a
              href={termsHref}
              className="footer-link"
              data-ocid="footer.terms_link"
            >
              {termsLabel}
            </a>
            <a
              href={faqHref}
              className="footer-link"
              data-ocid="footer.faq_link"
            >
              {faqLabel}
            </a>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            {["Facebook", "Instagram", "X", "YouTube"].map((platform) => {
              const key = platform.toLowerCase();
              const icon = platformIcons[key] || (
                <span className="text-xs font-semibold">
                  {platform.charAt(0)}
                </span>
              );
              return (
                <a
                  key={platform}
                  href="javascript:void(0)"
                  className="h-9 w-9 rounded-full border border-border/40 bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                  aria-label={platform}
                  data-ocid={`footer.social_${key}_link`}
                >
                  {icon}
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} {tagline}
          </p>
          <p className="text-xs text-muted-foreground">
            Built with love using{" "}
            <a
              href="https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=ignou-services"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
              data-ocid="footer.caffeine_link"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
