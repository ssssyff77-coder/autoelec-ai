import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { ACTUATORS } from '../data/mockData';
import { Zap, Wrench, CheckCircle2, AlertOctagon } from 'lucide-react';

export const ActuatorsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <SectionHeader
        title="دليل المشغلات الكهروميكانيكية (Actuators)"
        subtitle="طرق فحص واختبار بخاخات البنزين، كويلات الإشعال، صمامات البيئية، وطلمبة الوقود"
        icon={<Zap className="w-5 h-5" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ACTUATORS.map((actuator) => (
          <div
            key={actuator.id}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-slate-100 font-tajawal">{actuator.nameAr}</h3>
                <p className="text-xs text-slate-400 font-mono">{actuator.nameEn}</p>
              </div>
              <Badge variant="cyan">{actuator.system}</Badge>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-amber-400">الوظيفة: </span>
              {actuator.functionDesc}
            </div>

            {/* Measurements */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-200">القياسات الكهربائية المطلوبة:</h4>
              <div className="grid grid-cols-1 gap-2">
                {actuator.measurements.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex justify-between">
                    <span className="text-slate-400">{m.test}</span>
                    <span className="font-mono font-bold text-emerald-400">{m.normalVal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testing steps */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-200">خطوات الفحص الاختباري:</h4>
              <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                {actuator.testingProcedure.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
