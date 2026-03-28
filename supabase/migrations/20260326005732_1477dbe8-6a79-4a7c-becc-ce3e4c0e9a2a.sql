
-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'shipped', 'delivered')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert orders (customers placing orders)
CREATE POLICY "Anyone can insert orders"
  ON public.orders
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users (admin) can view orders
CREATE POLICY "Authenticated users can view orders"
  ON public.orders
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users (admin) can update orders
CREATE POLICY "Authenticated users can update orders"
  ON public.orders
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
