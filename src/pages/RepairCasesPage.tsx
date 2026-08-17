import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import {
  Wrench,
  Search,
  Plus,
  CheckCircle2,
  XCircle,
  ThumbsUp,
  Gauge,
  Cpu,
  FileText,
  DollarSign,
  Car,
  Filter
} from 'lucide-react';
import { fetchRepairCases, rateRepairCase, RepairCaseDB } from '../services/repairCaseService';
import { NewRepairCaseModal } from '../components/repairCases/NewRepairCaseModal';
import { useApp } from '../context/AppContext';

export const RepairCasesPage: React.FC = () => {
  const { navigateToWiring } = useApp();

  const [cases, setCases] = useState<RepairCaseDB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Search & Filters State
  const [companyFilter, setCompanyFilter] = useState<string>('');
  const [modelFilter, setModelFilter] = useState<string>('');
  const [dtcFilter, setDtcFilter] = useState<string>('');
  const [systemFilter, setSystemFilter] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const loadData = async () => {
    setLoading(true);
    const res = await fetchRepairCases({
      company: companyFilter,
      model: modelFilter,
      dtcCode: dtcFilter,
      system: systemFilter
    });
    setCases(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [companyFilter, modelFilter, dtcFilter, systemFilter]);

  const handleRating = async (id: string, solved: boolean) => {
    await rateRepairCase(id, solved);
    loadData();
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-6xl mx-auto">
      <SectionHeader
        title="ذاكرة ورش الإصلاح الذكية (Real Repair Cases Database)"
        subtitle="حالات عطل واقعية مع المقاييس والخطوات والحلول التأسيسية التي أثبتت نجاحها في الورش"
        icon={<Wrench className="w-5 h-5 text-amber-400" />}
        action={
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-extrabold text-xs shadow-lg transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة حالة إصلاح جديدة</span>
          </button>
        }
      />

      {/* Filter Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
          <Filter className="w-4 h-4" />
          <span>البحث السريع والتصفية المتقدمة للحالات:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">الشركة (مثل Toyota):</label>
            <div className="relative">
              <input
                type="text"
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                placeholder="تويوتا / Toyota..."
                className="w-full px-3 py-2 pr-8 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500/50"
              />
              <Car className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">الموديل (مثل Corolla):</label>
            <div className="relative">
              <input
                type="text"
                value={modelFilter}
                onChange={(e) => setModelFilter(e.target.value)}
                placeholder="كورولا / Camry..."
                className="w-full px-3 py-2 pr-8 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500/50"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">كود DTC (مثل P0335):</label>
            <div className="relative">
              <input
                type="text"
                value={dtcFilter}
                onChange={(e) => setDtcFilter(e.target.value)}
                placeholder="P0335, C0035..."
                className="w-full px-3 py-2 pr-8 rounded-xl bg-slate-950 border border-slate-800 text-amber-300 font-mono text-xs focus:outline-none focus:border-amber-500/50"
              />
              <Cpu className="w-3.5 h-3.5 text-amber-400 absolute right-2.5 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">النظام (مثل EFI/ABS):</label>
            <div className="relative">
              <input
                type="text"
                value={systemFilter}
                onChange={(e) => setSystemFilter(e.target.value)}
                placeholder="EFI, ABS, Charging..."
                className="w-full px-3 py-2 pr-8 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500/50"
              />
              <Wrench className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-2.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Cases List */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs font-bold space-y-2">
          <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin mx-auto" />
          <p>جاري تحميل سجلات الإصلاح والتشخيص الذكي...</p>
        </div>
      ) : cases.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 text-slate-400 text-xs space-y-3">
          <Wrench className="w-10 h-10 mx-auto text-slate-600" />
          <p className="font-bold">لا توجد حالات إصلاح مطابقة لخيارات البحث الحالية.</p>
          <button
            onClick={() => {
              setCompanyFilter('');
              setModelFilter('');
              setDtcFilter('');
              setSystemFilter('');
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 text-amber-400 font-bold"
          >
            إعادة ضبط الفلاتر
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cases.map((rc) => (
            <div
              key={rc.id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-2xl transition-all hover:border-slate-700"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base text-slate-100 font-tajawal">
                      {rc.vehicle_company} {rc.vehicle_model} ({rc.vehicle_year})
                    </span>
                    {rc.dtc_code && (
                      <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono font-bold text-xs">
                        {rc.dtc_code}
                      </span>
                    )}
                    {rc.system && (
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px]">
                        نظام {rc.system}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">محرك: {rc.engine || 'غير محدد'}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="emerald" size="sm">
                    <CheckCircle2 className="w-3.5 h-3.5 ml-1 inline" />
                    تم الإصلاح والمصادقة
                  </Badge>
                  <span className="text-[11px] text-slate-500 font-mono">{rc.upvotes || 1} تأكيد</span>
                </div>
              </div>

              {/* Symptom & Cause */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <h4 className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>وصف الشكوى والأعراض:</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{rc.customer_problem}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>السبب الجذري الحقيقي (Root Cause):</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{rc.diagnosis_result}</p>
                </div>
              </div>

              {/* Measurements Table if present */}
              {rc.measurements && Array.isArray(rc.measurements) && rc.measurements.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5" />
                    <span>قياسات الملتيميتر المسجلة أثناء الفحص:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    {rc.measurements.map((m: any, idx: number) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
                        <span className="text-[10px] text-slate-400 block font-bold">{m.test}</span>
                        <span className="text-amber-300 font-mono font-bold block">{m.measured}</span>
                        <span className="text-[10px] text-slate-500 font-mono">المعيار: {m.standard}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Replaced Parts & Final Solution */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-300 font-bold">
                  <span>القطع المستبدلة: {rc.replaced_parts || 'تنظيف وإصلاح أسلاك'}</span>
                  <span className="text-amber-400 font-mono">التكلفة: {rc.repair_cost || 'غير محددة'}</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  <strong>الحل النهائي:</strong> {rc.repair_solution}
                </p>
                {rc.technician_notes && (
                  <p className="text-[11px] text-slate-400 italic pt-1 border-t border-emerald-500/20">
                    💡 ملاحظة الفني: {rc.technician_notes}
                  </p>
                )}
              </div>

              {/* Quality Rating / Wiring Link Bar */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                {rc.dtc_code && (
                  <button
                    onClick={() => navigateToWiring(rc.dtc_code)}
                    className="text-amber-400 hover:underline font-bold flex items-center gap-1"
                  >
                    <span>عرض المخطط الكهربائي المرتبط بـ {rc.dtc_code} ←</span>
                  </button>
                )}

                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-bold">هل أفادتك هذه الحالة في ورشتك؟</span>
                  <button
                    onClick={() => handleRating(rc.id, true)}
                    className="px-3 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-bold flex items-center gap-1 border border-emerald-500/30 transition-all"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>نعم، تم الحل 👍</span>
                  </button>
                  <button
                    onClick={() => handleRating(rc.id, false)}
                    className="px-3 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 font-bold border border-slate-800 transition-all"
                  >
                    <span>لا 👎</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Repair Case Modal */}
      <NewRepairCaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          loadData();
        }}
      />
    </div>
  );
};
