import React from 'react';
import { useApp } from '../../context/AppContext';
import { RouteType } from '../../types';
import {
  X,
  Zap,
  Home,
  Car,
  Stethoscope,
  AlertTriangle,
  Bot,
  Radio,
  Cpu,
  Activity,
  Network,
  Video,
  GraduationCap,
  BookOpen,
  Wrench,
  Award,
  MessageSquare,
  User,
  ShieldCheck,
  Code2
} from 'lucide-react';

export const MobileDrawer: React.FC = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen, currentRoute, setCurrentRoute, user } = useApp();

  if (!isMobileMenuOpen) return null;

  const navItems: { id: RouteType; label: string; icon: React.ReactNode; category: string }[] = [
    { id: 'home', label: 'الرئيسية', icon: <Home className="w-4 h-4" />, category: 'الأساسية' },
    { id: 'vehicle-select', label: 'تخصيص السيارة', icon: <Car className="w-4 h-4" />, category: 'الأساسية' },
    { id: 'smart-diagnosis', label: 'التشخيص الذكي', icon: <Stethoscope className="w-4 h-4" />, category: 'الأساسية' },
    { id: 'dtc', label: 'أكواد الأعطال DTC', icon: <AlertTriangle className="w-4 h-4" />, category: 'الأساسية' },
    { id: 'ai-mechanic', label: 'الميكانيكي الذكي AI', icon: <Bot className="w-4 h-4" />, category: 'الأساسية' },
    { id: 'obd', label: 'جهاز فحص OBD-II', icon: <Radio className="w-4 h-4" />, category: 'الأساسية' },

    { id: 'sensors', label: 'دليل الحساسات', icon: <Cpu className="w-4 h-4" />, category: 'الكهرباء' },
    { id: 'actuators', label: 'المشغلات الكهروميكانيكية', icon: <Zap className="w-4 h-4" />, category: 'الكهرباء' },
    { id: 'live-data', label: 'البيانات الحية Live Data', icon: <Activity className="w-4 h-4" />, category: 'الكهرباء' },
    { id: 'wiring-diagrams', label: 'المخططات الكهربائية', icon: <Network className="w-4 h-4" />, category: 'الكهرباء' },

    { id: 'expert-library', label: 'الخبراء والشركاء (عبدالحق)', icon: <Video className="w-4 h-4" />, category: 'المعرفة' },
    { id: 'courses', label: 'الدورات التعليمية', icon: <GraduationCap className="w-4 h-4" />, category: 'المعرفة' },
    { id: 'knowledge', label: 'قاعدة المعرفة', icon: <BookOpen className="w-4 h-4" />, category: 'المعرفة' },
    { id: 'repair-cases', label: 'حالات عملية واقعية', icon: <Wrench className="w-4 h-4" />, category: 'المعرفة' },
    { id: 'exams', label: 'الاختبارات والشهادات', icon: <Award className="w-4 h-4" />, category: 'المعرفة' },
    { id: 'forum', label: 'المنتدى الفني', icon: <MessageSquare className="w-4 h-4" />, category: 'المعرفة' },

    { id: 'profile', label: 'الملف الشخصي', icon: <User className="w-4 h-4" />, category: 'الإدارة' },
    { id: 'admin', label: 'لوحة الإدارة', icon: <ShieldCheck className="w-4 h-4" />, category: 'الإدارة' },
    { id: 'developer', label: 'المطور والتواصل', icon: <Code2 className="w-4 h-4" />, category: 'الإدارة' }
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        onClick={() => setIsMobileMenuOpen(false)}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
      />

      {/* Drawer */}
      <div className="relative w-4/5 max-w-xs bg-slate-900 border-l border-slate-800 h-full flex flex-col z-10 shadow-2xl">
        {/* Drawer Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-100 font-tajawal">المهندس الذكي</p>
              <p className="text-[10px] text-slate-400">قائمة المنصة الشاملة</p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card inside Drawer */}
        <div className="p-3 bg-slate-950/50 border-b border-slate-800/80 flex items-center gap-3">
          <span className="text-2xl">{user.avatar}</span>
          <div>
            <p className="text-xs font-bold text-slate-200">{user.name}</p>
            <p className="text-[10px] text-amber-400">{user.role} • {user.points} نقطة</p>
          </div>
        </div>

        {/* Drawer Nav Items */}
        <div className="p-3 overflow-y-auto space-y-1 custom-scrollbar flex-1">
          {navItems.map((item) => {
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentRoute(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-right transition-colors ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                <span className={isActive ? 'text-amber-400' : 'text-slate-400'}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
