import { supabase } from '../lib/supabase';

export interface MultimeterMeasurement {
  test: string;
  measured: string;
  standard: string;
  result: 'normal' | 'inspection_needed' | 'defective';
}

export interface RepairCaseDB {
  id: string;
  vehicle_company: string;
  vehicle_model: string;
  vehicle_year: number;
  engine?: string;
  system?: string;
  dtc_code?: string;
  customer_problem: string;
  diagnosis_result: string;
  measurements?: MultimeterMeasurement[];
  replaced_parts?: string;
  repair_solution: string;
  repair_cost?: string;
  technician_notes?: string;
  is_solved?: boolean;
  upvotes?: number;
  created_at?: string;
}

const LOCAL_STORAGE_KEY = 'autoelec_repair_cases_db_v2';

// Initial Seed Repair Cases
const INITIAL_SEED_CASES: RepairCaseDB[] = [
  {
    id: 'rc-toyota-01',
    vehicle_company: 'Toyota',
    vehicle_model: 'Corolla',
    vehicle_year: 2012,
    engine: '1.6L 1ZR-FE Dual VVT-i',
    system: 'EFI',
    dtc_code: 'P0335',
    customer_problem: 'توقف مفاجئ للمحرك أثناء القيادة وصعوبة بالغة في إعادة التشغيل مع إضاءة لمبة فحص المحرك Check Engine',
    diagnosis_result: 'انقطاع إشارة حساس الكرنك CKP بسبب تآكل وتضرر السلك الأخضر/الأبيض في الفيشة المتصلة بـ ECU Pin B18',
    measurements: [
      { test: 'جهد التغذية (VCC)', measured: '5.01V', standard: '5.0V', result: 'normal' },
      { test: 'مقاومة خط الأرضي (GND)', measured: '0.2 Ω', standard: '< 0.5 Ω', result: 'normal' },
      { test: 'تردد إشارة الحساس (Signal)', measured: '0.00V (قطع ثابت)', standard: '0.5V-4.5V AC Pulse', result: 'defective' }
    ],
    replaced_parts: 'فيشة حساس الكرنك الجديدة + إصلاح وصلة السلك وتغليفه بالحراري العازل (Heat Shrink)',
    repair_solution: 'تم استبدال فيشة حساس الكرنك، تنظيف نقاط التوصيل بـ Contact Cleaner، وإعادة أخذ قياسات التردد 3.2V AC وظهرت نبضات الحساس سليمة واختفى الكود P0335.',
    repair_cost: '150 ر.س',
    technician_notes: 'ينصح دائماً بفحص ظفيرة حساس الكرنك القريبة من بكرة الكرنك للتأكد من عدم احتكاك السير بها.',
    is_solved: true,
    upvotes: 18,
    created_at: new Date().toISOString()
  },
  {
    id: 'rc-hyundai-02',
    vehicle_company: 'Hyundai',
    vehicle_model: 'Elantra',
    vehicle_year: 2020,
    engine: '2.0L Nu MPI',
    system: 'ABS',
    dtc_code: 'C0035',
    customer_problem: 'إضاءة لمبة ABS و Traction Control باستمرار وخفة في بدال الفرامل عند السرعات العالية',
    diagnosis_result: 'خلل في قراءة حساس سرعة العجلة الأمامية اليسرى (FL Sensor) بسبب تكاثف أتربة برادة الفرامل على الحلقة المغناطيسية',
    measurements: [
      { test: 'مقاومة ملف الحساس', measured: '1.45 kΩ', standard: '1.2 - 1.6 kΩ', result: 'normal' },
      { test: 'إشارة السرعة عند تدوير العجلة', measured: '0.1V AC (ضعيفة جداً)', standard: '> 0.8V AC', result: 'defective' }
    ],
    replaced_parts: 'تنظيف الحلقة المغناطيسية للمحمل (Bearing Magnetic Ring) بدون استبدال قطع',
    repair_solution: 'تنظيف حلقة السنسر وإزالة البرادة المعدنية، وإعادة قراءة البث الحي فظهرت سرعة العجلة متطابقة مع باقي العجلات 40 km/h.',
    repair_cost: '80 ر.س',
    technician_notes: 'لا تتسرع باستبدال حساس ABS قبل تنظيف مكان الفيشة وحلقة الرولمان بلي.',
    is_solved: true,
    upvotes: 12,
    created_at: new Date().toISOString()
  },
  {
    id: 'rc-camry-03',
    vehicle_company: 'Toyota',
    vehicle_model: 'Camry',
    vehicle_year: 2018,
    engine: '2.5L A25A-FKS',
    system: 'CHARGING',
    dtc_code: 'P0620',
    customer_problem: 'تفريغ البطارية بسرعة كبيرة أثناء السير وإضاءة لمبة البطارية في الطبلون',
    diagnosis_result: 'تلف كتاوت الدينامو (Regulator Unit) وانصهار الفيوز الفرعي ALT-S 7.5A',
    measurements: [
      { test: 'جهد الشحن عند الدوران', measured: '11.8 V', standard: '13.8V - 14.5V', result: 'defective' },
      { test: 'فيوز ALT-S 7.5A', measured: 'مقطوع (Open Circuit)', standard: 'موصول 0 Ω', result: 'defective' }
    ],
    replaced_parts: 'منظم جهد الدينامو (Alternator Regulator) + فيوز ALT-S 7.5A',
    repair_solution: 'استبدال الكتاوت والفيوز، وأصبحت قراءة الدينامو 14.2V تحت حمل المكيف والأنوار.',
    repair_cost: '220 ر.س',
    technician_notes: 'تأكد من سلامة ريليه ALT قبل تغيير الدينامو كاملاً.',
    is_solved: true,
    upvotes: 24,
    created_at: new Date().toISOString()
  }
];

