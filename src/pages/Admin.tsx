import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, LogOut, Plus, Eye, EyeOff, Trash2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import PageTransition from '../components/PageTransition';

interface Reservation {
  id: string; name: string; date: string; time: string; partySize: string; phone: string; requests: string;
}
interface Story {
  id: string; name: string; text: string; image?: string; approved: boolean;
}

const Admin = () => {
  const { isAdmin, login, logout } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'menu' | 'reservations' | 'stories'>('menu');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [menuForm, setMenuForm] = useState({ name: '', description: '', image: '', price: '', category: 'Starters' });

  useEffect(() => {
    setReservations(JSON.parse(localStorage.getItem('owl-reservations') || '[]'));
    setStories(JSON.parse(localStorage.getItem('owl-stories') || '[]'));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(password)) setError('Invalid password');
  };

  const addMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    const items = JSON.parse(localStorage.getItem('owl-menu-items') || '[]');
    items.push({ id: Date.now().toString(), ...menuForm, price: Number(menuForm.price), rating: 0 });
    localStorage.setItem('owl-menu-items', JSON.stringify(items));
    setMenuForm({ name: '', description: '', image: '', price: '', category: 'Starters' });
  };

  const toggleStory = (id: string) => {
    const updated = stories.map((s) => s.id === id ? { ...s, approved: !s.approved } : s);
    setStories(updated);
    localStorage.setItem('owl-stories', JSON.stringify(updated));
  };

  const deleteReservation = (id: string) => {
    const updated = reservations.filter((r) => r.id !== id);
    setReservations(updated);
    localStorage.setItem('owl-reservations', JSON.stringify(updated));
  };

  if (!isAdmin) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center noise-overlay px-4">
          <motion.form
            onSubmit={handleLogin}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-2xl bg-card border border-border max-w-sm w-full text-center"
          >
            <Lock size={32} className="text-primary mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold text-foreground mb-6">Admin Login</h1>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Enter password"
              className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {error && <p className="text-destructive text-sm mt-2">{error}</p>}
            <button type="submit" className="w-full mt-4 py-3 bg-primary text-primary-foreground font-mono text-sm uppercase tracking-widest rounded-lg hover:bg-primary/90 transition-all">
              Enter
            </button>
          </motion.form>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 noise-overlay">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">Admin Panel</h1>
            <button onClick={logout} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-mono text-xs uppercase tracking-widest">
              <LogOut size={16} /> Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            {(['menu', 'reservations', 'stories'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-widest transition-all ${
                  tab === t ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === 'menu' && (
            <form onSubmit={addMenuItem} className="p-6 rounded-2xl bg-card border border-border space-y-4 max-w-lg">
              <h2 className="font-display text-xl font-bold text-foreground">Add Menu Item</h2>
              {[
                { key: 'name', label: 'Name', type: 'text' },
                { key: 'description', label: 'Description', type: 'text' },
                { key: 'image', label: 'Image URL', type: 'url' },
                { key: 'price', label: 'Price', type: 'number' },
              ].map(({ key, label, type }) => (
                <div key={key} className="float-label-group">
                  <input
                    type={type}
                    placeholder=" "
                    value={menuForm[key as keyof typeof menuForm]}
                    onChange={(e) => setMenuForm({ ...menuForm, [key]: e.target.value })}
                    required={key !== 'image'}
                  />
                  <label>{label}</label>
                </div>
              ))}
              <select
                value={menuForm.category}
                onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground"
              >
                {['Starters', 'Mains', 'Desserts', 'Drinks'].map((c) => <option key={c}>{c}</option>)}
              </select>
              <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-mono text-sm uppercase tracking-widest rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                <Plus size={16} /> Add Item
              </button>
            </form>
          )}

          {tab === 'reservations' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {['Name', 'Date', 'Time', 'Party', 'Phone', 'Requests', ''].map((h) => (
                      <th key={h} className="text-left py-3 px-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((r) => (
                    <tr key={r.id} className="border-b border-border/50">
                      <td className="py-3 px-3 text-foreground">{r.name}</td>
                      <td className="py-3 px-3 text-foreground">{r.date}</td>
                      <td className="py-3 px-3 text-foreground">{r.time}</td>
                      <td className="py-3 px-3 text-foreground">{r.partySize}</td>
                      <td className="py-3 px-3 text-foreground">{r.phone}</td>
                      <td className="py-3 px-3 text-muted-foreground">{r.requests || '—'}</td>
                      <td className="py-3 px-3">
                        <button onClick={() => deleteReservation(r.id)} className="text-destructive hover:text-destructive/80"><Trash2 size={14} /></button>
                      </td>
                    </tr>
                  ))}
                  {reservations.length === 0 && (
                    <tr><td colSpan={7} className="py-8 text-center text-muted-foreground">No reservations yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'stories' && (
            <div className="space-y-3">
              {stories.length === 0 && <p className="text-muted-foreground">No stories submitted yet.</p>}
              {stories.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                  <div>
                    <p className="font-semibold text-foreground">{s.name}</p>
                    <p className="text-sm text-muted-foreground">{s.text}</p>
                  </div>
                  <button
                    onClick={() => toggleStory(s.id)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg font-mono text-xs uppercase tracking-widest transition-all ${
                      s.approved ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {s.approved ? <Eye size={14} /> : <EyeOff size={14} />}
                    {s.approved ? 'Visible' : 'Hidden'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Admin;
