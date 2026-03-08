import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload } from 'lucide-react';
import PageTransition from '../components/PageTransition';

interface Story {
  id: string;
  name: string;
  text: string;
  image?: string;
  approved: boolean;
}

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

const Gallery = () => {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [form, setForm] = useState({ name: '', text: '', image: '' });

  useEffect(() => {
    const stored = localStorage.getItem('owl-stories');
    if (stored) setStories(JSON.parse(stored));
  }, []);

  const submitStory = (e: React.FormEvent) => {
    e.preventDefault();
    const newStory: Story = { id: Date.now().toString(), ...form, approved: false };
    const updated = [...stories, newStory];
    setStories(updated);
    localStorage.setItem('owl-stories', JSON.stringify(updated));
    setForm({ name: '', text: '', image: '' });
  };

  const approvedStories = stories.filter((s) => s.approved);

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 noise-overlay">
        <div className="container mx-auto px-6 py-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-bold text-foreground text-center"
          >
            Gallery
          </motion.h1>

          {/* Masonry Grid */}
          <div className="mt-12 columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => setLightbox(img)}
              >
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  loading="lazy"
                  className="w-full rounded-xl border border-border group-hover:border-primary/30 transition-all"
                />
              </motion.div>
            ))}
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {lightbox && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightbox(null)}
              >
                <button className="absolute top-6 right-6 text-foreground"><X size={24} /></button>
                <motion.img
                  src={lightbox}
                  alt="Gallery"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="max-w-full max-h-[80vh] rounded-2xl"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Customer Stories */}
          <section className="mt-20">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">Customer Stories</h2>

            {approvedStories.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {approvedStories.map((story, i) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 bg-card border border-border rounded-2xl rotate-[-1deg] hover:rotate-0 transition-transform shadow-lg"
                  >
                    {story.image && (
                      <img src={story.image} alt="" className="w-full h-40 object-cover rounded-lg mb-4" />
                    )}
                    <p className="text-foreground italic">"{story.text}"</p>
                    <p className="mt-3 font-mono text-xs text-primary">— {story.name}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Submit form */}
            <div className="max-w-lg mx-auto p-8 rounded-2xl bg-card border border-border">
              <h3 className="font-display text-xl font-bold text-foreground mb-4">Share Your Story</h3>
              <form onSubmit={submitStory} className="space-y-4">
                <div className="float-label-group">
                  <input
                    type="text"
                    placeholder=" "
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <label>Your Name</label>
                </div>
                <div className="float-label-group">
                  <textarea
                    placeholder=" "
                    rows={3}
                    value={form.text}
                    onChange={(e) => setForm({ ...form, text: e.target.value })}
                    required
                  />
                  <label>Your Story</label>
                </div>
                <div className="float-label-group">
                  <input
                    type="url"
                    placeholder=" "
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                  />
                  <label>Image URL (optional)</label>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-primary-foreground font-mono text-sm uppercase tracking-widest rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  <Upload size={16} /> Submit Story
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Gallery;
