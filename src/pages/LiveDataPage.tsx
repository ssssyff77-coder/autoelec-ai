import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { LIVE_DATA_PARAMS } from '../data/mockData';
import { Activity, Play, Square, RefreshCw, Gauge } from 'lucide-react';

export const LiveDataPage: React.FC = () => {
  const [params, setParams] = useState(LIVE_DATA_PARAMS);
  const [isSimulating, setIsSimulating] = useState(true);

  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setParams((prev) =>
        prev.map((p) => {
          const delta = (Math.random() - 0.5) * (p.maxNormal * 0.05);
          let newVal = Math.round((p.currentValue + delta) * 10) / 10;
          if (newVal < p.minNormal * 0.8) newVal = p.minNormal;
          return {
            ...p,
            currentValue: newVal,
            history: [...p.history.slice(1), newVal]
          };
        })
      );
    }, 1500);

    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <div className="space-y-6 animate-fadeIn">
      <SectionHeader
        title="مراقب البيانات الحية المباشرة (Live Data Stream)"
        subtitle="مراقبة قيم وقراءات كمبيوتر المحرك ECU في الوقت الفعلي لاكتشاف التردد والذبذبات غير الطبيعية"
        icon={<Activity className="w-5 h-5 text-emerald-400" />}
        action={
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              isSimulating
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}
          >
            {isSimulating ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isSimulating ? 'إيقاف البث الحي' : 'بدء تشغيل البث المباشر'}</span>
          </button>
        }
      />

      {/* Grid of Live Gauge Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {params.map((item) => {
          const isOk = item.currentValue >= item.minNormal && item.currentValue <= item.maxNormal;

          return (
            <div
              key={item.id}
              className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-100 font-tajawal">{item.nameAr}</h4>
                  <p className="text-[10px] text-slate-500 font-mono">{item.nameEn}</p>
                </div>
                <Badge variant={isOk ? 'emerald' : 'rose'}>
                  {isOk ? 'طبيعي' : 'خارج النطاق'}
                </Badge>
              </div>

              {/* Huge Numeric Display */}
              <div className="text-center py-3 bg-slate-950 rounded-2xl border border-slate-800/80">
                <p className="text-3xl font-black font-mono text-slate-100 tracking-tight">
                  {item.currentValue}{' '}
                  <span className="text-xs font-normal text-amber-400">{item.unit}</span>
                </p>
                <p className="text-[10px] text-slate-500 mt-1">
                  المجال الطبيعي: {item.minNormal} - {item.maxNormal} {item.unit}
                </p>
              </div>

              {/* Sparkline Graph Simulator */}
              <div className="space-y-1">
                <p className="text-[10px] text-slate-500">مخطط النبضات الحي:</p>
                <div className="h-10 w-full bg-slate-950 rounded-xl p-1.5 flex items-end justify-between gap-1 border border-slate-800/60">
                  {item.history.map((val, idx) => {
                    const heightPct = Math.min(
                      100,
                      Math.max(20, ((val - item.minNormal * 0.7) / (item.maxNormal * 1.2)) * 100)
                    );
                    return (
                      <div
                        key={idx}
                        className="flex-1 bg-amber-500/80 rounded-t transition-all duration-300"
                        style={{ height: `${heightPct}%` }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
