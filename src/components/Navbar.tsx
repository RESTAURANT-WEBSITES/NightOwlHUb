import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import OwlSVG from './OwlSVG';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reservations', href: '#reservations' },
  { label: 'Contact', href: '#contact' },
];

const NAVBAR_HEIGHT = 80;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const sections = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: `-${NAVBAR_HEIGHT}px 0px -60% 0px`, threshold: 0 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  const handleMobileNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }, []);

  const handleDesktopNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isHome) return;
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-background/80 backdrop-blur-xl shadow-lg shadow-primary/5' : 'bg-transparent'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {isHome ? (
          <a href="#hero" className="flex items-center gap-2 group">
            <OwlSVG size={36} />
            <span className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              Night Owl Hub
            </span>
          </a>
        ) : (
          <Link to="/" className="flex items-center gap-2 group">
            <OwlSVG size={36} />
            <span className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              Night Owl Hub
            </span>
          </Link>
        )}

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = isHome && activeSection === link.href;
            const linkClass = `font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:text-primary ${
              isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
            }`;

            if (isHome) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleDesktopNavClick(e, link.href)}
                  className={`relative ${linkClass}`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </a>
              );
            }
            return (
              <Link key={link.href} to={`/${link.href}`} className={linkClass}>
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden fixed inset-0 top-[68px] bg-background/95 backdrop-blur-xl z-40"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-8 pt-16">
              {navLinks.map((link, i) => {
                const isActive = isHome && activeSection === link.href;
                const linkClass = `font-display text-2xl transition-colors ${
                  isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                }`;

                if (isHome) {
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMobileNavClick(link.href);
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className={linkClass}
                    >
                      {link.label}
                    </motion.a>
                  );
                }
                return (
                  <motion.div key={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                    <Link to={`/${link.href}`} className={linkClass} onClick={() => setMobileOpen(false)}>
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
