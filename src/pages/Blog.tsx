import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import StoreLayout from '@/components/store/StoreLayout';
import { motion } from 'framer-motion';
import { Image } from 'lucide-react';

const Blog = () => {
  const { t } = useLanguage();
  const { blogPosts } = useStore();

  return (
    <StoreLayout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-script text-accent text-lg mb-2">{t('Stories & Tips', 'قصص ونصائح')}</p>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground">{t('Fragrance Blog', 'مدونة العطور')}</h1>
          </div>

          {blogPosts.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Image size={48} className="mx-auto mb-4 opacity-30" />
              <p>{t('No posts yet. Check back soon!', 'لا توجد مقالات بعد. تحقق مرة أخرى قريباً!')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {blogPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[4/3] overflow-hidden mb-4 bg-secondary">
                    {post.image ? (
                      <img src={post.image} alt={t(post.titleEn, post.titleAr)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image size={40} className="text-muted-foreground opacity-30" />
                      </div>
                    )}
                  </div>
                  <time className="text-xs text-muted-foreground uppercase tracking-widest">{post.date}</time>
                  <h3 className="font-heading text-lg text-foreground mt-2 mb-2 group-hover:text-accent transition-colors">
                    {t(post.titleEn, post.titleAr)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(post.excerptEn, post.excerptAr)}</p>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </StoreLayout>
  );
};

export default Blog;
