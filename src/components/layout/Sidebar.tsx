import React from 'react';
import { useApp } from '../../context/AppContext';
import { RouteType } from '../../types';
import {
  Home,
  Car,
  Stethoscope,
  AlertTriangle,
  Bot,
  Radio,
  Cpu,
  Zap,
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
  Code2,
  ChevronLeft
} from 'lucide-react';

interface NavGroup {
  title: string;
  items: {
    id: RouteType;
    label: string;
    icon: React.ReactNode;
    badge?: string;
    badgeColor?: string;
  }[];
}

export const Sidebar: React.FC = () => {
  const { currentRoute, setCurrentRoute } = useApp();

  const navGroups: NavGroup[] = [
    {
      title: 'مركز التشخيص الأولي',
      items: [
        { id: 'home', label: 'الرئيسية', icon: <Home className="w-4 h-4" /> },
        { id: 'vehicle-select', label: 'تخصيص السيارة', icon: <Car className="w-4 h-4" /> },
        { id: 'smart-diagnosis', label: 'التشخيص الذكي', icon: <Stethoscope className="w-4 h-4" />, badge: 'تفاعلي', badgeColor: 'bg-amber-500/20 text-amber-300' },
        { id: 'dtc', label: 'أكواد الأعطال DTC', icon: <AlertTriangle className="w-4 h-4" /> },
        { id: 'ai-mechanic', label: 'الميكانيكي الذكي AI', icon: <Bot className="w-4 h-4" />, badge: 'Gemini', badgeColor: 'bg-cyan-500/20 text-cyan-300' },
        { id: 'obd', label: 'جهاز فحص OBD-II', icon: <Radio className="w-4 h-4" /> }
      ]
    },
    {
      title: 'المكونات والكهرباء',
      items: [
        { id: 'sensors', label: 'دليل الحساسات', icon: <Cpu className="w-4 h-4" /> },
        { id: 'actuators', label: 'المشغلات (Actuators)', icon: <Zap className="w-4 h-4" /> },
        { id: 'live-data', label: 'البيانات الحية Live Data', icon: <Activity className="w-4 h-4" /> },
        { id: 'wiring-diagrams', label: 'المخططات الكهربائية', icon: <Network className="w-4 h-4" />, badge: 'HD', badgeColor: 'bg-blue-500/20 text-blue-300' }
      ]
    },
    {
      title: 'المعرفة والخبراء',
      items: [
        { id: 'expert-library', label: 'الخبراء والشركاء (عبدالحق)', icon: <Video className="w-4 h-4" />, badge: 'شريك', badgeColor: 'bg-rose-500/20 text-rose-300' },
        { id: 'courses', label: 'الدورات التعليمية', icon: <GraduationCap className="w-4 h-4" /> },
        { id: 'knowledge', label: 'قاعدة المعرفة', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'repair-cases', label: 'حالات عملية واقعية', icon: <Wrench className="w-4 h-4" /> },
        { id: 'exams', label: 'الاختبارات والشهادات', icon: <Award className="w-4 h-4" /> },
        { id: 'forum', label: 'المنتدى الفني', icon: <MessageSquare className="w-4 h-4" /> }
      ]
    },
    {
      title: 'الحساب والنظام',
      items: [
        { id: 'profile', label: 'الملف الشخصي', icon: <User className="w-4 h-4" /> },
        { id: 'admin', label: 'لوحة الإدارة', icon: <ShieldCheck className="w-4 h-4" /> },
        { id: 'developer', label: 'المطور والتواصل', icon: <Code2 className="w-4 h-4" />, badge: 'جديد', badgeColor: 'bg-emerald-500/20 text-emerald-300' }
      ]
    }
  ];

  return (
    <aside className="hidden lg:block w-64 shrink-0 bg-slate-950/80 border-l border-slate-800/80 p-4 h-[calc(100vh-65px)] sticky top-[65px] overflow-y-auto custom-scrollbar">
      <div className="space-y-6">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1.5">
            <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2 font-tajawal">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = currentRoute === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentRoute(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/90'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`transition-colors ${
                          isActive ? 'text-amber-400' : 'text-slate-500 group-hover:text-slate-300'
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {item.badge && (
                        <span
                          className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md ${item.badgeColor}`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {isActive && <ChevronLeft className="w-3.5 h-3.5 text-amber-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
