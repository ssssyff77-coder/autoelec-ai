import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  fetchCarCompanies,
  fetchCarModels,
  fetchModelYears,
  fetchEngines,
  fetchVehicleSystems,
  CarCompanyDB,
  CarModelDB,
  ModelYearDB,
  EngineDB,
  VehicleSystemDB
} from '../../services/vehicleService';
import { SUPABASE_SQL_SETUP_SCRIPT } from '../../data/supabaseSqlScript';
import { X, Check, Car, Cpu, Sparkles, Loader2, AlertCircle, Info, Database, Copy, CheckCircle2, Code } from 'lucide-react';

export const VehicleSelectorModal: React.FC = () => {
  const { isVehicleModalOpen, setIsVehicleModalOpen, selectedVehicle, setSelectedVehicle } = useApp();

  // Selected State IDs
  const [companyId, setCompanyId] = useState<string>(selectedVehicle?.companyId || '');
  const [modelId, setModelId] = useState<string>(selectedVehicle?.modelId || '');
  const [year, setYear] = useState<number>(selectedVehicle?.year || new Date().getFullYear());
  const [engineId, setEngineId] = useState<string>(selectedVehicle?.engineId || '');
  const [systemId, setSystemId] = useState<string>(selectedVehicle?.systemId || '');

  // DB Data States
  const [companies, setCompanies] = useState<CarCompanyDB[]>([]);
  const [models, setModels] = useState<CarModelDB[]>([]);
  const [years, setYears] = useState<ModelYearDB[]>([]);
  const [engines, setEngines] = useState<EngineDB[]>([]);
  const [systems, setSystems] = useState<VehicleSystemDB[]>([]);

  // Loading States
  const [loadingCompanies, setLoadingCompanies] = useState<boolean>(false);
  const [loadingModels, setLoadingModels] = useState<boolean>(false);
  const [loadingYears, setLoadingYears] = useState<boolean>(false);
  const [loadingEngines, setLoadingEngines] = useState<boolean>(false);
  const [loadingSystems, setLoadingSystems] = useState<boolean>(false);

  // Status & Fallback Indicator
  const [isFallbackMode, setIsFallbackMode] = useState<boolean>(false);
  const [showSqlModal, setShowSqlModal] = useState<boolean>(false);
  const [copiedSql, setCopiedSql] = useState<boolean>(false);

  // Error States
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 1. Fetch Companies and Systems on Modal Open
  useEffect(() => {
    if (!isVehicleModalOpen) return;

    const loadInitialData = async () => {
      setErrorMsg(null);
      setLoadingCompanies(true);
      setLoadingSystems(true);

      const [compRes, sysRes] = await Promise.all([
        fetchCarCompanies(),
        fetchVehicleSystems()
      ]);

      setLoadingCompanies(false);
      setLoadingSystems(false);

      if (compRes.isFallback || sysRes.isFallback) {
        setIsFallbackMode(true);
      } else {
        setIsFallbackMode(false);
      }

      if (compRes.error) {
        setErrorMsg(compRes.error);
      } else {
        setCompanies(compRes.data);
        if (compRes.data.length > 0 && !companyId) {
          setCompanyId(compRes.data[0].id);
        }
      }

      if (sysRes.error) {
        setErrorMsg((prev) => prev || sysRes.error);
      } else {
        setSystems(sysRes.data);
        if (sysRes.data.length > 0 && !systemId) {
          setSystemId(sysRes.data[0].id);
        }
      }
    };

    loadInitialData();
  }, [isVehicleModalOpen]);

  // 2. Fetch Car Models when Company changes
  useEffect(() => {
    if (!companyId) {
      setModels([]);
      return;
    }

    const loadModels = async () => {
      setLoadingModels(true);
      setErrorMsg(null);
      const res = await fetchCarModels(companyId);
      setLoadingModels(false);

      if (res.error) {
        setErrorMsg(res.error);
        setModels([]);
      } else {
        setModels(res.data);
        if (res.data.length > 0) {
          const firstModel = res.data[0];
          setModelId(firstModel.id);
        } else {
          setModelId('');
          setYears([]);
          setEngines([]);
        }
      }
    };

    loadModels();
  }, [companyId]);

  // 3. Fetch Model Years and Engines when Model changes
  useEffect(() => {
    if (!modelId) {
      setYears([]);
      setEngines([]);
      return;
    }

    const loadModelDetails = async () => {
      setLoadingYears(true);
      setLoadingEngines(true);
      setErrorMsg(null);

      const [yearsRes, enginesRes] = await Promise.all([
        fetchModelYears(modelId),
        fetchEngines(modelId)
      ]);

      setLoadingYears(false);
      setLoadingEngines(false);

      if (yearsRes.error) {
        setErrorMsg(yearsRes.error);
        setYears([]);
      } else {
        setYears(yearsRes.data);
        if (yearsRes.data.length > 0) {
          setYear(yearsRes.data[0].year);
        }
      }

      if (enginesRes.error) {
        setErrorMsg((prev) => prev || enginesRes.error);
        setEngines([]);
      } else {
        setEngines(enginesRes.data);
        if (enginesRes.data.length > 0) {
          setEngineId(enginesRes.data[0].id);
        } else {
          setEngineId('');
        }
      }
    };

    loadModelDetails();
  }, [modelId]);

  if (!isVehicleModalOpen) return null;

  const currentCompany = companies.find((c) => c.id === companyId);
  const currentModel = models.find((m) => m.id === modelId);
  const currentEngine = engines.find((e) => e.id === engineId);
  const currentSystem = systems.find((s) => s.id === systemId);

  const handleCompanyChange = (id: string) => {
    setCompanyId(id);
  };

  const handleModelChange = (id: string) => {
    setModelId(id);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP_SCRIPT);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const handleSave = () => {
    const selectedObj = {
      companyId: currentCompany?.id || companyId,
      companyName: currentCompany?.name_ar || 'غير محدد',
      companyLogo: currentCompany?.logo_url || '🚗',
      modelId: currentModel?.id || modelId,
      modelName: currentModel?.name_ar || 'غير محدد',
      year: year,
      engineId: currentEngine?.id || engineId,
      engineName: currentEngine ? `${currentEngine.displacement_l}L ${currentEngine.engine_code}` : 'محرك افتراضي',
      systemId: currentSystem?.id || systemId,
      systemName: currentSystem?.name_ar || 'منظومة افتراضية'
    };

    setSelectedVehicle(selectedObj);
    setIsVehicleModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-100 font-tajawal">تحديد مواصفات السيارة والمنظومة (Supabase DB)</h3>
              <p className="text-xs text-slate-400 mt-0.5">اختر معلومات السيارة للتخصيص الدقيق من قاعدة البيانات</p>
            </div>
          </div>
          <button
            onClick={() => setIsVehicleModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Database Status Banner */}
        <div className="mx-6 mt-4 p-3 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300">
              حالة قاعدة البيانات: <strong className={isFallbackMode ? 'text-amber-400' : 'text-emerald-400'}>{isFallbackMode ? 'قاعدة بيانات محلية متكاملة (Local Active Seed)' : 'متصل بـ Supabase Live DB'}</strong>
            </span>
          </div>

          <button
            onClick={() => setShowSqlModal(!showSqlModal)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-[11px] flex items-center gap-1.5 transition"
          >
            <Code className="w-3.5 h-3.5" />
            <span>عرض كود السكربت SQL لـ Supabase</span>
          </button>
        </div>

        {/* SQL Script Viewer Panel if toggled */}
        {showSqlModal && (
          <div className="mx-6 mt-2 p-4 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-3 animate-fadeIn text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 font-tajawal flex items-center gap-2">
                <Code className="w-4 h-4" />
                <span>سكربت إنشاء جداول السيارات في Supabase (SQL Script):</span>
              </span>
              <button
                onClick={handleCopySql}
                className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1 hover:bg-amber-400 transition"
              >
                {copiedSql ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSql ? 'تم النسخ!' : 'نسخ السكربت SQL'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              انسخ هذا السكربت وقم بتشغيله في نافذة <strong>SQL Editor</strong> بدشبورد Supabase لإنشاء كافة الجداول وتفعيل صلاحيات القراءة (RLS) تلقائياً:
            </p>
            <pre className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-emerald-400 font-mono text-[10px] max-h-40 overflow-y-auto custom-scrollbar dir-ltr text-left">
              {SUPABASE_SQL_SETUP_SCRIPT}
            </pre>
          </div>
        )}

        {/* Global Error Banner */}
        {errorMsg && (
          <div className="mx-6 mt-3 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto custom-scrollbar">
          {/* 1. الشركة المصنعة */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-400">1. الشركة المصنعة (Car Companies)</label>
              {loadingCompanies && <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />}
            </div>

            {loadingCompanies ? (
              <div className="p-6 text-center text-slate-400 text-xs flex items-center justify-center gap-2 bg-slate-950/40 rounded-2xl border border-slate-800">
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                <span>جاري تحميل شركات السيارات من قاعدة البيانات...</span>
              </div>
            ) : companies.length === 0 ? (
              <div className="p-4 text-center text-slate-400 text-xs bg-slate-950/40 rounded-2xl border border-slate-800 flex items-center justify-center gap-2">
                <Info className="w-4 h-4 text-amber-400" />
                <span>لا توجد شركات سيارات متوفرة في قاعدة البيانات</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {companies.map((comp) => {
                  const active = comp.id === companyId;
                  return (
                    <button
                      key={comp.id}
                      onClick={() => handleCompanyChange(comp.id)}
                      className={`p-3 rounded-2xl border text-right transition-all flex items-center gap-2.5 ${
                        active
                          ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 shadow-md'
                          : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="text-xl">{comp.logo_url || '🚗'}</span>
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold truncate">{comp.name_ar}</p>
                        <p className="text-[10px] text-slate-500">{comp.country_origin || comp.name_en}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. الموديل و السنة */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* الموديل */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-400">2. موديل السيارة (Car Models)</label>
                {loadingModels && <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />}
              </div>

              {loadingModels ? (
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  <span>جاري تحميل الموديلات...</span>
                </div>
              ) : models.length === 0 ? (
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-amber-400" />
                  <span>لا توجد موديلات متاحة لهذه الشركة</span>
                </div>
              ) : (
                <select
                  value={modelId}
                  onChange={(e) => handleModelChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-amber-500"
                >
                  {models.map((mod) => (
                    <option key={mod.id} value={mod.id}>
                      {mod.name_ar} ({mod.name_en})
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* سنة الصنع */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-400">3. سنة الصنع (Model Years)</label>
                {loadingYears && <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />}
              </div>

              {loadingYears ? (
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  <span>جاري تحميل السنوات...</span>
                </div>
              ) : years.length === 0 ? (
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-amber-400" />
                  <span>لا توجد سنوات صنع لهذا الموديل</span>
                </div>
              ) : (
                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-amber-500"
                >
                  {years.map((y) => (
                    <option key={y.id} value={y.year}>
                      موديل {y.year} {y.generation ? `(${y.generation})` : ''}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* 3. المحرك */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-400">4. المحرك (Engines)</label>
              {loadingEngines && <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />}
            </div>

            {loadingEngines ? (
              <div className="p-4 text-center text-slate-400 text-xs bg-slate-950/40 rounded-2xl border border-slate-800 flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                <span>جاري تحميل المحركات...</span>
              </div>
            ) : engines.length === 0 ? (
              <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-2xl text-xs text-slate-400 flex items-center justify-center gap-2">
                <Info className="w-4 h-4 text-amber-400" />
                <span>لا توجد محركات مسجلة لهذا الموديل</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {engines.map((eng) => {
                  const active = eng.id === engineId;
                  return (
                    <button
                      key={eng.id}
                      onClick={() => setEngineId(eng.id)}
                      className={`p-3 rounded-xl border text-right transition-all flex items-center justify-between ${
                        active
                          ? 'bg-blue-500/15 border-blue-500/50 text-blue-300'
                          : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold">{eng.engine_code} ({eng.displacement_l}L)</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {eng.cylinders} سلندر • {eng.fuel_type} • {eng.ecu_type || 'ECU Standard'}
                        </p>
                      </div>
                      {active && <Check className="w-4 h-4 text-blue-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 4. المنظومة المستهدفة */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-400">5. المنظومة الكهربائية المراد فحصها (Vehicle Systems)</label>
              {loadingSystems && <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />}
            </div>

            {loadingSystems ? (
              <div className="p-4 text-center text-slate-400 text-xs bg-slate-950/40 rounded-2xl border border-slate-800 flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                <span>جاري تحميل الأنظمة...</span>
              </div>
            ) : systems.length === 0 ? (
              <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-2xl text-xs text-slate-400 flex items-center justify-center gap-2">
                <Info className="w-4 h-4 text-amber-400" />
                <span>لا توجد أنظمة كهربائية في قاعدة البيانات</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {systems.map((sys) => {
                  const active = sys.id === systemId;
                  return (
                    <button
                      key={sys.id}
                      onClick={() => setSystemId(sys.id)}
                      className={`p-2.5 rounded-xl border text-right text-xs transition-all flex items-center gap-2.5 ${
                        active
                          ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 font-bold'
                          : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-400'
                      }`}
                    >
                      <Cpu className="w-4 h-4 shrink-0 text-amber-400" />
                      <span className="truncate">{sys.name_ar}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={() => setIsVehicleModalOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
          >
            إلغاء
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>تأكيد الاختيار وحفظ التخصيص</span>
          </button>
        </div>
      </div>
    </div>
  );
};
