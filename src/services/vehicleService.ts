import { supabase } from '../lib/supabase';
import { CAR_COMPANIES, VEHICLE_SYSTEMS } from '../data/mockData';

export interface CarCompanyDB {
  id: string;
  name_ar: string;
  name_en?: string;
  name?: string;
  logo?: string | null;
  logo_url?: string | null;
  country_origin?: string | null;
  is_active?: boolean;
}

export interface CarModelDB {
  id: string;
  company_id: string;
  name_ar: string;
  name_en?: string;
  name?: string;
  body_type?: string | null;
  is_active?: boolean;
}

export interface ModelYearDB {
  id: string;
  model_id?: string;
  car_model_id?: string;
  year: number;
  generation?: string | null;
  obd_protocol?: string | null;
}

export interface EngineDB {
  id: string;
  model_id?: string;
  car_model_id?: string;
  engine_code?: string;
  name?: string;
  displacement_l?: number;
  displacement?: string;
  fuel_type?: string;
  cylinders?: number;
  valves?: number;
  aspiration?: string | null;
  ecu_type?: string | null;
  injection_type?: string | null;
}

export interface VehicleSystemDB {
  id: string;
  category?: string;
  name_ar: string;
  name_en?: string;
  name?: string;
  code?: string;
  description_ar?: string | null;
  icon_name?: string | null;
}

export interface DtcWiringLinkDB {
  id: string;
  dtc_code: string;
  vehicle_system_id: string;
  component_name: string;
  wiring_diagram_id: string;
  ecu_pin: string;
  fuse_number: string;
  relay_number: string;
  wire_color?: string;
}

export interface WiringDiagramDB {
  id: string;
  car_company_id: string | null;
  car_model_id: string | null;
  model_year_id: string | null;
  system_id: string | null;
  title_ar: string;
  title_en?: string;
  diagram_svg: string | null;
  pdf_url: string | null;
  image_url: string | null;
  pinout_details: any;
  wire_color_legend: any;
  is_hd: boolean;
}

// ==========================================
// FALLBACK SEED DATA HELPERS
// ==========================================

const FALLBACK_COMPANIES: CarCompanyDB[] = CAR_COMPANIES.map((c) => ({
  id: c.id,
  name_ar: c.name,
  name_en: c.nameEn,
  name: c.nameEn,
  logo: c.logo,
  logo_url: c.logo,
  country_origin: c.country,
  is_active: true
}));

