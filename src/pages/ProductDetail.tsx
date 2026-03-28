import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import { useCart } from '@/contexts/CartContext';
import StoreLayout from '@/components/store/StoreLayout';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const { products } = useStore();
  const { addItem } = useCart();

  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState(0);

  if (!product) {
    return (
      <StoreLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">{t('Product not found', 'المنتج غير موجود')}</p>
        </div>
      </StoreLayout>
    );
  }

  const currentPrice = product.sizes[selectedSize].price;

  const handleAdd = () => {
    addItem({
      id: product.id,
      nameEn: product.nameEn,
      nameAr: product.nameAr,
      price: currentPrice,
      size: `${product.sizes[selectedSize].ml}ml`,
      quantity: 1,
      image: product.image,
    });
  };

  const NoteBar = ({ label, notes }: { label: string; notes: { en: string; ar: string }[] }) => (
    <div className="flex items-center gap-3">
      <span className="text-xs uppercase tracking-widest text-muted-foreground font-heading w-16 shrink-0">{label}</span>
      <div className="flex gap-2 flex-wrap">
        {notes.map((n, i) => (
          <span key={i} className="px-3 py-1 bg-secondary text-sm text-foreground border border-border">{t(n.en, n.ar)}</span>
        ))}
      </div>
    </div>
  );

  const RatingBar = ({ label, value }: { label: string; value: number }) => (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-heading text-foreground">{value}/10</span>
      </div>
      <div className="h-1.5 bg-secondary overflow-hidden">
        <div className="h-full bg-accent transition-all duration-700" style={{ width: `${value * 10}%` }} />
      </div>
    </div>
  );

  return (
    <StoreLayout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ChevronLeft size={16} /> {t('Back to Shop', 'العودة للمتجر')}
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-secondary aspect-[3/4] overflow-hidden"
            >
              <img src={product.image} alt={t(product.nameEn, product.nameAr)} className="w-full h-full object-cover" />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col justify-center"
            >
              <p className="font-script text-accent text-sm mb-2">
                {t(product.category.charAt(0).toUpperCase() + product.category.slice(1),
                  product.category === 'floral' ? 'زهري' : product.category === 'woody' ? 'خشبي' : product.category === 'citrus' ? 'حمضي' : 'شرقي'
                )}
              </p>
              <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-4">{t(product.nameEn, product.nameAr)}</h1>
              <p className="text-muted-foreground mb-8 leading-relaxed">{t(product.descriptionEn, product.descriptionAr)}</p>

              {/* Perfume Pyramid */}
              <div className="space-y-3 mb-8">
                <h3 className="font-heading text-sm tracking-widest text-foreground mb-3">{t('Fragrance Pyramid', 'هرم العطر')}</h3>
                <NoteBar label={t('Top', 'قمة')} notes={product.topNotes} />
                <NoteBar label={t('Heart', 'قلب')} notes={product.heartNotes} />
                <NoteBar label={t('Base', 'قاعدة')} notes={product.baseNotes} />
              </div>

              {/* Ratings */}
              <div className="space-y-3 mb-8">
                <RatingBar label={t('Longevity', 'الثبات')} value={product.longevity} />
                <RatingBar label={t('Sillage', 'الانتشار')} value={product.sillage} />
              </div>

              {/* Size Selector */}
              <div className="mb-8">
                <h3 className="font-heading text-sm tracking-widest text-foreground mb-3">{t('Select Size', 'اختر الحجم')}</h3>
                <div className="flex gap-3">
                  {product.sizes.map((s, i) => (
                    <button
                      key={s.ml}
                      onClick={() => setSelectedSize(i)}
                      className={`px-6 py-3 border text-sm font-heading transition-all ${
                        selectedSize === i
                          ? 'bg-foreground text-background border-foreground'
                          : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                      }`}
                    >
                      {s.ml}ml — ${s.price}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Add */}
              <div className="flex items-center gap-6">
                <span className="font-heading text-3xl text-foreground">${currentPrice}</span>
                <button
                  onClick={handleAdd}
                  className="flex-1 bg-accent text-accent-foreground py-4 font-heading text-sm uppercase tracking-widest hover:bg-accent/90 transition-colors"
                >
                  {t('Add to Cart', 'أضف إلى السلة')}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </StoreLayout>
  );
};

export default ProductDetail;
