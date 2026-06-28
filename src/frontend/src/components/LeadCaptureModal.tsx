import { useSubmitLead } from "@/hooks/useQueries";
import { Phone, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const LEAD_CAPTURE_KEY = "leadCaptured";

export function LeadCaptureModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [errors, setErrors] = useState<{
    fullName?: string;
    contactNumber?: string;
  }>({});

  const submitLead = useSubmitLead();

  useEffect(() => {
    const alreadyCaptured = localStorage.getItem(LEAD_CAPTURE_KEY);
    if (!alreadyCaptured) {
      const timer = setTimeout(() => setIsOpen(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  function validate(): boolean {
    const newErrors: { fullName?: string; contactNumber?: string } = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = "Please enter your full name";
    }
    if (!contactNumber.trim() || contactNumber.trim().length < 6) {
      newErrors.contactNumber = "Please enter a valid contact number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    submitLead.mutate(
      { fullName: fullName.trim(), contactNumber: contactNumber.trim() },
      {
        onSuccess: () => {
          localStorage.setItem(LEAD_CAPTURE_KEY, "true");
          setIsOpen(false);
        },
      },
    );
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="modal-backdrop flex items-center justify-center px-4"
          data-ocid="lead_capture.modal"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="card-modal w-full max-w-md p-6 relative"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-smooth"
              aria-label="Close modal"
              data-ocid="lead_capture.close_button"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="text-label text-primary mb-2 block">
                Get Started
              </span>
              <h3 className="font-display font-semibold text-foreground text-xl mb-1">
                Connect With Us
              </h3>
              <p className="text-muted-foreground text-sm">
                Leave your details and our team will reach out to assist you
                with your IGNOU journey.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="lead-fullname"
                  className="text-label mb-1.5 block"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="lead-fullname"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName)
                        setErrors((p) => ({ ...p, fullName: undefined }));
                    }}
                    placeholder="Enter your full name"
                    className="input-premium pl-10"
                    data-ocid="lead_capture.full_name_input"
                  />
                </div>
                {errors.fullName && (
                  <p
                    className="text-xs text-destructive mt-1.5"
                    data-ocid="lead_capture.full_name.field_error"
                  >
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lead-contact"
                  className="text-label mb-1.5 block"
                >
                  Contact Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="lead-contact"
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => {
                      setContactNumber(e.target.value);
                      if (errors.contactNumber)
                        setErrors((p) => ({ ...p, contactNumber: undefined }));
                    }}
                    placeholder="Enter your contact number"
                    className="input-premium pl-10"
                    data-ocid="lead_capture.contact_number_input"
                  />
                </div>
                {errors.contactNumber && (
                  <p
                    className="text-xs text-destructive mt-1.5"
                    data-ocid="lead_capture.contact_number.field_error"
                  >
                    {errors.contactNumber}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitLead.isPending}
                className="button-primary w-full mt-2"
                data-ocid="lead_capture.submit_button"
              >
                {submitLead.isPending ? "Submitting..." : "Submit Details"}
              </button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Your information is safe with us. We respect your privacy.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
