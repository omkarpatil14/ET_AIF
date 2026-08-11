import Link from "next/link";

const navLinks = [
  { label: "Philosophy", href: "/#philosophy" },
  { label: "Strategy", href: "/#strategy" },
  { label: "Risk Management", href: "/#risk" },
  { label: "Performance", href: "/#performance" },
  { label: "Team", href: "/#team" }
  // { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative pt-16 pb-8"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderTop: "0.5px solid var(--border-subtle)",
      }}
      role="contentinfo"
    >
      <div className="container-editorial">
        {/* Top row */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-16 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1.5 mb-4">
              <img 
                src="/logo.png" 
                alt="EquiTrust Logo" 
                className="h-10 w-auto object-contain rounded-sm"
              />
            </div>
            <p
              className="text-xs leading-relaxed mb-6"
              style={{ color: "var(--text-muted)", maxWidth: "220px" }}
            >
              Alternative Investment. Intelligent Hedging.
            </p>
            <p className="text-[0.6rem] tracking-widest uppercase" style={{ color: "var(--text-subtle)" }}>
              Since 2026 · Chandigarh, India
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p
              className="text-[0.6rem] font-medium tracking-widest uppercase mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              Pages
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p
              className="text-[0.6rem] font-medium tracking-widest uppercase mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              Contact
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-[0.6rem] tracking-wider uppercase mb-0.5" style={{ color: "var(--text-subtle)" }}>
                  Phone
                </p>
                <a
                  href="tel:+919577700010"
                  className="text-sm transition-colors duration-200 text-[var(--text-secondary)] hover:text-[var(--accent-emerald)]"
                >
                  +91 9577700010
                </a>
              </div>
              <div>
                <p className="text-[0.6rem] tracking-wider uppercase mb-0.5" style={{ color: "var(--text-subtle)" }}>
                  Email
                </p>
                <a
                  href="mailto:info@equitrustsolutions.com"
                  className="text-sm transition-colors duration-200 break-all text-[var(--text-secondary)] hover:text-[var(--accent-emerald)]"
                >
                  info@equitrustsolutions.com
                </a>
              </div>
              <div>
                <p className="text-[0.6rem] tracking-wider uppercase mb-0.5" style={{ color: "var(--text-subtle)" }}>
                  Address
                </p>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Sector 26, Chandigarh, India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="divider mb-6" />

        {/* Disclaimer */}
        <div className="mb-6">
          <p className="disclaimer-text leading-relaxed">
            <strong className="text-[0.65rem] font-medium" style={{ color: "var(--text-subtle)" }}>
              Important Disclaimer:{" "}
            </strong>
            The information on this website is for informational purposes only and does not
            constitute an offer or solicitation to buy or sell any security or investment product.
            Investment in alternative investment funds involves risk, including the possible loss
            of principal. Past performance, backtested results, illustrative returns, and projected
            figures presented on this website are not indicative of future results and do not
            guarantee any specific outcome. Return objectives (15–25% p.a.) are targets only and
            are not guaranteed. Performance data attributed to the ET Growth Fund (March 2025 –
            April 15, 2026) and AIF industry statistics are presented as described in EquiTrust&apos;s
            investor material and should not be independently relied upon without verification.
            Prospective investors should conduct their own due diligence and consult their financial,
            legal, and tax advisors before making any investment decision. EquiTrust operates as a
            Category III Alternative Investment Fund. Minimum investment: ₹1 Crore.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-[0.65rem]" style={{ color: "var(--text-subtle)" }}>
            © {year} EquiTrust. All rights reserved.
          </p>
          <p className="text-[0.6rem] tracking-wider" style={{ color: "var(--text-subtle)" }}>
            Category III AIF · Intelligent Hedging · India
          </p>
        </div>
      </div>
    </footer>
  );
}
