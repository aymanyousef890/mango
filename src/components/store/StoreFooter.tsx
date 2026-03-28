import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, Mail } from 'lucide-react';

const StoreFooter = () => {
  const { t } = useLanguage();
  const { siteSettings } = useStore();

  return (
    <footer className="gradient-luxury text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-heading text-2xl mb-4 tracking-widest">MANGO</h3>
            <p className="font-script text-accent text-sm mb-4">{t('The Essence of Luxury', 'جوهر الفخامة')}</p>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              {t(
                'Handcrafted perfumes inspired by the finest ingredients from around the world.',
                'عطور مصنوعة يدوياً مستوحاة من أجود المكونات من جميع أنحاء العالم.'
              )}
            </p>
          </div>
          <div>
            <h4 className="font-heading text-sm tracking-widest mb-4">{t('Quick Links', 'روابط سريعة')}</h4>
            <nav className="flex flex-col gap-2 text-sm text-primary-foreground/60">
              <Link to="/shop" className="hover:text-accent transition-colors">{t('Shop', 'المتجر')}</Link>
              <Link to="/blog" className="hover:text-accent transition-colors">{t('Blog', 'المدونة')}</Link>
              <Link to="/contact" className="hover:text-accent transition-colors">{t('Contact', 'تواصل معنا')}</Link>
            </nav>
          </div>
          <div>
            <h4 className="font-heading text-sm tracking-widest mb-4">{t('Contact', 'تواصل معنا')}</h4>
            <div className="text-sm text-primary-foreground/60 space-y-2">
              <a href={`mailto:${siteSettings.email}`} className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail size={14} /> {siteSettings.email}
              </a>
              <a href={`tel:${siteSettings.phone}`} className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone size={14} /> {siteSettings.phone}
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-heading text-sm tracking-widest mb-4">{t('Follow Us', 'تابعنا')}</h4>
            <div className="flex gap-3">
              {siteSettings.facebook && (
                <a href={siteSettings.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-primary-foreground/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-colors">
                  <Facebook size={16} />
                </a>
              )}
              {siteSettings.instagram && (
                <a href={siteSettings.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-primary-foreground/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-colors">
                  <Instagram size={16} />
                </a>
              )}
              {siteSettings.tiktok && (
                <a href={siteSettings.tiktok} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-primary-foreground/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-colors text-xs font-bold">
                  TT
                </a>
              )}
              {siteSettings.whatsapp && (
                <a href={`https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-primary-foreground/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-colors text-xs font-bold">
                  WA
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/40">
          © 2026 Mango Perfumes. {t('All rights reserved.', 'جميع الحقوق محفوظة.')}
        </div>
      </div>
    </footer>
  );
};

export default StoreFooter;
