import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Flower2, TreePine, Sun, Sparkles } from 'lucide-react';

const categories = [
  { id: 'floral', icon: Flower2, en: 'Floral', ar: 'زهري', descEn: 'Rose, Jasmine, Peony', descAr: 'ورد، ياسمين، فاوانيا' },
  { id: 'woody', icon: TreePine, en: 'Woody', ar: 'خشبي', descEn: 'Cedar, Sandalwood, Vetiver', descAr: 'أرز، صندل، فيتيفر' },
  { id: 'citrus', icon: Sun, en: 'Citrus', ar: 'حمضي', descEn: 'Lemon, Bergamot, Orange', descAr: 'ليمون، برغموت، برتقال' },
  { id: 'oriental', icon: Sparkles, en: 'Oriental', ar: 'شرقي', descEn: 'Oud, Amber, Saffron', descAr: 'عود، عنبر، زعفران' },
];

const CategoriesSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="font-script text-accent text-lg mb-2">{t('Explore', 'استكشف')}</p>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground">{t('Shop by Scent', 'تسوق حسب الرائحة')}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/shop?category=${cat.id}`}
                className="group block bg-card p-8 text-center border border-border hover:border-accent transition-all duration-300 hover:shadow-lg"
              >
                <cat.icon className="mx-auto mb-4 text-accent group-hover:scale-110 transition-transform" size={36} />
                <h3 className="font-heading text-lg text-foreground mb-1">{t(cat.en, cat.ar)}</h3>
                <p className="text-sm text-muted-foreground">{t(cat.descEn, cat.descAr)}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
