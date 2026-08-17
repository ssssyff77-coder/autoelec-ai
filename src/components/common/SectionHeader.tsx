import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  action,
  icon
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 shrink-0 shadow-inner">
            {icon}
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-wide font-tajawal">
              {title}
            </h2>
            {badge && (
              <span className="px-2 py-0.5 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-md">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-slate-400 mt-1 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0 flex items-center gap-2">{action}</div>}
    </div>
  );
};
