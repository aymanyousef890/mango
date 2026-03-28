import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import StoreLayout from '@/components/store/StoreLayout';
import ProductCard from '@/components/store/ProductCard';
import { motion } from 'framer-motion';

const categories = [
  { id: 'all', en: 'All', ar: 'الكل' },
  { id: 'floral', en: 'Floral', ar: 'زهري' },
  { id: 'woody', en: 'Woody', ar: 'خشبي' },
  { id: 'citrus', en: 'Citrus', ar: 'حمضي' },
  { id: 'oriental', en: 'Oriental', ar: 'شرقي' },
];

const Shop = () => {
  const { t } = useLanguage();
  const { products } = useStore();
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCat);

  const filtered = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);

  return (
    <StoreLayout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-script text-accent text-lg mb-2">{t('Our Collection', 'مجموعتنا')}</p>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground">{t('The Shop', 'المتجر')}</h1>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 text-sm uppercase tracking-widest font-heading border transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground'
                }`}
              >
                {t(cat.en, cat.ar)}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-20">{t('No products found.', 'لا توجد منتجات.')}</p>
          )}
        </div>
      </section>
    </StoreLayout>
  );
};

export default Shop;
