export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export interface ServiceItem {
  id: bigint;
  title: string;
  description: string;
  icon: string;
  order: bigint;
}

export interface LeadItem {
  id: bigint;
  fullName: string;
  contactNumber: string;
  timestamp: bigint;
}

export interface SocialLink {
  url: string;
  platform: string;
}

export interface ContactDetails {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  socialMedia: SocialLink[];
}

export interface HeroContent {
  headline: string;
  subtitle: string;
  ctaText: string;
  ctaSecondaryText: string;
}

export interface WhyChooseFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface WhyChooseSection {
  sectionTitle: string;
  sectionSubtitle: string;
  features: WhyChooseFeature[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterContent {
  tagline: string;
  trustedText: string;
  secureText: string;
  resultsText: string;
  privacyPolicy: FooterLink;
  termsOfService: FooterLink;
  faqLink: FooterLink;
}

export interface ButtonLabels {
  support24_7: string;
  chatOnWhatsApp: string;
}

export interface LandingPageSettings {
  hero: HeroContent;
  whyChoose: WhyChooseSection;
  footer: FooterContent;
  buttons: ButtonLabels;
}

export type AdminRole = "superadmin" | "admin" | "none";
