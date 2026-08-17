import { supabase } from '../lib/supabase';

/**
 * Tests connection to the Supabase database
 */
export async function testSupabaseConnection(): Promise<{ success: boolean; message: string }> {
  try {
    const { data, error } = await supabase.from('car_companies').select('id').limit(1);
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: 'تم الاتصال بقاعدة بيانات Supabase بنجاح!' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'تعذر الاتصال بقاعدة البيانات' };
  }
}

/**
 * Fetch DTC Codes from Supabase `dtc_codes` table
 */
export async function fetchDtcCodes(): Promise<{ data: any[]; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('dtc_codes')
      .select('*')
      .order('code', { ascending: true });

    if (error) return { data: [], error: error.message };
    return { data: data || [], error: null };
  } catch (err: any) {
    return { data: [], error: err?.message || 'خطأ أثناء جلب أكواد الأعطال' };
  }
}

/**
 * Fetch Sensors from Supabase `sensors` table
 */
export async function fetchSensors(): Promise<{ data: any[]; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('sensors')
      .select('*')
      .order('name_ar', { ascending: true });

    if (error) return { data: [], error: error.message };
    return { data: data || [], error: null };
  } catch (err: any) {
    return { data: [], error: err?.message || 'خطأ أثناء جلب الحساسات' };
  }
}

/**
 * Fetch Repair Cases from Supabase `repair_cases` table
 */
export async function fetchRepairCases(): Promise<{ data: any[]; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('repair_cases')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return { data: [], error: error.message };
    return { data: data || [], error: null };
  } catch (err: any) {
    return { data: [], error: err?.message || 'خطأ أثناء جلب حالات الإصلاح' };
  }
}

/**
 * Fetch Courses from Supabase `courses` table
 */
export async function fetchCourses(): Promise<{ data: any[]; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('title_ar', { ascending: true });

    if (error) return { data: [], error: error.message };
    return { data: data || [], error: null };
  } catch (err: any) {
    return { data: [], error: err?.message || 'خطأ أثناء جلب الدورات' };
  }
}
