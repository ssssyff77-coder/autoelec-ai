import React, { useState } from 'react';
import { X, Wrench, Plus, CheckCircle2, DollarSign, Clock, Layers } from 'lucide-react';
import { createRepairCase, MultimeterMeasurement } from '../../services/repairCaseService';

interface NewRepairCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialVehicle?: {
    company: string;
    model: string;
    year: number;
    engine: string;
    system: string;
    dtcCode?: string;
  };
}

export const NewRepairCaseModal: React.FC<NewRepairCaseModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialVehicle
}) => {
  const [company, setCompany] = useState(initialVehicle?.company || 'Toyota');
  const [model, setModel] = useState(initialVehicle?.model || 'Corolla');
  const [year, setYear] = useState(initialVehicle?.year || 2012);
  const [engine, setEngine] = useState(initialVehicle?.engine || '1.6L 1ZR-FE');
  const [system, setSystem] = useState(initialVehicle?.system || 'EFI');
  const [dtcCode, setDtcCode] = useState(initialVehicle?.dtcCode || 'P0335');

  const [customerProblem, setCustomerProblem] = useState('');
  const [diagnosisResult, setDiagnosisResult] = useState('');
  const [replacedParts, setReplacedParts] = useState('');
  const [repairSolution, setRepairSolution] = useState('');
  const [repairCost, setRepairCost] = useState('150 ر.س');
  const [technicianNotes, setTechnicianNotes] = useState('');

  // Multimeter Measurements State
  const [vccMeasured, setVccMeasured] = useState('5.0V');
  const [gndMeasured, setGndMeasured] = useState('0.2 Ω');
  const [sigMeasured, setSigMeasured] = useState('3.2V AC');

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerProblem || !repairSolution || !diagnosisResult) {
      alert('يرجى تعبئة الحقول الأساسية: الشكوى، نتيجة التشخيص، والحل النهائي.');
      return;
    }

    setIsSubmitting(true);

    const measurements: MultimeterMeasurement[] = [
      { test: 'جهد التغذية (VCC)', measured: vccMeasured, standard: '5.0V / 12V', result: 'normal' },
      { test: 'مقاومة خط الأرضي (GND)', measured: gndMeasured, standard: '< 0.5 Ω', result: 'normal' },
      { test: 'إشارة الحساس الحية (Signal)', measured: sigMeasured, standard: '0.5V - 4.5V AC Pulse', result: 'normal' }
    ];

    await createRepairCase({
      vehicle_company: company,
      vehicle_model: model,
      vehicle_year: Number(year),
      engine: engine,
      system: system,
      dtc_code: dtcCode,
      customer_problem: customerProblem,
      diagnosis_result: diagnosisResult,
      measurements: measurements,
      replaced_parts: replacedParts,
      repair_solution: repairSolution,
      repair_cost: repairCost,
      technician_notes: technicianNotes,
      is_solved: true
    });

    setIsSubmitting(false);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 my-8 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 font-tajawal">توثيق حالة إصلاح جديدة (New Repair Case)</h3>
              <p className="text-xs text-slate-400">إضافة خبرة واقعية لقاعدة بيانات التشخيص الذكية DevForge AI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-slate-100 border border-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Vehicle Info Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div>
              <label className="block text-slate-400 font-bold mb-1">شركة السيارة:</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200"
                placeholder="Toyota"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">الموديل:</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200"
                placeholder="Corolla"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">سنة الصنع:</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">المحرك:</label>
              <input
                type="text"
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200"
                placeholder="1.6L 1ZR-FE"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">النظام الكهربائي:</label>
              <input
                type="text"
                value={system}
                onChange={(e) => setSystem(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200"
                placeholder="EFI / ABS"
              />
            </div>

            <div>
              <label className="block text-amber-400 font-bold mb-1">كود العطل DTC:</label>
              <input
                type="text"
                value={dtcCode}
                onChange={(e) => setDtcCode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 font-mono font-bold"
                placeholder="P0335"
              />
            </div>
          </div>

          {/* Symptom & Cause */}
          <div className="space-y-3">
            <div>
              <label className="block font-bold text-rose-400 mb-1">وصف الشكوى والأعراض (Customer Complaint):</label>
              <textarea
                rows={2}
                value={customerProblem}
                onChange={(e) => setCustomerProblem(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed"
                placeholder="توقف المحرك فجأة أثناء السير مع ظهور كود P0335 ولن يعمل المحرك إلا بعد الاستراحة..."
                required
              />
            </div>

            <div>
              <label className="block font-bold text-amber-400 mb-1">نتيجة الفحص والسبب الجذري الحقيقي (Diagnosis & Root Cause):</label>
              <textarea
                rows={2}
                value={diagnosisResult}
                onChange={(e) => setDiagnosisResult(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed"
                placeholder="تلف وتآكل سلك التغذية المتجه لفيشة حساس الكرنك ببن ECU Pin B18..."
                required
              />
            </div>
          </div>

          {/* Multimeter Readings */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-cyan-400 flex items-center gap-1.5">
              <span>قياسات الملتيميتر المسجلة:</span>
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">جهد التغذية (VCC):</label>
                <input
                  type="text"
                  value={vccMeasured}
                  onChange={(e) => setVccMeasured(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">مقاومة الأرضي (GND):</label>
                <input
                  type="text"
                  value={gndMeasured}
                  onChange={(e) => setGndMeasured(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">إشارة السنسر (Signal):</label>
                <input
                  type="text"
                  value={sigMeasured}
                  onChange={(e) => setSigMeasured(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Solution & Cost */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-emerald-400 mb-1">القطع التي تم تغييرها:</label>
              <input
                type="text"
                value={replacedParts}
                onChange={(e) => setReplacedParts(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                placeholder="فيشة حساس الكرنك الجديدة + حماية السلك"
              />
            </div>

            <div>
              <label className="block font-bold text-emerald-400 mb-1">التكلفة الإجمالية للإصلاح:</label>
              <input
                type="text"
                value={repairCost}
                onChange={(e) => setRepairCost(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-bold"
                placeholder="150 ر.س"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-emerald-400 mb-1">الحل النهائي والخطوات التأسيسية:</label>
            <textarea
              rows={2}
              value={repairSolution}
              onChange={(e) => setRepairSolution(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed"
              placeholder="تم تركيب فيشة جديدة، ولحام خط الإشارة بالقصدير والعزل، واختفى كود P0335 واشتغل المحرك مباشرة."
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-400 mb-1">ملاحظات الفني للنظام والمستقبل:</label>
            <input
              type="text"
              value={technicianNotes}
              onChange={(e) => setTechnicianNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300"
              placeholder="افحص الظفيرة المارة بجانب بكرة سير المروحة دائماً..."
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 font-bold"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-extrabold shadow-lg transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'جاري الحفظ...' : 'حفظ ونشر حالة الإصلاح'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