const FALLBACK_MODELS_MAP: Record<string, CarModelDB[]> = {
  toyota: [
    { id: 'camry', company_id: 'toyota', name_ar: 'كامري (Camry)', name_en: 'Camry', name: 'Camry', body_type: 'سيدان', is_active: true },
    { id: 'corolla', company_id: 'toyota', name_ar: 'كورولا (Corolla)', name_en: 'Corolla', name: 'Corolla', body_type: 'سيدان', is_active: true },
    { id: 'hilux', company_id: 'toyota', name_ar: 'هايلوكس (Hilux)', name_en: 'Hilux', name: 'Hilux', body_type: 'بيك آب', is_active: true },
    { id: 'land-cruiser', company_id: 'toyota', name_ar: 'لاندكروزر (LC300)', name_en: 'Land Cruiser', name: 'Land Cruiser', body_type: 'دفع رباعي', is_active: true },
    { id: 'prado', company_id: 'toyota', name_ar: 'برادو (Prado)', name_en: 'Prado', name: 'Prado', body_type: 'دفع رباعي', is_active: true }
  ],
  hyundai: [
    { id: 'elantra', company_id: 'hyundai', name_ar: 'إلانترا (Elantra)', name_en: 'Elantra', name: 'Elantra', body_type: 'سيدان', is_active: true },
    { id: 'sonata', company_id: 'hyundai', name_ar: 'سوناتا (Sonata)', name_en: 'Sonata', name: 'Sonata', body_type: 'سيدان', is_active: true },
    { id: 'tucson', company_id: 'hyundai', name_ar: 'توسان (Tucson)', name_en: 'Tucson', name: 'Tucson', body_type: 'كروس أوفر', is_active: true },
    { id: 'accent', company_id: 'hyundai', name_ar: 'أكسنت (Accent)', name_en: 'Accent', name: 'Accent', body_type: 'سيدان صغيرة', is_active: true }
  ],
  kia: [
    { id: 'optima-k5', company_id: 'kia', name_ar: 'أوبتيمة / K5', name_en: 'Optima / K5', name: 'Optima K5', body_type: 'سيدان', is_active: true },
    { id: 'sportage', company_id: 'kia', name_ar: 'سبورتاج (Sportage)', name_en: 'Sportage', name: 'Sportage', body_type: 'كروس أوفر', is_active: true },
    { id: 'cerato', company_id: 'kia', name_ar: 'سيراتو (Cerato)', name_en: 'Cerato', name: 'Cerato', body_type: 'سيدان', is_active: true }
  ],
  nissan: [
    { id: 'altima', company_id: 'nissan', name_ar: 'ألتيمة (Altima)', name_en: 'Altima', name: 'Altima', body_type: 'سيدان', is_active: true },
    { id: 'patrol', company_id: 'nissan', name_ar: 'باترول (Patrol Y62/Y63)', name_en: 'Patrol', name: 'Patrol', body_type: 'دفع رباعي', is_active: true },
    { id: 'sunny', company_id: 'nissan', name_ar: 'صني (Sunny)', name_en: 'Sunny', name: 'Sunny', body_type: 'سيدان', is_active: true }
  ],
  honda: [
    { id: 'accord', company_id: 'honda', name_ar: 'أكورد (Accord)', name_en: 'Accord', name: 'Accord', body_type: 'سيدان', is_active: true },
    { id: 'civic', company_id: 'honda', name_ar: 'سيفيك (Civic)', name_en: 'Civic', name: 'Civic', body_type: 'سيدان', is_active: true }
  ],
  ford: [
    { id: 'f150', company_id: 'ford', name_ar: 'اف-150 (F-150)', name_en: 'F-150', name: 'F-150', body_type: 'شاحنة بيك آب', is_active: true },
    { id: 'mustang', company_id: 'ford', name_ar: 'موستانج (Mustang)', name_en: 'Mustang', name: 'Mustang', body_type: 'رياضية', is_active: true },
    { id: 'taurus', company_id: 'ford', name_ar: 'تورس (Taurus)', name_en: 'Taurus', name: 'Taurus', body_type: 'سيدان كبيرة', is_active: true }
  ],
  chevrolet: [
    { id: 'tahoe', company_id: 'chevrolet', name_ar: 'تاهو (Tahoe)', name_en: 'Tahoe', name: 'Tahoe', body_type: 'دفع رباعي كبير', is_active: true },
    { id: 'malibu', company_id: 'chevrolet', name_ar: 'ماليبو (Malibu)', name_en: 'Malibu', name: 'Malibu', body_type: 'سيدان', is_active: true },
    { id: 'silverado', company_id: 'chevrolet', name_ar: 'سيلفرادو (Silverado)', name_en: 'Silverado', name: 'Silverado', body_type: 'بيك آب', is_active: true }
  ],
  bmw: [
    { id: 'series-5', company_id: 'bmw', name_ar: 'الفئة الخامسة (5 Series)', name_en: '5 Series', name: '5 Series', body_type: 'سيدان فخمة', is_active: true },
    { id: 'series-3', company_id: 'bmw', name_ar: 'الفئة الثالثة (3 Series)', name_en: '3 Series', name: '3 Series', body_type: 'سيدان رياضية', is_active: true }
  ],
  mercedes: [
    { id: 'e-class', company_id: 'mercedes', name_ar: 'إي كلاس (E-Class)', name_en: 'E-Class', name: 'E-Class', body_type: 'سيدان فخمة', is_active: true },
    { id: 'c-class', company_id: 'mercedes', name_ar: 'سي كلاس (C-Class)', name_en: 'C-Class', name: 'C-Class', body_type: 'سيدان', is_active: true }
  ]
};

