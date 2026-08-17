import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { EXPERT_VIDEOS } from '../data/mockData';
import { Video, ExternalLink, Play, Eye, Clock, Youtube, Sparkles } from 'lucide-react';
import { PartnersSection } from '../components/experts/PartnersSection';

export const ExpertLibraryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      <SectionHeader
        title="الخبراء والفيديوهات التعليمية — منصة الشركاء"
        subtitle="قسم خبراء السيارات والشركاء المعتمدين والمستشارين التقنيين مع الشروحات المرئية"
        icon={<Video className="w-5 h-5 text-rose-500" />}
      />

      {/* Partners & Experts Dedicated Section */}
      <PartnersSection />

      {/* Educational Videos Header */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-base font-bold text-slate-100 font-tajawal">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>الشروحات والفيديوهات التعليمية الموصى بها:</span>
          </div>
          <span className="text-xs text-slate-400">مرتبطة بحساسات وأعطال المنصة</span>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EXPERT_VIDEOS.map((vid) => (
            <div key={vid.id} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl hover:border-slate-700 transition-all">
              <div className="relative aspect-video rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center group overflow-hidden">
                <span className="text-5xl group-hover:scale-110 transition-transform">📺</span>
                <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={`https://www.youtube.com/watch?v=${vid.youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-full bg-rose-600 text-slate-100 shadow-xl flex items-center gap-2 font-bold text-xs"
                  >
                    <Play className="w-5 h-5 fill-slate-100" />
                    <span>مشاهدة الفيديو</span>
                  </a>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <Badge variant="cyan">{vid.category}</Badge>
                  <span className="text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {vid.duration}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-100 font-tajawal leading-snug">{vid.title}</h3>
                <div className="text-xs text-amber-400 font-bold flex items-center gap-1">
                  <span>تقديم: {vid.expertName}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">{vid.expertChannel}</span>
                </div>
              </div>

              {/* Linked sensors & DTCs */}
              {vid.relatedDtcCodes && (
                <div className="pt-3 border-t border-slate-800 flex items-center gap-2 text-xs">
                  <span className="text-slate-400">مرتبط بالأكواد:</span>
                  {vid.relatedDtcCodes.map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono text-[11px] font-bold border border-amber-500/20">
                      {c}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

