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
                  href="mailto:info@equitrustaif.com"
                  className="text-sm transition-colors duration-200 break-all text-[var(--text-secondary)] hover:text-[var(--accent-emerald)]"
                >
                  info@equitrustaif.com
                </a>
              </div>
              <div>
                <p className="text-[0.6rem] tracking-wider uppercase mb-0.5" style={{ color: "var(--text-subtle)" }}>
                  Address
                </p>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Godrej Eternia, Unit No. E3G, 3rd Floor, Ind Area Chandigarh, Chandigarh, Chandigarh - 160002, India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="divider mb-6" />

        {/* Investment Disclaimer */}
        <div className="mb-6 space-y-3">
          <p className="disclaimer-text leading-relaxed">
            <strong className="text-[0.65rem] font-medium" style={{ color: "var(--text-subtle)" }}>
              *Investment Disclaimer:
            </strong>
          </p>
          <p className="disclaimer-text leading-relaxed">
            The information contained on this website is for general informational purposes only and is not intended to constitute an offer, solicitation, invitation, recommendation, or advice to invest in any fund/scheme managed or advised by the Investment Manager. The information provided should not be construed as investment, legal, tax, accounting, or other professional advice.
          </p>
          <p className="disclaimer-text leading-relaxed">
            Past performance is not indicative of future performance. Any returns, performance figures, projections, estimates, or other information relating to investments are provided for illustrative and informational purposes only and should not be relied upon as a guarantee or indication of future returns. Investments in Alternative Investment Funds (&ldquo;AIFs&rdquo;) are subject to market risks and may involve the risk of loss of principal, including the possibility of loss of the entire investment.
          </p>
          <p className="disclaimer-text leading-relaxed">
            Any investment decision should be made only after carefully reviewing the applicable Private Placement Memorandum (&ldquo;PPM&rdquo;), contribution agreement, and other relevant fund documents, and after obtaining independent professional advice, where appropriate.
          </p>
          <p className="disclaimer-text leading-relaxed">
            The information and performance data displayed on this website may be based on information available as of a particular date and may be subject to change without notice. No representation or warranty is made as to the accuracy, completeness, or reliability of such information.
          </p>
          <p className="disclaimer-text leading-relaxed">
            Investors are advised to read all scheme/fund-related documents carefully and understand the associated risks before making any investment decision.
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