const FALLBACK_SYSTEMS: VehicleSystemDB[] = VEHICLE_SYSTEMS.map((s) => ({
  id: s.id,
  category: 'electric',
  name_ar: s.name,
  name_en: s.nameEn,
  name: s.nameEn,
  code: s.id.toUpperCase(),
  description_ar: s.description,
  icon_name: s.icon
}));

const FALLBACK_DTC_LINKS: Record<string, DtcWiringLinkDB> = {
  P0335: {
    id: 'link-p0335',
    dtc_code: 'P0335',
    vehicle_system_id: 'sys-efi',
    component_name: 'حساس الكرنك (CKP Crankshaft Sensor)',
    wiring_diagram_id: 'wd-corolla-efi-01',
    ecu_pin: 'Plug B Pin B18',
    fuse_number: 'EFI NO.1 (15A)',
    relay_number: 'EFI MAIN Relay',
    wire_color: 'أخضر/أبيض'
  },
  P0101: {
    id: 'link-p0101',
    dtc_code: 'P0101',
    vehicle_system_id: 'sys-efi',
    component_name: 'حساس كتلة الهواء (MAF Mass Air Flow Sensor)',
    wiring_diagram_id: 'wd-corolla-efi-01',
    ecu_pin: 'Plug B Pin B12',
    fuse_number: 'EFI NO.1 (15A)',
    relay_number: 'EFI MAIN Relay',
    wire_color: 'أصفر/أزرق'
  },
  P0620: {
    id: 'link-p0620',
    dtc_code: 'P0620',
    vehicle_system_id: 'sys-charging',
    component_name: 'دينامو الشحن (Generator Control Circuit)',
    wiring_diagram_id: 'wd-camry-charging-01',
    ecu_pin: 'Plug A Pin A5',
    fuse_number: 'ALT-S (7.5A)',
    relay_number: 'ALT Relay',
    wire_color: 'أحمر/أبيض'
  },
  C0035: {
    id: 'link-c0035',
    dtc_code: 'C0035',
    vehicle_system_id: 'sys-abs',
    component_name: 'حساس سرعة العجلة الأمامية (Wheel Speed Sensor FL)',
    wiring_diagram_id: 'wd-elantra-abs-01',
    ecu_pin: 'ABS Pin 12',
    fuse_number: 'ABS Fuse (40A)',
    relay_number: 'ABS Relay',
    wire_color: 'أزرق/أسود'
  }
};

// ==========================================
// EXPORTED SERVICE FUNCTIONS WITH FALLBACK
// ==========================================

/**
 * Fetch all active car companies from Supabase `car_companies` table with local fallback
 */
