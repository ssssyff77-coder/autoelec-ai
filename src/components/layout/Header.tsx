import React from 'react';
import { useApp } from '../../context/AppContext';
import { SearchBar } from '../common/SearchBar';
import {
  Car,
  Bot,
  Bell,
  Menu,
  Sparkles,
  ChevronDown,
  Zap,
  Activity
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    setCurrentRoute,
    selectedVehicle,
    setIsVehicleModalOpen,
    setIsMobileMenuOpen,
    user,
    notificationsCount
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Right Section: Mobile Toggle & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition-colors"
            aria-label="القائمة البرمجية"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => setCurrentRoute('home')}
            className="flex items-center gap-2.5 group text-right focus:outline-none"
          >
            <div className="relative p-2 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 font-bold" />
              <div className="absolute -bottom-1 -left-1 p-0.5 rounded-full bg-cyan-500 text-slate-950">
                <Activity className="w-2.5 h-2.5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-100 font-tajawal group-hover:text-amber-400 transition-colors">
                  المهندس الذكي
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">لكهرباء وتخاطب السيارات</p>
            </div>
          </button>
        </div>

        {/* Center Section: Selected Vehicle Badge & SearchBar */}
        <div className="hidden md:flex items-center gap-3 flex-1 max-w-2xl mx-4">
          {/* Selected Vehicle Pill */}
          <button
            onClick={() => setIsVehicleModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-right transition-all group shrink-0"
          >
            <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-400">
              <Car className="w-4 h-4" />
            </div>
            <div className="text-right">
              {selectedVehicle ? (
                <>
                  <p className="text-xs font-bold text-slate-200 group-hover:text-amber-300">
                    {selectedVehicle.companyName} {selectedVehicle.modelName} ({selectedVehicle.year})
                  </p>
                  <p className="text-[10px] text-slate-400 truncate max-w-[140px]">
                    {selectedVehicle.engineName}
                  </p>
                </>
              ) : (
                <p className="text-xs font-semibold text-amber-400">حدد مواصفات السيارة</p>
              )}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
          </button>

          {/* SearchBar */}
          <SearchBar />
        </div>

        {/* Left Section: AI Assistant, Notifications, Profile */}
        <div className="flex items-center gap-2">
          {/* Quick AI Mechanic Button */}
          <button
            onClick={() => setCurrentRoute('ai-mechanic')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-300 text-xs font-bold shadow-sm transition-all"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>الميكانيكي الذكي</span>
            <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
          </button>

          {/* Notifications */}
          <button
            onClick={() => setCurrentRoute('notifications')}
            className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            aria-label="الإشعارات"
          >
            <Bell className="w-4 h-4" />
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                {notificationsCount}
              </span>
            )}
          </button>

          {/* User Profile Pill */}
          <button
            onClick={() => setCurrentRoute('profile')}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors text-right"
          >
            <span className="text-xl leading-none">{user.avatar}</span>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-slate-200">{user.name}</p>
              <p className="text-[10px] text-amber-400">{user.role} • {user.points} نقطة</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
