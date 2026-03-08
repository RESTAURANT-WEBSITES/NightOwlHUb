import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import OwlSVG from './OwlSVG';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

const NAVBAR_HEIGHT = 120; // Increased height for vertical layout

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('#hero');
  const location = useLocation();
  const isHome = location.pathname === '/';

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
      { rootMargin: `-80px 0px -60% 0px`, threshold: 0 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isHome) return;
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-[#0d0a0e]/55 backdrop-blur-xl border-b border-amber-500/15 py-4 shadow-lg shadow-black/40"
      initial={{ y: -NAVBAR_HEIGHT }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto flex flex-col items-center gap-6">
        {/* Logo at the top */}
        {isHome ? (
          <a href="#hero" className="flex items-center gap-3 group">
            <OwlSVG size={40} />
            <span className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              Night Owl Hub
            </span>
          </a>
        ) : (
          <Link to="/" className="flex items-center gap-3 group">
            <OwlSVG size={40} />
            <span className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              Night Owl Hub
            </span>
          </Link>
        )}

        {/* Navigation links below the logo */}
        <div className="flex items-center gap-6 md:gap-10">
          {navLinks.map((link) => {
            const isActive = isHome && activeSection === link.href;
            const linkClass = `font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:text-primary ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
              }`;

            if (isHome) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative ${linkClass}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full shadow-[0_0_8px_#e8a838]"
                    />
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
      </div>
    </motion.nav>
  );
};

export default Navbar;
