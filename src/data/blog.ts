export interface BlogPost {
  id: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  contentEn: string;
  contentAr: string;
  image: string;
  date: string;
}

export const initialBlogPosts: BlogPost[] = [];
