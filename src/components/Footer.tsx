import { Link } from 'react-router-dom';
import OwlSVG from './OwlSVG';

const Footer = () => (
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
            {['About', 'Menu', 'Gallery', 'Reservations', 'Contact'].map((l) => (
              <Link key={l} to={`/${l.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {l}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-4">Hours</h4>
          <p className="text-sm text-muted-foreground">Mon – Sat: 6 PM – 2 AM</p>
          <p className="text-sm text-muted-foreground">Sun: 5 PM – 12 AM</p>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="font-mono text-xs text-muted-foreground">© 2026 Night Owl Hub. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
