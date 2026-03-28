import { Link } from 'react-router-dom';
import { ShoppingBag, Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import mangoLogo from '@/assets/mango-logo.jpg';

const StoreHeader = () => {
  const { lang, toggleLang, t } = useLanguage();
  const { totalItems, setIsOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t('Home', 'الرئيسية') },
    { to: '/shop', label: t('Shop', 'المتجر') },
    { to: '/blog', label: t('Blog', 'المدونة') },
    { to: '/contact', label: t('Contact', 'تواصل معنا') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-foreground">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link to="/" className="flex items-center gap-2">
          <img src={mangoLogo} alt="Mango" className="h-10 w-10 object-contain" />
          <span className="font-heading text-xl tracking-widest text-foreground">MANGO</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={toggleLang} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Globe size={16} />
            <span className="uppercase font-medium">{lang === 'en' ? 'AR' : 'EN'}</span>
          </button>

          <button onClick={() => setIsOpen(true)} className="relative text-foreground hover:text-accent transition-colors">
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 py-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default StoreHeader;
