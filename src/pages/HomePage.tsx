import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { DTC_CODES, EXPERT_VIDEOS } from '../data/mockData';
import { fetchCarCompanies, CarCompanyDB } from '../services/vehicleService';
import { StatCard } from '../components/common/StatCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import {
  Stethoscope,
  Car,
  AlertTriangle,
  Bot,
  Cpu,
  Zap,
  Network,
  Video,
  Sparkles,
  ArrowLeft,
  ChevronLeft,
  Loader2,
  AlertCircle,
  Info
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setCurrentRoute, setIsVehicleModalOpen, selectedVehicle } = useApp();

  const [dbCompanies, setDbCompanies] = useState<CarCompanyDB[]>([]);
  const [loadingCompanies, setLoadingCompanies] = useState<boolean>(true);
  const [companiesError, setCompaniesError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadCompanies = async () => {
      setLoadingCompanies(true);
      setCompaniesError(null);
      const res = await fetchCarCompanies();
      if (!isMounted) return;
      setLoadingCompanies(false);

      if (res.error) {
        setCompaniesError(res.error);
        setDbCompanies([]);
      } else {
        setDbCompanies(res.data);
      }
    };

    loadCompanies();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800/80 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>المنصة العربية الأولى لكهرباء وتخاطب السيارات الحديثة</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-100 font-tajawal leading-tight tracking-tight">
            شخص أعطال سيارتك بدقة <span className="text-amber-400">المهندس الخبير</span> وبذكاء الاصطناعي
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            دليل كامل لأكواد DTC، المخططات الكهربائية HD، فحص الحساسات بالأوسيلوسكوب، والربط المباشر مع أجهزة فحص OBD-II ومكتبة الخبراء.
          </p>

          {/* Quick Vehicle Status Bar */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Car className="w-4 h-4" />
              </span>
              <div>
                <span className="text-slate-400">السيارة المختارة حالياً: </span>
                <span className="font-bold text-slate-200">
                  {selectedVehicle
                    ? `${selectedVehicle.companyName} ${selectedVehicle.modelName} (${selectedVehicle.year})`
                    : 'لم يتم التحديد'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsVehicleModalOpen(true)}
              className="text-amber-400 hover:text-amber-300 font-bold underline transition-colors flex items-center gap-1"
            >
              <span>تغيير السيارة</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setCurrentRoute('smart-diagnosis')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Stethoscope className="w-5 h-5" />
              <span>ابدأ التشخيص الذكي فوراً</span>
            </button>

            <button
              onClick={() => setCurrentRoute('ai-mechanic')}
              className="px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 font-bold text-sm transition-all flex items-center gap-2"
            >
              <Bot className="w-5 h-5 text-cyan-400" />
              <span>استشر الميكانيكي الذكي (Gemini AI)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Platform Key Stats Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="أكواد الأعطال (DTC)"
          value="5,200+"
          subtitle="مع الخطوات والحلول"
          icon={<AlertTriangle className="w-5 h-5" />}
          color="amber"
          onClick={() => setCurrentRoute('dtc')}
        />
        <StatCard
          title="الحساسات والمشغلات"
          value="180+"
          subtitle="مخططات الفحص والـ Pinouts"
          icon={<Cpu className="w-5 h-5" />}
          color="blue"
          onClick={() => setCurrentRoute('sensors')}
        />
        <StatCard
          title="المخططات الكهربائية"
          value="1,400+"
          subtitle="مخططات ECU و CAN-BUS"
          icon={<Network className="w-5 h-5" />}
          color="cyan"
          onClick={() => setCurrentRoute('wiring-diagrams')}
        />
        <StatCard
          title="فيديوهات الخبراء"
          value="350+"
          subtitle="دروس المهندس عبدالحق"
          icon={<Video className="w-5 h-5" />}
          color="emerald"
          onClick={() => setCurrentRoute('expert-library')}
        />
      </section>

      {/* 3. Car Companies Selection Grid */}
      <section className="space-y-4">
        <SectionHeader
          title="اختر شركة السيارة للوصول المباشر"
          subtitle="تصفح الأنظمة والمخططات وأكواد الأعطال الخاصة بماركتك المحددة من قاعدة البيانات (Supabase)"
          icon={<Car className="w-5 h-5" />}
          action={
            <button
              onClick={() => setCurrentRoute('vehicle-select')}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>عرض جميع الماركات</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          }
        />

        {loadingCompanies ? (
          <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-3 flex flex-col items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
            <p className="text-xs text-slate-400">جاري تحميل شركات السيارات من قاعدة البيانات...</p>
          </div>
        ) : companiesError ? (
          <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
            <span>حدث خطأ أثناء جلب الشركات: {companiesError}</span>
          </div>
        ) : dbCompanies.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-2 flex flex-col items-center justify-center">
            <Info className="w-6 h-6 text-amber-400" />
            <p className="text-sm font-bold text-slate-300">لا توجد شركات سيارات متوفرة حالياً</p>
            <p className="text-xs text-slate-500">لم يتم العثور على سجلات نشطة في جدول car_companies</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {dbCompanies.map((company) => (
              <button
                key={company.id}
                onClick={() => {
                  setIsVehicleModalOpen(true);
                }}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 transition-all text-right group shadow-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{company.logo_url || '🚗'}</span>
                  <div>
                    <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-300 font-tajawal">
                      {company.name_ar}
                    </h3>
                    <p className="text-xs text-slate-500">{company.country_origin || company.name_en}</p>
                  </div>
                </div>
                <ChevronLeft className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors" />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* 4. Core Features & Services Grid */}
      <section className="space-y-4">
        <SectionHeader
          title="أدوات ووحدات المنصة الشاملة"
          subtitle="كل ما يحتاجه فني ومهندس كهرباء السيارات في مكان واحد"
          icon={<Zap className="w-5 h-5" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Smart Diagnosis */}
          <div
            onClick={() => setCurrentRoute('smart-diagnosis')}
            className="group cursor-pointer p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all shadow-xl relative overflow-hidden"
          >
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 w-fit mb-4">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 font-tajawal group-hover:text-amber-300 transition-colors">
              نظام التشخيص التفاعلي الذكي
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              أسئلة نعم/لا موجهة للوصول إلى العطل بدقة عالية مع حساب نسبة الاحتمال والأسباب والحلول.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-bold">
              <span>ابدأ شجرة التشخيص</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: DTC Lookup */}
          <div
            onClick={() => setCurrentRoute('dtc')}
            className="group cursor-pointer p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all shadow-xl relative overflow-hidden"
          >
            <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 w-fit mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 font-tajawal group-hover:text-amber-300 transition-colors">
              موسوعة أكواد الأعطال DTC
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              ابحث برقم الكود للحصول على الأسباب، الأعراض، خطوات الفحص، التكلفة والقطع المطلوبة.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-rose-400 font-bold">
              <span>ابحث عن كود عطيل</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: AI Mechanic */}
          <div
            onClick={() => setCurrentRoute('ai-mechanic')}
            className="group cursor-pointer p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all shadow-xl relative overflow-hidden"
          >
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 w-fit mb-4">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 font-tajawal group-hover:text-cyan-300 transition-colors">
              الميكانيكي الذكي (AI Mechanic)
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              حلل صوت المحرك، صورة جهاز الفحص، أو اكتب الشكوى وسيقوم الذكاء الاصطناعي بإعطائك الحل.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-bold">
              <span>تحدث مع الخبير الذكي</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Most Searched DTC Codes */}
      <section className="space-y-4">
        <SectionHeader
          title="أكثر أكواد الأعطال شيوعاً هذا الأسبوع"
          subtitle="الأعطال الأكثر تكراراً في الورش مع شرح مبسط سريع"
          icon={<AlertTriangle className="w-5 h-5" />}
          action={
            <button
              onClick={() => setCurrentRoute('dtc')}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>جميع الأكواد</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DTC_CODES.map((dtc) => (
            <div
              key={dtc.id}
              onClick={() => setCurrentRoute('dtc')}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer shadow-md space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold text-sm border border-amber-500/20">
                  {dtc.code}
                </span>
                <Badge variant={dtc.severity === 'critical' ? 'rose' : 'amber'}>
                  {dtc.severity === 'critical' ? 'خطورة عالية' : 'متوسط الخطورة'}
                </Badge>
              </div>
              <h4 className="text-sm font-bold text-slate-100 font-tajawal">{dtc.titleAr}</h4>
              <p className="text-xs text-slate-400 line-clamp-2">{dtc.meaning}</p>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span>التكلفة المقدرة: {dtc.estimatedCost}</span>
                <span className="text-amber-400 font-semibold">التفاصيل الكاملة ←</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Expert Videos Highlight (Abdulhaq) */}
      <section className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <SectionHeader
          title="مكتبة فيديوهات الخبراء — سيارتك مع عبدالحق"
          subtitle="شروحات تطبيقية مفصلة لفحص الحساسات، الدوائر الكهربائية، وقطع التغذية"
          icon={<Video className="w-5 h-5" />}
          action={
            <button
              onClick={() => setCurrentRoute('expert-library')}
              className="px-4 py-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold hover:bg-amber-500/20 transition-all"
            >
              تصفح القناة بالكامل
            </button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXPERT_VIDEOS.map((video) => (
            <div
              key={video.id}
              onClick={() => setCurrentRoute('expert-library')}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex items-start gap-4"
            >
              <div className="w-20 h-20 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-3xl shrink-0 text-amber-400">
                📺
              </div>
              <div className="space-y-1.5">
                <Badge variant="cyan">{video.category}</Badge>
                <h4 className="text-sm font-bold text-slate-100 font-tajawal leading-snug">
                  {video.title}
                </h4>
                <p className="text-xs text-slate-400">
                  {video.expertName} • {video.duration} • {video.views.toLocaleString()} مشاهدة
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
