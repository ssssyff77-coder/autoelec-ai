import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import {
  User,
  Award,
  GraduationCap,
  Star,
  ShieldCheck,
  Car,
  Zap,
  CheckCircle2,
  Lock,
  Smartphone,
  Download,
  RefreshCw,
  FileText,
  HelpCircle,
  Building2,
  Wrench,
  Sparkles,
  CreditCard,
  WifiOff,
  Check
} from 'lucide-react';
import { SubscriptionPlan, UserProfile } from '../types';

export const ProfilePage: React.FC = () => {
  const {
    user,
    setUserRole,
    setSubscriptionTier,
    isOffline,
    setIsOffline,
    isSyncing,
    lastSyncTime,
    syncData
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'roles' | 'subscriptions' | 'app-apk' | 'policies'>('profile');
  const [showPoliciesModal, setShowPoliciesModal] = useState<string | null>(null);

  const rolesList: Array<{
    key: UserProfile['role'];
    titleAr: string;
    badgeColor: string;
    descAr: string;
    features: string[];
  }> = [
    {
      key: 'مستخدم عادي',
      titleAr: 'مستخدم عادي / مالك سيارة',
      badgeColor: 'bg-slate-800 text-slate-300',
      descAr: 'الوصول للبحث السريع وقراءة الأكواد الأساسية والمقالات المفتوحة.',
      features: ['البحث السريع في الأكواد', 'التشخيص الذكي المحدود (مرتان يومياً)', 'قراءة مواصفات الحساسات']
    },
    {
      key: 'فني معتمد',
      titleAr: 'فني كهرباء سيارات معتمد',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      descAr: 'الوصول الكامل لمخططات Wiring HD، مساعد الملتيميتر، وحفظ حالات الإصلاح.',
      features: ['المخططات الكهربائية عالية الدقة', 'مساعد فحص الملتيميتر التفاعلي', 'حفظ حالات الإصلاح في السجل', 'توليد تقارير التشخيص للعملاء']
    },
    {
      key: 'صاحب ورشة',
      titleAr: 'صاحب ورشة صيانة متكاملة',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      descAr: 'إدارة أسطول سيارات العملاء، طباعة الفواتير والتقارير، وإدارة الفريق.',
      features: ['إدارة سجل عملاء وسيارات الورشة', 'طباعة ومشاركة تقارير الفحص والإنفويس', 'تحليلات أداء الورشة', 'جميع ميزات الفني المعتمد']
    },
    {
      key: 'مدير عام',
      titleAr: 'مدير المنصة والمحتوى (Admin)',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      descAr: 'الوصول الكامل للوحة التحكم والإشراف والمصادقة على الحالات.',
      features: ['لوحة تحكم الإدارة الكاملة', 'إضافة ومصادقة الحالات والأكواد', 'إدارة المستخدمين والاشتراكات', 'الإشراف التقني']
    }
  ];

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'free',
      nameAr: 'الخطة المجانية',
      priceAr: '0 ر.س',
      periodAr: 'مجاناً مدى الحياة',
      descriptionAr: 'مناسبة للمبتدئين وملاك السيارات للتعرف على الأعطال الأساسية',
      features: [
        'البحث عن أكواد DTC الأساسية',
        'مواصفات الحساسات الشائعة',
        '2 تشخيص ذكي يومياً',
        'تصفح الفيديوهات المفتوحة'
      ],
      ctaAr: 'الخطة الحالية'
    },
    {
      id: 'tech',
      nameAr: 'خطة الفني الاحترافي',
      priceAr: '75 ر.س',
      periodAr: '/ شهرياً',
      badge: 'الأكثر طلباً للفنيين',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      descriptionAr: 'الخيار الأمثل للفنيين المستقلين والمهندسين الميدانيين',
      features: [
        'فتح جميع المخططات الكهربائية HD',
        'مساعد فحص الملتيميتر التفاعلي',
        'تشخيص ذكي غير محدود بـ Gemini AI',
        'حفظ وتوليد تقارير الإصلاح للعملاء',
        'شهادات إتمام الدورات'
      ],
      ctaAr: 'ترقية لخطة الفني'
    },
    {
      id: 'workshop',
      nameAr: 'خطة الورشة الشريكة',
      priceAr: '199 ر.س',
      periodAr: '/ شهرياً',
      badge: 'الورش والمراكز',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      descriptionAr: 'شاملة لجميع أجهزة الورشة وإدارة سجلات سيارات العملاء',
      features: [
        'كل مميزات خطة الفني الاحترافي',
        'نظام إدارة عملاء وسيارات الورشة',
        'توليد طباعة الفواتير الرسمية للورشة',
        'مساعدات وتحديثات أوفلاين خاصة',
        'دعم فني وتواصل مباشر مع الخبراء'
      ],
      ctaAr: 'ترقية لخطة الورشة'
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      <SectionHeader
        title="الملف الشخصي وإدارة الحساب والاشتراك"
        subtitle="إدارة الصلاحيات والأدوار، خطط الاشتراك، النسخة المحمولة Android، والسياسات الرسمية"
        icon={<User className="w-5 h-5 text-amber-400" />}
      />

      {/* Tabs Header */}
      <div className="flex rounded-2xl bg-slate-900 border border-slate-800 p-1.5 text-xs font-bold gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'profile' ? 'bg-amber-500 text-slate-950 font-extrabold shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-4 h-4" />
          <span>الملف والإنجازات</span>
        </button>

        <button
          onClick={() => setActiveTab('roles')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'roles' ? 'bg-amber-500 text-slate-950 font-extrabold shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>الأدوار والصلاحيات</span>
        </button>

        <button
          onClick={() => setActiveTab('subscriptions')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'subscriptions' ? 'bg-amber-500 text-slate-950 font-extrabold shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>خطط الاشتراك</span>
        </button>

        <button
          onClick={() => setActiveTab('app-apk')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'app-apk' ? 'bg-amber-500 text-slate-950 font-extrabold shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>تطبيق Android والتزامن</span>
        </button>

        <button
          onClick={() => setActiveTab('policies')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'policies' ? 'bg-amber-500 text-slate-950 font-extrabold shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>السياسات ودليل الاستخدام</span>
        </button>
      </div>

      {/* TAB 1: PROFILE & ACHIEVEMENTS */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-right">
              <div className="w-24 h-24 rounded-3xl bg-slate-950 border-2 border-amber-500/50 flex items-center justify-center text-5xl shadow-xl">
                {user.avatar}
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-2xl font-black text-slate-100 font-tajawal">{user.name}</h2>
                  <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                    {user.role}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-mono font-bold">
                    {user.subscriptionTier || 'فني احترافي'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">{user.email}</p>
                <p className="text-xs text-emerald-400 font-bold flex items-center justify-center sm:justify-start gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>عضو معتمد وموثق في المنصة الرسمية</span>
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <p className="text-2xl font-black text-amber-400 font-mono">{user.points}</p>
                <p className="text-xs text-slate-400 mt-1">النقاط الفنية</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <p className="text-2xl font-black text-blue-400 font-mono">{user.completedCourses}</p>
                <p className="text-xs text-slate-400 mt-1">دورات مكتملة</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <p className="text-2xl font-black text-cyan-400 font-mono">{user.earnedCertificates}</p>
                <p className="text-xs text-slate-400 mt-1">شهادات معتمدة</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <p className="text-2xl font-black text-emerald-400 font-mono">100%</p>
                <p className="text-xs text-slate-400 mt-1">مستوى الكفاءة</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ROLES & PERMISSIONS */}
      {activeTab === 'roles' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-bold flex items-center justify-between">
            <span>دورك الحالي في المنصة: <strong className="text-amber-400 font-tajawal text-sm">{user.role}</strong></span>
            <span className="text-slate-400">يمكنك تبديل الدور لاختبار صلاحيات الواجهة:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rolesList.map((r) => {
              const isCurrent = user.role === r.key;
              return (
                <div
                  key={r.key}
                  className={`p-6 rounded-3xl bg-slate-900 border transition-all space-y-4 shadow-xl ${
                    isCurrent ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${r.badgeColor}`}>
                        {r.titleAr}
                      </span>
                    </div>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                        نشط الآن
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{r.descAr}</p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                    <span className="text-slate-400 font-bold block mb-2">الميزات المتاحة:</span>
                    {r.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setUserRole(r.key)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                      isCurrent
                        ? 'bg-slate-800 text-slate-400 cursor-default'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
                    }`}
                  >
                    {isCurrent ? 'الدور المفعّل حالياً' : `التبديل إلى دور (${r.key})`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: SUBSCRIPTION PLANS */}
      {activeTab === 'subscriptions' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/5 border border-amber-500/30 text-xs text-amber-300 font-bold flex items-center justify-between">
            <span>الاشتراك الحالي: <strong className="text-white font-tajawal">{user.subscriptionTier || 'فني احترافي'}</strong></span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 font-bold">مفعّل وصالح</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => {
              const isCurrent = (user.subscriptionTier || 'فني احترافي') === (plan.id === 'free' ? 'مجاني' : plan.id === 'tech' ? 'فني احترافي' : 'ورشة شريكة');

              return (
                <div
                  key={plan.id}
                  className={`p-6 rounded-3xl bg-slate-900 border transition-all space-y-5 shadow-2xl relative flex flex-col justify-between ${
                    isCurrent ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-black text-slate-100 font-tajawal">{plan.nameAr}</h3>
                      {plan.badge && (
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${plan.badgeColor}`}>
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-amber-400 font-mono">{plan.priceAr}</span>
                      <span className="text-xs text-slate-400">{plan.periodAr}</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{plan.descriptionAr}</p>

                    <div className="space-y-2 pt-3 border-t border-slate-800 text-xs">
                      {plan.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span className="text-slate-300">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const tier = plan.id === 'free' ? 'مجاني' : plan.id === 'tech' ? 'فني احترافي' : 'ورشة شريكة';
                      setSubscriptionTier(tier);
                      alert(`تم تحديث خطتك إلى (${plan.nameAr}) بنجاح!`);
                    }}
                    className={`w-full py-3 rounded-xl font-bold text-xs mt-4 transition-all shadow-lg ${
                      isCurrent
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                        : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-extrabold'
                    }`}
                  >
                    {isCurrent ? 'الخطة المفعلة حالياً' : plan.ctaAr}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: ANDROID APP & OFFLINE SYNC */}
      {activeTab === 'app-apk' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100 font-tajawal">تطبيق Android الرسمي والعمل أوفلاين</h3>
                <p className="text-xs text-slate-400">تحميل تطبيق APK الميداني الخاص بالفنيين مع قاعدة البيانات المحلية</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">حالة التخزين المحلي Offline Cache:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>مفعلة (5,240 كود DTC + المخططات مخزنة)</span>
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-900">
                <span className="text-slate-400">آخر مزامنة لقاعدة البيانات:</span>
                <span className="text-amber-400 font-mono font-bold">{lastSyncTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={syncData}
                disabled={isSyncing}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg transition-all"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'جاري مزامنة المخططات...' : 'مزامنة وتحديث البيانات الآن'}</span>
              </button>

              <button
                onClick={() => alert('جاري تجهيز تحميل ملف المهندس_الذكي_v2.4.apk (حجم 42 ميجابايت)...')}
                className="px-5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 hover:text-white font-bold text-xs flex items-center gap-2 shadow"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>تحميل APK المباشر لهواتف Android</span>
              </button>

              <button
                onClick={() => setIsOffline(!isOffline)}
                className={`px-4 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                  isOffline
                    ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <WifiOff className="w-4 h-4" />
                <span>{isOffline ? 'وضع أوفلاين مفعّل (محاكاة)' : 'اختبار وضع قطع الشبكة'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: POLICIES & USER MANUAL */}
      {activeTab === 'policies' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setShowPoliciesModal('manual')}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 space-y-3 text-right transition-all group shadow-xl"
            >
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 w-fit group-hover:scale-110 transition-transform">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-100 font-tajawal">دليل الاستخدام والتشخيص</h3>
              <p className="text-xs text-slate-400 leading-relaxed">خطوات الفحص، طرق قراءة المخططات، والوصول لأكواد الأعطال.</p>
            </button>

            <button
              onClick={() => setShowPoliciesModal('privacy')}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 space-y-3 text-right transition-all group shadow-xl"
            >
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 w-fit group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-100 font-tajawal">سياسة الخصوصية وأمان البيانات</h3>
              <p className="text-xs text-slate-400 leading-relaxed">حماية بيانات الفنيين والورش وحفظ السجلات بسريّة كاملة.</p>
            </button>

            <button
              onClick={() => setShowPoliciesModal('terms')}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 space-y-3 text-right transition-all group shadow-xl"
            >
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 w-fit group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-100 font-tajawal">شروط الاستخدام وإخلاء المسؤولية</h3>
              <p className="text-xs text-slate-400 leading-relaxed">الالتزام بمعايير السلامة عند التعامل مع كهرباء وسوائل السيارة.</p>
            </button>
          </div>
        </div>
      )}

      {/* POLICY & MANUAL MODAL */}
      {showPoliciesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-2xl w-full space-y-5 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-slate-100 font-tajawal">
                {showPoliciesModal === 'privacy' && 'سياسة الخصوصية وحماية بيانات الفنيين'}
                {showPoliciesModal === 'terms' && 'شروط الاستخدام وإخلاء المسؤولية السلامة'}
                {showPoliciesModal === 'manual' && 'دليل الاستخدام الشامل لمنصة المهندس الذكي'}
              </h3>
              <button
                onClick={() => setShowPoliciesModal(null)}
                className="px-3 py-1 rounded-xl bg-slate-950 text-slate-400 font-bold text-xs hover:text-white"
              >
                إغلاق
              </button>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed space-y-3">
              {showPoliciesModal === 'privacy' && (
                <>
                  <p>تلتزم منصة المهندس الذكي لحماية خصوصية وسرية جميع بيانات الورش والفنيين والسيارات المسجلة.</p>
                  <ul className="list-disc pr-4 space-y-1 text-slate-400">
                    <li>لا يتم مشاركة سجلات العملاء الخاصة بالورش مع أي طرف ثالث.</li>
                    <li>جميع تقارير الفحص والإنفويسات مشفرة ومحفوظة بآمان عبر قاعدة بيانات Supabase.</li>
                    <li>تخزين البيانات أوفلاين يتم محلياً على جهاز المستخدم دون نقل خارجي.</li>
                  </ul>
                </>
              )}

              {showPoliciesModal === 'terms' && (
                <>
                  <p>جميع المعلومات والمخططات الكهربائية المقدمة في المنصة هي لأغراض تعليمية وإرشادية مهنية.</p>
                  <ul className="list-disc pr-4 space-y-1 text-slate-400">
                    <li>يجب على الفني مراعاة إجراءات السلامة وتفريغ شحنات البطارية قبل فحص كمبيوتر السيارة (ECU).</li>
                    <li>المنصة غير مسؤولة عن سوء استخدام أجهزة الفحص أو التوصيل الخاطئ للأسلاك.</li>
                  </ul>
                </>
              )}

              {showPoliciesModal === 'manual' && (
                <>
                  <p>خطوات الاستخدام السريع للمنصة:</p>
                  <ol className="list-decimal pr-4 space-y-1 text-slate-400">
                    <li>حدد شركة وموديل وسنة السيارة من أعلى الشاشة.</li>
                    <li>ادخل كود العطل DTC أو اكتب وصف المشكلة في البحث الذكي.</li>
                    <li>افتح المخطط الكهربائي HD وتتبع الأسلاك والنقاط الساخنة (Hotspots).</li>
                    <li>استعن بمساعد الملتيميتر لقياس الفولطية والمقاومة الصحيحة.</li>
                  </ol>
                </>
              )}
            </div>

            <button
              onClick={() => setShowPoliciesModal(null)}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
            >
              فهمت وأوافق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
