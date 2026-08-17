import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { MessageSquare, ThumbsUp, MessageCircle, PlusCircle, Send } from 'lucide-react';

export const ForumPage: React.FC = () => {
  const [posts] = useState([
    {
      id: 'p1',
      author: 'م. خالد العتيبي',
      role: 'فني تشخيص',
      title: 'ما هي أفضل طريقة لفحص مشكلة هبوط الفولتية أثناء السلف في جيب نياسن باترول؟',
      content: 'عندي باترول Y62 عند التشغيل يطفي الطبلون لثانية ويرجع المارش يدور ثقيل، هل المشكلة من سويتش المارش أم كبل الأرضي؟',
      likes: 14,
      commentsCount: 6,
      time: 'منذ ساعتين'
    }
  ]);

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      <SectionHeader
        title="المنتدى الهندسي للتقنيين والفنيين"
        subtitle="طرح الأسئلة الفنية، التشارك في حل الأعطال المستعصية، وتبادل الخبرات بين مهندسي الكهرباء"
        icon={<MessageSquare className="w-5 h-5 text-amber-400" />}
        action={
          <button className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg">
            <PlusCircle className="w-4 h-4" />
            <span>طرح سؤال جديد</span>
          </button>
        }
      />

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center font-bold text-amber-400 text-sm">
                  👤
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-100 font-tajawal">{post.author}</p>
                  <p className="text-[10px] text-slate-400">{post.role} • {post.time}</p>
                </div>
              </div>
              <Badge variant="amber">سؤال مفتوح</Badge>
            </div>

            <h3 className="text-base font-bold text-slate-100 font-tajawal">{post.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{post.content}</p>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <button className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span>إعجاب ({post.likes})</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>الردود ({post.commentsCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
