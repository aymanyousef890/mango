import { useEffect, useState } from 'react';
import { useStore } from '@/contexts/StoreContext';
import { Package, DollarSign, ClipboardList, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminOverview = () => {
  const { products } = useStore();
  const [orderCount, setOrderCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const totalStock = products.reduce((s, p) => s + p.stock, 0);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await supabase.from('orders').select('total');
      if (data) {
        setOrderCount(data.length);
        setTotalRevenue(data.reduce((s, o) => s + Number(o.total), 0));
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package },
    { label: 'Total Orders', value: orderCount, icon: ClipboardList },
    { label: 'Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign },
    { label: 'Total Stock', value: totalStock, icon: TrendingUp },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(stat => (
        <div key={stat.label} className="bg-card border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <stat.icon size={20} className="text-accent" />
          </div>
          <p className="font-heading text-2xl text-foreground">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminOverview;
