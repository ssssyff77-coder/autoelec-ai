import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { DTC_CODES } from '../data/mockData';
import { Radio, Bluetooth, RefreshCw, Trash2, FileText, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const ObdPage: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [scannedCodes, setScannedCodes] = useState<typeof DTC_CODES>([]);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      setScannedCodes(DTC_CODES);
    }, 2000);
  };

  const handleClearCodes = () => {
    setScannedCodes([]);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      <SectionHeader
        title="جهاز فحص OBD-II اللاسلكي (Bluetooth Scan Tool)"
        subtitle="الاتصال بجهاز الموصل اللاسلكي لقراءة مسح أعطال الكمبيوتر وتوثيق التقارير الفنية"
        icon={<Radio className="w-5 h-5 text-cyan-400" />}
      />

      {/* Bluetooth Connection Card */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`p-3.5 rounded-2xl border transition-all ${
                isConnected
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-slate-950 text-slate-500 border-slate-800'
              }`}
            >
              <Bluetooth className={`w-6 h-6 ${isConnecting ? 'animate-bounce' : ''}`} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 font-tajawal">
                {isConnected ? 'متصل بفيش VLink OBD2 ELM327' : 'جهاز الفحص غير متصل'}
              </h3>
              <p className="text-xs text-slate-400">
                {isConnected ? 'بروتوكول الاتصال: ISO 15765-4 CAN (11bit ID, 500 kbaud)' : 'يرجى وضع السويتش على وضع ON والبحث عن أجهزة البلوتوث'}
              </p>
            </div>
          </div>

          {!isConnected ? (
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-2"
            >
              {isConnecting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Bluetooth className="w-4 h-4" />}
              <span>{isConnecting ? 'جاري الاقتران بـ OBD-II...' : 'اتصال بالبلوتوث'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearCodes}
                className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>مسح كود الأعطال (Clear DTCs)</span>
              </button>
            </div>
          )}
        </div>

        {/* Scanned Results */}
        {isConnected && (
          <div className="pt-4 border-t border-slate-800 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-200 font-tajawal">
                الأكواد المسجلة في ذاكرة ECU ({scannedCodes.length})
              </h4>
              <Badge variant={scannedCodes.length > 0 ? 'rose' : 'emerald'}>
                {scannedCodes.length > 0 ? 'توجد أعطال مخزنة' : 'تم مسح الأعطال بنجاح'}
              </Badge>
            </div>

            {scannedCodes.length === 0 ? (
              <div className="p-8 text-center bg-slate-950 rounded-2xl border border-slate-800 text-slate-400 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <p className="text-sm font-bold text-slate-200">ذاكرة الأعطال فارغة الآن!</p>
                <p className="text-xs text-slate-500">تم إرسال أمر الكود وتصفير السجلات وإطفاء لمبة المحرك.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {scannedCodes.map((code) => (
                  <div key={code.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-xl bg-rose-500/10 text-rose-400 font-mono font-bold text-sm border border-rose-500/20">
                        {code.code}
                      </span>
                      <div>
                        <p className="text-xs font-bold text-slate-200">{code.titleAr}</p>
                        <p className="text-[10px] text-slate-400">{code.meaning}</p>
                      </div>
                    </div>
                    <Badge variant="rose">مؤكد (Stored)</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
