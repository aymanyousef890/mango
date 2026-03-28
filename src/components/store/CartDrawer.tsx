import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const CartDrawer = () => {
  const { t } = useLanguage();
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleProceedToCheckout = () => {
    setShowCheckoutForm(true);
    setFormError('');
  };

  const handleCheckout = async () => {
    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) {
      setFormError(t('Please fill in all fields', 'يرجى ملء جميع الحقول'));
      return;
    }

    setSubmitting(true);
    const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`;

    const { error } = await supabase.from('orders').insert({
      order_number: orderNumber,
      customer_name: customerName.trim(),
      email: customerEmail.trim(),
      phone: customerPhone.trim(),
      items: items.map(i => ({ name: `${t(i.nameEn, i.nameAr)} ${i.size}`, qty: i.quantity, price: i.price })) as any,
      total: subtotal,
      status: 'pending',
    });

    setSubmitting(false);

    if (error) {
      setFormError(t('Something went wrong. Please try again.', 'حدث خطأ. حاول مرة أخرى.'));
      return;
    }

    setShowSuccess(true);
    setTimeout(() => {
      clearCart();
      setShowSuccess(false);
      setShowCheckoutForm(false);
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      setIsOpen(false);
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-foreground/40" onClick={() => setIsOpen(false)} />
      <div className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-background shadow-2xl animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading text-xl text-foreground">
            {showCheckoutForm ? t('Checkout', 'إتمام الشراء') : t('Shopping Cart', 'سلة التسوق')}
          </h2>
          <button onClick={() => { setIsOpen(false); setShowCheckoutForm(false); }} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="absolute inset-0 z-10 bg-background flex flex-col items-center justify-center gap-4 p-8">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
              <ShoppingBag className="text-accent" size={28} />
            </div>
            <h3 className="font-heading text-2xl text-foreground">{t('Order Placed!', 'تم الطلب!')}</h3>
            <p className="text-muted-foreground text-center">{t('Thank you for your purchase. Your order has been confirmed.', 'شكراً لشرائك. تم تأكيد طلبك.')}</p>
          </div>
        )}

        {/* Checkout Form */}
        {showCheckoutForm && !showSuccess ? (
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-heading text-foreground mb-1.5 tracking-wide">{t('Full Name', 'الاسم الكامل')}</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder={t('Enter your name', 'أدخل اسمك')}
                  className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-heading text-foreground mb-1.5 tracking-wide">{t('Email', 'البريد الإلكتروني')}</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  placeholder={t('Enter your email', 'أدخل بريدك الإلكتروني')}
                  className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-heading text-foreground mb-1.5 tracking-wide">{t('Phone Number', 'رقم الهاتف')}</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  placeholder={t('Enter your phone', 'أدخل رقم هاتفك')}
                  className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-accent"
                />
              </div>
              {formError && <p className="text-destructive text-sm">{formError}</p>}
            </div>

            {/* Order Summary */}
            <div className="border-t border-border pt-4 space-y-2">
              <h4 className="font-heading text-sm tracking-widest text-foreground mb-2">{t('Order Summary', 'ملخص الطلب')}</h4>
              {items.map(item => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t(item.nameEn, item.nameAr)} × {item.quantity}</span>
                  <span className="text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-heading text-foreground pt-2 border-t border-border">
                <span>{t('Total', 'المجموع')}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ) : !showSuccess && (
          /* Items */
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <ShoppingBag size={48} className="mb-4 opacity-30" />
                <p>{t('Your cart is empty', 'سلة التسوق فارغة')}</p>
              </div>
            ) : (
              items.map(item => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b border-border pb-4">
                  <img src={item.image} alt={t(item.nameEn, item.nameAr)} className="w-20 h-20 object-cover bg-secondary" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading text-sm text-foreground truncate">{t(item.nameEn, item.nameAr)}</h4>
                    <p className="text-xs text-muted-foreground">{item.size}</p>
                    <p className="text-sm font-medium text-foreground mt-1">${item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="w-6 h-6 border border-border flex items-center justify-center text-xs"><Minus size={12} /></button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="w-6 h-6 border border-border flex items-center justify-center text-xs"><Plus size={12} /></button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id, item.size)} className="text-muted-foreground hover:text-destructive"><X size={16} /></button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && !showSuccess && (
          <div className="p-6 border-t border-border">
            {!showCheckoutForm && (
              <div className="flex justify-between mb-4">
                <span className="text-muted-foreground">{t('Subtotal', 'المجموع الفرعي')}</span>
                <span className="font-heading text-lg text-foreground">${subtotal.toFixed(2)}</span>
              </div>
            )}
            {showCheckoutForm ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCheckoutForm(false)}
                  className="flex-1 border border-border text-foreground py-3 font-heading text-sm uppercase tracking-widest hover:bg-secondary transition-colors"
                >
                  {t('Back', 'رجوع')}
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={submitting}
                  className="flex-1 bg-accent text-accent-foreground py-3 font-heading text-sm uppercase tracking-widest hover:bg-accent/90 transition-colors disabled:opacity-50"
                >
                  {submitting ? '...' : t('Place Order', 'تأكيد الطلب')}
                </button>
              </div>
            ) : (
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-foreground text-background py-3 font-heading text-sm uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {t('Checkout', 'إتمام الشراء')}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
