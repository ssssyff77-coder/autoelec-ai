import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import {
  ShieldCheck,
  Users,
  AlertTriangle,
  Cpu,
  BookOpen,
  Plus,
  Settings,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Database,
  BarChart2,
  Car,
  Search,
  Filter,
  UserCheck,
  Award,
  Video,
  FileSpreadsheet,
  Download,
  RefreshCw
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'cases' | 'dtc' | 'experts'>('overview');

  // Simulated pending cases for approval
  const [pendingCases, setPendingCases] = useState([
    {
      id: 'case-101',
      technician: 'المهندس أحمد مصطفى',
      vehicle: 'Toyota Corolla 2012 (1ZR-FE)',
      dtc: 'P0335',
      problem: 'توقف المحرك فجأة مع صعوبة السلف وانقطاع إشارة الكرنك',
      solution: 'تغيير فيشة الحساس وعزل الأسلاك',
      date: 'اليوم، 10:30 ص',
      status: 'pending'
    },
    {
      id: 'case-102',
      technician: 'المهندس خليل الرمال',
      vehicle: 'Hyundai Sonata 2015 (2.4L GDI)',
      dtc: 'P0101',
      problem: 'ضعف عزم شديد مع خروج دخان أسود بسيط',
      solution: 'تنظيف حساس MAF واستبدال الفلتر الاصلي',
      date: 'أمس، 04:15 م',
      status: 'pending'
    }
  ]);

  const [dtcSearch, setDtcSearch] = useState('');
  const [newDtcCode, setNewDtcCode] = useState('');
  const [newDtcTitle, setNewDtcTitle] = useState('');
  const [isAddingDtc, setIsAddingDtc] = useState(false);

  const handleApproveCase = (id: string) => {
    setPendingCases(prev => prev.map(c => c.id === id ? { ...c, status: 'approved' } : c));
  };

  const handleRejectCase = (id: string) => {
    setPendingCases(prev => prev.map(c => c.id === id ? { ...c, status: 'rejected' } : c));
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-6xl mx-auto">
      <SectionHeader
        title="لوحة الإدارة والتحكم الشاملة (Admin & Content Governance)"
        subtitle="إدارة المستخدمين والصلاحيات، مراجعة وتوثيق حالات الإصلاح، تحديث أكواد DTC والشركاء"
        icon={<ShieldCheck className="w-5 h-5 text-amber-400" />}
        action={
          <button
            onClick={() => setIsAddingDtc(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-extrabold text-xs shadow-lg transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة كود عطل DTC جديد</span>
          </button>
        }
      />

      {/* Tabs Bar */}
      <div className="flex rounded-2xl bg-slate-900 border border-slate-800 p-1.5 text-xs font-bold gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'overview' ? 'bg-amber-500 text-slate-950 font-extrabold shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>نظرة عامة وإحصائيات المنصة</span>
        </button>

        <button
          onClick={() => setActiveTab('cases')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap relative ${
            activeTab === 'cases' ? 'bg-amber-500 text-slate-950 font-extrabold shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>مراجعة حالات الفنيين</span>
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'users' ? 'bg-amber-500 text-slate-950 font-extrabold shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>إدارة الأعضاء والورش</span>
        </button>

        <button
          onClick={() => setActiveTab('dtc')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'dtc' ? 'bg-amber-500 text-slate-950 font-extrabold shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>أكواد الأعطال والمخططات</span>
        </button>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Main Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>إجمالي المستخدمين</span>
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-2xl font-black text-slate-100 font-mono">12,850</p>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+18% هذا الشهر</span>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>عمليات التشخيص الذكي</span>
                <Cpu className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-black text-amber-400 font-mono">48,210</p>
              <span className="text-[11px] text-slate-400">نسبة الدقة 98.4%</span>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>أكواد DTC المسجلة</span>
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              </div>
              <p className="text-2xl font-black text-rose-400 font-mono">5,240</p>
              <span className="text-[11px] text-slate-400">مربوطة بالمخططات</span>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>حالات الإصلاح الواقعية</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-black text-emerald-400 font-mono">1,840</p>
              <span className="text-[11px] text-slate-400">مصادق عليها من الفنيين</span>
            </div>
          </div>

          {/* Top Searched Cars & Faults */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-slate-100 font-tajawal flex items-center gap-2">
                <Car className="w-4 h-4 text-amber-400" />
                <span>أكثر السيارات بحثاً وتشخيصاً:</span>
              </h3>

              <div className="space-y-3 text-xs">
                {[
                  { name: 'Toyota Corolla 2012 (1ZR-FE)', count: '14,200 فحص', percent: 85 },
                  { name: 'Hyundai Sonata 2015 (2.4L)', count: '9,800 فحص', percent: 65 },
                  { name: 'Kia Cerato 2016 (CAN BUS)', count: '7,400 فحص', percent: 50 },
                  { name: 'Nissan Sunny 2018 (HR16DE)', count: '5,100 فحص', percent: 35 }
                ].map((car, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-200">{car.name}</span>
                      <span className="text-amber-400 font-mono">{car.count}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${car.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-slate-100 font-tajawal flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>أكثر أكواد الأعطال الشائعة:</span>
              </h3>

              <div className="space-y-3 text-xs">
                {[
                  { code: 'P0335', title: 'حساس الكرنك CKP Sensor', count: '12,500 استعلام', color: 'text-amber-400' },
                  { code: 'P0101', title: 'حساس تدفق الهواء MAF', count: '8,300 استعلام', color: 'text-rose-400' },
                  { code: 'P0620', title: 'دائرة المولد / الدينامو Generator', count: '6,100 استعلام', color: 'text-cyan-400' },
                  { code: 'C0035', title: 'حساس ABS الأمامي الأيسر', count: '4,900 استعلام', color: 'text-blue-400' }
                ].map((dtc, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className={`font-mono font-bold text-sm ${dtc.color}`}>{dtc.code}</span>
                      <p className="text-slate-300 font-bold">{dtc.title}</p>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px] font-bold">{dtc.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CASES APPROVAL TAB */}
      {activeTab === 'cases' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-bold flex items-center justify-between">
            <span>حالات الإصلاح المقدمة من الفنيين في انتظار المصادقة والتأكيد:</span>
            <Badge variant="rose">{pendingCases.filter(c => c.status === 'pending').length} حالات معلقة</Badge>
          </div>

          <div className="space-y-4">
            {pendingCases.map((c) => (
              <div key={c.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm font-tajawal">{c.vehicle}</h4>
                    <p className="text-xs text-slate-400">بواسطة: {c.technician} • {c.date}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono font-bold text-xs">
                    كود: {c.dtc}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-rose-400 font-bold block mb-1">وصف العطل:</span>
                    <p className="text-slate-300">{c.problem}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-emerald-400 font-bold block mb-1">الحل والتصليح:</span>
                    <p className="text-slate-300">{c.solution}</p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  {c.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleRejectCase(c.id)}
                        className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-bold text-xs hover:bg-rose-500/20"
                      >
                        رفض
                      </button>
                      <button
                        onClick={() => handleApproveCase(c.id)}
                        className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs shadow-md hover:bg-emerald-400"
                      >
                        مصادقة ونشر بالمنصة
                      </button>
                    </>
                  ) : c.status === 'approved' ? (
                    <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>تمت المصادقة والنشر بنجاح</span>
                    </span>
                  ) : (
                    <span className="text-rose-400 font-bold text-xs flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      <span>مرفوضة</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* USERS TAB */}
      {activeTab === 'users' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-slate-100 font-tajawal flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-amber-400" />
            <span>قائمة الفنيين والورش المسجلة:</span>
          </h3>

          <div className="space-y-3 text-xs">
            {[
              { name: 'المهندس علي السعيد', role: 'فني معتمد', plan: 'فني احترافي', email: 'ali.electrician@autoelec.pro', status: 'نشط' },
              { name: 'ورشة السلام لكهرباء السيارات', role: 'صاحب ورشة', plan: 'ورشة شريكة', email: 'salem.workshop@autoelec.pro', status: 'نشط' },
              { name: 'المهندس محمد طارق', role: 'مستخدم عادي', plan: 'مجاني', email: 'm.tariq@gmail.com', status: 'مجاني' }
            ].map((usr, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-slate-100 font-bold block">{usr.name}</span>
                  <span className="text-slate-400 font-mono">{usr.email}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="amber">{usr.role}</Badge>
                  <span className="px-2.5 py-0.5 rounded-lg bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20">
                    {usr.plan}
                  </span>
                  <button className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold hover:text-amber-400">
                    تعديل الصلاحية
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DTC CONTENT TAB */}
      {activeTab === 'dtc' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100 font-tajawal">محتوى المخططات وأكواد الأعطال (5,240 كود)</h3>
            <button
              onClick={() => setIsAddingDtc(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
            >
              + إضافة كود
            </button>
          </div>

          <input
            type="text"
            value={dtcSearch}
            onChange={(e) => setDtcSearch(e.target.value)}
            placeholder="ابحث برقم الكود أو اسم الحساس..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none"
          />

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 text-center">
            قاعدة البيانات محدثة ومتصلة بـ Supabase و AI Studio Backend.
          </div>
        </div>
      )}

      {/* ADD DTC MODAL */}
      {isAddingDtc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-100 font-tajawal">إضافة كود عطل جديد لقاعدة البيانات</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">كود DTC (مثل P0335):</label>
                <input
                  type="text"
                  value={newDtcCode}
                  onChange={(e) => setNewDtcCode(e.target.value)}
                  placeholder="P0335"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-300 font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">عنوان العطل والحساس المرتبط:</label>
                <input
                  type="text"
                  value={newDtcTitle}
                  onChange={(e) => setNewDtcTitle(e.target.value)}
                  placeholder="دائرة إشارة حساس موقع عمود الكرنك CKP"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsAddingDtc(false)}
                className="px-4 py-2 rounded-xl bg-slate-950 text-slate-400 font-bold text-xs"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  alert('تمت إضافة الكود بنجاح لقاعدة البيانات!');
                  setIsAddingDtc(false);
                }}
                className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
