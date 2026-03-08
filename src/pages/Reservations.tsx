import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Check } from 'lucide-react';
import PageTransition from '../components/PageTransition';

interface Reservation {
  id: string;
  name: string;
  date: string;
  time: string;
  partySize: string;
  phone: string;
  requests: string;
}

const Reservations = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', date: '', time: '', partySize: '', phone: '', requests: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reservation: Reservation = { id: Date.now().toString(), ...form };
    const existing = JSON.parse(localStorage.getItem('owl-reservations') || '[]');
    localStorage.setItem('owl-reservations', JSON.stringify([...existing, reservation]));
    setSubmitted(true);
    setForm({ name: '', date: '', time: '', partySize: '', phone: '', requests: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 noise-overlay">
        <div className="container mx-auto px-6 py-16 max-w-xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <CalendarDays size={36} className="text-primary mx-auto mb-4" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">Reserve a Table</h1>
            <p className="text-muted-foreground mt-3">Let us prepare an unforgettable evening for you.</p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center p-12 rounded-2xl bg-card border border-primary/30"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Reservation Confirmed!</h2>
              <p className="text-muted-foreground mt-2">We look forward to seeing you.</p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-5 p-8 rounded-2xl bg-card border border-border"
            >
              {[
                { key: 'name', label: 'Full Name', type: 'text' },
                { key: 'date', label: 'Date', type: 'date' },
                { key: 'time', label: 'Time', type: 'time' },
                { key: 'partySize', label: 'Party Size', type: 'number' },
                { key: 'phone', label: 'Phone Number', type: 'tel' },
              ].map(({ key, label, type }) => (
                <div key={key} className="float-label-group">
                  <input
                    type={type}
                    placeholder=" "
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    required
                  />
                  <label>{label}</label>
                </div>
              ))}
              <div className="float-label-group">
                <textarea
                  placeholder=" "
                  rows={3}
                  value={form.requests}
                  onChange={(e) => setForm({ ...form, requests: e.target.value })}
                />
                <label>Special Requests</label>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-primary text-primary-foreground font-mono text-sm uppercase tracking-widest rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                Confirm Reservation
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Reservations;
