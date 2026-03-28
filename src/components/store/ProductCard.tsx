import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useStore } from '@/contexts/StoreContext';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/data/products';

const ProductCard = ({ product }: { product: Product }) => {
  const { t } = useLanguage();
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      nameEn: product.nameEn,
      nameAr: product.nameAr,
      price: product.sizes[0].price,
      size: `${product.sizes[0].ml}ml`,
      quantity: 1,
      image: product.image,
    });
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-secondary aspect-[3/4] mb-4">
        <img
          src={product.image}
          alt={t(product.nameEn, product.nameAr)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 bg-foreground text-background w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-accent hover:text-accent-foreground"
        >
          <ShoppingBag size={18} />
        </button>
      </div>
      <h3 className="font-heading text-base text-foreground mb-1">
        {t(product.nameEn, product.nameAr)}
      </h3>
      <p className="text-sm text-muted-foreground font-script mb-1">
        {t(product.category, product.category === 'floral' ? 'زهري' : product.category === 'woody' ? 'خشبي' : product.category === 'citrus' ? 'حمضي' : 'شرقي')}
      </p>
      <p className="text-sm font-medium text-foreground">
        {t('From', 'من')} ${product.sizes[0].price}
      </p>
    </Link>
  );
};

export default ProductCard;
