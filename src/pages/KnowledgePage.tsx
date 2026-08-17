import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { BookOpen, FileText, Download, Search, CheckCircle } from 'lucide-react';

export const KnowledgePage: React.FC = () => {
  const articles = [
    {
      id: 'a1',
      title: 'كيف تقرأ المخططات الكهربائية (Wiring Diagrams) بدون أخطاء؟',
      category: 'المخططات',
      readTime: '8 دقائق',
      date: '2026-01-15',
      snippet: 'دليل مبسط لقراءة الرموز المعيارية والألوان واكتشاف نقاط التغذية المستمرة B+ والتغذية مع السويتش IGN.'
    },
    {
      id: 'a2',
      title: 'أساسيات تشخيص شبكة CAN-BUS وقياس المقاومة بين CAN-H و CAN-L',
      category: 'شبكات التواصل',
      readTime: '12 دقيقة',
      date: '2026-02-01',
      snippet: 'طريقة استخدام الملتيميتر لقياس مقاومة الـ 60 أوم عند كابل OBD2 واكتشاف قطع أو قصر الخطوط.'
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <SectionHeader
        title="قاعدة المعرفة والمقالات الفنية"
        subtitle="شروحات معتمدة في هندسة وكهرباء السيارات، ملفات PDF، وكتالوجات الخدمة والكتيبات الرسمية"
        icon={<BookOpen className="w-5 h-5 text-amber-400" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((art) => (
          <div key={art.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <Badge variant="amber">{art.category}</Badge>
              <span className="text-[11px] text-slate-500">{art.date} • {art.readTime}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-100 font-tajawal">{art.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{art.snippet}</p>
            <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-amber-400 font-bold">
              <span>قراءة المقال بالكامل</span>
              <FileText className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
