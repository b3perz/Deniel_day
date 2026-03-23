import { motion } from 'framer-motion';
import { FOOTER_VARIATIONS } from '../data/expansion';
import { useApp } from '../contexts/AppContext';

export default function WelcomeSection() {
  const { activePage } = useApp();
  const headline = FOOTER_VARIATIONS[activePage] || FOOTER_VARIATIONS['dossier'];

  return (
    <section className="py-28 px-4 md:px-8 bg-black text-center">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-wide mb-2">
            StructureCraft
          </h2>

          <div className="w-16 h-px bg-teal-400 mx-auto my-8" />

          <p className="text-2xl md:text-4xl font-semibold text-white mb-8">
            {headline}
          </p>

          <p className="text-slate-400 text-sm mb-12">
            Your first proposal is going to be harder than this website. But also more fun.
          </p>

          <p className="text-slate-600 text-xs">
            Built by the BD team with the same tools we use to build proposals: caffeine, Claude, and an unreasonable deadline.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
