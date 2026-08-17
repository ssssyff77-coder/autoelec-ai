import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { SENSORS } from '../data/mockData';
import { Sensor } from '../types';
import { Cpu, MapPin, Zap, CheckCircle2, AlertTriangle, Video, ArrowLeft } from 'lucide-react';

export const SensorsPage: React.FC = () => {
  const [selectedSensor, setSelectedSensor] = useState<Sensor>(SENSORS[0]);

  return (
    <div className="space-y-6 animate-fadeIn">
      <SectionHeader
        title="دليل فحص واختبار حساسات السيارات الحديثة"
        subtitle="تفاصيل الوظيفة، موقع التركيب، مخطط Pinout للأطراف الكهربائية، وقيم الفحص الطبيعية بالملتيميتر والأوسيلوسكوب"
        icon={<Cpu className="w-5 h-5" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Right Sensor Selector Column */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-400 font-tajawal uppercase tracking-wider">اختر الحساس للفحص</h3>
          <div className="space-y-2">
            {SENSORS.map((sensor) => {
              const active = sensor.id === selectedSensor.id;
              return (
                <button
                  key={sensor.id}
                  onClick={() => setSelectedSensor(sensor)}
                  className={`w-full p-4 rounded-2xl border text-right transition-all flex items-center justify-between ${
                    active
                      ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 shadow-lg'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <p className="text-sm font-bold font-tajawal">{sensor.nameAr}</p>
                    <p className="text-[11px] text-slate-500 font-mono">{sensor.nameEn}</p>
                  </div>
                  <Badge variant={active ? 'amber' : 'slate'}>{sensor.system}</Badge>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sensor Details Column */}
        <div className="lg:col-span-2 space-y-5">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-2xl font-bold text-slate-100 font-tajawal">{selectedSensor.nameAr}</h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{selectedSensor.nameEn}</p>
              </div>
              <Badge variant="amber" size="md">{selectedSensor.system}</Badge>
            </div>

            {/* Description & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  <span>الوظيفة الفنية:</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedSensor.functionDesc}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <h4 className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>موقع الحساس بالسيارة:</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedSensor.location}</p>
              </div>
            </div>

            {/* Pinout Table */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-200 font-tajawal">مخطط فيش الحساس (Pinout Table)</h4>
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-bold">
                    <tr>
                      <th className="p-3">رقم الدبوس Pin</th>
                      <th className="p-3">اسم الخط ووظيفته</th>
                      <th className="p-3">الفولت الطبيعي</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {selectedSensor.pinOut.map((pin) => (
                      <tr key={pin.pinNumber} className="hover:bg-slate-950/50">
                        <td className="p-3 font-mono font-bold text-amber-400">Pin {pin.pinNumber}</td>
                        <td className="p-3">{pin.label}</td>
                        <td className="p-3 font-mono text-emerald-400">{pin.normalVoltage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Testing Procedure */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-200 font-tajawal">خطوات الفحص بالملتيميتر والأوسيلوسكوب</h4>
              <div className="space-y-2">
                {selectedSensor.testingProcedure.map((proc, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[11px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{proc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Faults & Linked DTCs */}
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-2">
              <h4 className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>أبرز الأعطال وأكواد DTC المرتطبة:</span>
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedSensor.dtcCodes.map((code) => (
                  <span key={code} className="px-2.5 py-1 rounded-lg bg-slate-950 text-amber-400 font-mono text-xs font-bold border border-slate-800">
                    {code}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
