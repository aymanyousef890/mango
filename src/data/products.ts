import perfume1 from '@/assets/perfume-1.jpg';
import perfume2 from '@/assets/perfume-2.jpg';
import perfume3 from '@/assets/perfume-3.jpg';
import perfume4 from '@/assets/perfume-4.jpg';
import perfume5 from '@/assets/perfume-5.jpg';
import perfume6 from '@/assets/perfume-6.jpg';

export interface ProductSize {
  ml: number;
  price: number;
}

export interface Product {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  category: 'floral' | 'woody' | 'oriental' | 'citrus';
  sizes: ProductSize[];
  topNotes: { en: string; ar: string }[];
  heartNotes: { en: string; ar: string }[];
  baseNotes: { en: string; ar: string }[];
  longevity: number; // 1-10
  sillage: number; // 1-10
  image: string;
  stock: number;
  isBestSeller: boolean;
}

export const initialProducts: Product[] = [
  {
    id: '1',
    nameEn: 'Rose Élégance',
    nameAr: 'أناقة الورد',
    descriptionEn: 'A captivating blend of Bulgarian rose and pink pepper, wrapped in a veil of soft musk and sandalwood.',
    descriptionAr: 'مزيج آسر من الورد البلغاري والفلفل الوردي، ملفوف بحجاب من المسك الناعم وخشب الصندل.',
    category: 'floral',
    sizes: [{ ml: 50, price: 85 }, { ml: 100, price: 135 }],
    topNotes: [{ en: 'Pink Pepper', ar: 'فلفل وردي' }, { en: 'Bergamot', ar: 'برغموت' }],
    heartNotes: [{ en: 'Bulgarian Rose', ar: 'ورد بلغاري' }, { en: 'Peony', ar: 'فاوانيا' }],
    baseNotes: [{ en: 'Musk', ar: 'مسك' }, { en: 'Sandalwood', ar: 'خشب الصندل' }],
    longevity: 8,
    sillage: 7,
    image: perfume1,
    stock: 45,
    isBestSeller: true,
  },
  {
    id: '2',
    nameEn: 'Oud Noir',
    nameAr: 'عود نوار',
    descriptionEn: 'A deep, mysterious fragrance built on rare Cambodian oud, enriched with smoky incense and dark amber.',
    descriptionAr: 'عطر عميق وغامض مبني على عود كمبودي نادر، مخصب بالبخور الدخاني والعنبر الداكن.',
    category: 'oriental',
    sizes: [{ ml: 50, price: 120 }, { ml: 100, price: 195 }],
    topNotes: [{ en: 'Saffron', ar: 'زعفران' }, { en: 'Black Pepper', ar: 'فلفل أسود' }],
    heartNotes: [{ en: 'Cambodian Oud', ar: 'عود كمبودي' }, { en: 'Incense', ar: 'بخور' }],
    baseNotes: [{ en: 'Dark Amber', ar: 'عنبر داكن' }, { en: 'Leather', ar: 'جلد' }],
    longevity: 10,
    sillage: 9,
    image: perfume2,
    stock: 30,
    isBestSeller: true,
  },
  {
    id: '3',
    nameEn: 'Citron Soleil',
    nameAr: 'ليمون الشمس',
    descriptionEn: 'A burst of Mediterranean sunshine — zesty lemon, sparkling bergamot, and sun-kissed neroli over a bed of white cedar.',
    descriptionAr: 'انفجار من أشعة الشمس المتوسطية — ليمون حيوي، برغموت متلألئ، ونيرولي مشمس فوق سرير من خشب الأرز الأبيض.',
    category: 'citrus',
    sizes: [{ ml: 50, price: 75 }, { ml: 100, price: 120 }],
    topNotes: [{ en: 'Lemon', ar: 'ليمون' }, { en: 'Bergamot', ar: 'برغموت' }],
    heartNotes: [{ en: 'Neroli', ar: 'نيرولي' }, { en: 'Green Tea', ar: 'شاي أخضر' }],
    baseNotes: [{ en: 'White Cedar', ar: 'أرز أبيض' }, { en: 'Vetiver', ar: 'فيتيفر' }],
    longevity: 6,
    sillage: 5,
    image: perfume3,
    stock: 60,
    isBestSeller: false,
  },
  {
    id: '4',
    nameEn: 'Jardin Mystique',
    nameAr: 'الحديقة الغامضة',
    descriptionEn: 'An enchanting floral journey through moonlit gardens — jasmine sambac, tuberose, and iris on a cushion of powdery musk.',
    descriptionAr: 'رحلة زهرية ساحرة عبر حدائق مضاءة بالقمر — ياسمين سمبك، مسك الليل، وسوسن على وسادة من المسك البودري.',
    category: 'floral',
    sizes: [{ ml: 50, price: 95 }, { ml: 100, price: 155 }],
    topNotes: [{ en: 'Mandarin', ar: 'يوسفي' }, { en: 'Pear', ar: 'كمثرى' }],
    heartNotes: [{ en: 'Jasmine Sambac', ar: 'ياسمين سمبك' }, { en: 'Tuberose', ar: 'مسك الليل' }],
    baseNotes: [{ en: 'Iris', ar: 'سوسن' }, { en: 'Powdery Musk', ar: 'مسك بودري' }],
    longevity: 7,
    sillage: 8,
    image: perfume4,
    stock: 35,
    isBestSeller: true,
  },
  {
    id: '5',
    nameEn: 'Bois Sauvage',
    nameAr: 'خشب بري',
    descriptionEn: 'A rugged, earthy composition of sandalwood, cedarwood, and vetiver, softened by a touch of cardamom and warm amber.',
    descriptionAr: 'تركيبة ترابية قوية من خشب الصندل وخشب الأرز والفيتيفر، ملطفة بلمسة من الهيل والعنبر الدافئ.',
    category: 'woody',
    sizes: [{ ml: 50, price: 90 }, { ml: 100, price: 145 }],
    topNotes: [{ en: 'Cardamom', ar: 'هيل' }, { en: 'Ginger', ar: 'زنجبيل' }],
    heartNotes: [{ en: 'Sandalwood', ar: 'خشب الصندل' }, { en: 'Cedarwood', ar: 'خشب الأرز' }],
    baseNotes: [{ en: 'Vetiver', ar: 'فيتيفر' }, { en: 'Warm Amber', ar: 'عنبر دافئ' }],
    longevity: 9,
    sillage: 7,
    image: perfume5,
    stock: 40,
    isBestSeller: true,
  },
  {
    id: '6',
    nameEn: 'Épice Rouge',
    nameAr: 'بهار أحمر',
    descriptionEn: 'A bold oriental symphony of cinnamon, clove, and saffron, anchored by rich oud and a whisper of vanilla.',
    descriptionAr: 'سيمفونية شرقية جريئة من القرفة والقرنفل والزعفران، مرتكزة على عود غني وهمسة من الفانيليا.',
    category: 'oriental',
    sizes: [{ ml: 50, price: 110 }, { ml: 100, price: 180 }],
    topNotes: [{ en: 'Cinnamon', ar: 'قرفة' }, { en: 'Clove', ar: 'قرنفل' }],
    heartNotes: [{ en: 'Saffron', ar: 'زعفران' }, { en: 'Rose Absolute', ar: 'ورد مطلق' }],
    baseNotes: [{ en: 'Oud', ar: 'عود' }, { en: 'Vanilla', ar: 'فانيليا' }],
    longevity: 10,
    sillage: 9,
    image: perfume6,
    stock: 25,
    isBestSeller: true,
  },
];
