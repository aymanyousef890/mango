import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initialProducts, Product } from '@/data/products';
import { defaultSiteSettings, SiteSettings } from '@/data/siteSettings';
import { initialBlogPosts, BlogPost } from '@/data/blog';
import { supabase } from '@/integrations/supabase/client';
import type { Session } from '@supabase/supabase-js';

interface StoreContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  isAdminAuth: boolean;
  session: Session | null;
  loginAdmin: (email: string, password: string) => Promise<{ error: string | null }>;
  logoutAdmin: () => Promise<void>;
  siteSettings: SiteSettings;
  setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [session, setSession] = useState<Session | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const isAdminAuth = !!session;

  const loginAdmin = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  };

  const logoutAdmin = async () => {
    await supabase.auth.signOut();
  };

  return (
    <StoreContext.Provider value={{ products, setProducts, isAdminAuth, session, loginAdmin, logoutAdmin, siteSettings, setSiteSettings, blogPosts, setBlogPosts }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};
