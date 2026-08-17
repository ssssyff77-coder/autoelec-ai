import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { DTC_CODES, SENSORS, ACTUATORS } from '../../data/mockData';
import { Search, X, Cpu, AlertTriangle, Zap, ArrowLeft } from 'lucide-react';

export const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery, setCurrentRoute } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredDtc = searchQuery
    ? DTC_CODES.filter(
        (d) =>
          d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.titleAr.includes(searchQuery) ||
          d.meaning.includes(searchQuery)
      )
    : [];

  const filteredSensors = searchQuery
    ? SENSORS.filter(
        (s) =>
          s.nameAr.includes(searchQuery) ||
          s.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.system.includes(searchQuery)
      )
    : [];

  const filteredActuators = searchQuery
    ? ACTUATORS.filter(
        (a) =>
          a.nameAr.includes(searchQuery) ||
          a.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const totalResults = filteredDtc.length + filteredSensors.length + filteredActuators.length;

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <Search className="absolute right-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="ابحث عن كود عطيل (مثل P0100) أو حساس أو مشغل..."
          className="w-full pl-9 pr-10 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10 transition-all shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              setIsOpen(false);
            }}
            className="absolute left-3 p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Auto-complete Dropdown */}
      {isOpen && searchQuery.trim().length > 0 && (
        <div className="absolute top-full right-0 left-0 mt-2 z-50 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-96 overflow-y-auto custom-scrollbar">
          {totalResults === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400">
              لا توجد نتائج مطابقة لـ &quot;{searchQuery}&quot;
            </div>
          ) : (
            <div className="p-2 divide-y divide-slate-800/60">
              {/* DTC Results */}
              {filteredDtc.length > 0 && (
                <div className="py-2">
                  <div className="px-3 py-1 text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>أكواد الأعطال ({filteredDtc.length})</span>
                  </div>
                  {filteredDtc.map((code) => (
                    <button
                      key={code.id}
                      onClick={() => {
                        setCurrentRoute('dtc');
                        setIsOpen(false);
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-slate-800/80 text-right transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono text-xs font-bold border border-amber-500/20">
                            {code.code}
                          </span>
                          <span className="text-xs text-slate-200 font-semibold">{code.titleAr}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{code.meaning}</p>
                      </div>
                      <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-colors" />
                    </button>
                  ))}
                </div>
              )}

              {/* Sensors Results */}
              {filteredSensors.length > 0 && (
                <div className="py-2">
                  <div className="px-3 py-1 text-[11px] font-bold text-blue-400 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>الحساسات والمستشعرات ({filteredSensors.length})</span>
                  </div>
                  {filteredSensors.map((sensor) => (
                    <button
                      key={sensor.id}
                      onClick={() => {
                        setCurrentRoute('sensors');
                        setIsOpen(false);
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-slate-800/80 text-right transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-xs text-slate-200 font-semibold">{sensor.nameAr}</p>
                        <p className="text-[10px] text-slate-400">{sensor.nameEn}</p>
                      </div>
                      <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                    </button>
                  ))}
                </div>
              )}

              {/* Actuators Results */}
              {filteredActuators.length > 0 && (
                <div className="py-2">
                  <div className="px-3 py-1 text-[11px] font-bold text-cyan-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>المشغلات الكهروميكانيكية ({filteredActuators.length})</span>
                  </div>
                  {filteredActuators.map((actuator) => (
                    <button
                      key={actuator.id}
                      onClick={() => {
                        setCurrentRoute('actuators');
                        setIsOpen(false);
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-slate-800/80 text-right transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-xs text-slate-200 font-semibold">{actuator.nameAr}</p>
                        <p className="text-[10px] text-slate-400">{actuator.nameEn}</p>
                      </div>
                      <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
