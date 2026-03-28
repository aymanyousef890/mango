import { useState } from 'react';
import { useStore } from '@/contexts/StoreContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LayoutDashboard, Package, ClipboardList, Settings, LogOut, Menu, FileText } from 'lucide-react';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminOrders from '@/components/admin/AdminOrders';
import AdminOverview from '@/components/admin/AdminOverview';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminBlog from '@/components/admin/AdminBlog';

const AdminLogin = () => {
  const { loginAdmin } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await loginAdmin(email, password);
    if (result.error) setError(result.error);
    setLoading(false);
  };

  return (
    <div className="min-h-screen gradient-luxury flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-card p-8 w-full max-w-sm border border-border">
        <h1 className="font-heading text-2xl text-center text-foreground mb-2 tracking-widest">MANGO</h1>
        <p className="font-script text-accent text-center text-sm mb-8">Admin Dashboard</p>
        <input
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); setError(''); }}
          placeholder="Email"
          className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-accent mb-3"
        />
        <input
          type="password"
          value={password}
          onChange={e => { setPassword(e.target.value); setError(''); }}
          placeholder="Password"
          className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-accent mb-3"
        />
        {error && <p className="text-destructive text-xs mb-3">{error}</p>}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-foreground text-background py-3 font-heading text-sm uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
        >
          {loading ? '...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

const Admin = () => {
  const { isAdminAuth, logoutAdmin } = useStore();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isAdminAuth) return <AdminLogin />;

  const tabs = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'products', icon: Package, label: 'Products' },
    { id: 'orders', icon: ClipboardList, label: 'Orders' },
    { id: 'blog', icon: FileText, label: 'Blog' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      <aside className={`${sidebarOpen ? 'w-60' : 'w-0 overflow-hidden'} gradient-luxury text-primary-foreground flex flex-col transition-all duration-300`}>
        <div className="p-6">
          <h2 className="font-heading text-xl tracking-widest">MANGO</h2>
          <p className="font-script text-accent text-xs mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded transition-colors ${
                activeTab === tab.id ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-primary-foreground/60 hover:text-primary-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>
        <button onClick={logoutAdmin} className="flex items-center gap-2 px-7 py-4 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
          <LogOut size={16} /> Logout
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-14 flex items-center gap-4 px-6 border-b border-border bg-card">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-foreground"><Menu size={20} /></button>
          <h1 className="font-heading text-sm tracking-widest text-foreground uppercase">
            {tabs.find(t => t.id === activeTab)?.label}
          </h1>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'overview' && <AdminOverview />}
          {activeTab === 'products' && <AdminProducts />}
          {activeTab === 'orders' && <AdminOrders />}
          {activeTab === 'blog' && <AdminBlog />}
          {activeTab === 'settings' && <AdminSettings />}
        </main>
      </div>
    </div>
  );
};

export default Admin;
