import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import {
  Stethoscope,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  AlertTriangle,
  Wrench,
  Cpu,
  ArrowLeft,
  Sparkles,
  Gauge,
  BookOpen,
  Plus
} from 'lucide-react';
import { MultimeterWizard } from '../components/diagnosis/MultimeterWizard';
import { fetchRepairCases, RepairCaseDB, MultimeterMeasurement } from '../services/repairCaseService';
import { fetchDtcWiringLink, DtcWiringLinkDB } from '../services/vehicleService';
import { runAiDiagnosis } from '../services/aiService';
import { NewRepairCaseModal } from '../components/repairCases/NewRepairCaseModal';

interface Question {
  id: number;
  text: string;
}

export const SmartDiagnosisPage: React.FC = () => {
  const { selectedVehicle, setCurrentRoute, navigateToWiring } = useApp();

  const [activeTab, setActiveTab] = useState<'questions' | 'multimeter' | 'history'>('questions');

  // Diagnosis Questionnaire State
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Selected DTC Code for diagnosis
  const [selectedDtc, setSelectedDtc] = useState<string>('P0335');
  const [wiringLink, setWiringLink] = useState<DtcWiringLinkDB | null>(null);

  // Matching Repair Cases
  const [matchedCases, setMatchedCases] = useState<RepairCaseDB[]>([]);

  // Multimeter Measurements State
  const [wizardMeasurements, setWizardMeasurements] = useState<MultimeterMeasurement[]>([]);

  // AI Diagnosis State
  const [aiReport, setAiReport] = useState<{
    summary: string;
    probableCauses: Array<{ cause: string; probability: number; reason: string }>;
    diagnosticSteps: string[];
    recommendedFix: string;
  } | null>(null);
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const questions: Question[] = [
    { id: 1, text: 'هل توقف المحرك فجأة أثناء السير وتضيء لمبة فحص المحرك (Check Engine)؟' },
    { id: 2, text: 'هل يحاول المارش (السلف) الدوران بقوة ولكن المحرك لا يشتغل إطلاقاً؟' },
    { id: 3, text: 'هل تلاحظ غياب الشرارة من الكويلات مع توقف ضخ بخاخات الوقود؟' },
    { id: 4, text: 'هل تلاحظ انقطاع قراءة عدد دورات المحرك RPM في عداد الطبلون عند التدوير؟' },
    { id: 5, text: 'هل يظهر كود عطل دائرة الكرنك P0335 عند توصيل الكمبيوتر الفاحص؟' }
  ];

  // Load wiring link & matching cases on DTC select
  useEffect(() => {
    const loadContextData = async () => {
      // Wiring link
      const linkRes = await fetchDtcWiringLink(selectedDtc);
      setWiringLink(linkRes.data);

      // Historical Cases
      const casesRes = await fetchRepairCases({
        company: selectedVehicle?.companyName,
        dtcCode: selectedDtc
      });
      setMatchedCases(casesRes.data || []);
    };

    loadContextData();
  }, [selectedDtc, selectedVehicle]);

  const handleAnswer = (answer: boolean) => {
    const updated = { ...answers, [questions[step].id]: answer };
    setAnswers(updated);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setIsCompleted(true);
      executeAiDiagnosis();
    }
  };

  const executeAiDiagnosis = async () => {
    setAiLoading(true);
    const vehicleCtx = selectedVehicle
      ? {
          companyName: selectedVehicle.companyName,
          modelName: selectedVehicle.modelName,
          year: selectedVehicle.year,
          engineName: selectedVehicle.engineName
        }
      : { companyName: 'Toyota', modelName: 'Corolla', year: 2012, engineName: '1.6L 1ZR-FE' };

    const report = await runAiDiagnosis(
      vehicleCtx,
      selectedDtc,
      'توقف المحرك فجأة، صعوبة بالغة في التشغيل، انقطاع الشرارة من الكويلات، وتوقف قراءة RPM.'
    );
    setAiReport(report);
    setAiLoading(false);
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setIsCompleted(false);
    setAiReport(null);
  };

  const progressPercent = Math.round(((step + 1) / questions.length) * 100);

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      <SectionHeader
        title="محرك التشخيص الذكي ونسبة الاحتمال (Smart Repair Intelligence Engine)"
        subtitle="حساب النسب الاحتمالية للأعطال ومطابقتها مع المخططات الكهربائية وسجلات الإصلاح الواقعية"
        icon={<Stethoscope className="w-5 h-5 text-amber-400" />}
        action={
          <button
            onClick={handleReset}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة التشخيص</span>
          </button>
        }
      />

      {/* Vehicle Context & DTC Selector Header */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              سياق السيارة الحالي: <strong className="text-amber-400">{selectedVehicle?.companyName || 'Toyota'} {selectedVehicle?.modelName || 'Corolla'} ({selectedVehicle?.year || 2012})</strong>
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[11px] font-mono">
              محرك {selectedVehicle?.engineName || '1.6L 1ZR-FE'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold">كود DTC المستهدف:</span>
            <select
              value={selectedDtc}
              onChange={(e) => setSelectedDtc(e.target.value)}
              className="px-3 py-1 rounded-xl bg-slate-950 border border-amber-500/40 text-amber-300 font-mono font-bold text-xs focus:outline-none"
            >
              <option value="P0335">P0335 - حساس الكرنك CKP</option>
              <option value="P0101">P0101 - حساس كتلة الهواء MAF</option>
              <option value="P0620">P0620 - كتاوت شحن الدينامو</option>
              <option value="C0035">C0035 - حساس سرعة الفرامل ABS</option>
            </select>
          </div>
        </div>

        {/* Smart Wiring Link Context */}
        {wiringLink && (
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs flex flex-wrap items-center justify-between gap-2 text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">ربط المخطط الكهربائي الفوري:</span>
              <span>{wiringLink.componentName}</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono">
                {wiringLink.ecu_pin}
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300">
                فيوز {wiringLink.fuse_number}
              </span>
            </div>

            <button
              onClick={() => navigateToWiring(selectedDtc)}
              className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold transition-all flex items-center gap-1"
            >
              <span>فتح المخطط ({wiringLink.wiring_diagram_id})</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex rounded-2xl bg-slate-900 border border-slate-800 p-1.5 text-xs font-bold gap-1">
        <button
          onClick={() => setActiveTab('questions')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'questions' ? 'bg-amber-500 text-slate-950 font-extrabold shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>شجرة التشخيص وحساب الاحتمالية</span>
        </button>

        <button
          onClick={() => setActiveTab('multimeter')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'multimeter' ? 'bg-amber-500 text-slate-950 font-extrabold shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Gauge className="w-4 h-4" />
          <span>مساعد الملتيميتر التفاعلي</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'history' ? 'bg-amber-500 text-slate-950 font-extrabold shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>حالات الإصلاح المشابهة ({matchedCases.length})</span>
        </button>
      </div>

      {/* TAB 1: DIAGNOSIS QUESTIONNAIRE & PROBABILITY MATRIX */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          {!isCompleted ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400 font-bold">
                  <span>السؤال {step + 1} من {questions.length}</span>
                  <span className="text-amber-400">{progressPercent}% مكتمل</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="py-6 space-y-3">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 w-fit text-amber-400">
                  <HelpCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-100 font-tajawal leading-snug">
                  {questions[step].text}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <button
                  onClick={() => handleAnswer(true)}
                  className="py-4 px-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-300 font-bold text-base transition-all flex items-center justify-center gap-2 group"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>نعم، يحدث هذا</span>
                </button>

                <button
                  onClick={() => handleAnswer(false)}
                  className="py-4 px-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-300 font-bold text-base transition-all flex items-center justify-center gap-2 group"
                >
                  <XCircle className="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform" />
                  <span>لا، لا يوجد</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl animate-fadeIn">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400">
                    <Sparkles className="w-6 h-6 animate-spin" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 font-tajawal">مصفوفة نسبة احتمال العطل (Probability Matrix)</h3>
                    <p className="text-xs text-slate-400">
                      محللة بناءً على نموذج الذكاء الاصطناعي Gemini وسجلات الإصلاح الواقعية لـ {selectedVehicle?.companyName || 'Toyota'} {selectedVehicle?.modelName || 'Corolla'}
                    </p>
                  </div>
                </div>
                <Badge variant="amber" size="md">الكود: {selectedDtc}</Badge>
              </div>

              {aiLoading ? (
                <div className="p-8 text-center text-slate-400 text-xs font-bold space-y-3">
                  <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin mx-auto" />
                  <p>جاري تحليل أسباب العطل وحساب المصفوفة الاحتمالية...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Probability Breakdown */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <h4 className="text-xs font-bold text-amber-400 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span>ترتيب أسباب العطل من الأكثر احتمالاً إلى الأقل:</span>
                    </h4>

                    <div className="space-y-3">
                      {(aiReport?.probableCauses || [
                        { cause: 'تلف حساس الكرنك (CKP Position Sensor)', probability: 85, reason: 'انقطاع النبضات الكهربائية وتوقف قراءة RPM' },
                        { cause: 'تضرر أو قطع في سلك الظفيرة / الفيشة (Pin B18)', probability: 70, reason: 'احتكاك سير المحرك بظفيرة الحساس' },
                        { cause: 'خلل كرت كمبيوتر المحرك (ECU Driver Failure)', probability: 20, reason: 'تلف موصل الدخل الداخلي في ECU' }
                      ]).map((item, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-slate-100">{item.cause}</span>
                            <span className="text-amber-400 font-mono text-sm">{item.probability}%</span>
                          </div>

                          {/* Progress bar */}
                          <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                            <div
                              className={`h-full transition-all duration-500 ${
                                item.probability >= 80
                                  ? 'bg-rose-500'
                                  : item.probability >= 50
                                  ? 'bg-amber-500'
                                  : 'bg-blue-500'
                              }`}
                              style={{ width: `${item.probability}%` }}
                            />
                          </div>
                          <p className="text-[11px] text-slate-400">{item.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Diagnostic steps */}
                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <h5 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Wrench className="w-4 h-4 text-blue-400" />
                      <span>خطوات الفحص الموصى بها بالترتيب:</span>
                    </h5>
                    <ul className="text-xs text-slate-300 space-y-1.5">
                      {(aiReport?.diagnosticSteps || [
                        'افحص جهد تغذية الفيشة VCC (5.0V) باستخدام الملتيميتر.',
                        'افحص مقاومة خط الأرضي GND Continuity عند ECU Pin B18.',
                        'قس إشارة التردد الحية بالملتيميتر أو الأوسيلوسكوب عند دوران السلف.'
                      ]).map((stepText, idx) => (
                        <li key={idx} className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span>{stepText}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Fix & Modal Action */}
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 space-y-2 font-bold">
                    <span>💡 التوصية النهائية للإصلاح:</span>
                    <p className="font-normal leading-relaxed text-slate-200">
                      {aiReport?.recommendedFix || 'استبدال فيشة حساس الكرنك، عزل وصلات الأسلاك بالحراري العازل، وإعادة قراءة التردد.'}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-slate-100 text-xs font-bold"
                    >
                      إعادة الفحص
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs flex items-center gap-1.5 border border-amber-500/30"
                      >
                        <Plus className="w-4 h-4" />
                        <span>حفظ هذه النتيجة كحالة إصلاح جديدة</span>
                      </button>

                      <button
                        onClick={() => navigateToWiring(selectedDtc)}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-extrabold text-xs shadow-lg transition-all flex items-center gap-1.5"
                      >
                        <span>فتح المخطط والتسليك المباشر</span>
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MULTIMETER WIZARD */}
      {activeTab === 'multimeter' && (
        <MultimeterWizard
          componentName={wiringLink?.componentName || 'حساس الكرنك CKP'}
          dtcCode={selectedDtc}
          onComplete={(measurements) => {
            setWizardMeasurements(measurements);
            alert('تم اعتماد نتيجة الملتيميتر بنجاح!');
          }}
        />
      )}

      {/* TAB 3: HISTORICAL REPAIR CASES */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-bold flex items-center justify-between">
            <span>حالات إصلاح واقعية مسجلة بكود {selectedDtc} في قاعدة البيانات:</span>
            <span className="text-amber-400">{matchedCases.length} حالة نجاح</span>
          </div>

          {matchedCases.map((rc) => (
            <div key={rc.id} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-xs">
                <div>
                  <h4 className="font-bold text-slate-100">{rc.vehicle_company} {rc.vehicle_model} ({rc.vehicle_year})</h4>
                  <p className="text-slate-400">{rc.customer_problem}</p>
                </div>
                <Badge variant="emerald" size="sm">تم الإصلاح بنجاح</Badge>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 text-xs text-slate-300 space-y-1">
                <span className="font-bold text-amber-400 block">السبب والحل:</span>
                <p>{rc.repair_solution}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal to Register Repair Case */}
      <NewRepairCaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          alert('تم إضافة حالة الإصلاح بنجاح إلى قاعدة البيانات!');
        }}
        initialVehicle={{
          company: selectedVehicle?.companyName || 'Toyota',
          model: selectedVehicle?.modelName || 'Corolla',
          year: selectedVehicle?.year || 2012,
          engine: selectedVehicle?.engineName || '1.6L 1ZR-FE',
          system: 'EFI',
          dtcCode: selectedDtc
        }}
      />
    </div>
  );
};