export async function fetchCarCompanies(): Promise<{ data: CarCompanyDB[]; error: string | null; isFallback?: boolean }> {
  try {
    const { data, error } = await supabase
      .from('car_companies')
      .select('*')
      .order('name_ar', { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn('Supabase car_companies table query fallback:', error?.message);
      return { data: FALLBACK_COMPANIES, error: null, isFallback: true };
    }
    return { data: data, error: null };
  } catch (err: any) {
    return { data: FALLBACK_COMPANIES, error: null, isFallback: true };
  }
}

/**
 * Fetch car models for a given company_id from Supabase `car_models` table with local fallback
 */
export async function fetchCarModels(companyId: string): Promise<{ data: CarModelDB[]; error: string | null; isFallback?: boolean }> {
  try {
    if (!companyId) return { data: [], error: null };

    const { data, error } = await supabase
      .from('car_models')
      .select('*')
      .eq('company_id', companyId)
      .order('name_ar', { ascending: true });

    if (error || !data || data.length === 0) {
      const fallback = FALLBACK_MODELS_MAP[companyId] || [
        { id: `${companyId}-m1`, company_id: companyId, name_ar: 'موديل قياسي (Standard)', name_en: 'Standard Model', name: 'Standard', body_type: 'سيدان', is_active: true }
      ];
      return { data: fallback, error: null, isFallback: true };
    }
    return { data: data, error: null };
  } catch (err: any) {
    const fallback = FALLBACK_MODELS_MAP[companyId] || [
      { id: `${companyId}-m1`, company_id: companyId, name_ar: 'موديل قياسي (Standard)', name_en: 'Standard Model', name: 'Standard', body_type: 'سيدان', is_active: true }
    ];
    return { data: fallback, error: null, isFallback: true };
  }
}

/**
 * Fetch model years for a given car_model_id from Supabase `car_years` or `model_years` table with local fallback
 */
export async function fetchModelYears(modelId: string): Promise<{ data: ModelYearDB[]; error: string | null; isFallback?: boolean }> {
  try {
    if (!modelId) return { data: [], error: null };

    // Try car_years first
    let res = await supabase
      .from('car_years')
      .select('*')
      .eq('model_id', modelId)
      .order('year', { ascending: false });

    if (res.error || !res.data || res.data.length === 0) {
      res = await supabase
        .from('model_years')
        .select('*')
        .eq('car_model_id', modelId)
        .order('year', { ascending: false });
    }

    if (res.error || !res.data || res.data.length === 0) {
      const yearsList: ModelYearDB[] = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2018, 2016, 2014, 2012, 2010].map((y) => ({
        id: `y-${modelId}-${y}`,
        model_id: modelId,
        car_model_id: modelId,
        year: y,
        generation: y >= 2024 ? 'الجيل الحديث' : 'الجيل السابق',
        obd_protocol: 'CAN-Bus CAN-H/CAN-L 500kbps'
      }));
      return { data: yearsList, error: null, isFallback: true };
    }
    return { data: res.data, error: null };
  } catch (err: any) {
    const yearsList: ModelYearDB[] = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2018, 2016, 2014, 2012, 2010].map((y) => ({
      id: `y-${modelId}-${y}`,
      model_id: modelId,
      car_model_id: modelId,
      year: y,
      generation: y >= 2024 ? 'الجيل الحديث' : 'الجيل السابق',
      obd_protocol: 'CAN-Bus CAN-H/CAN-L 500kbps'
    }));
    return { data: yearsList, error: null, isFallback: true };
  }
}

/**
 * Fetch engines for a given car_model_id from Supabase `engines` table with local fallback
 */
