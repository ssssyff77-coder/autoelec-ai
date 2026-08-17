import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'amber' | 'blue' | 'cyan' | 'emerald' | 'rose' | 'slate';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'amber',
  size = 'md',
  icon
}) => {
  const variantStyles = {
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    slate: 'bg-slate-800/80 text-slate-300 border-slate-700/50'
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 rounded-md gap-1',
    md: 'text-xs font-semibold px-2.5 py-1 rounded-lg gap-1.5'
  };

  return (
    <span
      className={`inline-flex items-center border ${variantStyles[variant]} ${sizeStyles[size]} whitespace-nowrap`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
