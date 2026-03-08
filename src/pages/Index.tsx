import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Music, X } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const locations = [
  { name: 'Night Owl Hub — Downtown', address: '123 Midnight Ave, Downtown', mapUrl: 'https://maps.google.com' },
  { name: 'Night Owl Hub — Westside', address: '456 Amber Lane, Westside', mapUrl: 'https://maps.google.com' },
  { name: 'Night Owl Hub — Harbor', address: '789 Starlight Blvd, Harbor District', mapUrl: 'https://maps.google.com' },
];

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Index = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <PageTransition>
      <div className="relative min-h-screen noise-overlay overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] rounded-full opacity-20 candle-flicker"
          style={{
            background: 'radial-gradient(ellipse, hsl(38 90% 55% / 0.3), transparent 70%)',
          }}
        />

        {/* Bokeh circles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bokeh-circle"
            style={{
              width: 30 + i * 20,
              height: 30 + i * 20,
              top: `${15 + i * 12}%`,
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.p variants={fadeUp} className="font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground mb-4">
              Welcome to
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground glow-text leading-tight"
            >
              Night Owl Hub
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-lg md:text-xl text-muted-foreground max-w-lg mx-auto font-body italic">
              Fine dining under the stars. Where every night tells a story.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowModal(true)}
                className="px-8 py-4 bg-primary text-primary-foreground font-mono text-sm uppercase tracking-widest rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                Currently at the restaurant?
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Location Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-card border border-border rounded-2xl p-8 max-w-lg w-full relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={20} />
                </button>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">Select Your Location</h2>
                <p className="text-sm text-muted-foreground mb-6">Choose your outlet below</p>

                <div className="space-y-3">
                  {locations.map((loc, i) => (
                    <a
                      key={i}
                      href={loc.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-4 rounded-xl border border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50 transition-all card-glow"
                    >
                      <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="font-display font-semibold text-foreground">{loc.name}</p>
                        <p className="text-sm text-muted-foreground">{loc.address}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Spotify bar */}
                <div className="mt-6 p-4 rounded-xl bg-muted/30 border border-border flex items-center gap-3">
                  <Music size={18} className="text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Now Playing 🎵</p>
                    <p className="text-xs text-muted-foreground">Hear your favorite song while eating</p>
                  </div>
                  <a
                    href="https://open.spotify.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-xs font-mono uppercase tracking-widest text-primary hover:underline"
                  >
                    Listen
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Index;
