import { useContactDetails } from "@/hooks/useQueries";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";

export function ContactSection() {
  const { data: contactDetails, isLoading } = useContactDetails();

  const phone = contactDetails?.phone || "";
  const whatsapp = contactDetails?.whatsapp || "";
  const email = contactDetails?.email || "";
  const address = contactDetails?.address || "";
  const socialMedia = contactDetails?.socialMedia || [];

  return (
    <section id="contact" className="relative py-20 px-4 bg-muted/20">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 max-w-2xl mx-auto"
      >
        <span className="text-label text-primary mb-3 block">Reach Out</span>
        <h2 className="text-heading-2 mb-4">Contact Us</h2>
        <p className="text-muted-foreground">
          Reach out to us for personalized support and guidance on your IGNOU
          academic journey. We are here to help you succeed.
        </p>
      </motion.div>

      {/* Loading */}
      {isLoading && (
        <div className="max-w-xl mx-auto flex flex-wrap items-center justify-center gap-4 mb-14">
          <div className="h-11 w-32 bg-muted/40 rounded-full animate-pulse" />
          <div className="h-11 w-32 bg-muted/40 rounded-full animate-pulse" />
          <div className="h-11 w-32 bg-muted/40 rounded-full animate-pulse" />
        </div>
      )}

      {/* Contact buttons */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          {phone && (
            <a
              href={`tel:${phone}`}
              className="contact-button"
              data-ocid="contact.phone_button"
            >
              <Phone className="h-4 w-4 text-primary" />
              Phone
            </a>
          )}
          {whatsapp && (
            <a
              href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-button"
              data-ocid="contact.whatsapp_button"
            >
              <MessageCircle className="h-4 w-4 text-primary" />
              WhatsApp
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="contact-button"
              data-ocid="contact.email_button"
            >
              <Mail className="h-4 w-4 text-primary" />
              Email
            </a>
          )}
        </motion.div>
      )}

      {/* Address & Social */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl mx-auto text-center"
        >
          {address && (
            <div className="flex items-start justify-center gap-2 text-muted-foreground text-sm mb-8">
              <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>{address}</span>
            </div>
          )}

          {/* Social links */}
          {socialMedia.length > 0 && (
            <div className="flex items-center justify-center gap-4">
              {socialMedia.map((social) => (
                <a
                  key={`${social.platform}-${social.url}`}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-border bg-secondary text-muted-foreground hover:text-primary hover:border-primary/40 transition-smooth"
                  aria-label={social.platform}
                  data-ocid={`contact.social_${social.platform.toLowerCase().replace(/\s+/g, "_")}_link`}
                >
                  <span className="text-xs font-semibold">
                    {social.platform.charAt(0).toUpperCase()}
                  </span>
                </a>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </section>
  );
}
