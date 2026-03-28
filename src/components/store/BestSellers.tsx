import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const BestSellers = () => {
  const { t, dir } = useLanguage();
  const { products } = useStore();
  const bestSellers = products.filter(p => p.isBestSeller);
  const [startIdx, setStartIdx] = useState(0);
  const visible = 4;

  const next = () => setStartIdx(i => Math.min(i + 1, bestSellers.length - visible));
  const prev = () => setStartIdx(i => Math.max(i - 1, 0));

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="font-script text-accent text-lg mb-2">{t('Our Collection', 'مجموعتنا')}</p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground">{t('Best Sellers', 'الأكثر مبيعاً')}</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={prev} disabled={startIdx === 0} className="w-10 h-10 border border-border flex items-center justify-center hover:bg-secondary disabled:opacity-30 transition-colors">
              {dir === 'ltr' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
            <button onClick={next} disabled={startIdx >= bestSellers.length - visible} className="w-10 h-10 border border-border flex items-center justify-center hover:bg-secondary disabled:opacity-30 transition-colors">
              {dir === 'ltr' ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 overflow-hidden">
          {bestSellers.slice(startIdx, startIdx + visible).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
