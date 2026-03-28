import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import StoreLayout from '@/components/store/StoreLayout';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();
  const { siteSettings } = useStore();

  const contactItems = [
    { icon: Mail, label: t('Email', 'البريد الإلكتروني'), value: siteSettings.email, href: `mailto:${siteSettings.email}` },
    { icon: Phone, label: t('Phone', 'الهاتف'), value: siteSettings.phone, href: `tel:${siteSettings.phone}` },
    { icon: MapPin, label: t('Address', 'العنوان'), value: t(siteSettings.addressEn, siteSettings.addressAr), href: undefined },
  ];

  const socialLinks = [
    { label: 'Facebook', icon: Facebook, url: siteSettings.facebook },
    { label: 'Instagram', icon: Instagram, url: siteSettings.instagram },
    { label: 'TikTok', icon: null, url: siteSettings.tiktok, text: 'TikTok' },
    { label: 'WhatsApp', icon: null, url: `https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}`, text: 'WhatsApp' },
  ];

  return (
    <StoreLayout>
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="font-script text-accent text-sm mb-2">{t('Get in Touch', 'تواصل معنا')}</p>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground tracking-wide">{t('Contact Us', 'اتصل بنا')}</h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-8"
            >
              {contactItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 flex items-center justify-center shrink-0">
                    <item.icon className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm tracking-widest text-foreground mb-1">{item.label}</h3>
                    {item.href ? (
                      <a href={item.href} className="text-muted-foreground hover:text-accent transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-muted-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Social Links */}
              <div>
                <h3 className="font-heading text-sm tracking-widest text-foreground mb-4">{t('Follow Us', 'تابعنا')}</h3>
                <div className="flex gap-3">
                  {socialLinks.map((s, i) => (
                    s.url && (
                      <a
                        key={i}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 border border-border flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
                      >
                        {s.icon ? <s.icon size={18} /> : <span className="text-xs font-bold">{s.text?.substring(0, 2).toUpperCase()}</span>}
                      </a>
                    )
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full h-[400px] bg-secondary border border-border overflow-hidden"
            >
              {siteSettings.mapEmbedUrl ? (
                <iframe
                  src={siteSettings.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <MapPin size={48} className="opacity-30" />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </StoreLayout>
  );
};

export default Contact;
