import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import {
  UserCheck,
  Code2,
  Globe,
  Sparkles,
  MessageCircle,
  CreditCard,
  Mail,
  Send,
  ExternalLink,
  Copy,
  Check,
  Instagram,
  Facebook,
  Award,
  BookOpen,
  Layout,
  Cpu,
  Layers,
  Lightbulb,
  ShieldCheck,
  AlertCircle,
  Rocket,
  Target,
  Zap,
  TrendingUp,
  CheckCircle2,
  HeartHandshake,
  Heart,
  Car,
  GraduationCap,
  Star,
  Coffee,
  PhoneCall,
  X,
  Share2
} from 'lucide-react';

export const DeveloperPage: React.FC = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'experience' | 'letter' | 'contact' | 'support'>('all');

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const contactMethods = [
    {
      id: 'whatsapp',
      name: 'واتساب المباشر',
      value: '782784107',
      displayValue: '+967 782 784 107',
      link: 'https://wa.me/967782784107',
      icon: <MessageCircle className="w-5 h-5 text-emerald-400" />,
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 hover:border-emerald-400 shadow-emerald-500/10',
      badge: 'الاستجابة الأسرع'
    },
    {
      id: 'telegram_bot',
      name: 'بوت Telegram الرسمي',
      value: '@sayf_67171BOT',
      displayValue: '@sayf_67171BOT',
      link: 'https://t.me/sayf_67171BOT',
      icon: <Send className="w-5 h-5 text-cyan-400" />,
      color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/40 hover:border-cyan-400 shadow-cyan-500/10',
      badge: 'دعم وخدمات آلي'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      value: 's1_ri1',
      displayValue: '@s1_ri1',
      link: 'https://instagram.com/s1_ri1',
      icon: <Instagram className="w-5 h-5 text-purple-400" />,
      color: 'from-purple-500/20 to-pink-500/10 border-purple-500/40 hover:border-purple-400 shadow-purple-500/10',
      badge: 'يوميات واستعراضات'
    },
    {
      id: 'email',
      name: 'البريد الإلكتروني',
      value: 'ssssyff77@gmail.com',
      displayValue: 'ssssyff77@gmail.com',
      link: 'mailto:ssssyff77@gmail.com',
      icon: <Mail className="w-5 h-5 text-amber-400" />,
      color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/40 hover:border-amber-400 shadow-amber-500/10',
      badge: 'للمشاورات الرسمية'
    },
    {
      id: 'facebook',
      name: 'فيسبوك (الصفحة الشخصية)',
      value: '61587921862651',
      displayValue: 'المهندس سيف عبيد',
      link: 'https://www.facebook.com/profile.php?id=61587921862651',
      icon: <Facebook className="w-5 h-5 text-blue-400" />,
      color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/40 hover:border-blue-400 shadow-blue-500/10',
      badge: 'مجتمع المطور'
    }
  ];

  const paymentMethods = [
    { name: 'بنك الكريمي الإسلامي', account: '3187044684', icon: '🏦', color: 'border-amber-500/30 bg-amber-500/5' },
    { name: 'محفظة جيب (Jeeb)', account: '782784107', icon: '📱', color: 'border-emerald-500/30 bg-emerald-500/5' },
    { name: 'محفظة جوالي (Jawali)', account: '782784107', icon: '📲', color: 'border-cyan-500/30 bg-cyan-500/5' },
    { name: 'محفظة وان كاش (OneCash)', account: '782784107', icon: '💳', color: 'border-purple-500/30 bg-purple-500/5' }
  ];

  const telegramChannels = [
    { title: 'القناة الرسمية الأولى - المخططات والأكواد', link: 'https://t.me/s_y_f35', handle: '@s_y_f35' },
    { title: 'القناة الثانية - برامج وتحديثات السيارات', link: 'https://t.me/SI_Sl7', handle: '@SI_Sl7' }
  ];

  const projects = [
    {
      title: 'منصة المهندس الذكي لكهرباء السيارات (AutoElec AI)',
      type: 'منصة تشخيص وتدريب متكاملة',
      desc: 'أول بيئة عربية ذكية مدعومة بنماذج Gemini AI لتشخيص أعطال السيارات، تتبع خطوط الحساسات والمخططات الكهربائية HD، ومحاكاة الملتيميتر.',
      tags: ['React', 'TypeScript', 'Gemini AI', 'Tailwind', 'Canvas', 'PWA Offline'],
      status: 'نشط ومتاح مجاناً'
    },
    {
      title: 'مساعد التشخيص الميداني وفحص الحساسات الذكي',
      type: 'تطبيق أوفلاين للهواتف',
      desc: 'موقع وتطبيق خفيف يعمل بدون إنترنت مع قاعدة بيانات تتجاوز 5,000 كود عطل DTC مع القيم المرجعية للمقاومة والفولتية.',
      tags: ['IndexedDB', 'PWA', 'Multi-Language', 'Fast Search'],
      status: 'متاح للتحميل APK'
    },
    {
      title: 'نظام إدارة ورش صيانة السيارات الذكية',
      type: 'منصة إدارية وفواتير',
      desc: 'نظام متطور لإدارة أسطول سيارات العملاء، حفظ حالات الإصلاح، توليد تقارير التشخيص، وطباعة الفواتير الرسمية للورش.',
      tags: ['Dashboard', 'PDF Export', 'CRM', 'Reports'],
      status: 'مُدمج في الخطة الاحترافية'
    }
  ];

  const aiPillars = [
    { title: 'التشخيص الذكي الفوري', desc: 'تحليل الأعطال بناءً على أكواد DTC والأعراض باستخدام Gemini AI' },
    { title: 'تفسير المخططات الكهربائية', desc: 'شرح مبسط لمسارات الأسلاك وألوان الإشارات والحساسات' },
    { title: 'مساعد الصيانة التفاعلي', desc: 'تقديم نصائح خطوة بخطوة لفحص الدوائر والأرضي المشترك' }
  ];

  const autoEngPillars = [
    { title: 'أنظمة حقن الوقود EFI', desc: 'فحص بخاخات، طلمبة الوقود، وحساسات الهواء والحرارة' },
    { title: 'كمبيوترات السيارات ECU', desc: 'إشارات التحكم، الفولتية المرجعية 5V، والتغذية الرئيسية' },
    { title: 'شبكات الاتصال CAN BUS', desc: 'تتبع بروتوكولات High/Low CAN وحل مشاكل التشويش' },
    { title: 'الحساسات والمشغلات', desc: 'قراءة إشارات الكرانك، الكام، الماف، وحساسات الأكسجين' },
    { title: 'المخططات الكهربائية HD', desc: 'تتبع مسارات الضفائر والفيوزات ومرحلات (Relays) السيارة' }
  ];

  const timelineSteps = [
    { year: '2024', title: 'بداية فكرة الدمج بين البرمجة والذكاء الاصطناعي وكهرباء السيارات بالمعهد التقني بذمار' },
    { year: '2025', title: 'تطوير النواة الأولى للمنصة والمخططات التفاعلية ومحاكي فحص الملتيميتر' },
    { year: '2026', title: 'إطلاق النسخة الفاخرة المعتمدة لمنصة "المهندس الذكي" ودعم وضع أوفلاين الكامل' }
  ];

  return (
    <div className="space-y-10 animate-fadeIn max-w-6xl mx-auto pb-16 font-cairo">
      {/* Dynamic Animated Circuit Background Header */}
      <div className="relative rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden">
        {/* Neon Ambient Lighting Circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-600/10 rounded-full blur-[110px] pointer-events-none" />

        {/* Grid Circuit Pattern */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
          {/* Developer Photo / Avatar Frame */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-cyan-400 to-purple-600 rounded-3xl blur-md opacity-80 group-hover:opacity-100 transition duration-1000 animate-pulse" />
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-slate-950 border-2 border-slate-800 p-2 flex items-center justify-center text-7xl shadow-2xl overflow-hidden">
              <span className="transform group-hover:scale-110 transition-transform duration-300">👨‍💻</span>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
              <div className="absolute bottom-2 inset-x-2 text-center">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] font-extrabold text-amber-300 backdrop-blur-md font-mono">
                  PLATFORM FOUNDER
                </span>
              </div>
            </div>
          </div>

          {/* Hero Bio Information */}
          <div className="space-y-4 flex-1 text-center md:text-right">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
              <Badge variant="amber" icon={<Sparkles className="w-3.5 h-3.5" />}>
                مطور المنصة الرئيسي
              </Badge>
              <Badge variant="cyan" icon={<Zap className="w-3.5 h-3.5" />}>
                خبير الذكاء الاصطناعي
              </Badge>
              <Badge variant="emerald" icon={<Car className="w-3.5 h-3.5" />}>
                هندسة كهرباء السيارات
              </Badge>
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl font-black text-slate-100 font-tajawal tracking-tight">
                المهندس سيف عبيد
              </h1>
              <p className="text-sm sm:text-base text-cyan-300 font-bold font-tajawal">
                المعهد التقني الصناعي - محافظة ذمار
              </p>
            </div>

            {/* Official Description */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md space-y-2">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-tajawal">
                &quot;مطور منصة المهندس الذكي لكهرباء السيارات، أعمل على دمج تقنيات الذكاء الاصطناعي مع علوم كهرباء السيارات لإنشاء حلول ذكية تساعد الفنيين والطلاب والمهندسين.&quot;
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/20 hover:scale-105 transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>تواصل مع المطور</span>
              </button>

              <a
                href="https://wa.me/967782784107"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold text-xs sm:text-sm backdrop-blur-md transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>واتساب (782784107)</span>
              </a>

              <a
                href="https://t.me/sayf_67171BOT"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-bold text-xs sm:text-sm backdrop-blur-md transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>بوت Telegram</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Filter Tabs */}
      <div className="flex rounded-2xl bg-slate-900 border border-slate-800 p-1.5 text-xs font-bold gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'all' ? 'bg-amber-500 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>الكل والتنفيذي</span>
        </button>
        <button
          onClick={() => setActiveTab('experience')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'experience' ? 'bg-amber-500 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>الذكاء الاصطناعي وهندسة السيارات</span>
        </button>
        <button
          onClick={() => setActiveTab('letter')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'letter' ? 'bg-amber-500 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Heart className="w-4 h-4 text-rose-500" />
          <span>رسالة المطور للطلاب</span>
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'contact' ? 'bg-amber-500 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>بيانات التواصل وقنوات التلجرام</span>
        </button>
        <button
          onClick={() => setActiveTab('support')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'support' ? 'bg-amber-500 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>ساهم في تطوير المنصة</span>
        </button>
      </div>

      {/* SECTION 1: VISION & MISSION CARD */}
      {(activeTab === 'all' || activeTab === 'experience') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card: الرؤية */}
          <div className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4 hover:border-amber-500/40 transition-all relative overflow-hidden group">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-100 font-tajawal">رؤيتنا (Our Vision)</h2>
                <p className="text-xs text-slate-400">الغاية والهدف المستقبلي</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-amber-300 font-bold leading-relaxed font-tajawal bg-slate-950/60 p-4 rounded-2xl border border-amber-500/20">
              &quot;بناء أكبر منصة عربية ذكية لتعليم وتشخيص كهرباء السيارات، وجعل التكنولوجيا في متناول كل طالب وفني ومهندس.&quot;
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>تقديم محتوى مجاني واحترافي يُسهم في إثراء المحتوى التقني العربي</span>
            </div>
          </div>

          {/* Card: عن المطور ورسالته */}
          <div className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4 hover:border-cyan-500/40 transition-all relative overflow-hidden group">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-100 font-tajawal">عن المهندس المطور</h2>
                <p className="text-xs text-slate-400">مؤسس ومصمم النظام</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-tajawal bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
              مهندس ومطور شغوف بالذكاء الاصطناعي وهندسة إلكترونيات السيارات، يعمل على سد الفجوة بين التعليم الأكاديمي والتطبيق الميداني في الورش من خلال تطبيقات الويب والهواتف الحديثة.
            </p>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>المعهد التقني الصناعي - محافظة ذمار</span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: AI & AUTOMOTIVE ENGINEERING PILLARS */}
      {(activeTab === 'all' || activeTab === 'experience') && (
        <div className="space-y-6">
          <SectionHeader
            title="الركائز التقنية والتخصصية للمنصة"
            subtitle="التكامل الفائق بين الذكاء الاصطناعي Gemini AI وهندسة كهرباء وإلكترونيات السيارات"
            icon={<Cpu className="w-5 h-5 text-amber-400" />}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card: 🤖 الذكاء الاصطناعي Gemini AI */}
            <div className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-5 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-100 font-tajawal">🤖 تقنيات الذكاء الاصطناعي (Gemini AI)</h3>
                  <p className="text-xs text-slate-400">دمج خوارزميات الاستدلال الذكي في تشخيص الأعطال</p>
                </div>
              </div>

              <div className="space-y-3">
                {aiPillars.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                    <p className="text-xs font-bold text-cyan-300 font-tajawal flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.title}</span>
                    </p>
                    <p className="text-xs text-slate-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Card: ⚡ هندسة كهرباء وإلكترونيات السيارات */}
            <div className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-5 hover:border-amber-500/40 transition-all">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-100 font-tajawal">⚡ هندسة كهرباء السيارات</h3>
                  <p className="text-xs text-slate-400">الخبرات العميقة في الأنظمة والمخططات الحية</p>
                </div>
              </div>

              <div className="space-y-2">
                {autoEngPillars.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-200 block font-tajawal">{item.title}</span>
                      <span className="text-[11px] text-slate-400">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: PROJECTS & TIMELINE */}
      {(activeTab === 'all' || activeTab === 'experience') && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects Column */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-black text-slate-100 font-tajawal flex items-center gap-2">
              <Code2 className="w-5 h-5 text-amber-400" />
              <span>🏆 المشاريع التقنية والأنظمة المطورة</span>
            </h2>

            <div className="space-y-4">
              {projects.map((p, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-3 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold font-tajawal">
                      {p.type}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      {p.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-100 font-tajawal">{p.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-tajawal">{p.desc}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                    {p.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2.5 py-0.5 rounded-lg bg-slate-950 text-slate-400 text-[10px] font-mono border border-slate-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Column */}
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-100 font-tajawal flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <span>🚀 رحلة التطوير (2024 - 2026)</span>
            </h2>

            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl relative">
              <div className="space-y-6 relative border-r-2 border-slate-800 mr-2 pr-4">
                {timelineSteps.map((step, idx) => (
                  <div key={idx} className="relative space-y-1">
                    <span className="absolute -right-[22px] top-1.5 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-slate-950 shadow-md animate-pulse" />
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/30 inline-block">
                      {step.year}
                    </span>
                    <p className="text-xs font-bold text-slate-200 font-tajawal leading-relaxed">
                      {step.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: MANDATORY SPECIAL CARD - LETTER TO EVERY STUDENT */}
      {(activeTab === 'all' || activeTab === 'letter') && (
        <section className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border-2 border-amber-500/40 shadow-2xl space-y-6 overflow-hidden">
          {/* Subtle Heart Light Background */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-amber-500/30">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 shadow-lg">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-amber-300 font-tajawal flex items-center gap-2">
                  <span>💌 رسالة إلى كل طالب وطالبة</span>
                </h2>
                <p className="text-xs text-amber-200/80">كلمة خاصة من القلب لمستقبل مهندسي وفنيي الوطن العربي</p>
              </div>
            </div>

            <Badge variant="amber" icon={<Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />}>
              إلهام وتحفيز
            </Badge>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/80 border border-amber-500/20 space-y-4 text-xs sm:text-sm text-slate-200 leading-loose font-tajawal backdrop-blur-md">
            <p className="text-base font-extrabold text-amber-300">
              إلى كل طالب وطالبة في مجال كهرباء السيارات...
            </p>

            <p>
              أنتم مستقبل هذه الصناعة، لا تجعلوا التعلم يتوقف عند الكتب أو المحاضرات فقط، بل اجعلوا من المعرفة والتجربة طريقًا لصناعة مستقبلكم.
            </p>

            <p className="font-bold text-amber-400 text-sm sm:text-base py-1">
              تعلموا، جربوا، أخطئوا، ثم عودوا أقوى.
            </p>

            <p>
              عالم السيارات يتطور بسرعة، ومن يطور نفسه اليوم سيكون مهندس المستقبل غدًا.
            </p>

            <p>
              هذه المنصة تم إنشاؤها لتكون معكم في رحلة التعلم، تساعدكم على الفهم والتطبيق والوصول إلى مستوى احترافي.
            </p>

            <p className="font-bold text-emerald-400 text-sm pt-2">
              ثقوا بقدراتكم، فكل خبير كان يومًا طالبًا يبحث عن أول خطوة.
            </p>

            <div className="pt-4 border-t border-slate-800/80 flex justify-end">
              <div className="text-left font-tajawal">
                <p className="text-xs text-slate-400">أخوكم الداعم لكم دائمًا،</p>
                <p className="text-base font-black text-amber-400 font-tajawal mt-0.5">— المهندس سيف عبيد</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5: PREMIUM CONTACT DATA & TELEGRAM CHANNELS */}
      {(activeTab === 'all' || activeTab === 'contact') && (
        <div className="space-y-6">
          <SectionHeader
            title="بيانات وقنوات التواصل المباشر"
            subtitle="تواصل مع المهندس سيف عبيد بضغطة زر أو انضم لقنواتنا الرسمية على Telegram"
            icon={<MessageCircle className="w-5 h-5 text-amber-400" />}
          />

          {/* Contact Methods Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contactMethods.map((c) => (
              <div
                key={c.id}
                className={`p-6 rounded-3xl bg-gradient-to-b ${c.color} border transition-all space-y-4 flex flex-col justify-between shadow-xl backdrop-blur-md group`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 shadow">
                        {c.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-100 font-tajawal">{c.name}</h3>
                        <span className="text-[10px] text-slate-400">{c.badge}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy(c.value, c.name)}
                      className="p-2 rounded-xl bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-slate-400 transition-colors text-xs flex items-center gap-1 shadow"
                      title="نسخ الرقم/المعرف"
                    >
                      {copiedText === c.name ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-center font-mono text-xs font-black text-amber-300 dir-ltr">
                    {c.displayValue}
                  </div>
                </div>

                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-amber-500 text-slate-200 hover:text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 mt-3 shadow"
                >
                  <span>فتح وسيلة التواصل</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>

          {/* Telegram Channels */}
          <div className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100 font-tajawal">📢 قنوات Telegram الرسمية للمنصة</h3>
                <p className="text-xs text-slate-400">اشترك لمتابعة التحديثات، رفع المخططات الكهربائية الجديدة، والملفات الميدانية</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {telegramChannels.map((tc, idx) => (
                <a
                  key={idx}
                  href={tc.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-between group shadow-md"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 font-tajawal">
                      {tc.title}
                    </p>
                    <span className="text-[11px] font-mono text-cyan-400 dir-ltr block">{tc.handle}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: SUPPORT & CONTRIBUTION CARD */}
      {(activeTab === 'all' || activeTab === 'support') && (
        <section className="space-y-6">
          <SectionHeader
            title="بطاقة الدعم والمساهمة في تطوير المنصة"
            subtitle="ساهم في استمرار وتوسيع نطاق منصة المهندس الذكي لكهرباء السيارات ودعم استضافة السيرفرات والتحديثات"
            icon={<HeartHandshake className="w-5 h-5 text-amber-400" />}
          />

          <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
              <div className="space-y-2 text-center md:text-right">
                <h2 className="text-xl font-black text-amber-300 font-tajawal flex items-center justify-center md:justify-start gap-2">
                  <Coffee className="w-6 h-6 text-amber-400" />
                  <span>ساهم في تطوير المنصة واستمراريتها</span>
                </h2>
                <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                  تطوير المنصة وصيانة قاعدة البيانات وتوليد المخططات الكهربائية يتطلب موارد استضافة وتحديثات مستمرة. مساهمتك تساعدنا على أبقاء المنصة مجانية ومتاحة لجميع الطلاب والفنيين.
                </p>
              </div>

              <div className="px-5 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold text-center shrink-0">
                <span>تطوير عربي حر ومستقل 100%</span>
              </div>
            </div>

            {/* Payment Methods Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {paymentMethods.map((pm, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border ${pm.color} transition-all space-y-3 shadow-lg flex flex-col justify-between`}
                >
                  <div className="space-y-1">
                    <span className="text-3xl block">{pm.icon}</span>
                    <h3 className="text-xs font-bold text-slate-200 font-tajawal">{pm.name}</h3>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-sm font-mono font-black text-amber-400 dir-ltr">{pm.account}</span>
                    <button
                      onClick={() => handleCopy(pm.account, pm.name)}
                      className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-amber-400 transition-colors"
                      title="نسخ الحساب"
                    >
                      {copiedText === pm.name ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Confirmation Banner */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300 leading-relaxed">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>طريقة تأكيد الدعم والمساهمة:</span>
              </div>
              <p>
                بعد إجراء عملية التحويل أو المساهمة، يرجى إرسال صورة سند التحويل عبر الواتساب (782784107) لسيتم إدراج اسمك في قائمة الداعمين الذهبيين وتأكيد حسابك بالمنصة مع رسالة شكر خاصة.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* QUICK CONTACT MODAL */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-amber-400 font-bold font-tajawal text-base">
                <PhoneCall className="w-5 h-5" />
                <span>وسائل التواصل المباشرة المتاحة</span>
              </div>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <a
                href="https://wa.me/967782784107"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center justify-between transition-all"
              >
                <span className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  <span>تواصل عبر الواتساب المباشر (782784107)</span>
                </span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="https://t.me/sayf_67171BOT"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-bold text-xs flex items-center justify-between transition-all"
              >
                <span className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-cyan-400" />
                  <span>تواصل عبر البوت الآلي (@sayf_67171BOT)</span>
                </span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="mailto:ssssyff77@gmail.com"
                className="p-4 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center justify-between transition-all"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-amber-400" />
                  <span>إرسال بريد إلكتروني (ssssyff77@gmail.com)</span>
                </span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={() => setIsContactModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-950 text-slate-400 text-xs font-bold hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
