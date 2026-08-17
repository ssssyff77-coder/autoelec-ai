import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { DTC_CODES } from '../data/mockData';
import { DtcCode } from '../types';
import {
  AlertTriangle,
  Search,
  Wrench,
  Clock,
  DollarSign,
  Video,
  ChevronLeft,
  X,
  Sparkles,
  CheckCircle2,
  Network
} from 'lucide-react';

export const DtcPage: React.FC = () => {
  const { navigateToWiring } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [activeDtc, setActiveDtc] = useState<DtcCode | null>(null);

  const filteredCodes = DTC_CODES.filter((item) => {
    const matchesSearch =
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.titleAr.includes(searchTerm) ||
      item.meaning.includes(searchTerm);
    const matchesSeverity = selectedSeverity === 'all' || item.severity === selectedSeverity;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      <SectionHeader
        title="موسوعة أكواد الأعطال التشخيصية (DTC Codes)"
        subtitle="دليل كودات الكمبيوتر المعياري OBD-II للبحث عن أسباب الأعطال، خطورتها، والتكلفة والحلول"
        icon={<AlertTriangle className="w-5 h-5" />}
      />

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute right-3.5 top-3 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث برقم الكود (P0100، P0300) أو معنى الكود..."
            className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="w-full sm:w-auto px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
          >
            <option value="all">جميع مستويات الخطورة</option>
            <option value="critical">عالية الخطورة</option>
            <option value="high">مرتفعة</option>
            <option value="medium">متوسطة</option>
          </select>
        </div>
      </div>

      {/* Codes List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCodes.map((dtc) => (
          <div
            key={dtc.id}
            onClick={() => setActiveDtc(dtc)}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer shadow-lg space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl bg-amber-500/10 text-amber-400 font-mono font-bold text-sm border border-amber-500/20 group-hover:scale-105 transition-transform">
                {dtc.code}
              </span>
              <Badge variant={dtc.severity === 'critical' ? 'rose' : 'amber'}>
                {dtc.severity === 'critical' ? 'خطير جداً' : 'متوسط الخطورة'}
              </Badge>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-100 font-tajawal group-hover:text-amber-300 transition-colors">
                {dtc.titleAr}
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">{dtc.titleEn}</p>
            </div>

            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{dtc.meaning}</p>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{dtc.estimatedTime}</span>
              </span>
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <span>التفاصيل الكاملة</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Code Modal */}
      {activeDtc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-xl bg-amber-500/10 text-amber-400 font-mono font-bold text-lg border border-amber-500/30">
                  {activeDtc.code}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-100 font-tajawal">{activeDtc.titleAr}</h3>
                  <p className="text-xs text-slate-400">{activeDtc.system}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveDtc(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
              {/* Meaning */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <h4 className="text-xs font-bold text-amber-400">معنى الكود الوظيفي:</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{activeDtc.meaning}</p>
              </div>

              {/* Symptoms and Causes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-rose-400">الأعراض الظاهرة على السيارة:</h4>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    {activeDtc.symptoms.map((sym, idx) => (
                      <li key={idx}>{sym}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-amber-400">الأسباب المحتملة للعطل:</h4>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    {activeDtc.causes.map((cause, idx) => (
                      <li key={idx}>{cause}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Diagnosis Steps */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>خطوات التشخيص الفني المقترحة:</span>
                </h4>
                <div className="space-y-2">
                  {activeDtc.diagnosisSteps.map((stepText, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-bold text-[11px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{stepText}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Tools & Cost */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <span className="text-slate-400">الأدوات المطلوبة: </span>
                  <span className="font-bold text-slate-200">{activeDtc.requiredTools.join(' • ')}</span>
                </div>
                <div>
                  <span className="text-slate-400">التكلفة المتوقعة: </span>
                  <span className="font-bold text-emerald-400">{activeDtc.estimatedCost}</span>
                </div>
              </div>

              {/* Action Button to Wiring Diagram */}
              <button
                onClick={() => navigateToWiring(activeDtc.code)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 hover:brightness-110 transition"
              >
                <Network className="w-4 h-4 fill-slate-950" />
                <span>عرض المخطط الكهربائي وتتبع أسلاك الكود ({activeDtc.code})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
