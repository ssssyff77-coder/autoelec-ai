import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { Award, CheckCircle2, FileCheck, HelpCircle } from 'lucide-react';

export const ExamsPage: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<number | null>(null);

  const exams = [
    { id: 1, title: 'اختبار كفاءة تشخيص أعطال شبكات CAN-BUS', questions: 15, durationMinutes: 20, passingScore: 80 },
    { id: 2, title: 'اختبار قراءة واستخراج قيم الحساسات بالأوسيلوسكوب', questions: 20, durationMinutes: 30, passingScore: 85 }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <SectionHeader
        title="الاختبارات وتقييم الكفاءة الهندسية"
        subtitle="اختبارات تفاعلية لقياس مستوى مهاراتك الفنية والحصول على شهادات المنصة المعتمدة"
        icon={<Award className="w-5 h-5 text-amber-400" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exams.map((ex) => (
          <div key={ex.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex justify-between items-center">
              <Badge variant="amber">معدل النجاح: {ex.passingScore}%</Badge>
              <span className="text-xs text-slate-400 font-mono">{ex.durationMinutes} دقيقة</span>
            </div>
            <h3 className="text-lg font-bold text-slate-100 font-tajawal">{ex.title}</h3>
            <p className="text-xs text-slate-400">يتضمن {ex.questions} سؤال متعدد الخيارات مع حالات دراسية حقيقية.</p>

            <button
              onClick={() => alert(`بدء الاختبار: ${ex.title}`)}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
            >
              دخول الاختبار الآن
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