export async function fetchEngines(modelId: string): Promise<{ data: EngineDB[]; error: string | null; isFallback?: boolean }> {
  try {
    if (!modelId) return { data: [], error: null };

    const { data, error } = await supabase
      .from('engines')
      .select('*')
      .or(`model_id.eq.${modelId},car_model_id.eq.${modelId}`);

    if (error || !data || data.length === 0) {
      const defaultEngines: EngineDB[] = [
        {
          id: `eng-${modelId}-1`,
          model_id: modelId,
          car_model_id: modelId,
          engine_code: '1.6L 1ZR-FE Dual VVT-i',
          name: '1.6L 1ZR-FE Dual VVT-i',
          displacement_l: 1.6,
          fuel_type: 'بنزين',
          cylinders: 4,
          valves: 16,
          aspiration: 'Naturally Aspirated',
          ecu_type: 'Denso 32-bit ECU',
          injection_type: 'EFI Sequential'
        },
        {
          id: `eng-${modelId}-2`,
          model_id: modelId,
          car_model_id: modelId,
          engine_code: '2.0L Nu MPI / Dynamic Force',
          name: '2.0L Nu MPI / Dynamic Force',
          displacement_l: 2.0,
          fuel_type: 'بنزين',
          cylinders: 4,
          valves: 16,
          aspiration: 'Naturally Aspirated',
          ecu_type: 'Bosch / Continental',
          injection_type: 'GDI Direct Injection'
        },
        {
          id: `eng-${modelId}-3`,
          model_id: modelId,
          car_model_id: modelId,
          engine_code: '2.5L Hybrid Dual Fuel Engine',
          name: '2.5L Hybrid Dual Fuel Engine',
          displacement_l: 2.5,
          fuel_type: 'هايبرد (بنزين + كهرباء)',
          cylinders: 4,
          valves: 16,
          aspiration: 'Atkinson Cycle',
          ecu_type: 'Toyota Inverter HV-ECU',
          injection_type: 'Dual Injection (D-4S)'
        }
      ];
      return { data: defaultEngines, error: null, isFallback: true };
    }
    return { data: data, error: null };
  } catch (err: any) {
    const defaultEngines: EngineDB[] = [
      {
        id: `eng-${modelId}-1`,
        model_id: modelId,
        car_model_id: modelId,
        engine_code: '1.6L 1ZR-FE Dual VVT-i',
        name: '1.6L 1ZR-FE Dual VVT-i',
        displacement_l: 1.6,
        fuel_type: 'بنزين',
        cylinders: 4,
        valves: 16,
        aspiration: 'Naturally Aspirated',
        ecu_type: 'Denso 32-bit ECU',
        injection_type: 'EFI Sequential'
      }
    ];
    return { data: defaultEngines, error: null, isFallback: true };
  }
}

/**
 * Fetch vehicle systems from Supabase `vehicle_systems` table with local fallback
 */
export async function fetchVehicleSystems(): Promise<{ data: VehicleSystemDB[]; error: string | null; isFallback?: boolean }> {
  try {
    const { data, error } = await supabase
      .from('vehicle_systems')
      .select('*')
      .order('name_ar', { ascending: true });

    if (error || !data || data.length === 0) {
      return { data: FALLBACK_SYSTEMS, error: null, isFallback: true };
    }
    return { data: data, error: null };
  } catch (err: any) {
    return { data: FALLBACK_SYSTEMS, error: null, isFallback: true };
  }
}

/**
 * Fetch DTC wiring link for a given DTC code from Supabase `dtc_wiring_links` table with local fallback
 */
export async function fetchDtcWiringLink(dtcCode: string): Promise<{ data: DtcWiringLinkDB | null; error: string | null; isFallback?: boolean }> {
  try {
    if (!dtcCode) return { data: null, error: null };

    const { data, error } = await supabase
      .from('dtc_wiring_links')
      .select('*')
      .ilike('dtc_code', dtcCode)
      .maybeSingle();

    if (error || !data) {
      const fallback = FALLBACK_DTC_LINKS[dtcCode.toUpperCase()] || null;
      return { data: fallback, error: null, isFallback: true };
    }

    return { data, error: null };
  } catch (err: any) {
    const fallback = FALLBACK_DTC_LINKS[dtcCode.toUpperCase()] || null;
    return { data: fallback, error: null, isFallback: true };
  }
}

/**
 * Fetch wiring diagrams from Supabase `wiring_diagrams` table
 */
export async function fetchWiringDiagrams(modelId?: string, systemId?: string): Promise<{ data: WiringDiagramDB[]; error: string | null }> {
  try {
    let query = supabase.from('wiring_diagrams').select('*');
    if (modelId) {
      query = query.eq('car_model_id', modelId);
    }
    if (systemId) {
      query = query.eq('system_id', systemId);
    }

    const { data, error } = await query.order('title_ar', { ascending: true });

    if (error) {
      return { data: [], error: error.message };
    }
    return { data: data || [], error: null };
  } catch (err: any) {
    return { data: [], error: err?.message || 'خطأ أثناء جلب المخططات الكهربائية' };
  }
}

