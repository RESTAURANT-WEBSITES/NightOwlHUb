import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const timeline = [
  { year: '2026', title: 'Night Owl Hub', desc: 'Founded with a vision of nocturnal fine dining.' },
];


const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

const About = () => (
  <PageTransition>
    <div className="min-h-screen pt-24 noise-overlay">
      {/* Hero */}
      <section className="container mx-auto px-6 py-16 text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground mb-3">
          Our Story
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-6xl font-bold text-foreground"
        >
          A Brief About
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Night Owl Hub was born from a simple belief: the best conversations, the finest flavors, and the most memorable
          moments happen after dark. We've crafted an atmosphere where candlelight meets culinary artistry, where every night
          becomes an experience worth savoring.
        </motion.p>
      </section>

      {/* Timeline */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Our Journey</h2>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-16 pb-10"
            >
              <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-primary border-2 border-background" />
              <span className="font-mono text-xs text-primary tracking-widest">{item.year}</span>
              <h3 className="font-display text-xl font-semibold text-foreground mt-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  </PageTransition>
);

export default About;
