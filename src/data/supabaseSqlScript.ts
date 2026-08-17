export const SUPABASE_SQL_SETUP_SCRIPT = `-- ====================================================================
-- DevForge AI / AutoElec Pro - Unified Supabase Database Schema
-- ====================================================================

-- 1. Create car_companies table
CREATE TABLE IF NOT EXISTS public.car_companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  logo TEXT DEFAULT '🚗',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create car_models table
CREATE TABLE IF NOT EXISTS public.car_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.car_companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create car_years table
CREATE TABLE IF NOT EXISTS public.car_years (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID NOT NULL REFERENCES public.car_models(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create engines table
CREATE TABLE IF NOT EXISTS public.engines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID NOT NULL REFERENCES public.car_models(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  displacement TEXT,
  fuel_type TEXT DEFAULT 'Petrol',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create vehicle_systems table
CREATE TABLE IF NOT EXISTS public.vehicle_systems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Create dtc_wiring_links table (Smart Wiring Integration)
CREATE TABLE IF NOT EXISTS public.dtc_wiring_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dtc_code TEXT NOT NULL,
  vehicle_system_id UUID REFERENCES public.vehicle_systems(id) ON DELETE CASCADE,
  component_name TEXT NOT NULL,
  wiring_diagram_id TEXT,
  ecu_pin TEXT,
  fuse_number TEXT,
  relay_number TEXT,
  wire_color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Create repair_cases table (Smart Repair Intelligence)
CREATE TABLE IF NOT EXISTS public.repair_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_company TEXT NOT NULL,
  vehicle_model TEXT NOT NULL,
  vehicle_year INTEGER NOT NULL,
  engine TEXT,
  system TEXT,
  dtc_code TEXT,
  customer_problem TEXT NOT NULL,
  diagnosis_result TEXT NOT NULL,
  measurements JSONB DEFAULT '[]'::jsonb,
  replaced_parts TEXT,
  repair_solution TEXT NOT NULL,
  repair_cost TEXT,
  technician_notes TEXT,
  is_solved BOOLEAN DEFAULT TRUE,
  upvotes INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- Enable Row Level Security (RLS) & Grant Public Read Permissions
-- ====================================================================
ALTER TABLE public.car_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dtc_wiring_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repair_cases ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access
CREATE POLICY "Allow public select on car_companies" ON public.car_companies FOR SELECT USING (true);
CREATE POLICY "Allow public select on car_models" ON public.car_models FOR SELECT USING (true);
CREATE POLICY "Allow public select on car_years" ON public.car_years FOR SELECT USING (true);
CREATE POLICY "Allow public select on engines" ON public.engines FOR SELECT USING (true);
CREATE POLICY "Allow public select on vehicle_systems" ON public.vehicle_systems FOR SELECT USING (true);
CREATE POLICY "Allow public select on dtc_wiring_links" ON public.dtc_wiring_links FOR SELECT USING (true);
CREATE POLICY "Allow public select on repair_cases" ON public.repair_cases FOR SELECT USING (true);
CREATE POLICY "Allow public insert on repair_cases" ON public.repair_cases FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on repair_cases" ON public.repair_cases FOR UPDATE USING (true);

-- Grant schema permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;

-- ====================================================================
-- Insert Initial Seed Data (Companies)
-- ====================================================================
INSERT INTO public.car_companies (id, name, name_ar, logo) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Toyota', 'تويوتا', '🚗'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Hyundai', 'هيونداي', '🚙'),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Kia', 'كيا', '🚘'),
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'Nissan', 'نيسان', '🚗'),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', 'Honda', 'هوندا', '🚗')
ON CONFLICT (id) DO NOTHING;

-- Insert Models
INSERT INTO public.car_models (id, company_id, name, name_ar) VALUES
('m01-toyota-camry', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Camry', 'كامري'),
('m02-toyota-corolla', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Corolla', 'كورولا'),
('m03-hyundai-elantra', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Elantra', 'إلانترا'),
('m04-kia-optima', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Optima K5', 'أوبتيمة / K5')
ON CONFLICT (id) DO NOTHING;

-- Insert Vehicle Systems
INSERT INTO public.vehicle_systems (id, name, name_ar) VALUES
('sys-efi', 'EFI & Engine Management', 'نظام إدارة المحرك والحقن (EFI)'),
('sys-abs', 'ABS Brake System', 'نظام الفرامل (ABS)'),
('sys-charging', 'Charging System', 'نظام الشحن والدينامو'),
('sys-canbus', 'CAN-Bus Network', 'شبكة الاتصال CAN-Bus')
ON CONFLICT (id) DO NOTHING;

-- Insert DTC Wiring Links
INSERT INTO public.dtc_wiring_links (dtc_code, vehicle_system_id, component_name, wiring_diagram_id, ecu_pin, fuse_number, relay_number, wire_color) VALUES
('P0335', 'sys-efi', 'حساس الكرنك (CKP Crankshaft Sensor)', 'wd-corolla-efi-01', 'Plug B Pin B18', 'EFI NO.1 (15A)', 'EFI MAIN', 'أخضر/أبيض'),
('P0101', 'sys-efi', 'حساس كتلة الهواء (MAF Sensor)', 'wd-corolla-efi-01', 'Plug B Pin B12', 'EFI NO.1 (15A)', 'EFI MAIN', 'أصفر/أزرق'),
('P0620', 'sys-charging', 'دينامو الشحن (Generator Control)', 'wd-camry-charging-01', 'Plug A Pin A5', 'ALT-S 7.5A', 'ALT Relay', 'أحمر/أبيض'),
('C0035', 'sys-abs', 'حساس سرعة العجلة (Wheel Speed Sensor Front Left)', 'wd-elantra-abs-01', 'ABS Pin 12', 'ABS Fuse 40A', 'ABS Relay', 'أزرق/أسود')
ON CONFLICT (id) DO NOTHING;
`;
