import StoreLayout from '@/components/store/StoreLayout';
import HeroSection from '@/components/store/HeroSection';
import CategoriesSection from '@/components/store/CategoriesSection';
import BestSellers from '@/components/store/BestSellers';

const Index = () => {
  return (
    <StoreLayout>
      <HeroSection />
      <CategoriesSection />
      <BestSellers />
    </StoreLayout>
  );
};

export default Index;
