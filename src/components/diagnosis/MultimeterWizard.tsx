import React, { useState } from 'react';
import { Gauge, CheckCircle2, AlertTriangle, XCircle, ArrowLeft, RotateCcw, Wrench } from 'lucide-react';
import { MultimeterMeasurement } from '../../services/repairCaseService';

interface MultimeterWizardProps {
  componentName?: string;
  dtcCode?: string;
  onComplete?: (measurements: MultimeterMeasurement[], overallVerdict: 'normal' | 'inspection_needed' | 'defective') => void;
}

export const MultimeterWizard: React.FC<MultimeterWizardProps> = ({
  componentName = 'حساس الكرنك (CKP)',
  dtcCode = 'P0335',
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Measurements State
  const [vccMeasured, setVccMeasured] = useState<string>('5.0');
  const [vccExpected, setVccExpected] = useState<string>('5.0 V');

  const [gndMeasured, setGndMeasured] = useState<string>('0.2');
  const [gndExpected, setGndExpected] = useState<string>('< 0.5 Ω');

  const [sigMeasured, setSigMeasured] = useState<string>('0.0');
  const [sigExpected, setSigExpected] = useState<string>('0.5V - 4.5V AC Pulse');

  const [notes, setNotes] = useState<string>('');

  const calculateVerdict = (): {
    measurements: MultimeterMeasurement[];
    overallVerdict: 'normal' | 'inspection_needed' | 'defective';
    summaryAr: string;
  } => {
    const vccVal = parseFloat(vccMeasured) || 0;
    const gndVal = parseFloat(gndMeasured) || 0;
    const sigVal = parseFloat(sigMeasured) || 0;

    let vccRes: 'normal' | 'inspection_needed' | 'defective' = 'normal';
    if (vccVal < 4.5) vccRes = 'defective';
    else if (vccVal < 4.8 || vccVal > 5.3) vccRes = 'inspection_needed';

    let gndRes: 'normal' | 'inspection_needed' | 'defective' = 'normal';
    if (gndVal > 1.5) gndRes = 'defective';
    else if (gndVal > 0.5) gndRes = 'inspection_needed';

    let sigRes: 'normal' | 'inspection_needed' | 'defective' = 'normal';
    if (sigVal < 0.2) sigRes = 'defective';
    else if (sigVal < 0.5 || sigVal > 5.0) sigRes = 'inspection_needed';

    const measurements: MultimeterMeasurement[] = [
      {
        test: 'جهد التغذية الرئيسي (VCC)',
        measured: `${vccVal} V`,
        standard: vccExpected,
        result: vccRes
      },
      {
        test: 'مقاومة خط الأرضي (GND Continuity)',
        measured: `${gndVal} Ω`,
        standard: gndExpected,
        result: gndRes
      },
      {
        test: 'إشارة الحساس الحية (Signal Pulse)',
        measured: `${sigVal} V`,
        standard: sigExpected,
        result: sigRes
      }
    ];

    let overallVerdict: 'normal' | 'inspection_needed' | 'defective' = 'normal';
    if (vccRes === 'defective' || gndRes === 'defective' || sigRes === 'defective') {
      overallVerdict = 'defective';
    } else if (vccRes === 'inspection_needed' || gndRes === 'inspection_needed' || sigRes === 'inspection_needed') {
      overallVerdict = 'inspection_needed';
    }

    let summaryAr = 'جميع القراءات الكهربائية ضمن المدى الطبيعي والمواصفات القياسية للصانع.';
    if (overallVerdict === 'defective') {
      if (sigRes === 'defective' && vccRes === 'normal' && gndRes === 'normal') {
        summaryAr = `انقطاع تام في إشارة ${componentName} رغم توفر جهد التغذية والأرضي. يشير مباشرة إلى تلف الحساس الداخلي أو انقطاع سلك الإشارة المتجه إلى ECU.`;
      } else if (vccRes === 'defective') {
        summaryAr = `غياب جهد التغذية (5V/12V). افحص الفيوز الرئيسي أو ريليه التغذية أو سلك خرج الكمبيوتر.`;
      } else {
        summaryAr = `خلل في مقاومة خط الأرضي أو القراءات المجمعة. تأكد من سلامة توصيلات الأرضي الهيكلي E01.`;
      }
    } else if (overallVerdict === 'inspection_needed') {
      summaryAr = `القراءات قريبة من الحدود الدنيا/العليا. يوصى بتنظيف الفيشة بمنظف إلكترونيات وإعادة الفحص.`;
    }

    return { measurements, overallVerdict, summaryAr };
  };

  const handleFinish = () => {
    const { measurements, overallVerdict } = calculateVerdict();
    if (onComplete) {
      onComplete(measurements, overallVerdict);
    }
  };

  const resetWizard = () => {
    setCurrentStep(1);
    setVccMeasured('5.0');
    setGndMeasured('0.2');
    setSigMeasured('0.0');
  };

  const { measurements, overallVerdict, summaryAr } = calculateVerdict();

  return (
    <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Gauge className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 font-tajawal flex items-center gap-2">
              <span>مساعد الملتيميتر التفاعلي (Multimeter Interactive Wizard)</span>
              {dtcCode && <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-xs font-mono">{dtcCode}</span>}
            </h3>
            <p className="text-xs text-slate-400">فحص خطوة بخطوة لـ: <strong className="text-slate-200">{componentName}</strong></p>
          </div>
        </div>

        <button
          onClick={resetWizard}
          className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-bold transition-all flex items-center gap-1"
          title="إعادة الفحص"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Stepper */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
        {[
          { step: 1, label: 'الخطوة 1: جهد التغذية' },
          { step: 2, label: 'الخطوة 2: كفاءة الأرضي' },
          { step: 3, label: 'الخطوة 3: إشارة الحساس' },
          { step: 4, label: 'الخطوة 4: التقييم النهائي' }
        ].map((s) => (
          <button
            key={s.step}
            onClick={() => setCurrentStep(s.step)}
            className={`p-2.5 rounded-xl border transition-all ${
              currentStep === s.step
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                : currentStep > s.step
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Step Content */}
      {currentStep === 1 && (
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 animate-fadeIn">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Wrench className="w-4 h-4" />
            <span>الخطوة 1: قياس جهد التغذية الرئيسي (VCC Power)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            اضبط الجهاز على قياس (DC Volts). ضع القطب الأسود على سالب البطارية، والقطب الأحمر على سلك التغذية الموجب في فيشة الحساس.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">المعيار المطلوب (Standard):</label>
              <input
                type="text"
                value={vccExpected}
                onChange={(e) => setVccExpected(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-amber-400 mb-1">الجهد المقاس بالساعة (Measured Volts):</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={vccMeasured}
                  onChange={(e) => setVccMeasured(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-300 font-bold text-sm font-mono focus:outline-none focus:border-amber-400"
                />
                <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-mono">Volts</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5"
            >
              <span>التالي: قياس الأرضي</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 animate-fadeIn">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Wrench className="w-4 h-4" />
            <span>الخطوة 2: فحص كفاءة واستمرارية خط الأرضي (GND Drop Test)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            ضع الملتيميتر على قياس المقاومة (Ohms Ω). ضع طرفاً على شاسي السيارة وطرفاً على خط أرضي الحساس للتأكد من عدم وجود مقاومة عالية.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">المعيار القياسي:</label>
              <input
                type="text"
                value={gndExpected}
                onChange={(e) => setGndExpected(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-cyan-400 mb-1">المقاومة المقاسة (Measured Ω):</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={gndMeasured}
                  onChange={(e) => setGndMeasured(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 font-bold text-sm font-mono focus:outline-none focus:border-cyan-400"
                />
                <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-mono">Ohms Ω</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold"
            >
              السابق
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5"
            >
              <span>التالي: إشارة الحساس</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 animate-fadeIn">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <Wrench className="w-4 h-4" />
            <span>الخطوة 3: فحص إشارة الحساس الحية (Signal Pulse Test)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            أثناء دوران المحرك أو تدوير السلف، قس التردد أو الفولت المتغير الصادر من سلك إشارة الحساس (Signal Wire).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">المعيار القياسي للإشارة:</label>
              <input
                type="text"
                value={sigExpected}
                onChange={(e) => setSigExpected(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-rose-400 mb-1">فولتية الإشارة المقاسة (Signal Voltage):</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={sigMeasured}
                  onChange={(e) => setSigMeasured(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-rose-500/40 text-rose-300 font-bold text-sm font-mono focus:outline-none focus:border-rose-400"
                />
                <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-mono">Volts</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold"
            >
              السابق
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5"
            >
              <span>عرض التقييم والنتيجة</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-5 animate-fadeIn">
          {/* Status Verdict Header */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
            overallVerdict === 'normal'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : overallVerdict === 'inspection_needed'
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}>
            <div className="flex items-center gap-3">
              {overallVerdict === 'normal' && <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />}
              {overallVerdict === 'inspection_needed' && <AlertTriangle className="w-8 h-8 text-amber-400 shrink-0" />}
              {overallVerdict === 'defective' && <XCircle className="w-8 h-8 text-rose-400 shrink-0" />}
              <div>
                <h4 className="font-extrabold text-sm font-tajawal">
                  {overallVerdict === 'normal' && '✅ الحالة: التوصيلات والقراءات سليمة (طبيعي)'}
                  {overallVerdict === 'inspection_needed' && '⚠️ الحالة: قراءات متذبذبة (تحتاج فحص)'}
                  {overallVerdict === 'defective' && '❌ الحالة: خلل كهربائي مؤكد (عطل محتمل)'}
                </h4>
                <p className="text-xs opacity-90 mt-0.5">{summaryAr}</p>
              </div>
            </div>
          </div>

          {/* Table of Measurements */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold">
                  <th className="p-2.5">اختبار القياس</th>
                  <th className="p-2.5">القيمة المقاسة</th>
                  <th className="p-2.5">المعيار المطلوب</th>
                  <th className="p-2.5 text-center">النتيجة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {measurements.map((m, i) => (
                  <tr key={i}>
                    <td className="p-2.5 font-bold text-slate-200">{m.test}</td>
                    <td className="p-2.5 font-mono text-amber-300 font-bold">{m.measured}</td>
                    <td className="p-2.5 font-mono text-slate-400">{m.standard}</td>
                    <td className="p-2.5 text-center">
                      {m.result === 'normal' && <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">✅ سليمة</span>}
                      {m.result === 'inspection_needed' && <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold">⚠️ متذبذبة</span>}
                      {m.result === 'defective' && <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 font-bold">❌ عطل</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-slate-800 flex flex-wrap justify-between gap-3">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold"
            >
              تعديل القراءات
            </button>

            <button
              onClick={handleFinish}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:brightness-110 text-slate-950 font-extrabold text-xs shadow-lg transition-all flex items-center gap-1.5"
            >
              <span>حفظ واعتماد التقرير للتشخيص الذكي</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
