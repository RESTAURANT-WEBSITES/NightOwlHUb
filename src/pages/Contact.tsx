import { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, Send } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const socials = [
  { icon: Instagram, label: 'Instagram', url: '#' },
  { icon: Facebook, label: 'Facebook', url: '#' },
  { icon: Twitter, label: 'Twitter', url: '#' },
];

const Contact = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 noise-overlay">
        <div className="container mx-auto px-6 py-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-bold text-foreground text-center"
          >
            Get in Touch
          </motion.h1>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                {[
                  { icon: MapPin, text: '123 Midnight Ave, Downtown District' },
                  { icon: Phone, text: '+1 (555) OWL-NITE' },
                  { icon: Mail, text: 'hello@nightowlhub.com' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon size={18} className="text-primary shrink-0" />
                    <span className="text-foreground">{text}</span>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {socials.map(({ icon: Icon, label, url }) => (
                    <a
                      key={label}
                      href={url}
                      className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all card-glow"
                      aria-label={label}
                    >
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-border h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2sCity%20Hall%20Park!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) saturate(0.3)' }}
                  allowFullScreen
                  loading="lazy"
                  title="Location"
                />
              </div>
            </div>

            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl bg-card border border-border space-y-5"
            >
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
              <button
                type="submit"
                className="w-full py-4 bg-primary text-primary-foreground font-mono text-sm uppercase tracking-widest rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                {sent ? 'Sent!' : <><Send size={16} /> Send Message</>}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
