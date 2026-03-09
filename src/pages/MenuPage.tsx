import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import defaultMenuItems from '../data/menuItems.json';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  rating: number;
}

const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('owl-ratings');
    if (stored) setRatings(JSON.parse(stored));
    const customItems = localStorage.getItem('owl-menu-items');
    const custom: MenuItem[] = customItems ? JSON.parse(customItems) : [];
    setMenuItems([...defaultMenuItems as MenuItem[], ...custom]);
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

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 noise-overlay">
        <div className="container mx-auto px-6 py-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-bold text-foreground text-center"
          >
            Our Menu
          </motion.h1>

          {/* Today's Special */}
          {todaysSpecial && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-12 p-8 rounded-2xl border border-primary/30 bg-card relative overflow-hidden shimmer"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-primary">✦ Today's Special</span>
              <h2 className="font-display text-2xl font-bold text-foreground mt-2">{todaysSpecial.name}</h2>
              <p className="text-muted-foreground mt-1">{todaysSpecial.description}</p>
              <p className="font-mono text-lg text-primary mt-3">${todaysSpecial.price}</p>
            </motion.div>
          )}

          {/* Highest Rated */}
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

          {/* Category Tabs */}
          <div className="mt-16 flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-widest transition-all ${activeCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl border border-border bg-card card-glow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{item.category}</span>
                    <h3 className="font-display text-lg font-semibold text-foreground mt-1">{item.name}</h3>
                  </div>
                  <span className="font-mono text-primary font-semibold">${item.price}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{item.description}</p>

                {/* Star rating */}
                <div className="flex items-center gap-1 mt-4">
                  <span className="text-xs text-muted-foreground mr-2">Rate:</span>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} onClick={() => rateItem(item.id, s)}>
                      <Star
                        size={16}
                        className={`transition-colors cursor-pointer ${s <= (ratings[item.id] || 0) ? 'text-primary fill-primary' : 'text-muted-foreground hover:text-primary'
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default MenuPage;
