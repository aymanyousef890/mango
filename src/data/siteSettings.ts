export interface AdminCredentials {
  email: string;
  password: string;
}

export interface SiteSettings {
  heroImage: string;
  heroTitleEn: string;
  heroTitleAr: string;
  heroSubtitleEn: string;
  heroSubtitleAr: string;
  heroDescriptionEn: string;
  heroDescriptionAr: string;
  email: string;
  phone: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  addressEn: string;
  addressAr: string;
  mapEmbedUrl: string;
}

export const defaultAdminCredentials: AdminCredentials = {
  email: 'admin@mango.com',
  password: 'mango2024',
};

export const defaultSiteSettings: SiteSettings = {
  heroImage: '',
  heroTitleEn: 'Discover Your Signature Scent',
  heroTitleAr: 'اكتشف عطرك المميز',
  heroSubtitleEn: 'The Essence of Luxury',
  heroSubtitleAr: 'جوهر الفخامة',
  heroDescriptionEn: 'Handcrafted fragrances that capture moments, evoke emotions, and define elegance.',
  heroDescriptionAr: 'عطور مصنوعة يدوياً تلتقط اللحظات، تثير المشاعر، وتحدد الأناقة.',
  email: 'info@mangoperfumes.com',
  phone: '+971 50 123 4567',
  whatsapp: '+971501234567',
  facebook: 'https://facebook.com/mangoperfumes',
  instagram: 'https://instagram.com/mangoperfumes',
  tiktok: 'https://tiktok.com/@mangoperfumes',
  addressEn: 'Dubai Mall, Downtown Dubai, UAE',
  addressAr: 'دبي مول، وسط مدينة دبي، الإمارات',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178!2d55.2796!3d25.1972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e2bf5e4b135!2sThe%20Dubai%20Mall!5e0!3m2!1sen!2sae!4v1234567890',
};
