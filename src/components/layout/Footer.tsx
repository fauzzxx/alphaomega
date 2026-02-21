import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-serif text-2xl md:text-3xl mb-4">
              <span className="text-primary">α</span> & <span className="text-primary">ω</span>
            </h3>
            <p className="text-navy-foreground/70 text-sm leading-relaxed max-w-md mb-6">
              Minimalist, high-quality apparel blending timeless faith, purpose, and meaning
              with contemporary fashion and modern design. Subtle, premium, spiritually inspired.
            </p>
            <div className="space-y-2 text-sm text-navy-foreground/70">
              <p>📦 Flat shipping: ₹70 | Free above ₹1,500</p>
              <p>↩️ 14-day returns</p>
              <div className="mt-4 p-3 border border-yellow-500/30 bg-yellow-500/10 rounded text-xs text-yellow-600">
                ⚠️ Manual Payment System Currently Active
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase mb-6 text-primary">
              Navigate
            </h4>
            <ul className="space-y-4">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop" },
                { href: "/about", label: "Our Story" },
                { href: "/contact", label: "Contact" },
                { href: "/cart", label: "Cart" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-navy-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase mb-6 text-primary">
              Connect
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hello@alphaandomega.co"
                  className="text-sm text-navy-foreground/70 hover:text-primary transition-colors duration-300"
                >
                  hello@alphaandomega.co
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-navy-foreground/70 hover:text-primary transition-colors duration-300"
                >
                  Send a Message
                </Link>
              </li>
            </ul>

            {/* Social */}
            <div className="flex items-center space-x-4 mt-8">
              <a
                href="#"
                className="p-2 text-navy-foreground/70 hover:text-primary transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="p-2 text-navy-foreground/70 hover:text-primary transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="mailto:hello@alphaandomega.co"
                className="p-2 text-navy-foreground/70 hover:text-primary transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-navy-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-navy-foreground/50">
              © {currentYear} Alpha & Omega. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                to="#"
                className="text-xs text-navy-foreground/50 hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-xs text-navy-foreground/50 hover:text-primary transition-colors"
              >
                Shipping Policy
              </Link>
              <Link
                to="#"
                className="text-xs text-navy-foreground/50 hover:text-primary transition-colors"
              >
                Refund Policy
              </Link>
              <Link
                to="#"
                className="text-xs text-navy-foreground/50 hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
