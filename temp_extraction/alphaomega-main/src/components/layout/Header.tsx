import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, User, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "Our Story" },
    { href: "/landing", label: "New Launch" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-background/95 backdrop-blur-md shadow-sm"
        : "bg-transparent"
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 -ml-2 transition-colors hover:text-primary"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-xs font-medium tracking-widest uppercase transition-colors duration-300 link-underline ${isActive(link.href)
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="absolute left-1/2 transform -translate-x-1/2"
          >
            <span className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-gradient-gold">
              α &amp; Ω
            </span>
          </Link>

          {/* Right Icons: Admin, Account, Cart */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Contact Link (Desktop) */}
            <Link
              to="/contact"
              className={`hidden md:block text-xs font-medium tracking-widest uppercase transition-colors duration-300 hover:text-primary ${isActive("/contact") ? "text-primary" : "text-foreground"}`}
            >
              Contact
            </Link>

            {/* Admin Link (Desktop) */}
            <Link
              to="/admin"
              className="hidden md:flex p-2 transition-colors hover:text-primary"
              title="Admin Dashboard"
            >
              <ShieldCheck size={20} />
            </Link>

            {/* Account Link */}
            <Link
              to="/account"
              className="p-2 transition-colors hover:text-primary"
              title="My Account"
            >
              <User size={22} />
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              className="relative p-2 -mr-2 transition-colors hover:text-primary"
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 top-20 bg-background z-40 transition-all duration-500 ${isMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-2xl font-serif tracking-wide transition-all duration-500 ${isActive(link.href) ? "text-primary" : "text-foreground"
                }`}
              style={{
                transitionDelay: isMenuOpen ? `${index * 100}ms` : "0ms",
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {link.label}
            </Link>
          ))}
          {/* Mobile Extra Links */}
          <Link to="/account" className="text-xl font-serif tracking-wide text-foreground mt-4" onClick={() => setIsMenuOpen(false)}>Account</Link>
          <Link to="/admin" className="text-xl font-serif tracking-wide text-foreground" onClick={() => setIsMenuOpen(false)}>Admin</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
