"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle, AlertCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  interest: string;
  message: string;
  honeypot: string; // spam trap
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type FormState = "idle" | "loading" | "success" | "error";

const interestOptions = [
  "Select investment interest",
  "₹1–5 Crore",
  "₹5–20 Crore",
  "₹20–50 Crore",
  "₹50 Crore+",
  "General enquiry / Information",
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    interest: "",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) newErrors.message = "A brief message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (formData.honeypot) return; // spam

    setFormState("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          interest: formData.interest,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setFormState("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.message || "Something went wrong. Please try again.");
        setFormState("error");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setFormState("error");
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding relative"
      style={{ backgroundColor: "var(--bg-elevated)" }}
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="container-editorial">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left: info */}
          <div className="lg:col-span-2">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-number mb-4"
            >
              Investor Enquiry
            </motion.p>

            <motion.h2
              id="contact-heading"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="font-display mb-6"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
              }}
            >
              Begin the Conversation.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-sm leading-relaxed mb-10"
              style={{ color: "var(--text-secondary)" }}
            >
              Accredited and institutional investors are welcome to reach out. We will respond to
              all genuine enquiries promptly and in confidence.
            </motion.p>

            {/* Contact details */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="space-y-4"
            >
              {[
                { label: "Phone", value: "+91 9577700010", href: "tel:+919577700010" },
                {
                  label: "Email",
                  value: "info@equitrustaif.com",
                  href: "mailto:info@equitrustaif.com",
                },
                {
                  label: "Website",
                  value: "www.Moneymattersbyet.com",
                  href: "http://www.Moneymattersbyet.com",
                },
                { label: "Address", value: "Sector 26, Chandigarh, India", href: undefined },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <span
                    className="text-[0.6rem] font-medium tracking-widest uppercase"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: "var(--text-secondary)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-emerald)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-16 px-8 rounded-sm"
                  style={{ border: "0.5px solid var(--border-accent)", backgroundColor: "rgba(13,143,84,0.04)" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                  >
                    <CheckCircle
                      size={40}
                      style={{ color: "var(--accent-emerald)", marginBottom: "1.5rem" }}
                    />
                  </motion.div>
                  <h3
                    className="font-display mb-3"
                    style={{ fontSize: "1.75rem", letterSpacing: "-0.015em", color: "var(--text-primary)" }}
                  >
                    Enquiry Received.
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Thank you for your interest in EquiTrust. We will be in touch shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Investor enquiry form"
                >
                  {/* Honeypot — hidden from real users */}
                  <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    {/* Name */}
                    <div className="sm:col-span-2">
                      <label htmlFor="contact-name" className="form-label">
                        Full Name <span style={{ color: "var(--accent-emerald)" }}>*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={`form-input ${errors.name ? "error" : ""}`}
                        autoComplete="name"
                        aria-required="true"
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-xs mt-1.5" style={{ color: "rgba(239,68,68,0.8)" }}>
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="form-label">
                        Email <span style={{ color: "var(--accent-emerald)" }}>*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`form-input ${errors.email ? "error" : ""}`}
                        autoComplete="email"
                        aria-required="true"
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-xs mt-1.5" style={{ color: "rgba(239,68,68,0.8)" }}>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="contact-phone" className="form-label">
                        Phone
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="form-input"
                        autoComplete="tel"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="contact-company" className="form-label">
                        Company / Organisation
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Organisation (optional)"
                        className="form-input"
                        autoComplete="organization"
                      />
                    </div>

                    {/* Investment Interest */}
                    <div>
                      <label htmlFor="contact-interest" className="form-label">
                        Investment Interest
                      </label>
                      <select
                        id="contact-interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="form-input"
                        style={{ cursor: "pointer" }}
                      >
                        {interestOptions.map((opt) => (
                          <option
                            key={opt}
                            value={opt === "Select investment interest" ? "" : opt}
                            disabled={opt === "Select investment interest"}
                            style={{ backgroundColor: "var(--bg-elevated)" }}
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="sm:col-span-2">
                      <label htmlFor="contact-message" className="form-label">
                        Message <span style={{ color: "var(--accent-emerald)" }}>*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Brief message or enquiry..."
                        rows={4}
                        className={`form-input resize-none ${errors.message ? "error" : ""}`}
                        aria-required="true"
                        aria-describedby={errors.message ? "message-error" : undefined}
                      />
                      {errors.message && (
                        <p id="message-error" className="text-xs mt-1.5" style={{ color: "rgba(239,68,68,0.8)" }}>
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Error message */}
                  {formState === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 mb-4 p-3 rounded-sm"
                      style={{ border: "0.5px solid rgba(239,68,68,0.3)", backgroundColor: "rgba(239,68,68,0.05)" }}
                    >
                      <AlertCircle size={14} style={{ color: "rgba(239,68,68,0.7)", flexShrink: 0 }} />
                      <p className="text-xs" style={{ color: "rgba(239,68,68,0.8)" }}>
                        {errorMessage}
                      </p>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="btn-primary w-full justify-center group"
                    style={{ opacity: formState === "loading" ? 0.7 : 1 }}
                    aria-busy={formState === "loading"}
                  >
                    {formState === "loading" ? (
                      <span className="flex items-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                          className="inline-block w-3.5 h-3.5 border border-t-transparent rounded-full"
                          style={{ borderColor: "rgba(255,255,255,0.4)", borderTopColor: "transparent" }}
                        />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Enquiry
                        <ArrowUpRight
                          size={14}
                          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </>
                    )}
                  </button>

                  <p className="disclaimer-text mt-4">
                    Your information is handled in confidence. This form is intended for qualified
                    investors and professional counterparties. Investment involves risk. EquiTrust
                    is a Category III AIF. This does not constitute an offer to sell securities.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
