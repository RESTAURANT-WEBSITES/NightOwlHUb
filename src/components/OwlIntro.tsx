import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import OwlSVG from './OwlSVG';

const OwlIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0); // 0=black, 1=eyes, 2=face, 3=stare, 4=fly, 5=done
  const [skipped, setSkipped] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (skipped) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    // Phase 0: black (300ms)
    timers.push(setTimeout(() => setPhase(1), 300));
    // Phase 1: eyes open (800ms)
    timers.push(setTimeout(() => setPhase(2), 1100));
    // Phase 2: face fade in (700ms)
    timers.push(setTimeout(() => setPhase(3), 1800));
    // Phase 3: stare with tilt (1500ms)
    timers.push(setTimeout(() => setPhase(4), 3300));
    // Phase 4: fly to corner (800ms)
    timers.push(setTimeout(() => setPhase(5), 4100));
    // Phase 5: complete
    timers.push(setTimeout(() => onComplete(), 4600));

    return () => timers.forEach(clearTimeout);
  }, [skipped, onComplete]);

  const handleSkip = () => {
    setSkipped(true);
    onComplete();
  };

  return (
    <AnimatePresence>
      {phase < 5 && !skipped && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#000' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Ambient glow behind owl */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: '60vmin',
              height: '60vmin',
              background: 'radial-gradient(circle, hsla(38, 90%, 55%, 0.08) 0%, transparent 70%)',
            }}
            animate={{
              scale: phase >= 2 ? [1, 1.05, 1] : 0,
              opacity: phase >= 2 ? 1 : 0,
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Eyes only phase */}
          {phase >= 1 && phase < 2 && (
            <motion.div className="relative flex gap-[12vmin]">
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  className="relative"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
                >
                  <div
                    className="rounded-full"
                    style={{
                      width: '14vmin',
                      height: '14vmin',
                      background: 'radial-gradient(circle, #ffb347, #e8a838 40%, #8B4513 80%)',
                      boxShadow: '0 0 40px rgba(232, 168, 56, 0.4), 0 0 80px rgba(232, 168, 56, 0.2)',
                    }}
                  >
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: '6vmin',
                        height: '6vmin',
                        background: 'radial-gradient(circle, #1a1020, #000)',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: '2vmin',
                        height: '2vmin',
                        background: 'white',
                        opacity: 0.7,
                        top: '30%',
                        left: '30%',
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Full owl face phase */}
          {phase >= 2 && phase <= 4 && (
            <motion.div
              initial={phase === 2 ? { opacity: 0, scale: 0.9 } : false}
              animate={
                phase === 4
                  ? {
                      scale: 0.08,
                      x: '-42vw',
                      y: '-44vh',
                      opacity: 1,
                      filter: ['blur(0px)', 'blur(4px)', 'blur(0px)'],
                    }
                  : phase === 3
                  ? {
                      opacity: 1,
                      scale: [1, 1.02, 1],
                      rotate: [0, -5, 5, 0],
                    }
                  : { opacity: 1, scale: 1 }
              }
              transition={
                phase === 4
                  ? { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
                  : phase === 3
                  ? { duration: 1.5, ease: 'easeInOut' }
                  : { duration: 0.7, ease: 'easeOut' }
              }
              style={{ width: '80vmin', height: '80vmin' }}
              className="flex items-center justify-center"
            >
              <OwlSVG size={800} className="w-full h-full" />
            </motion.div>
          )}

          {/* Particle trail during flight */}
          {phase === 4 && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: 4 + Math.random() * 4,
                    height: 4 + Math.random() * 4,
                    background: '#e8a838',
                  }}
                  initial={{
                    opacity: 0.8,
                    x: `${-10 + Math.random() * 20}vw`,
                    y: `${-10 + Math.random() * 20}vh`,
                  }}
                  animate={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                />
              ))}
            </>
          )}

          {/* Skip button */}
          <button
            onClick={handleSkip}
            className="absolute bottom-6 right-6 font-mono text-xs tracking-widest uppercase opacity-30 hover:opacity-60 transition-opacity"
            style={{ color: '#a08060' }}
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OwlIntro;
