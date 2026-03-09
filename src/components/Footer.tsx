import { Link, useLocation } from 'react-router-dom';
import OwlSVG from './OwlSVG';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reservations', href: '#reservations' },
  { label: 'Contact', href: '#contact' },
];

const Footer = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <footer className="border-t border-border bg-card/50 noise-overlay">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-3">
            <OwlSVG size={32} />
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">Night Owl Hub</h3>
              <p className="text-sm text-muted-foreground mt-1">Fine dining under the stars.</p>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-4">Navigate</h4>
            <div className="flex flex-col gap-2">
              {navItems.map(({ label, href }) =>
                isHome ? (
                  <a key={label} href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {label}
                  </a>
                ) : (
                  <Link key={label} to={`/${href}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {label}
                  </Link>
                )
              )}
            </div>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-4">Hours</h4>
            <p className="text-sm text-muted-foreground">Mon – Sat: 6 PM – 12.30 AM</p>
            <p className="text-sm text-muted-foreground">Sun: 5 PM – 12.30 AM</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="font-mono text-xs text-muted-foreground">© 2026 Night Owl Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
