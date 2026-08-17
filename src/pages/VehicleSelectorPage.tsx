import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { fetchCarCompanies, fetchCarModels, CarCompanyDB, CarModelDB } from '../services/vehicleService';
import { Car, CheckCircle, Sparkles, Loader2, AlertCircle, Info } from 'lucide-react';

interface CompanyWithModels extends CarCompanyDB {
  modelsList?: CarModelDB[];
  loadingModels?: boolean;
}

export const VehicleSelectorPage: React.FC = () => {
  const { selectedVehicle, setIsVehicleModalOpen } = useApp();

  const [companies, setCompanies] = useState<CompanyWithModels[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadCompaniesAndModels = async () => {
      setLoading(true);
      setError(null);
      const res = await fetchCarCompanies();
      if (!isMounted) return;

      if (res.error) {
        setError(res.error);
        setCompanies([]);
        setLoading(false);
        return;
      }

      const compList = res.data;
      setCompanies(compList.map((c) => ({ ...c, loadingModels: true })));
      setLoading(false);

      // Load models for each company
      for (const company of compList) {
        const modelsRes = await fetchCarModels(company.id);
        if (!isMounted) return;

        setCompanies((prev) =>
          prev.map((item) =>
            item.id === company.id
              ? {
                  ...item,
                  modelsList: modelsRes.data || [],
                  loadingModels: false
                }
              : item
          )
        );
      }
    };

    loadCompaniesAndModels();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      <SectionHeader
        title="تحديد وتخصيص السيارة والمنظومة"
        subtitle="حفظ حالة السيارة النشطة لتشخيص الأعطال بدقة جغرافية وميكانيكية مطابقة لمواصفات الشركة المصنعة"
        icon={<Car className="w-5 h-5" />}
        action={
          <button
            onClick={() => setIsVehicleModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>تحديث واختيار سيارة أخرى</span>
          </button>
        }
      />

      {/* Active Vehicle Summary Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-slate-100 font-tajawal flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span>السيارة النشطة في الجلسة الحالية</span>
        </h3>

        {selectedVehicle ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <p className="text-xs text-slate-400">الشركة المصنعة</p>
              <p className="text-base font-bold text-amber-400 mt-1 font-tajawal">
                {selectedVehicle.companyName}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <p className="text-xs text-slate-400">الموديل والسنة</p>
              <p className="text-base font-bold text-slate-100 mt-1 font-tajawal">
                {selectedVehicle.modelName} ({selectedVehicle.year})
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <p className="text-xs text-slate-400">سعة ونوع المحرك</p>
              <p className="text-base font-bold text-blue-400 mt-1 font-tajawal">
                {selectedVehicle.engineName}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <p className="text-xs text-slate-400">المنظومة الكهربائية</p>
              <p className="text-base font-bold text-cyan-400 mt-1 font-tajawal">
                {selectedVehicle.systemName}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-400">لم تقم بتحديد سيارة بعد. انقر فوق الزر أعلاه للبدء.</p>
        )}
      </div>

      {/* Car Companies Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-100 font-tajawal">جميع الشركات المتاحة في قاعدة البيانات (Supabase)</h3>

        {loading ? (
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3 flex flex-col items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
            <p className="text-xs text-slate-400">جاري تحميل شركات السيارات من قاعدة البيانات...</p>
          </div>
        ) : error ? (
          <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
            <span>حدث خطأ في جلب البيانات: {error}</span>
          </div>
        ) : companies.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2 flex flex-col items-center justify-center">
            <Info className="w-6 h-6 text-amber-400" />
            <p className="text-sm font-bold text-slate-300">لا توجد شركات سيارات متوفرة حالياً</p>
            <p className="text-xs text-slate-500">لم يتم العثور على بيانات في جدول car_companies</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {companies.map((company) => (
              <div
                key={company.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{company.logo_url || '🚗'}</span>
                  <div>
                    <h4 className="text-base font-bold text-slate-100 font-tajawal">{company.name_ar}</h4>
                    <p className="text-xs text-slate-400">{company.country_origin || company.name_en}</p>
                  </div>
                </div>
                <div className="space-y-1 pt-2 border-t border-slate-800">
                  <p className="text-xs font-semibold text-slate-300">الموديلات المتاحة:</p>
                  {company.loadingModels ? (
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <Loader2 className="w-3 h-3 animate-spin text-amber-400" />
                      <span>تحميل الموديلات...</span>
                    </div>
                  ) : !company.modelsList || company.modelsList.length === 0 ? (
                    <p className="text-[11px] text-slate-500">لا توجد موديلات مسجلة</p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {company.modelsList.map((m) => (
                        <span key={m.id} className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 text-[11px]">
                          {m.name_ar}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
