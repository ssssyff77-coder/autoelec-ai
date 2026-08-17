import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: string;
  color?: 'amber' | 'cyan' | 'blue' | 'emerald';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'amber',
  onClick
}) => {
  const colorMap = {
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20 group-hover:border-amber-500/40',
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20 group-hover:border-cyan-500/40',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20 group-hover:border-blue-500/40',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 group-hover:border-emerald-500/40'
  };

  return (
    <div
      onClick={onClick}
      className={`group p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all duration-200 shadow-lg ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs sm:text-sm font-medium text-slate-400">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-slate-100 font-tajawal mt-1 tracking-tight">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl border transition-colors ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>التحديث</span>
          <span className="text-emerald-400 font-medium">{trend}</span>
        </div>
      )}
    </div>
  );
};
