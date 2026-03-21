import { motion } from 'framer-motion';
import { WHY_YOU_PARAGRAPHS, MARLO_QUOTE } from '../data/constants';

export default function WhyYou() {
  return (
    <section className="py-28 px-4 md:px-8" style={{ backgroundColor: '#1e2538' }}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-lg font-light text-slate-400 uppercase tracking-[0.2em] mb-16"
        >
          Why You, Actually
        </motion.h2>

        <div className="space-y-10">
          {WHY_YOU_PARAGRAPHS.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-white text-lg md:text-xl leading-relaxed font-light"
            >
              {text}
            </motion.p>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-slate-500 text-sm italic"
        >
          {MARLO_QUOTE}
        </motion.p>
      </div>
    </section>
  );
}
