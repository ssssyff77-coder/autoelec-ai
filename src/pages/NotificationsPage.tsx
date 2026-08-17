import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { Bell, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const notifs = [
    {
      id: 1,
      title: 'تم تحديث قاعدة مخططات تويوتا كامري 2024',
      desc: 'إضافة مخططات ECU و BCM عالية الدقة المعتمدة مع ألوان الضفيرة.',
      time: 'منذ ساعة',
      type: 'update'
    },
    {
      id: 2,
      title: 'درس فيديو جديد للمهندس عبدالحق',
      desc: 'تمت إضافة فيديو "كيف تفحص تسريب الكهرباء Parasitic Drain بالملتيميتر".',
      time: 'منذ 3 ساعات',
      type: 'video'
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
      <SectionHeader
        title="الإشعارات والتنبيهات المباشرة"
        subtitle="آخر التحديثات على المخططات، الدروس المضافة حديثاً، والتنبيهات الهندسية"
        icon={<Bell className="w-5 h-5 text-amber-400" />}
      />

      <div className="space-y-3">
        {notifs.map((n) => (
          <div key={n.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3 shadow-md">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 border border-amber-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-100 font-tajawal">{n.title}</h4>
                <span className="text-[10px] text-slate-500">{n.time}</span>
              </div>
              <p className="text-xs text-slate-400">{n.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
