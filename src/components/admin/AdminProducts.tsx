import { useState } from 'react';
import { useStore } from '@/contexts/StoreContext';
import { Product, ProductSize } from '@/data/products';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

const emptyProduct: Omit<Product, 'id'> = {
  nameEn: '', nameAr: '', descriptionEn: '', descriptionAr: '',
  category: 'floral', sizes: [{ ml: 50, price: 0 }],
  topNotes: [{ en: '', ar: '' }], heartNotes: [{ en: '', ar: '' }], baseNotes: [{ en: '', ar: '' }],
  longevity: 5, sillage: 5, image: '', stock: 0, isBestSeller: false,
};

const AdminProducts = () => {
  const { products, setProducts } = useStore();
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleDelete = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));

  const handleSave = () => {
    if (!editing) return;
    if (isNew) {
      setProducts(prev => [...prev, { ...editing, id: Date.now().toString() }]);
    } else {
      setProducts(prev => prev.map(p => p.id === editing.id ? editing : p));
    }
    setEditing(null);
    setIsNew(false);
  };

  const openNew = () => {
    setEditing({ ...emptyProduct, id: '' } as Product);
    setIsNew(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading text-lg text-foreground">Products ({products.length})</h2>
        <button onClick={openNew} className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 text-sm font-heading uppercase tracking-widest hover:bg-accent/90 transition-colors">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-foreground/40 flex items-center justify-center p-4">
          <div className="bg-card border border-border p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading text-lg text-foreground">{isNew ? 'Add Product' : 'Edit Product'}</h3>
              <button onClick={() => { setEditing(null); setIsNew(false); }}><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Name (EN)" value={editing.nameEn} onChange={e => setEditing({ ...editing, nameEn: e.target.value })} className="w-full px-3 py-2 border border-border bg-background text-sm text-foreground focus:outline-none focus:border-accent" />
              <input placeholder="Name (AR)" value={editing.nameAr} onChange={e => setEditing({ ...editing, nameAr: e.target.value })} className="w-full px-3 py-2 border border-border bg-background text-sm text-foreground focus:outline-none focus:border-accent" dir="rtl" />
              <select value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value as Product['category'] })} className="w-full px-3 py-2 border border-border bg-background text-sm text-foreground focus:outline-none focus:border-accent">
                <option value="floral">Floral</option>
                <option value="woody">Woody</option>
                <option value="citrus">Citrus</option>
                <option value="oriental">Oriental</option>
              </select>
              <div className="grid grid-cols-2 gap-3">
                <input type="number" placeholder="Price (50ml)" value={editing.sizes[0]?.price || ''} onChange={e => {
                  const sizes = [...editing.sizes];
                  sizes[0] = { ...sizes[0], ml: 50, price: Number(e.target.value) };
                  setEditing({ ...editing, sizes });
                }} className="px-3 py-2 border border-border bg-background text-sm text-foreground focus:outline-none focus:border-accent" />
                <input type="number" placeholder="Stock" value={editing.stock || ''} onChange={e => setEditing({ ...editing, stock: Number(e.target.value) })} className="px-3 py-2 border border-border bg-background text-sm text-foreground focus:outline-none focus:border-accent" />
              </div>
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input type="checkbox" checked={editing.isBestSeller} onChange={e => setEditing({ ...editing, isBestSeller: e.target.checked })} />
                Best Seller
              </label>
            </div>
            <button onClick={handleSave} className="mt-6 w-full bg-foreground text-background py-3 font-heading text-sm uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors">
              {isNew ? 'Add Product' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              <th className="px-4 py-3 text-left font-heading text-xs uppercase tracking-widest text-muted-foreground">Product</th>
              <th className="px-4 py-3 text-left font-heading text-xs uppercase tracking-widest text-muted-foreground hidden md:table-cell">Category</th>
              <th className="px-4 py-3 text-left font-heading text-xs uppercase tracking-widest text-muted-foreground">Price</th>
              <th className="px-4 py-3 text-left font-heading text-xs uppercase tracking-widest text-muted-foreground hidden md:table-cell">Stock</th>
              <th className="px-4 py-3 text-right font-heading text-xs uppercase tracking-widest text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-t border-border hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {p.image && <img src={p.image} alt={p.nameEn} className="w-10 h-10 object-cover bg-secondary" />}
                    <div>
                      <p className="font-medium text-foreground">{p.nameEn}</p>
                      <p className="text-xs text-muted-foreground">{p.nameAr}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground capitalize hidden md:table-cell">{p.category}</td>
                <td className="px-4 py-3 text-foreground">${p.sizes[0].price}</td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{p.stock}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setEditing(p)} className="text-muted-foreground hover:text-foreground mx-1"><Pencil size={15} /></button>
                  <button onClick={() => handleDelete(p.id)} className="text-muted-foreground hover:text-destructive mx-1"><Trash2 size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
