import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { MapPin, Music, X, Star, CalendarDays, Check, Instagram, Facebook, Twitter, Phone, Mail, Send, Upload } from 'lucide-react';
import defaultMenuItems from '../data/menuItems.json';
import BackToTop from '../components/BackToTop';

const locations = [
  { name: 'Night Owl Hub — Harbor', address: '789 Starlight Blvd, Harbor District', mapUrl: 'https://maps.google.com' },
];

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const timeline = [
  { year: '2026', title: 'Night Owl Hub', desc: 'Founded with a vision of nocturnal fine dining.' },
];


const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];
const galleryImages = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600',
  'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600',
  'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600',
  'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600',
  'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600',
  'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=600',
];

const socials = [
  { icon: Instagram, label: 'Instagram', url: '#' },
  { icon: Facebook, label: 'Facebook', url: '#' },
  { icon: Twitter, label: 'Twitter', url: '#' },
];

interface MenuItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  rating: number;
}

interface Story {
  id: string;
  name: string;
  text: string;
  image?: string;
  approved: boolean;
}

interface Reservation {
  id: string;
  name: string;
  date: string;
  time: string;
  partySize: string;
  phone: string;
  requests: string;
}

const SectionWrapper = ({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) => (
  <section id={id} className={`min-h-screen scroll-mt-20 pt-24 ${className}`}>
    {children}
  </section>
);

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [storyForm, setStoryForm] = useState({ name: '', text: '', image: '' });
  const [submitted, setSubmitted] = useState(false);
  const [reservationForm, setReservationForm] = useState({
    name: '', date: '', time: '', partySize: '', phone: '', requests: '',
  });
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('owl-ratings');
    if (stored) setRatings(JSON.parse(stored));
    const customItems = localStorage.getItem('owl-menu-items');
    const custom: MenuItem[] = customItems ? JSON.parse(customItems) : [];
    setMenuItems([...(defaultMenuItems as MenuItem[]), ...custom]);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('owl-stories');
    if (stored) setStories(JSON.parse(stored));
  }, []);

  const rateItem = (id: string, value: number) => {
    const updated = { ...ratings, [id]: value };
    setRatings(updated);
    localStorage.setItem('owl-ratings', JSON.stringify(updated));
  };

  const getEffectiveRating = (item: MenuItem) => ratings[item.id] || item.rating;
  const filtered = activeCategory === 'All' ? menuItems : menuItems.filter((i) => i.category === activeCategory);
  const topRated = [...menuItems].sort((a, b) => getEffectiveRating(b) - getEffectiveRating(a)).slice(0, 3);
  const todaysSpecial = menuItems[0];
  const approvedStories = stories.filter((s) => s.approved);

  const submitStory = (e: React.FormEvent) => {
    e.preventDefault();
    const newStory: Story = { id: Date.now().toString(), ...storyForm, approved: false };
    const updated = [...stories, newStory];
    setStories(updated);
    localStorage.setItem('owl-stories', JSON.stringify(updated));
    setStoryForm({ name: '', text: '', image: '' });
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reservation: Reservation = { id: Date.now().toString(), ...reservationForm };
    const existing = JSON.parse(localStorage.getItem('owl-reservations') || '[]');
    localStorage.setItem('owl-reservations', JSON.stringify([...existing, reservation]));
    setSubmitted(true);
    setReservationForm({ name: '', date: '', time: '', partySize: '', phone: '', requests: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => setContactSent(false), 3000);
  };

  return (
    <main className="overflow-x-hidden">
      {/* #hero */}
      <section id="hero" className="relative min-h-screen noise-overlay overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] rounded-full opacity-20 candle-flicker"
          style={{ background: 'radial-gradient(ellipse, hsl(38 90% 55% / 0.3), transparent 70%)' }}
        />
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
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.p variants={fadeUp} className="font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground mb-4">Welcome to</motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground glow-text leading-tight">Night Owl Hub</motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-lg md:text-xl text-muted-foreground max-w-lg mx-auto font-body italic">Fine dining under the stars. Where every night tells a story.</motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setShowModal(true)} className="px-8 py-4 bg-primary text-primary-foreground font-mono text-sm uppercase tracking-widest rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20">
                <b>SET YOUR OWN MUSIC AT NIGHT OWL HUB</b>
              </button>
            </motion.div>
          </motion.div>
        </div>

        <AnimatePresence>
          {showModal && (
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="bg-card border border-border rounded-2xl p-8 max-w-lg w-full relative" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
                <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"><X size={20} /></button>
                {/* <h2 className="font-display text-2xl font-bold text-foreground mb-2">Select Your Location</h2> */}
                {/* <p className="text-sm text-muted-foreground mb-6">Choose your outlet below</p> */}
                {/* <div className="space-y-3">
                  {locations.map((loc, i) => (
                    <a key={i} href={loc.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-4 rounded-xl border border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50 transition-all card-glow">
                      <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="font-display font-semibold text-foreground">{loc.name}</p>
                        <p className="text-sm text-muted-foreground">{loc.address}</p>
                      </div>
                    </a>
                  ))}
                </div> */}
                <div className="mt-6 p-4 rounded-xl bg-muted/30 border border-border flex items-center gap-3">
                  <Music size={18} className="text-primary shrink-0" />
                  <div><a href="https://spotify.link/dKQktF44k1b">
                    <p className="text-sm font-semibold text-foreground">Join our spotify Jam 🎵</p>
                    <p className="text-xs text-muted-foreground">Hear your favorite song while eating</p></a>
                  </div>
                  <a href="https://spotify.link/dKQktF44k1b" target="_blank" rel="noopener noreferrer" className="ml-auto text-xs font-mono uppercase tracking-widest text-primary hover:underline">Listen</a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* #about session*/}
      <AboutSection />

      {/* #menu */}
      <SectionWrapper id="menu" className="noise-overlay">
        <div className="container mx-auto px-6 py-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} className="font-display text-4xl md:text-6xl font-bold text-foreground text-center">Our Menu</motion.h1>
          {todaysSpecial && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ delay: 0.2 }} className="mt-12 p-8 rounded-2xl border border-primary/30 bg-card relative overflow-hidden shimmer">
              <span className="font-mono text-xs uppercase tracking-widest text-primary">✦ Today's Special</span>
              <h2 className="font-display text-2xl font-bold text-foreground mt-2">{todaysSpecial.name}</h2>
              <p className="text-muted-foreground mt-1">{todaysSpecial.description}</p>
              <p className="font-mono text-lg text-primary mt-3">${todaysSpecial.price}</p>
            </motion.div>
          )}
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Highest Rated</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topRated.map((item, i) => (
                <div key={item.id} className="p-5 rounded-xl border border-border bg-card card-glow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs text-primary">#{i + 1}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={12} className={s <= Math.round(getEffectiveRating(item)) ? 'text-primary fill-primary' : 'text-muted-foreground'} />
                      ))}
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-foreground">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16 flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ delay: i * 0.05 }} className="p-6 rounded-2xl border border-border bg-card card-glow">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{item.category}</span>
                    <h3 className="font-display text-lg font-semibold text-foreground mt-1">{item.name}</h3>
                  </div>
                  <span className="font-mono text-primary font-semibold">${item.price}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                <div className="flex items-center gap-1 mt-4">
                  <span className="text-xs text-muted-foreground mr-2">Rate:</span>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} onClick={() => rateItem(item.id, s)}>
                      <Star size={16} className={`transition-colors cursor-pointer ${s <= (ratings[item.id] || 0) ? 'text-primary fill-primary' : 'text-muted-foreground hover:text-primary'}`} />
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* #gallery */}
      <SectionWrapper id="gallery" className="noise-overlay">
        <div className="container mx-auto px-6 py-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} className="font-display text-4xl md:text-6xl font-bold text-foreground text-center">Gallery</motion.h1>
          <div className="mt-12 columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {galleryImages.map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ delay: i * 0.08 }} className="break-inside-avoid cursor-pointer group" onClick={() => setLightbox(img)}>
                <img src={img} alt={`Gallery ${i + 1}`} loading="lazy" className="w-full rounded-xl border border-border group-hover:border-primary/30 transition-all" />
              </motion.div>
            ))}
          </div>
          <AnimatePresence>
            {lightbox && (
              <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)}>
                <button className="absolute top-6 right-6 text-foreground"><X size={24} /></button>
                <motion.img src={lightbox} alt="Gallery" initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="max-w-full max-h-[80vh] rounded-2xl" />
              </motion.div>
            )}
          </AnimatePresence>
          <section className="mt-20">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">Customer Stories</h2>
            {approvedStories.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {approvedStories.map((story, i) => (
                  <motion.div key={story.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ delay: i * 0.1 }} className="p-6 bg-card border border-border rounded-2xl rotate-[-1deg] hover:rotate-0 transition-transform shadow-lg">
                    {story.image && <img src={story.image} alt="" className="w-full h-40 object-cover rounded-lg mb-4" />}
                    <p className="text-foreground italic">&quot;{story.text}&quot;</p>
                    <p className="mt-3 font-mono text-xs text-primary">— {story.name}</p>
                  </motion.div>
                ))}
              </div>
            )}
            <div className="max-w-lg mx-auto p-8 rounded-2xl bg-card border border-border">
              <h3 className="font-display text-xl font-bold text-foreground mb-4">Share Your Story</h3>
              <form onSubmit={submitStory} className="space-y-4">
                <div className="float-label-group">
                  <input type="text" placeholder=" " value={storyForm.name} onChange={(e) => setStoryForm({ ...storyForm, name: e.target.value })} required />
                  <label>Your Name</label>
                </div>
                <div className="float-label-group">
                  <textarea placeholder=" " rows={3} value={storyForm.text} onChange={(e) => setStoryForm({ ...storyForm, text: e.target.value })} required />
                  <label>Your Story</label>
                </div>
                <div className="float-label-group">
                  <input type="url" placeholder=" " value={storyForm.image} onChange={(e) => setStoryForm({ ...storyForm, image: e.target.value })} />
                  <label>Image URL (optional)</label>
                </div>
                <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-mono text-sm uppercase tracking-widest rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                  <Upload size={16} /> Submit Story
                </button>
              </form>
            </div>
          </section>
        </div>
      </SectionWrapper>

      {/* #reservations */}
      <SectionWrapper id="reservations" className="noise-overlay">
        <div className="container mx-auto px-6 py-16 max-w-xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} className="text-center mb-12">
            <CalendarDays size={36} className="text-primary mx-auto mb-4" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">Reserve a Table</h1>
            <p className="text-muted-foreground mt-3">Let us prepare an unforgettable evening for you.</p>
          </motion.div>
          {submitted ? (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-12 rounded-2xl bg-card border border-primary/30">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Reservation Confirmed!</h2>
              <p className="text-muted-foreground mt-2">We look forward to seeing you.</p>
            </motion.div>
          ) : (
            <motion.form onSubmit={handleReservationSubmit} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ delay: 0.2 }} className="space-y-5 p-8 rounded-2xl bg-card border border-border">
              {[
                { key: 'name', label: 'Full Name', type: 'text' },
                { key: 'date', label: 'Date', type: 'date' },
                { key: 'time', label: 'Time', type: 'time' },
                { key: 'partySize', label: 'Party Size', type: 'number' },
                { key: 'phone', label: 'Phone Number', type: 'tel' },
              ].map(({ key, label, type }) => (
                <div key={key} className="float-label-group">
                  <input type={type} placeholder=" " value={reservationForm[key as keyof typeof reservationForm]} onChange={(e) => setReservationForm({ ...reservationForm, [key]: e.target.value })} required />
                  <label>{label}</label>
                </div>
              ))}
              <div className="float-label-group">
                <textarea placeholder=" " rows={3} value={reservationForm.requests} onChange={(e) => setReservationForm({ ...reservationForm, requests: e.target.value })} />
                <label>Special Requests</label>
              </div>
              <button type="submit" className="w-full py-4 bg-primary text-primary-foreground font-mono text-sm uppercase tracking-widest rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20">
                Confirm Reservation
              </button>
            </motion.form>
          )}
        </div>
      </SectionWrapper>

      {/* #contact */}
      <SectionWrapper id="contact" className="noise-overlay">
        <div className="container mx-auto px-6 py-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} className="font-display text-4xl md:text-6xl font-bold text-foreground text-center">Get in Touch</motion.h1>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-4">
                {[
                  { icon: MapPin, text: 'Night Owl Hub,Mundur, 9th Mile Road, Pudanur, Palakkad-678592, Kerala' },
                  { icon: Phone, text: '+91 6238426420' },
                  { icon: Mail, text: 'hello@nightowlhub.com' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon size={18} className="text-primary shrink-0" />
                    <span className="text-foreground">{text}</span>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {socials.map(({ icon: Icon, label, url }) => (
                    <a key={label} href={url} className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all card-glow" aria-label={label}>
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-border h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d411.3793582599517!2d76.56508641800482!3d10.839787483872438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e1!3m2!1sen!2sin!4v1773060425791!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Location"
                />
              </div>
            </div>
            <motion.form onSubmit={handleContactSubmit} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ delay: 0.2 }} className="p-8 rounded-2xl bg-card border border-border space-y-5">
              <h2 className="font-display text-2xl font-bold text-foreground">Send a Message</h2>
              {['Name', 'Email', 'Subject'].map((label) => (
                <div key={label} className="float-label-group">
                  <input type={label === 'Email' ? 'email' : 'text'} placeholder=" " required />
                  <label>{label}</label>
                </div>
              ))}
              <div className="float-label-group">
                <textarea placeholder=" " rows={4} required />
                <label>Message</label>
              </div>
              <button type="submit" className="w-full py-4 bg-primary text-primary-foreground font-mono text-sm uppercase tracking-widest rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                {contactSent ? 'Sent!' : <><Send size={16} /> Send Message</>}
              </button>
            </motion.form>
          </div>
        </div>
      </SectionWrapper>

      <BackToTop />
    </main>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

  return (
    <section id="about" ref={ref} className="min-h-screen scroll-mt-20 pt-24 noise-overlay">
      <div className="container mx-auto px-6 py-16 text-center">
        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} className="font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground mb-3">Our Story</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ delay: 0.1 }} className="font-display text-4xl md:text-6xl font-bold text-foreground">A Brief About</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.3 }} className="mt-6 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Night Owl Hub was born from a simple belief: the best conversations, the finest flavors, and the most memorable moments happen after dark. We&apos;ve crafted an atmosphere where candlelight meets culinary artistry, where every night becomes an experience worth savoring.
        </motion.p>
      </div>
      <div className="container mx-auto px-6 py-16">
        <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Our Journey</h2>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
          {timeline.map((item, i) => (
            <motion.div key={item.year} variants={fadeUp} initial="hidden" animate={isInView ? 'show' : 'hidden'} transition={{ delay: i * 0.1 }} className="relative pl-16 pb-10">
              <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-primary border-2 border-background" />
              <span className="font-mono text-xs text-primary tracking-widest">{item.year}</span>
              <h3 className="font-display text-xl font-semibold text-foreground mt-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
