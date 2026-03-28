import StoreHeader from '@/components/store/StoreHeader';
import StoreFooter from '@/components/store/StoreFooter';
import CartDrawer from '@/components/store/CartDrawer';
import { ReactNode } from 'react';

const StoreLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <StoreHeader />
      <CartDrawer />
      <main className="flex-1 pt-16">{children}</main>
      <StoreFooter />
    </div>
  );
};

export default StoreLayout;
