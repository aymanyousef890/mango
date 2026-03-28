import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import heroPerfume from '@/assets/hero-perfume.jpg';

const HeroSection = () => {
  const { t } = useLanguage();
  const { siteSettings } = useStore();

  const bgImage = siteSettings.heroImage || heroPerfume;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <img src={bgImage} alt="Mango Perfume" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-xl"
        >
          <p className="font-script text-accent text-lg md:text-xl mb-4">
            {t(siteSettings.heroSubtitleEn, siteSettings.heroSubtitleAr)}
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-tight mb-6">
            {t(siteSettings.heroTitleEn, siteSettings.heroTitleAr)}
          </h1>
          <p className="text-primary-foreground/80 text-base md:text-lg mb-8 max-w-md">
            {t(siteSettings.heroDescriptionEn, siteSettings.heroDescriptionAr)}
          </p>
          <Link
            to="/shop"
            className="inline-block bg-accent text-accent-foreground px-10 py-4 text-sm uppercase tracking-widest font-heading hover:bg-accent/90 transition-colors"
          >
            {t('Shop Now', 'تسوق الآن')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
