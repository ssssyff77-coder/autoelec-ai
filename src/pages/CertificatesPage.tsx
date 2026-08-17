import React from 'react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { Award, QrCode, Download, ShieldCheck } from 'lucide-react';

export const CertificatesPage: React.FC = () => {
  const { user } = useApp();

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      <SectionHeader
        title="شهادات التخرج والاعتماد المهني"
        subtitle="شهادات رقمية موثقة بررمز QR Code وتوقيع المهندس المحاضر لإثبات الكفاءة الفنية"
        icon={<Award className="w-5 h-5 text-amber-400" />}
      />

      {/* Certificate Graphic Mock */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-500/40 space-y-8 shadow-2xl relative overflow-hidden text-center">
        <div className="absolute top-4 left-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-extrabold text-amber-400 tracking-widest uppercase font-tajawal">
            شهادة إتمام وتفوق مهني رسمية
          </p>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-100 font-tajawal">
            المهندس الذكي لكهرباء السيارات
          </h2>
        </div>

        <div className="py-4 space-y-2 border-y border-slate-800">
          <p className="text-xs text-slate-400">تشهد منصة AutoElec Pro بأن الفني/المهندس:</p>
          <p className="text-2xl font-bold text-amber-300 font-tajawal">{user.name}</p>
          <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
            قد أتم بنجاح كافة متطلبات وحالات فحص وتشخيص إلكترونيات وكهرباء السيارات الحديثة واجتاز الاختبارات المعيارية بنسبة تفوق 92%.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-slate-400">
          <div className="text-right">
            <p className="text-slate-500">تاريخ الإصدار:</p>
            <p className="font-bold text-slate-200">10 فبراير 2026</p>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800">
            <QrCode className="w-8 h-8 text-amber-400" />
            <div className="text-right text-[10px]">
              <p className="font-bold text-slate-200">الرمز الموثق</p>
              <p className="text-slate-500 font-mono">VERIFIED-AE-9823</p>
            </div>
          </div>
        </div>

        <button className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xl transition-all flex items-center justify-center gap-2 mx-auto">
          <Download className="w-4 h-4" />
          <span>تحميل الشهادة صيغة High-Res PDF</span>
        </button>
      </div>
    </div>
  );
};
