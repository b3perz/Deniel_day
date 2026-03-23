import { motion } from 'framer-motion';
import { WHY_YOU_PARAGRAPHS, WHY_YOU_CLOSER } from '../data/constants';
import { useApp } from '../contexts/AppContext';

const CLASS_LINES = {
  renaissance: 'You see the big picture before you see the pixels. SC needs that perspective.',
  chameleon: 'You adapt. New tools, new industry, new systems \u2014 you figure it out. SC needs that flexibility.',
  octopus: 'You juggle twelve things without dropping any. SC\'s BD workflow is exactly that chaotic and exactly that rewarding.',
};

export default function WhyYou() {
  const { selectedClass } = useApp();
  const classLine = selectedClass ? CLASS_LINES[selectedClass] : null;

  return (
    <section className="py-32 px-4 md:px-8" style={{ backgroundColor: '#1e2538' }}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-lg font-light text-slate-400 uppercase tracking-[0.2em] mb-16"
        >
          Why You
        </motion.h2>

        <div className="space-y-10">
          {WHY_YOU_PARAGRAPHS.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-white text-lg md:text-xl leading-relaxed font-light"
            >
              {text}
            </motion.p>
          ))}

          {classLine && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-teal-400 text-lg md:text-xl leading-relaxed font-light"
            >
              {classLine}
            </motion.p>
          )}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 text-slate-500 text-sm"
        >
          {WHY_YOU_CLOSER}
        </motion.p>
      </div>
    </section>
  );
}
