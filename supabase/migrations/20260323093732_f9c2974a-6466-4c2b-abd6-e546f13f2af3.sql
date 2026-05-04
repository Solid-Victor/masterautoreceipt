
-- Create a table for sales agreements
CREATE TABLE public.sales_agreements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receipt_no TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for sales receipts
CREATE TABLE public.sales_receipts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receipt_no TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sales_agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_receipts ENABLE ROW LEVEL SECURITY;

-- RLS policies for sales_agreements
CREATE POLICY "Users can view their own agreements" ON public.sales_agreements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own agreements" ON public.sales_agreements FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own agreements" ON public.sales_agreements FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own agreements" ON public.sales_agreements FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for sales_receipts
CREATE POLICY "Users can view their own receipts" ON public.sales_receipts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own receipts" ON public.sales_receipts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own receipts" ON public.sales_receipts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own receipts" ON public.sales_receipts FOR DELETE USING (auth.uid() = user_id);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_sales_agreements_updated_at BEFORE UPDATE ON public.sales_agreements FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_sales_receipts_updated_at BEFORE UPDATE ON public.sales_receipts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
