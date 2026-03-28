import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface DBOrder {
  id: string;
  order_number: string;
  customer_name: string;
  email: string;
  phone: string | null;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  shipped: 'bg-accent/10 text-accent',
  delivered: 'bg-green-100 text-green-700',
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<DBOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      setOrders(data.map((o: any) => ({ ...o, items: o.items as OrderItem[] })));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel('orders-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchOrders();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: status as DBOrder['status'] } : o));
  };

  if (loading) {
    return <div className="text-center py-20 text-muted-foreground">Loading orders...</div>;
  }

  return (
    <div>
      <h2 className="font-heading text-lg text-foreground mb-6">Orders ({orders.length})</h2>
      {orders.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p>No orders yet.</p>
        </div>
      ) : (
        <div className="border border-border overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-secondary">
              <tr>
                <th className="px-4 py-3 text-left font-heading text-xs uppercase tracking-widest text-muted-foreground">Order ID</th>
                <th className="px-4 py-3 text-left font-heading text-xs uppercase tracking-widest text-muted-foreground">Customer</th>
                <th className="px-4 py-3 text-left font-heading text-xs uppercase tracking-widest text-muted-foreground">Phone</th>
                <th className="px-4 py-3 text-left font-heading text-xs uppercase tracking-widest text-muted-foreground">Items</th>
                <th className="px-4 py-3 text-left font-heading text-xs uppercase tracking-widest text-muted-foreground">Total</th>
                <th className="px-4 py-3 text-left font-heading text-xs uppercase tracking-widest text-muted-foreground">Date</th>
                <th className="px-4 py-3 text-left font-heading text-xs uppercase tracking-widest text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="border-t border-border hover:bg-secondary/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{o.order_number}</td>
                  <td className="px-4 py-3">
                    <p className="text-foreground">{o.customer_name}</p>
                    <p className="text-xs text-muted-foreground">{o.email}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{o.phone || '—'}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {o.items.map((item, i) => (
                      <div key={i}>{item.name} × {item.qty}</div>
                    ))}
                  </td>
                  <td className="px-4 py-3 text-foreground">${o.total}</td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(o.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <select
                      value={o.status}
                      onChange={e => updateStatus(o.id, e.target.value)}
                      className={`px-3 py-1 text-xs font-medium border-0 cursor-pointer ${statusColors[o.status]}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
