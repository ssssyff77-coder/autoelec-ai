import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { COMPREHENSIVE_WIRING_DIAGRAMS } from '../data/wiringData';
import { VEHICLE_SYSTEMS, CAR_COMPANIES } from '../data/mockData';
import { WiringDiagram, WiringHotspot } from '../types';
import { explainWiringDiagram } from '../services/aiService';
import {
  Network,
  Zap,
  Cpu,
  Search,
  Filter,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  RotateCw,
  Maximize2,
  Minimize2,
  Printer,
  Sparkles,
  Bookmark,
  Info,
  AlertTriangle,
  FileText,
  Layers,
  Activity,
  X,
  Send,
  Plus,
  Compass,
  CheckCircle2,
  XCircle,
  GraduationCap,
  Save,
  Columns,
  Sliders,
  HelpCircle,
  Play,
  RotateCw as RefreshIcon
} from 'lucide-react';

interface WireTraceInfo {
  id: string;
  nameAr: string;
  colorName: string;
  colorHex: string;
  originAr: string;
  destinationAr: string;
  voltageAr: string;
  connectorsAr: string;
  fuseRelayAr: string;
  testingTipAr: string;
}

export const WiringDiagramsPage: React.FC = () => {
  const { selectedVehicle, targetWiringSearch, setTargetWiringSearch } = useApp();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSystemFilter, setSelectedSystemFilter] = useState('all');
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState('all');

  // Active Diagram
  const [activeDiagram, setActiveDiagram] = useState<WiringDiagram>(COMPREHENSIVE_WIRING_DIAGRAMS[0]);
  const [selectedHotspot, setSelectedHotspot] = useState<WiringHotspot | null>(null);
  const [activeTab, setActiveTab] = useState<'diagram' | 'pins' | 'fuses' | 'relays' | 'multimeter' | 'notes'>('diagram');

  // Canvas Viewport States
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Pro Layers Filter
  const [layers, setLayers] = useState({
    power12v: true,
    ref5v: true,
    ground: true,
    signals: true,
    canBus: true
  });

  // Wire Tracking System
  const [selectedWireId, setSelectedWireId] = useState<string | null>('wire-power-12v');

  // Multimeter Wizard States
  const [multimeterPowerVal, setMultimeterPowerVal] = useState<string>('');
  const [multimeterGndVal, setMultimeterGndVal] = useState<string>('');
  const [multimeterSignalVal, setMultimeterSignalVal] = useState<string>('');
  const [multimeterResult, setMultimeterResult] = useState<{
    status: 'pass' | 'fail' | 'warning';
    title: string;
    description: string;
    recommendation: string;
  } | null>(null);

  // Virtual Multimeter Probe Simulator
  const [redProbePin, setRedProbePin] = useState<string | null>('A1 (12V B+)');
  const [blackProbePin, setBlackProbePin] = useState<string | null>('E01 (GND)');

  // Academy / Educational Mode
  const [isAcademyMode, setIsAcademyMode] = useState<boolean>(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Compare 2 Diagrams Mode
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false);
  const [compareDiagram, setCompareDiagram] = useState<WiringDiagram>(COMPREHENSIVE_WIRING_DIAGRAMS[1]);

  // Save Repair Case Modal
  const [isSaveCaseModalOpen, setIsSaveCaseModalOpen] = useState(false);
  const [caseProblem, setCaseProblem] = useState('');
  const [caseDtc, setCaseDtc] = useState('');
  const [caseReadings, setCaseReadings] = useState('');
  const [caseSolution, setCaseSolution] = useState('');
  const [caseCost, setCaseCost] = useState('150 ريال');
  const [caseSavedSuccess, setCaseSavedSuccess] = useState(false);

  // Technician Custom Notes State
  const [userNotes, setUserNotes] = useState<Record<string, string>>({});
  const [newNoteInput, setNewNoteInput] = useState('');

  // AI Assistant Drawer States
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [aiQuestionInput, setAiQuestionInput] = useState('');
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Favorites
  const [favoriteDiagrams, setFavoriteDiagrams] = useState<string[]>([]);

  // Auto Search Sync with targetWiringSearch from AppContext
  useEffect(() => {
    if (targetWiringSearch) {
      setSearchQuery(targetWiringSearch);
      // Auto pick diagram matching targetDtc
      const found = COMPREHENSIVE_WIRING_DIAGRAMS.find((d) =>
        d.hotspots.some((h) => h.details.associatedDtcs.includes(targetWiringSearch)) ||
        d.fuses.some((f) => f.number.toLowerCase().includes(targetWiringSearch.toLowerCase())) ||
        d.ecuPins.some((p) => p.pinNumber.toLowerCase().includes(targetWiringSearch.toLowerCase())) ||
        d.titleAr.includes(targetWiringSearch)
      );
      if (found) {
        setActiveDiagram(found);
        const matchingHotspot = found.hotspots.find((h) =>
          h.details.associatedDtcs.includes(targetWiringSearch)
        );
        if (matchingHotspot) setSelectedHotspot(matchingHotspot);
      }
    }
  }, [targetWiringSearch]);

  // Pre-configured Wire Traces
  const wireTraces: WireTraceInfo[] = useMemo(() => {
    return [
      {
        id: 'wire-power-12v',
        nameAr: 'مسار التغذية الرئيسية B+ (12 Volt Power Line)',
        colorName: 'أحمر/أبيض',
        colorHex: '#ef4444',
        originAr: 'القطب الموجب للبطارية عبر فيوز EFI 15A وريليه EFI MAIN',
        destinationAr: 'كمبيوتر المحرك ECU Plug A1 + سوكيت الكويلات والبخاخات',
        voltageAr: '12.6V DC (مباشر عند فتح السويتش IGN ON)',
        connectorsAr: 'سوكيت C101 خلف علبة الفيوزات بالكبوت + سوكيت B22',
        fuseRelayAr: 'فيوز EFI NO.1 (15A) • ريليه EFI Main',
        testingTipAr: 'افحص الفولت تحت الحمل (Voltage Drop Test). هبوط الفولت أكثر من 0.5V يعني وجود مقاومة عالية بالريليه أو الفيشة.'
      },
      {
        id: 'wire-ref-5v',
        nameAr: 'مسار مرجع الجهد (5V Reference Line)',
        colorName: 'أصفر/أزرق',
        colorHex: '#f59e0b',
        originAr: 'كمبيوتر المحرك ECU Connector Plug B Pin B12 (VC Line)',
        destinationAr: 'حساس MAF، حساس الثروتل TPS، وحساس الضغط MAP',
        voltageAr: '5.00V DC ثابته جداً (±0.05V)',
        connectorsAr: 'سوكيت منظم الحساسات C20',
        fuseRelayAr: 'حماية داخلية متكاملة بـ منظم الجهد الداخلي للـ ECU',
        testingTipAr: 'إذا كانت الفولتية 0V، افصل الحساسات واحداً تلو الآخر للتحقق من وجود شورت أرضي داخل أحد الحساسات.'
      },
      {
        id: 'wire-signal-maf',
        nameAr: 'مسار إشارة الحساس (MAF Signal Line)',
        colorName: 'أخضر/أسود',
        colorHex: '#10b981',
        originAr: 'مخرج حساس كتلة الهواء MAF Sensor Pin 3',
        destinationAr: 'كمبيوتر المحرك ECU Plug B Pin B18 (VG Signal)',
        voltageAr: '0.9V DC عند الخمول -> ترتفع إلى 3.8V عند فتح الثروتل بالكامل',
        connectorsAr: 'فيشة حساس MAF ذات الـ 5 دبابيس',
        fuseRelayAr: 'لا يوجد فيوز مباشر (إشارة منخفضة التيار)',
        testingTipAr: 'قس الإشارة باستخدام رسم الإشارة Oscilloscope أو الملتيميتر أثناء النفخ أو دعس البنزين لرصد الاستجابة.'
      },
      {
        id: 'wire-ground-e01',
        nameAr: 'مسار الأرضي الرئيسي (ECU Main Ground Line E01)',
        colorName: 'أسود/أبيض',
        colorHex: '#64748b',
        originAr: 'نقطة التأريض الشاسي بالجسم والمحرك (Ground Bolt Main Intake)',
        destinationAr: 'كمبيوتر المحرك ECU Connector Plug A Pin A5 (E01)',
        voltageAr: '0.00V - 0.03V DC max',
        connectorsAr: 'نقطة التجميع الأرضية G02 تحت كبينة المحرك',
        fuseRelayAr: 'تأريض مباشر بدليل براغي ثقيلة',
        testingTipAr: 'إذا تجاوزت الفولتية 0.08V والمحرك يعمل، فهذا يعني ضعف التأريض العائم المسبب لأخطاء الحساسات العشوائية.'
      },
      {
        id: 'wire-can-h',
        nameAr: 'مسار شبكة الاتصال العالي (CAN High Bus Line)',
        colorName: 'أصفر ملفوف',
        colorHex: '#3b82f6',
        originAr: 'فيشة DLC OBD-II Pin 6',
        destinationAr: 'جميع كمبيوترات السيارة ECU, BCM, ABS, TCU عبر المقاومة 120Ω',
        voltageAr: '2.5V إلى 3.5V (إشارة بيانات ترددية High Speed)',
        connectorsAr: 'وصلة التوزيع CAN Joint Connector C',
        fuseRelayAr: 'تغذية بوابة Gateway Fuse 10A',
        testingTipAr: 'قس المقاومة الكلية بين CAN-H و CAN-L والسيارة مطفأة، يجب قراءة 60 أوم بالضبط.'
      }
    ];
  }, []);

  const activeWireTrace = useMemo(() => {
    return wireTraces.find((w) => w.id === selectedWireId) || wireTraces[0];
  }, [selectedWireId, wireTraces]);

  // Filtered Diagrams
  const filteredDiagrams = useMemo(() => {
    return COMPREHENSIVE_WIRING_DIAGRAMS.filter((diagram) => {
      const matchQuery =
        searchQuery.trim() === '' ||
        diagram.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        diagram.carCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
        diagram.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        diagram.systemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        diagram.ecuPins.some((p) => p.pinNumber.toLowerCase().includes(searchQuery.toLowerCase()) || p.functionAr.includes(searchQuery) || p.wireColor.includes(searchQuery)) ||
        diagram.fuses.some((f) => f.number.toLowerCase().includes(searchQuery.toLowerCase())) ||
        diagram.hotspots.some((h) => h.details.associatedDtcs.some((code) => code.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchSystem = selectedSystemFilter === 'all' || diagram.systemId === selectedSystemFilter;
      const matchCompany =
        selectedCompanyFilter === 'all' ||
        diagram.carCompany.toLowerCase().includes(selectedCompanyFilter.toLowerCase());

      return matchQuery && matchSystem && matchCompany;
    });
  }, [searchQuery, selectedSystemFilter, selectedCompanyFilter]);

  // Handle Zoom & Canvas Controls
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetCanvas = () => {
    setZoomLevel(1);
    setRotationDegree(0);
  };
  const handleRotate = () => setRotationDegree((prev) => (prev + 90) % 360);

  const toggleFavorite = (id: string) => {
    setFavoriteDiagrams((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddNote = () => {
    if (!newNoteInput.trim()) return;
    setUserNotes((prev) => ({
      ...prev,
      [activeDiagram.id]: (prev[activeDiagram.id] ? prev[activeDiagram.id] + '\n• ' : '• ') + newNoteInput.trim()
    }));
    setNewNoteInput('');
  };

  // Multimeter Guided Test Evaluation
  const handleRunMultimeterEvaluation = () => {
    const power = parseFloat(multimeterPowerVal);
    const gnd = parseFloat(multimeterGndVal);

    if (isNaN(power) || isNaN(gnd)) {
      setMultimeterResult({
        status: 'warning',
        title: 'يرجى إدخال قيم قياس الجهد والأرضي المقاسة أولاً',
        description: 'قم بتعليق الملتيميتر على الأطراف وأدخل القيم الرقمية بالجدول لتشغيل التقييم التلقائي.',
        recommendation: 'تأكد من وضع الملتيميتر على مقياس DC Volts 20V.'
      });
      return;
    }

    if (power >= 11.8 && gnd <= 0.05) {
      setMultimeterResult({
        status: 'pass',
        title: '✅ التغذية والأرضي سليمين تماماً (Pass)',
        description: `قراءة التغذية (${power}V) وقراءة الأرضي (${gnd}V) ضمن النطاق الهندسي المسموح تماماً.`,
        recommendation: 'المسار الكهربائي والتسليك سليم. إذا كان العطل مستمراً، فافحص الحساس أو افحص نبض الإشارة.'
      });
    } else if (power < 10.5) {
      setMultimeterResult({
        status: 'fail',
        title: '🔴 انخفاض حاد في جهد التغذية (Low Voltage Failure)',
        description: `القراءة المقاسة ${power}V منخفضة جداً عن الجهد المطلوب (12.6V). يوجد هبوط جهد حاد (Voltage Drop).`,
        recommendation: 'افحص ريليه التغذية EFI Main، افحص سلامة دبابيس الفيوز، وراجع الفيشة لمنع تكون التآكل والأكسدة.'
      });
    } else if (gnd > 0.08) {
      setMultimeterResult({
        status: 'fail',
        title: '🟠 ضعف وتآكل في خط الأرضي (High Ground Voltage Drop)',
        description: `القراءة المقاسة للأرضي (${gnd}V) مرتفعة عن الحد المسموح (0.05V)، مما يشير لوجود مقاومة عائمة.`,
        recommendation: 'نظف نقطة ربط البرغي الأرضي بالشاسي واستبدل السلك إذا كان يتضمن كربنة داخلية.'
      });
    } else {
      setMultimeterResult({
        status: 'warning',
        title: '⚠️ قراءات جانبية تحتاج إلى مراجعة',
        description: 'الفولتية تقارب الحدود الدنيا. يرجى إعادة الفحص أثناء تشغيل جميع أحمال السيارة.',
        recommendation: 'قس الفولتية تحت الحمل الكامل (Full Electrical Load Test).'
      });
    }
  };

  // Virtual Multimeter Live Reading Simulation
  const simulatedVoltage = useMemo(() => {
    if (!redProbePin || !blackProbePin) return '0.00 V';
    if (redProbePin.includes('12V')) return '12.62 V DC';
    if (redProbePin.includes('5V')) return '5.01 V DC';
    if (redProbePin.includes('Signal')) return '2.14 V DC (PWM)';
    if (redProbePin.includes('GND')) return '0.01 V DC';
    return '12.45 V DC';
  }, [redProbePin, blackProbePin]);

  // AI Assistant Request
  const handleAskAi = async (customQ?: string) => {
    setIsAiLoading(true);
    setIsAiDrawerOpen(true);
    const question = customQ || aiQuestionInput || 'اشرح مسارات التغذية والكهرباء والأرضي في هذا المخطط بالتفصيل وطريقة تتبع الأعطال.';
    try {
      const carInfo = `${activeDiagram.carCompany} ${activeDiagram.model} (${activeDiagram.yearRange})`;
      const result = await explainWiringDiagram(activeDiagram.titleAr, carInfo, question);
      setAiAnalysisResult(result);
    } catch (err) {
      setAiAnalysisResult('حدث خطأ أثناء التواصل مع محرك تحليل المخططات الذكي.');
    } finally {
      setIsAiLoading(false);
    }
  };

  // Save Repair Case
  const handleSaveRepairCase = () => {
    if (!caseProblem.trim() || !caseSolution.trim()) return;

    const newCase = {
      id: `rc-custom-${Date.now()}`,
      title: `إصلاح ${activeDiagram.systemName} - ${selectedVehicle?.companyName || activeDiagram.carCompany} ${selectedVehicle?.modelName || activeDiagram.model}`,
      carModel: `${selectedVehicle?.companyName || activeDiagram.carCompany} ${selectedVehicle?.modelName || activeDiagram.model}`,
      year: selectedVehicle?.year ? String(selectedVehicle.year) : activeDiagram.yearRange,
      symptom: caseProblem,
      rootCause: `خلل في تسليك وتوصيل ${activeDiagram.systemName} (كود ${caseDtc || 'P0100'})`,
      diagnosticSteps: [
        'فحص المخطط الكهربائي باستخدام عارض المخططات الذكي',
        `قياس الفولتية على السلك المقاس: ${caseReadings || '12.6V B+ / 5.0V Ref'}`,
        'تحديد نقطة القطع والهبوط الجهد بالتسليك'
      ],
      solution: caseSolution,
      timeSpent: '45 دقيقة',
      totalCost: caseCost,
      date: new Date().toLocaleDateString('ar-SA')
    };

    const saved = localStorage.getItem('autoelec_repair_cases');
    const existing = saved ? JSON.parse(saved) : [];
    localStorage.setItem('autoelec_repair_cases', JSON.stringify([newCase, ...existing]));

    setCaseSavedSuccess(true);
    setTimeout(() => {
      setCaseSavedSuccess(false);
      setIsSaveCaseModalOpen(false);
      setCaseProblem('');
      setCaseSolution('');
      setCaseDtc('');
      setCaseReadings('');
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Header */}
      <SectionHeader
        title="نظام المخططات والتسليك الذكي (Smart Wiring & Diagnostics)"
        subtitle="ربط ذكي مباشر بين أكواد الأعطال OBD2، المخططات الكهربائية HD، تتبع الأسلاك، ومساعد الفحص بالملتيميتر"
        icon={<Network className="w-6 h-6 text-amber-400" />}
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAcademyMode(!isAcademyMode)}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                isAcademyMode
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-slate-100'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>{isAcademyMode ? 'وضع التدريب والأكاديمية (مفعل)' : 'تفعيل وضع التعليم'}</span>
            </button>

            <button
              onClick={() => setIsCompareMode(!isCompareMode)}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                isCompareMode
                  ? 'bg-blue-500 text-white border-blue-400 font-extrabold'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-slate-100'
              }`}
            >
              <Columns className="w-4 h-4" />
              <span>{isCompareMode ? 'إلغاء المقارنة' : 'مقارنة مخططين'}</span>
            </button>
          </div>
        }
      />

      {/* Vehicle Context Banner */}
      {selectedVehicle && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 font-bold text-lg">🚗</span>
            <div>
              <p className="text-xs text-slate-400">السيارة المختارة بالفحص:</p>
              <p className="text-sm font-bold text-amber-300 font-tajawal">
                {selectedVehicle.companyName} - {selectedVehicle.modelName} ({selectedVehicle.year}) | {selectedVehicle.engineName}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedCompanyFilter(selectedVehicle.companyName);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition"
          >
            تصفية المخططات حسب السيارة
          </button>
        </div>
      )}

      {/* Search & Tag Chips Bar */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Main Search */}
          <div className="md:col-span-6 relative">
            <Search className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث برقم الكود (P0335، P0101)، اسم الحساس، رقم الطرف Pin، لون السلك، الفيوز..."
              className="w-full pr-11 pl-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setTargetWiringSearch('');
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* System Category Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedSystemFilter}
              onChange={(e) => setSelectedSystemFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500 transition"
            >
              <option value="all">جميع الأنظمة الكهربائية ({COMPREHENSIVE_WIRING_DIAGRAMS.length})</option>
              <option value="efi">حقن الوقود وإدارة المحرك (EFI / ECU)</option>
              <option value="charging-starter">الشحن والتشغيل (دينامو ومارش)</option>
              <option value="can-bus">شبكة الاتصال CAN-BUS / LIN</option>
              <option value="abs-esp">الفرامل والثبات (ABS / ESP)</option>
              <option value="bcm-body">كمبيوتر الراحة وجسم السيارة (BCM)</option>
              <option value="srs-airbag">الوسائد الهوائية (SRS Airbag)</option>
              <option value="transmission-tcm">ناقل الحركة الأوتوماتيكي (TCM)</option>
              <option value="ac-climate">التكييف الإلكتروني (HVAC Climate)</option>
            </select>
          </div>

          {/* Company Brand Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedCompanyFilter}
              onChange={(e) => setSelectedCompanyFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500 transition"
            >
              <option value="all">جميع شركات السيارات</option>
              {CAR_COMPANIES.slice(0, 15).map((comp) => (
                <option key={comp.id} value={comp.nameEn}>
                  {comp.name} ({comp.nameEn})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Tag Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-slate-500 font-bold whitespace-nowrap text-[11px]">وسوم البحث السريع:</span>
          {[
            'P0335 الكرنك',
            'P0101 MAF',
            'P0620 الدينامو',
            'C0031 ABS',
            'A1 BATT 12V',
            'B12 5V Ref',
            'OBD Pin 6 CAN',
            'EFI Fuse 15A'
          ].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag.split(' ')[0])}
              className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:border-amber-500/50 hover:text-amber-400 font-mono text-[11px] whitespace-nowrap transition"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Catalog Sidebar, Right Viewer/Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Catalog List Sidebar (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-bold text-slate-200 font-tajawal flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>المخططات المتاحة ({filteredDiagrams.length})</span>
            </h3>
            <span className="text-[11px] text-slate-500">اختر مخططاً</span>
          </div>

          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredDiagrams.length === 0 ? (
              <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-400 space-y-2">
                <AlertTriangle className="w-8 h-8 mx-auto text-amber-400" />
                <p className="text-xs font-bold">لم يتم العثور على مخطط مطابق للبحث.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSystemFilter('all');
                    setSelectedCompanyFilter('all');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-amber-400 text-xs font-bold"
                >
                  إعادة ضبط الفلاتر
                </button>
              </div>
            ) : (
              filteredDiagrams.map((diagram) => {
                const isActive = activeDiagram.id === diagram.id;
                const isFav = favoriteDiagrams.includes(diagram.id);

                return (
                  <div
                    key={diagram.id}
                    onClick={() => {
                      setActiveDiagram(diagram);
                      setSelectedHotspot(null);
                      setZoomLevel(1);
                    }}
                    className={`p-4 rounded-2xl border transition cursor-pointer relative group ${
                      isActive
                        ? 'bg-slate-900 border-amber-500 shadow-xl shadow-amber-500/5 ring-1 ring-amber-500/30'
                        : 'bg-slate-900/70 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant={isActive ? 'amber' : 'slate'}>
                        {diagram.carCompany} - {diagram.model}
                      </Badge>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(diagram.id);
                        }}
                        className={`p-1 rounded-lg transition ${
                          isFav ? 'text-amber-400 bg-amber-500/10' : 'text-slate-600 hover:text-slate-300'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>

                    <h4 className="text-xs font-bold text-slate-100 font-tajawal line-clamp-2 leading-relaxed">
                      {diagram.titleAr}
                    </h4>

                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{diagram.systemName}</p>

                    <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                      <span>السنوات: {diagram.yearRange}</span>
                      <span className="text-amber-400 font-bold">{diagram.ecuPins.length} أطراف Pins</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* High-Res Interactive Viewer & Tools (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Active Diagram Details Bar */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="amber">{activeDiagram.carCompany}</Badge>
                  <Badge variant="blue">{activeDiagram.model}</Badge>
                  <span className="text-xs text-slate-400 font-mono">{activeDiagram.yearRange}</span>
                </div>
                <h2 className="text-base font-extrabold text-slate-100 font-tajawal">
                  {activeDiagram.titleAr}
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsSaveCaseModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ حالة إصلاح</span>
                </button>

                <button
                  onClick={() => handleAskAi()}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 hover:brightness-110 transition"
                >
                  <Sparkles className="w-4 h-4 fill-slate-950" />
                  <span>تفسير بالذكاء الاصطناعي</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{activeDiagram.description}</p>

            {/* Pro Layers Control Bar */}
            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 font-bold flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                طبقات المخطط (Layers):
              </span>
              <div className="flex items-center gap-2 overflow-x-auto">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={layers.power12v}
                    onChange={(e) => setLayers({ ...layers, power12v: e.target.checked })}
                    className="accent-rose-500 rounded"
                  />
                  <span className="text-rose-400 text-[11px] font-bold">12V B+</span>
                </label>

                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={layers.ref5v}
                    onChange={(e) => setLayers({ ...layers, ref5v: e.target.checked })}
                    className="accent-amber-400 rounded"
                  />
                  <span className="text-amber-300 text-[11px] font-bold">5V Ref</span>
                </label>

                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={layers.ground}
                    onChange={(e) => setLayers({ ...layers, ground: e.target.checked })}
                    className="accent-slate-400 rounded"
                  />
                  <span className="text-slate-400 text-[11px] font-bold">GND</span>
                </label>

                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={layers.canBus}
                    onChange={(e) => setLayers({ ...layers, canBus: e.target.checked })}
                    className="accent-blue-500 rounded"
                  />
                  <span className="text-blue-400 text-[11px] font-bold">CAN-Bus</span>
                </label>

                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={layers.signals}
                    onChange={(e) => setLayers({ ...layers, signals: e.target.checked })}
                    className="accent-emerald-400 rounded"
                  />
                  <span className="text-emerald-400 text-[11px] font-bold">إشارات</span>
                </label>
              </div>
            </div>
          </div>

          {/* Interactive Wire Tracking Selection Bar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-amber-400 font-tajawal flex items-center gap-2">
                <Compass className="w-4 h-4" />
                <span>نظام تتبع الأسلاك الذكي (Wire Path Tracker)</span>
              </h3>
              <span className="text-[10px] text-slate-400">حدد السلك لتتبعه ملوناً بالكامل</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {wireTraces.map((wt) => (
                <button
                  key={wt.id}
                  onClick={() => setSelectedWireId(wt.id)}
                  className={`p-2.5 rounded-xl border text-right text-xs transition flex items-center justify-between ${
                    selectedWireId === wt.id
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: wt.colorHex }} />
                    <span className="line-clamp-1">{wt.nameAr}</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-80">{wt.colorName}</span>
                </button>
              ))}
            </div>

            {/* Traced Wire Details Card */}
            {activeWireTrace && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2 text-xs animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-slate-100 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeWireTrace.colorHex }} />
                    <span>تفاصيل مسار السلك المتتبع: {activeWireTrace.nameAr}</span>
                  </span>
                  <Badge variant="amber">{activeWireTrace.colorName}</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-slate-400">🔌 مصدر البداية (Origin): </span>
                    <span className="text-slate-200 font-bold">{activeWireTrace.originAr}</span>
                  </div>

                  <div>
                    <span className="text-slate-400">🏁 جهة النهاية (Destination): </span>
                    <span className="text-slate-200 font-bold">{activeWireTrace.destinationAr}</span>
                  </div>

                  <div>
                    <span className="text-slate-400">⚡ الجهد المباشر المتوقع: </span>
                    <span className="text-emerald-400 font-mono font-bold">{activeWireTrace.voltageAr}</span>
                  </div>

                  <div>
                    <span className="text-slate-400">🛡️ الفيوز والريليه المسؤول: </span>
                    <span className="text-amber-300 font-bold">{activeWireTrace.fuseRelayAr}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/60 text-[11px] text-slate-300">
                  <span className="font-bold text-cyan-400">💡 نصيحة فحص العطل والتآكل: </span>
                  <span>{activeWireTrace.testingTipAr}</span>
                </div>
              </div>
            )}
          </div>

          {/* Compare Side-by-Side View if Enabled */}
          {isCompareMode && (
            <div className="p-4 rounded-2xl bg-blue-950/20 border-2 border-blue-500/40 space-y-3">
              <div className="flex items-center justify-between text-xs text-blue-300 font-bold">
                <span>مقارنة side-by-side مع مخطط ثانٍ:</span>
                <select
                  value={compareDiagram.id}
                  onChange={(e) => {
                    const found = COMPREHENSIVE_WIRING_DIAGRAMS.find((d) => d.id === e.target.value);
                    if (found) setCompareDiagram(found);
                  }}
                  className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-slate-200"
                >
                  {COMPREHENSIVE_WIRING_DIAGRAMS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.carCompany} {d.model} - {d.systemName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <Badge variant="amber">{activeDiagram.carCompany} {activeDiagram.model}</Badge>
                  <p className="font-bold text-slate-100 mt-1">{activeDiagram.titleAr}</p>
                  <p className="text-slate-400 text-[11px] mt-1">Pins: {activeDiagram.ecuPins.length} | Fuses: {activeDiagram.fuses.length}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <Badge variant="blue">{compareDiagram.carCompany} {compareDiagram.model}</Badge>
                  <p className="font-bold text-slate-100 mt-1">{compareDiagram.titleAr}</p>
                  <p className="text-slate-400 text-[11px] mt-1">Pins: {compareDiagram.ecuPins.length} | Fuses: {compareDiagram.fuses.length}</p>
                </div>
              </div>
            </div>
          )}

          {/* Interactive SVG Diagram Canvas */}
          <div
            className={`relative rounded-3xl bg-slate-950 border border-slate-800 p-4 transition-all duration-300 shadow-2xl overflow-hidden ${
              isFullscreen ? 'fixed inset-4 z-50 bg-slate-950 border-amber-500 space-y-4' : 'aspect-[16/10] w-full'
            }`}
          >
            {/* Controls Overlay Bar */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-slate-300 shadow-lg">
              <button onClick={handleZoomIn} className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-amber-400">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button onClick={handleZoomOut} className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-amber-400">
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-mono px-1 text-slate-400">{Math.round(zoomLevel * 100)}%</span>
              <button onClick={handleResetCanvas} className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-amber-400">
                <RotateCcw className="w-4 h-4" />
              </button>
              <button onClick={handleRotate} className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-amber-400">
                <RotateCw className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-slate-800 mx-0.5" />
              <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-amber-400">
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Virtual Multimeter Probes Display Overlay */}
            <div className="absolute top-4 right-4 z-20 p-2.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-xs space-y-1 shadow-lg">
              <div className="flex items-center justify-between gap-3 text-[11px]">
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" />
                  قراءة الملتيميتر الافتراضي:
                </span>
                <span className="px-2 py-0.5 rounded bg-black text-emerald-400 font-mono font-bold border border-emerald-500/40">
                  {simulatedVoltage}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <span className="text-rose-400 font-bold">🔴 الموجب (+): {redProbePin}</span>
                <span className="text-slate-300 font-bold">⚫ الأرضي (-): {blackProbePin}</span>
              </div>
            </div>

            {/* Canvas Board */}
            <div
              className="w-full h-full relative flex items-center justify-center transition-transform duration-200 bg-circuit-pattern rounded-2xl border border-slate-800/80 p-6 overflow-auto"
              style={{
                transform: `scale(${zoomLevel}) rotate(${rotationDegree}deg)`,
                transformOrigin: 'center center'
              }}
            >
              <div className="w-full h-full relative min-h-[360px] border border-dashed border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                {/* SVG Active Wire Path Glowing Overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" opacity="0.8">
                  {/* Power Line Trace */}
                  {layers.power12v && (
                    <path
                      d="M 100 80 Q 250 80 400 180 T 700 180"
                      fill="none"
                      stroke={activeWireTrace.colorHex}
                      strokeWidth={selectedWireId === 'wire-power-12v' ? '4' : '2'}
                      strokeDasharray={selectedWireId === 'wire-power-12v' ? '8 4' : 'none'}
                      className={selectedWireId === 'wire-power-12v' ? 'animate-pulse' : ''}
                    />
                  )}

                  {/* 5V Ref Trace */}
                  {layers.ref5v && (
                    <path
                      d="M 200 120 Q 350 120 500 220"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth={selectedWireId === 'wire-ref-5v' ? '4' : '2'}
                    />
                  )}

                  {/* GND Trace */}
                  {layers.ground && (
                    <path
                      d="M 100 280 L 700 280"
                      fill="none"
                      stroke="#64748b"
                      strokeWidth={selectedWireId === 'wire-ground-e01' ? '4' : '2'}
                    />
                  )}

                  {/* Educational Electrons Flow particles */}
                  {isAcademyMode && (
                    <g>
                      <circle cx="200" cy="80" r="4" fill="#fbbf24" className="animate-ping" />
                      <circle cx="450" cy="180" r="4" fill="#ef4444" className="animate-ping" />
                    </g>
                  )}
                </svg>

                {/* Hotspot Buttons */}
                {activeDiagram.hotspots.map((hs) => {
                  const isSelected = selectedHotspot?.id === hs.id;

                  return (
                    <button
                      key={hs.id}
                      onClick={() => {
                        setSelectedHotspot(hs);
                        setRedProbePin(hs.label);
                      }}
                      style={{
                        left: `${hs.xPercent}%`,
                        top: `${hs.yPercent}%`
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-2xl border transition-all duration-200 group flex items-center gap-2 shadow-2xl z-10 ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 border-white ring-4 ring-amber-500/30 scale-110'
                          : 'bg-slate-900/90 text-slate-200 border-amber-500/50 hover:border-amber-400 hover:scale-105 hover:bg-slate-800'
                      }`}
                    >
                      <span className="p-1 rounded-xl bg-amber-500/20 text-amber-400 font-bold">
                        {hs.type === 'ecu' && <Cpu className="w-4 h-4" />}
                        {hs.type === 'sensor' && <Zap className="w-4 h-4" />}
                        {hs.type === 'actuator' && <Activity className="w-4 h-4" />}
                        {hs.type === 'fuse' && <AlertTriangle className="w-4 h-4" />}
                        {hs.type === 'battery' && <Zap className="w-4 h-4 text-rose-400" />}
                        {hs.type === 'switch' && <Info className="w-4 h-4 text-cyan-400" />}
                      </span>
                      <div className="text-right">
                        <p className={`text-[11px] font-bold ${isSelected ? 'text-slate-950 font-extrabold' : 'text-slate-100'}`}>
                          {hs.label}
                        </p>
                        <p className={`text-[9px] ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                          انقر لتثبيت مجس القياس
                        </p>
                      </div>
                    </button>
                  );
                })}

                {/* Simulated Modules Architecture */}
                <div className="flex items-center justify-between w-full h-full pointer-events-none px-8 py-4">
                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-center text-rose-300">
                    <p className="text-[10px] font-bold font-mono">BATTERY 12V</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-950/40 border-2 border-amber-500/60 text-center text-amber-300 space-y-1">
                    <Cpu className="w-8 h-8 mx-auto text-amber-400" />
                    <p className="text-xs font-bold font-tajawal">MAIN ECU MODULE</p>
                    <p className="text-[10px] text-amber-200/70 font-mono">{activeDiagram.ecuPins.length} PINS HARNESS</p>
                  </div>

                  <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-center text-cyan-300">
                    <p className="text-[10px] font-bold font-mono">SENSORS & ACTUATORS</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-3 right-4 z-10 flex items-center gap-2 text-[11px] text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>اضغط على أي عنصر بالمخطط لتثبيت مجس الفحص المباشر لقراءة الفولتية</span>
            </div>
          </div>

          {/* Academy Quiz Section if Academy Mode active */}
          {isAcademyMode && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border-2 border-amber-500/40 space-y-4 animate-fadeIn shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-amber-400" />
                  <h3 className="text-sm font-bold text-slate-100 font-tajawal">
                    اختبار الفحص التشخيصي التفاعلي (Diagnostic Challenge Quiz)
                  </h3>
                </div>
                <Badge variant="amber">أكاديمية الكهرباء</Badge>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <p className="font-bold text-slate-200 leading-relaxed">
                  ❓ سيناريو عطل تدريبي: السيارة لا تدور، والمحرك لا يستجيب للشرارة. عند قياس الفولتية على فيوز EFI 15A، وجدنا 12.6V على المدخل و 0V على المخرج. ما هو سبب العطل؟
                </p>

                <div className="space-y-2 pt-1">
                  {[
                    '1. انصهار سلك الفيوز الداخلي (Blown Fuse) بسبب شورت أو تحميل زائد.',
                    '2. تلف في كمبيوتر المحرك ECU بالكامل.',
                    '3. انقطاع سلك الأرضي الرئيسي للبطارية.'
                  ].map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setQuizAnswer(idx);
                        setQuizSubmitted(true);
                      }}
                      className={`w-full text-right p-3 rounded-xl border transition ${
                        quizAnswer === idx
                          ? idx === 0
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                            : 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {quizSubmitted && (
                  <div className={`p-3 rounded-xl text-xs ${quizAnswer === 0 ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'}`}>
                    {quizAnswer === 0 ? (
                      <p className="font-bold">✨ إجابة صحيحة 100%! انقطاع الجهد على مخرج الفيوز مع وجوده على المدخل يعني انصهار الفيوز الداخلي مباشرة.</p>
                    ) : (
                      <p className="font-bold">❌ إجابة غير دقيقة. لاحظ أن الفولت موجود على مدخل الفيوز، مما يعني أن التغذية من البطارية سليمة، لكن الفيوز منصهر.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Hotspot Selected Item Detail Card */}
          {selectedHotspot && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 border-2 border-amber-500/60 space-y-4 animate-fadeIn shadow-2xl relative">
              <button
                onClick={() => setSelectedHotspot(null)}
                className="absolute left-4 top-4 text-slate-400 hover:text-slate-100 p-1 rounded-lg bg-slate-800/80"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500 text-slate-950 font-bold">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <Badge variant="amber">{selectedHotspot.type.toUpperCase()}</Badge>
                  <h3 className="text-base font-extrabold text-slate-100 font-tajawal mt-0.5">
                    {selectedHotspot.label}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <p className="font-bold text-amber-400">الوظيفة في المنظومة:</p>
                  <p className="text-slate-300 leading-relaxed">{selectedHotspot.details.functionAr}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <p className="font-bold text-cyan-400">طريقة الفحص والقياس:</p>
                  <p className="text-slate-300 leading-relaxed">{selectedHotspot.details.testingMethodAr}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <p className="font-bold text-emerald-400">القيم الطبيعية (Voltage / Resistance):</p>
                  <p className="text-slate-300 font-mono">{selectedHotspot.details.normalValuesAr}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <p className="font-bold text-rose-400">أكواد الأعطال المرتبطة (DTCs):</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedHotspot.details.associatedDtcs.map((dtc) => (
                      <span key={dtc} className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-[10px]">
                        {dtc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reference Tabs (ECU Pins, Fuses, Relays, Multimeter Wizard, Notes) */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto text-xs scrollbar-none">
              <button
                onClick={() => setActiveTab('pins')}
                className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'pins' || activeTab === 'diagram'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>جدول أطراف ECU Pins ({activeDiagram.ecuPins.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('fuses')}
                className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'fuses'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                <span>الفيوزات ({activeDiagram.fuses.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('relays')}
                className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'relays'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>الريليهات ({activeDiagram.relays.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('multimeter')}
                className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'multimeter'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>مساعد الملتيميتر التفاعلي</span>
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'notes'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>ملاحظات الفني</span>
              </button>
            </div>

            {/* Pins Table View */}
            {(activeTab === 'pins' || activeTab === 'diagram') && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-200 font-tajawal flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <span>توزيع أطراف السوكيتات والألوان (ECU Terminal Pinouts Chart)</span>
                </h4>

                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                      <tr>
                        <th className="p-3">رقم الطرف (Pin)</th>
                        <th className="p-3">اسم السوكيت</th>
                        <th className="p-3">رمز الإشارة</th>
                        <th className="p-3">لون السلك</th>
                        <th className="p-3">الفولتية المقاسة</th>
                        <th className="p-3">الوظيفة الكهربائية</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50">
                      {activeDiagram.ecuPins.map((pin) => (
                        <tr key={pin.pinNumber} className="hover:bg-slate-800/50 transition">
                          <td className="p-3 font-mono font-bold text-amber-400">{pin.pinNumber}</td>
                          <td className="p-3 text-slate-300">{pin.connector}</td>
                          <td className="p-3 font-mono text-cyan-300">{pin.signalName}</td>
                          <td className="p-3 text-slate-200 font-bold">{pin.wireColor}</td>
                          <td className="p-3 font-mono text-emerald-400">{pin.voltage}</td>
                          <td className="p-3 text-slate-300">{pin.functionAr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Fuses Reference Table */}
            {activeTab === 'fuses' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-200 font-tajawal">دليل المصاهر والفيوزات المخصصة</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeDiagram.fuses.map((fuse) => (
                    <div key={fuse.number} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-bold text-amber-400">{fuse.number}</span>
                        <p className="text-slate-300 mt-0.5">{fuse.functionAr}</p>
                      </div>
                      <Badge variant="rose">{fuse.rating}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Relays Reference Table */}
            {activeTab === 'relays' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-200 font-tajawal">دليل الريليهات والرحلات الكهربائية</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeDiagram.relays.map((relay) => (
                    <div key={relay.number} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-cyan-400">{relay.number}</span>
                        <Badge variant="amber">Relay</Badge>
                      </div>
                      <p className="text-slate-200 font-bold">{relay.typeAr}</p>
                      <p className="text-slate-400 text-[11px]">الموقع: {relay.locationAr}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Multimeter Guided Wizard View */}
            {activeTab === 'multimeter' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <h4 className="font-bold text-amber-400 font-tajawal flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    <span>خطوات فحص الجهد والأرضي بالملتيميتر الموجه تفاعلياً</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="space-y-1">
                      <label className="text-slate-300 font-bold">1. قياس خط التغذية (12V / 5V Power):</label>
                      <input
                        type="number"
                        step="0.1"
                        value={multimeterPowerVal}
                        onChange={(e) => setMultimeterPowerVal(e.target.value)}
                        placeholder="مثال: 12.4"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-bold">2. قياس هبوط أرضي (GND Voltage):</label>
                      <input
                        type="number"
                        step="0.01"
                        value={multimeterGndVal}
                        onChange={(e) => setMultimeterGndVal(e.target.value)}
                        placeholder="مثال: 0.02"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-bold">3. قياس إشارة الحساس (Signal):</label>
                      <input
                        type="number"
                        step="0.1"
                        value={multimeterSignalVal}
                        onChange={(e) => setMultimeterSignalVal(e.target.value)}
                        placeholder="مثال: 2.1"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleRunMultimeterEvaluation}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تقييم قياسات الملتيميتر وإعطاء التقرير الفني</span>
                  </button>

                  {multimeterResult && (
                    <div
                      className={`p-4 rounded-xl space-y-2 animate-fadeIn border ${
                        multimeterResult.status === 'pass'
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                          : multimeterResult.status === 'fail'
                          ? 'bg-rose-500/10 border-rose-500/40 text-rose-300'
                          : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                      }`}
                    >
                      <h5 className="font-bold text-sm">{multimeterResult.title}</h5>
                      <p className="leading-relaxed">{multimeterResult.description}</p>
                      <p className="font-bold text-slate-200 pt-1 border-t border-slate-800/60">
                        الخطوة الموصى بها: {multimeterResult.recommendation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Technician Custom Notes */}
            {activeTab === 'notes' && (
              <div className="space-y-4 text-xs">
                <h4 className="font-bold text-slate-200 font-tajawal">ملاحظات وقياسات الفني الخاصة بهذا المخطط</h4>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 min-h-[100px] text-slate-300 font-mono whitespace-pre-line">
                  {userNotes[activeDiagram.id] || 'لا توجد ملاحظات مسجلة بعد. استخدم النموذج أدناه لإضافة قراءاتك الشخصية.'}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newNoteInput}
                    onChange={(e) => setNewNoteInput(e.target.value)}
                    placeholder="سجل قراءة فولتية، لون سلك معدل، أو ملاحظة صيانة..."
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={handleAddNote}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1 hover:bg-amber-400 transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>حفظ الملاحظة</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Repair Case Modal */}
      {isSaveCaseModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border-2 border-amber-500/70 rounded-3xl p-6 space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-slate-100 font-tajawal flex items-center gap-2">
                <Save className="w-5 h-5 text-amber-400" />
                <span>حفظ حالة إصلاح ميدانية في قاعدة البيانات</span>
              </h3>
              <button onClick={() => setIsSaveCaseModalOpen(false)} className="text-slate-400 hover:text-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                <span>السيارة والمخطط: </span>
                <strong className="text-amber-400">{selectedVehicle?.companyName || activeDiagram.carCompany} {selectedVehicle?.modelName || activeDiagram.model} ({activeDiagram.systemName})</strong>
              </div>

              <div>
                <label className="text-slate-300 font-bold">وصف الشكوى والعطل:</label>
                <input
                  type="text"
                  value={caseProblem}
                  onChange={(e) => setCaseProblem(e.target.value)}
                  placeholder="مثال: تفتفة ومحرك يقطع أثناء التسارع وسوء استجابة الثروتل"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 font-bold">كود العطل DTC:</label>
                  <input
                    type="text"
                    value={caseDtc}
                    onChange={(e) => setCaseDtc(e.target.value)}
                    placeholder="مثال: P0100"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold">التكلفة الإجمالية:</label>
                  <input
                    type="text"
                    value={caseCost}
                    onChange={(e) => setCaseCost(e.target.value)}
                    placeholder="150 ريال"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold">الفولتيات والقياسات المسجلة:</label>
                <input
                  type="text"
                  value={caseReadings}
                  onChange={(e) => setCaseReadings(e.target.value)}
                  placeholder="مثال: جهد التغذية 10.2V انخفاض حاد والأرضي 0.01V"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold">الحل النهائي والقطعة المستبدلة/المصلحة:</label>
                <textarea
                  value={caseSolution}
                  onChange={(e) => setCaseSolution(e.target.value)}
                  rows={2}
                  placeholder="مثال: تم إصلاح كربنة فيشة C101 وإعادة لحام طرف السلك 12V B+ ورجعت القراءة إلى 12.6V"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              {caseSavedSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-center font-bold">
                  ✨ تم حفظ حالة الإصلاح بنجاح! تظهر الآن في قسم Real Repair Cases.
                </div>
              )}

              <button
                onClick={handleSaveRepairCase}
                className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold shadow-lg hover:bg-amber-400 transition"
              >
                تأكيد وحفظ حالة الإصلاح
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Drawer */}
      {isAiDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border-2 border-amber-500/70 rounded-3xl p-6 space-y-5 shadow-2xl animate-scaleUp max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500 text-slate-950 font-bold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-100 font-tajawal">
                    المساعد الذكي لتفسير المخططات الكهربائية
                  </h3>
                  <p className="text-xs text-slate-400">
                    مخطط: {activeDiagram.titleAr} ({activeDiagram.carCompany} {activeDiagram.model})
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAiDrawerOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">طرح سؤال محدد على الذكاء الاصطناعي حول المخطط:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiQuestionInput}
                  onChange={(e) => setAiQuestionInput(e.target.value)}
                  placeholder="مثال: أين خط الأرضي الرئيسي؟ أو كيف أفحص إشارة حساس الكرنك؟"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={() => handleAskAi()}
                  disabled={isAiLoading}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 hover:bg-amber-400 disabled:opacity-50 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>تحليل</span>
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs leading-relaxed text-slate-200 min-h-[160px] space-y-3 font-tajawal">
              {isAiLoading ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-3">
                  <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-amber-400 font-bold animate-pulse">جاري قراءة وتحليل المخطط الكهربائي بواسطة Gemini AI Engine...</p>
                </div>
              ) : aiAnalysisResult ? (
                <div className="whitespace-pre-line text-slate-200 leading-relaxed font-sans">
                  {aiAnalysisResult}
                </div>
              ) : (
                <p className="text-slate-500 text-center py-6">انقر على زر التحليل للبدء في قراءة المخطط تفصيلياً.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
