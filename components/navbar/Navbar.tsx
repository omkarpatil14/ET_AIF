"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "Philosophy", href: "/#philosophy" },
  { label: "Strategy", href: "/#strategy" },
  { label: "Risk", href: "/#risk" },
  { label: "Performance", href: "/#performance" },
  { label: "Team", href: "/#team" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(10, 11, 13, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "0.5px solid rgba(255,255,255,0.06)" : "0.5px solid transparent",
        }}
      >
        <div className="container-editorial">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group" aria-label="EquiTrust Home">
              <motion.div
                animate={{ scale: scrolled ? 0.92 : 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center gap-2.5"
              >
                {/* Image Logo */}
                <img
                  src="/logo.png"
                  alt="EquiTrust Logo"
                  className="h-8 w-auto sm:h-10 object-contain rounded-sm"
                />

                <div
                  className="hidden sm:block h-3.5 w-px ml-1.5"
                  style={{ backgroundColor: "var(--border-subtle)" }}
                />
                <span
                  className="hidden sm:block text-[0.6rem] font-medium tracking-[0.14em] uppercase"
                  style={{ color: "var(--text-muted)" }}
                >
                  AIF
                </span>
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Primary navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative text-sm font-medium transition-colors duration-200 group"
                    style={{
                      color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    <span className="relative">
                      {link.label}
                      <span
                        className="absolute -bottom-0.5 left-0 h-px transition-all duration-300 group-hover:w-full"
                        style={{
                          width: isActive ? "100%" : "0%",
                          backgroundColor: "var(--accent-emerald)",
                        }}
                      />
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* CTA + Mobile Menu */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="hidden lg:inline-flex items-center gap-1.5 text-sm font-medium py-2 px-4 rounded-sm transition-all duration-300 group text-[var(--text-primary)] border border-[var(--border-default)] hover:text-[var(--accent-emerald)] hover:border-[var(--accent-emerald)]"
                style={{
                  letterSpacing: "0.02em",
                }}
              >
                Investor Enquiry
                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-sm transition-colors duration-200"
                style={{ border: "0.5px solid var(--border-subtle)" }}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? (
                  <X size={16} style={{ color: "var(--text-primary)" }} />
                ) : (
                  <Menu size={16} style={{ color: "var(--text-primary)" }} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-40 lg:hidden flex flex-col"
            style={{ backgroundColor: "var(--bg-base)" }}
          >
            {/* Top bar spacing */}
            <div className="h-16" />

            <div className="flex-1 container-editorial flex flex-col justify-center">
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4, ease: "easeOut" }}
                  >
                    <Link
                      href={link.href}
                      className="block py-5 border-b group"
                      style={{
                        borderColor: "var(--border-subtle)",
                        fontSize: "clamp(1.5rem, 6vw, 2.5rem)",
                        fontFamily: "DM Serif Display, Georgia, serif",
                        color: pathname === link.href ? "var(--accent-emerald)" : "var(--text-primary)",
                      }}
                    >
                      <span className="flex items-center justify-between">
                        {link.label}
                        <ArrowUpRight
                          size={20}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: "var(--accent-emerald)" }}
                        />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mt-10"
              >
                <Link href="/contact" className="btn-primary w-full justify-center">
                  Investor Enquiry
                  <ArrowUpRight size={14} />
                </Link>
              </motion.div> */}

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-10 pt-8"
                style={{ borderTop: "0.5px solid var(--border-subtle)" }}
              >
                <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>
                  Contact
                </p>
                <a
                  href="tel:+919577700010"
                  className="block text-sm mb-1.5 transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                >
                  +91 9577700010
                </a>
                <a
                  href="mailto:shivagrover@equitrustsolutions.com"
                  className="block text-sm transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                >
                  shivagrover@equitrustsolutions.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
