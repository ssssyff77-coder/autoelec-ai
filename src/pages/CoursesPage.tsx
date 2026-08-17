import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { COURSES } from '../data/mockData';
import {
  GraduationCap,
  Clock,
  Star,
  PlayCircle,
  Award,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  FileCheck,
  ChevronLeft,
  Sparkles
} from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<typeof COURSES[0] | null>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [showQuizModal, setShowQuizModal] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const sampleLessons = [
    { id: 1, title: 'الدرس الأول: مقدمة في أنظمة إشارات الحساسات والمشغلات (Sensors & Actuators)', duration: '15 دقيقة', videoId: 'Abdulcartech1' },
    { id: 2, title: 'الدرس الثاني: كيفية تتبع إشارة خط المرجعي 5V Reference Voltage', duration: '22 دقيقة', videoId: 'Abdulcartech1' },
    { id: 3, title: 'الدرس الثالث: تشخيص أعطال الأرضي المشترك ECU Sensor Ground', duration: '18 دقيقة', videoId: 'Abdulcartech1' },
    { id: 4, title: 'الدرس الرابع: تطبيق عملي على فحص كمبيوتر تويوتا وبوصلات CAN BUS', duration: '30 دقيقة', videoId: 'Abdulcartech1' }
  ];

  const handleFinishQuiz = () => {
    if (selectedAnswer === 1) {
      setQuizScore(100);
    } else {
      setQuizScore(50);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-6xl mx-auto">
      <SectionHeader
        title="أكاديمية المهندس الذكي والمسارات التعليمية المعتمدة"
        subtitle="مسارات تدريبية احترافية معتمدة في كهرباء وحقن وقود وإدارة كمبيوترات السيارات (EFI & CAN BUS)"
        icon={<GraduationCap className="w-5 h-5 text-amber-400" />}
      />

      {/* Courses Grid or Course Viewer */}
      {!selectedCourse ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COURSES.map((course) => (
            <div key={course.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xl p-2 bg-slate-950 rounded-2xl border border-slate-800">{course.thumbnail}</span>
                  <Badge variant="amber">{course.level}</Badge>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-100 font-tajawal">{course.title}</h3>
                  <p className="text-xs text-amber-400 font-bold mt-1">المدرب: {course.instructor}</p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{course.description}</p>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{course.durationHours} ساعة • {course.lessonsCount} درسًا</span>
                  </span>
                  <span className="flex items-center gap-1 font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{course.rating}</span>
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedCourse(course)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
              >
                <PlayCircle className="w-4 h-4" />
                <span>دخول الدورة وبدء المشاهدة</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* COURSE LESSON VIEWER */
        <div className="space-y-6">
          <button
            onClick={() => setSelectedCourse(null)}
            className="flex items-center gap-1 text-xs text-amber-400 font-bold hover:underline"
          >
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <span>العودة لقائمة الدورات</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Player */}
            <div className="lg:col-span-2 space-y-4">
              <div className="aspect-video rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden relative flex items-center justify-center group shadow-2xl">
                <div className="text-center space-y-3 p-6">
                  <span className="text-6xl block">📺</span>
                  <p className="text-sm font-bold text-slate-200">
                    {sampleLessons[activeLessonIndex].title}
                  </p>
                  <p className="text-xs text-slate-400">مشغل الدروس التفاعلي المباشر</p>
                  <a
                    href="https://youtube.com/@Abdulcartech1"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold shadow"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>مشاهدة الشرح على YouTube</span>
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                <h3 className="text-base font-bold text-slate-100 font-tajawal">
                  {sampleLessons[activeLessonIndex].title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  في هذا الدرس التطبيقي نراجع خطوات القياس الدقيقة باستخدام الملتيميتر وكيفية التثبت من سلامة الخطوط قبل استبدال أي حساس أو كمبيوتر.
                </p>

                <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                  <button
                    onClick={() => setShowQuizModal(true)}
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>تقديم الاختبار السريع واستخراج الشهادة</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Lessons List Sidebar */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl h-fit">
              <h3 className="text-sm font-bold text-slate-100 font-tajawal flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>دروس الدورة التدريبية:</span>
              </h3>

              <div className="space-y-2 text-xs">
                {sampleLessons.map((les, idx) => (
                  <button
                    key={les.id}
                    onClick={() => setActiveLessonIndex(idx)}
                    className={`w-full p-3 rounded-2xl text-right transition-all flex items-center justify-between border ${
                      activeLessonIndex === idx
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <p className="line-clamp-1">{les.title}</p>
                      <span className="text-[10px] text-slate-500">{les.duration}</span>
                    </div>
                    {activeLessonIndex === idx && (
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUIZ & CERTIFICATE MODAL */}
      {showQuizModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-slate-100 font-tajawal flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>اختبار التقييم السريع للدورة</span>
              </h3>
              <button
                onClick={() => {
                  setShowQuizModal(false);
                  setQuizScore(null);
                }}
                className="px-3 py-1 rounded-xl bg-slate-950 text-slate-400 font-bold text-xs"
              >
                إغلاق
              </button>
            </div>

            {quizScore === null ? (
              <div className="space-y-4 text-xs">
                <p className="font-bold text-slate-200">
                  السؤال: ما هو الفولطية المرجعية القياسية (Reference Voltage) لخارج معظم حساسات الكمبيوتر ECU؟
                </p>

                <div className="space-y-2">
                  {[
                    { id: 0, text: '12 الفولت مباشرة من البطارية' },
                    { id: 1, text: '5.0 فولت ثابتة من داخل كمبيوتر السيّارة' },
                    { id: 2, text: '0 فولت أرضي فقط' }
                  ].map((ans) => (
                    <button
                      key={ans.id}
                      onClick={() => setSelectedAnswer(ans.id)}
                      className={`w-full p-3 rounded-2xl text-right border transition-all ${
                        selectedAnswer === ans.id
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {ans.text}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleFinishQuiz}
                  disabled={selectedAnswer === null}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-extrabold shadow"
                >
                  إرسال الإجابة واستخراج النتيجة
                </button>
              </div>
            ) : (
              <div className="text-center space-y-4 py-2">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center text-2xl font-black">
                  {quizScore}%
                </div>

                <h4 className="text-lg font-bold text-slate-100 font-tajawal">تهانينا! اجتزت الاختبار المعتمد بنجاح</h4>
                <p className="text-xs text-slate-300">تم إصدار الشهادة الرقمية وإضافتها لسجلك الفني في المنصة.</p>

                <button
                  onClick={() => {
                    setShowQuizModal(false);
                    setQuizScore(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs shadow-lg"
                >
                  حفظ في ملف الشهادات
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