/**
 * Fetch repair cases with optional filters from Supabase + Local Storage
 */
export async function fetchRepairCases(filters?: {
  company?: string;
  model?: string;
  dtcCode?: string;
  system?: string;
}): Promise<{ data: RepairCaseDB[]; error: string | null; isFallback?: boolean }> {
  try {
    let query = supabase.from('repair_cases').select('*').order('created_at', { ascending: false });

    if (filters?.company) {
      query = query.ilike('vehicle_company', `%${filters.company}%`);
    }
    if (filters?.model) {
      query = query.ilike('vehicle_model', `%${filters.model}%`);
    }
    if (filters?.dtcCode) {
      query = query.ilike('dtc_code', `%${filters.dtcCode}%`);
    }
    if (filters?.system) {
      query = query.ilike('system', `%${filters.system}%`);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      // Use Local Storage + Seed Fallback
      const local = getLocalRepairCases();
      let filtered = local;
      if (filters?.company) {
        filtered = filtered.filter((c) => c.vehicle_company.toLowerCase().includes(filters.company!.toLowerCase()));
      }
      if (filters?.model) {
        filtered = filtered.filter((c) => c.vehicle_model.toLowerCase().includes(filters.model!.toLowerCase()));
      }
      if (filters?.dtcCode) {
        filtered = filtered.filter((c) => (c.dtc_code || '').toLowerCase().includes(filters.dtcCode!.toLowerCase()));
      }
      if (filters?.system) {
        filtered = filtered.filter((c) => (c.system || '').toLowerCase().includes(filters.system!.toLowerCase()));
      }

      return { data: filtered, error: null, isFallback: true };
    }

    return { data, error: null };
  } catch (err: any) {
    const local = getLocalRepairCases();
    return { data: local, error: null, isFallback: true };
  }
}

/**
 * Create a new repair case in Supabase AND local state
 */
export async function createRepairCase(caseData: Omit<RepairCaseDB, 'id' | 'created_at'>): Promise<{ data: RepairCaseDB | null; error: string | null }> {
  const newCase: RepairCaseDB = {
    ...caseData,
    id: `rc-custom-${Date.now()}`,
    is_solved: caseData.is_solved !== undefined ? caseData.is_solved : true,
    upvotes: 1,
    created_at: new Date().toISOString()
  };

  // Save to Local Storage
  saveLocalRepairCase(newCase);

  try {
    const { data, error } = await supabase.from('repair_cases').insert([newCase]).select().single();
    if (error) {
      console.warn('Supabase insert repair_cases error, saved locally:', error.message);
      return { data: newCase, error: null };
    }
    return { data: data || newCase, error: null };
  } catch (err: any) {
    return { data: newCase, error: null };
  }
}

/**
 * Rate diagnostic feedback / solved status (هل تم حل المشكلة)
 */
export async function rateRepairCase(id: string, isSolved: boolean): Promise<void> {
  const cases = getLocalRepairCases();
  const index = cases.findIndex((c) => c.id === id);
  if (index !== -1) {
    cases[index].is_solved = isSolved;
    if (isSolved) {
      cases[index].upvotes = (cases[index].upvotes || 0) + 1;
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cases));
  }

  try {
    await supabase.from('repair_cases').update({ is_solved: isSolved }).eq('id', id);
  } catch (err) {
    // Silent
  }
}

// Helpers
function getLocalRepairCases(): RepairCaseDB[] {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return INITIAL_SEED_CASES;
    }
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_SEED_CASES));
  return INITIAL_SEED_CASES;
}

function saveLocalRepairCase(item: RepairCaseDB): void {
  const cases = getLocalRepairCases();
  const updated = [item, ...cases];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
}
