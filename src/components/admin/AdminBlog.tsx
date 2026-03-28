import { useState, useRef } from 'react';
import { useStore } from '@/contexts/StoreContext';
import { BlogPost } from '@/data/blog';
import { Pencil, Trash2, Plus, X, Upload, Image } from 'lucide-react';

const emptyPost: Omit<BlogPost, 'id'> = {
  titleEn: '', titleAr: '', excerptEn: '', excerptAr: '',
  contentEn: '', contentAr: '', image: '',
  date: new Date().toISOString().split('T')[0],
};

const AdminBlog = () => {
  const { blogPosts, setBlogPosts } = useStore();
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [isNew, setIsNew] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDelete = (id: string) => setBlogPosts(prev => prev.filter(p => p.id !== id));

  const handleSave = () => {
    if (!editing) return;
    if (isNew) {
      setBlogPosts(prev => [...prev, { ...editing, id: Date.now().toString() }]);
    } else {
      setBlogPosts(prev => prev.map(p => p.id === editing.id ? editing : p));
    }
    setEditing(null);
    setIsNew(false);
  };

  const openNew = () => {
    setEditing({ ...emptyPost, id: '' } as BlogPost);
    setIsNew(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setEditing({ ...editing, image: ev.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading text-lg text-foreground">Blog Posts ({blogPosts.length})</h2>
        <button onClick={openNew} className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 text-sm font-heading uppercase tracking-widest hover:bg-accent/90 transition-colors">
          <Plus size={16} /> Add Post
        </button>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-foreground/40 flex items-center justify-center p-4">
          <div className="bg-card border border-border p-6 w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading text-lg text-foreground">{isNew ? 'Add Blog Post' : 'Edit Blog Post'}</h3>
              <button onClick={() => { setEditing(null); setIsNew(false); }}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-xs font-heading uppercase tracking-widest text-muted-foreground mb-1.5">Cover Image</label>
                <div className="flex items-center gap-4">
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 border border-border text-sm text-foreground hover:bg-secondary transition-colors"
                  >
                    <Upload size={16} /> Upload
                  </button>
                  {editing.image ? (
                    <img src={editing.image} alt="Preview" className="h-16 w-24 object-cover border border-border" />
                  ) : (
                    <div className="h-16 w-24 border border-border bg-secondary flex items-center justify-center">
                      <Image size={20} className="text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Title (EN)" value={editing.titleEn} onChange={e => setEditing({ ...editing, titleEn: e.target.value })} className="w-full px-3 py-2 border border-border bg-background text-sm text-foreground focus:outline-none focus:border-accent" />
                <input placeholder="Title (AR)" value={editing.titleAr} onChange={e => setEditing({ ...editing, titleAr: e.target.value })} className="w-full px-3 py-2 border border-border bg-background text-sm text-foreground focus:outline-none focus:border-accent" dir="rtl" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <textarea placeholder="Excerpt (EN)" value={editing.excerptEn} onChange={e => setEditing({ ...editing, excerptEn: e.target.value })} rows={2} className="w-full px-3 py-2 border border-border bg-background text-sm text-foreground focus:outline-none focus:border-accent" />
                <textarea placeholder="Excerpt (AR)" value={editing.excerptAr} onChange={e => setEditing({ ...editing, excerptAr: e.target.value })} rows={2} className="w-full px-3 py-2 border border-border bg-background text-sm text-foreground focus:outline-none focus:border-accent" dir="rtl" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <textarea placeholder="Full Content (EN)" value={editing.contentEn} onChange={e => setEditing({ ...editing, contentEn: e.target.value })} rows={6} className="w-full px-3 py-2 border border-border bg-background text-sm text-foreground focus:outline-none focus:border-accent" />
                <textarea placeholder="Full Content (AR)" value={editing.contentAr} onChange={e => setEditing({ ...editing, contentAr: e.target.value })} rows={6} className="w-full px-3 py-2 border border-border bg-background text-sm text-foreground focus:outline-none focus:border-accent" dir="rtl" />
              </div>
              <input type="date" value={editing.date} onChange={e => setEditing({ ...editing, date: e.target.value })} className="w-full px-3 py-2 border border-border bg-background text-sm text-foreground focus:outline-none focus:border-accent" />
            </div>
            <button onClick={handleSave} className="mt-6 w-full bg-foreground text-background py-3 font-heading text-sm uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors">
              {isNew ? 'Add Post' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {/* Posts Grid */}
      {blogPosts.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Image size={48} className="mx-auto mb-4 opacity-30" />
          <p>No blog posts yet. Click "Add Post" to create one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <div key={post.id} className="border border-border bg-card overflow-hidden group">
              <div className="aspect-[4/3] bg-secondary overflow-hidden">
                {post.image ? (
                  <img src={post.image} alt={post.titleEn} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image size={32} className="text-muted-foreground opacity-30" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <time className="text-xs text-muted-foreground">{post.date}</time>
                <h4 className="font-heading text-sm text-foreground mt-1 mb-1">{post.titleEn}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">{post.excerptEn}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => setEditing(post)} className="text-muted-foreground hover:text-foreground"><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(post.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
