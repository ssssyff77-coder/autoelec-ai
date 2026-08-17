import React from 'react';
import { ExternalLink, Youtube, Award, CheckCircle2, Sparkles, Wrench, Video, Share2 } from 'lucide-react';

interface SocialPlatform {
  name: string;
  handle: string;
  url: string;
  colorBg: string;
  hoverBorder: string;
  textColor: string;
  icon: React.ReactNode;
}

export const PartnersSection: React.FC = () => {
  const socialLinks: SocialPlatform[] = [
    {
      name: 'YouTube',
      handle: '@Abdulcartech1',
      url: 'https://youtube.com/@Abdulcartech1',
      colorBg: 'from-red-600/20 to-rose-600/10 border-red-500/30 text-rose-400',
      hoverBorder: 'hover:border-red-500/60',
      textColor: 'text-red-400',
      icon: (
        <svg className="w-5 h-5 fill-current text-red-500" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      handle: 'abdulcartech',
      url: 'https://instagram.com/abdulcartech',
      colorBg: 'from-purple-600/20 via-pink-600/20 to-amber-500/10 border-pink-500/30 text-pink-400',
      hoverBorder: 'hover:border-pink-500/60',
      textColor: 'text-pink-400',
      icon: (
        <svg className="w-5 h-5 fill-current text-pink-500" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      handle: 'abdulcartech',
      url: 'https://facebook.com/abdulcartech',
      colorBg: 'from-blue-600/20 to-indigo-600/10 border-blue-500/30 text-blue-400',
      hoverBorder: 'hover:border-blue-500/60',
      textColor: 'text-blue-400',
      icon: (
        <svg className="w-5 h-5 fill-current text-blue-500" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'Twitter / X',
      handle: 'abdulcartech',
      url: 'https://twitter.com/abdulcartech',
      colorBg: 'from-slate-700/30 to-slate-900/40 border-slate-700 text-slate-200',
      hoverBorder: 'hover:border-slate-500',
      textColor: 'text-slate-200',
      icon: (
        <svg className="w-4 h-4 fill-current text-slate-100" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'TikTok',
      handle: '@abdulcartech1987',
      url: 'https://tiktok.com/@abdulcartech1987',
      colorBg: 'from-cyan-500/10 via-slate-900 to-rose-500/10 border-cyan-500/30 text-cyan-300',
      hoverBorder: 'hover:border-cyan-400/60',
      textColor: 'text-cyan-300',
      icon: (
        <svg className="w-5 h-5 fill-current text-cyan-400" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 10.86 4.46A6.29 6.29 0 0 0 15.82 15V8.12a8.31 8.31 0 0 0 4.77 1.51v-3.43a4.78 4.78 0 0 1-1-.51z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-amber-600/10 border border-amber-500/30 text-amber-400 shadow-inner">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-100 font-tajawal flex items-center gap-2">
              <span>👨‍🔧 خبراء السيارات والشركاء</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
                DevForge Partners
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              قائمة الخبراء المعتمدين لصناعة المحتوى الهندسي والتعليمي المربوط مع منصة التشخيص الذكي
            </p>
          </div>
        </div>
      </div>

      {/* Primary Featured Expert Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 group">
        {/* Decorative Background Accents */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

        {/* Top Info Banner */}
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-right">
          {/* Avatar Container */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-amber-500 via-rose-500 to-amber-400 p-1 shadow-2xl shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-[22px] bg-slate-950 flex flex-col items-center justify-center p-2 relative overflow-hidden">
                <span className="text-5xl sm:text-6xl">👨‍🔧</span>
                <div className="absolute inset-x-0 bottom-0 py-1 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent text-[10px] font-bold text-amber-400 text-center">
                  خبير معتمد
                </div>
              </div>
            </div>
            <div className="absolute -bottom-2 right-1/2 translate-x-1/2 md:right-0 md:translate-x-0 bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border-2 border-slate-900 shadow-md flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>مستشار تقني</span>
            </div>
          </div>

          {/* Expert Details */}
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-tajawal tracking-tight">
                المهندس عبدالحق
              </h3>
              <span className="px-3 py-1 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold font-tajawal flex items-center gap-1.5">
                <Youtube className="w-4 h-4 text-rose-500" />
                <span>قناة: سيارتك مع عبدالحق</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl font-normal">
              خبير في مجال السيارات، التشخيص، كهرباء وميكانيكا السيارات، يقدم محتوى تعليمي وشروحات تقنية لأعطال السيارات وطرق الفحص والإصلاح.
            </p>

            {/* Quick Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs">
              <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>+1.5 مليون متابع</span>
              </span>

              <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-bold flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-rose-400" />
                <span>شروحات فحص الملتيميتر والكهرباء</span>
              </span>

              <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-bold flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                <span>ربط مباشر بالأكواد والدروس</span>
              </span>
            </div>
          </div>
        </div>

        {/* Official Social Media Buttons Grid */}
        <div className="relative z-10 pt-4 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span className="flex items-center gap-1.5 text-amber-400 font-tajawal">
              <Share2 className="w-4 h-4" />
              <span>روابط التواصل الرسمية للخبير:</span>
            </span>
            <span className="text-[11px] text-slate-500">اضغط للانتقال المباشر للحساب</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {socialLinks.map((plat) => (
              <a
                key={plat.name}
                href={plat.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3.5 rounded-2xl bg-slate-950/80 bg-gradient-to-br ${plat.colorBg} border transition-all duration-300 ${plat.hoverBorder} hover:-translate-y-0.5 hover:shadow-lg flex flex-col items-center text-center gap-2 group`}
              >
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                  {plat.icon}
                </div>

                <div className="space-y-0.5 w-full">
                  <div className={`text-xs font-bold ${plat.textColor} flex items-center justify-center gap-1`}>
                    <span>{plat.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono block truncate dir-ltr">
                    {plat.handle}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
