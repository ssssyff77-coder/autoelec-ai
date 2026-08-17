import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { Bot, Send, Sparkles, User } from 'lucide-react';
import { sendAiMechanicQuery } from '../services/aiService';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export const AiMechanicPage: React.FC = () => {
  const { selectedVehicle } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `أهلاً بك يا مهندس! أنا الميكانيكي والمهندس الذكي لـ DevForge AI. أنا جاهز لمساعدتك في تحليل أي مشكلة كهربائية لسيارتك ${
        selectedVehicle ? `${selectedVehicle.companyName} ${selectedVehicle.modelName} (${selectedVehicle.year})` : 'الحالية'
      }. اكتب شكوى العميل، كود العطل، أو استفسارك الفني!`,
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMsgText = inputMessage;
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userMsgText,
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const responseText = await sendAiMechanicQuery(
        userMsgText,
        selectedVehicle ? {
          companyName: selectedVehicle.companyName,
          modelName: selectedVehicle.modelName,
          year: selectedVehicle.year,
          engineName: selectedVehicle.engineName || ''
        } : null
      );

      const aiReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'ai',
          text: 'عذراً، حدث خطأ أثناء الاتصال بالميكانيكي الذكي. الرجاء المحاولة مرة أخرى.',
          time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      <SectionHeader
        title="الميكانيكي والمهندس الذكي (Gemini AI Mechanic)"
        subtitle="مساعد هندسي ذكي معزز بنماذج الذكاء الاصطناعي لتحليل صوت المحرك، الأكواد، الشكاوى، ورقم الشاسي VIN"
        icon={<Bot className="w-5 h-5 text-cyan-400" />}
      />

      {/* Chat Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[580px]">
        {/* Chat Messages List */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`p-2.5 rounded-2xl shrink-0 font-bold ${
                  msg.sender === 'user'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              <div
                className={`p-4 rounded-2xl max-w-xl text-xs sm:text-sm leading-relaxed space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-amber-500/10 border border-amber-500/20 text-slate-100'
                    : 'bg-slate-950 border border-slate-800 text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold border-b border-slate-800/60 pb-1">
                  <span>{msg.sender === 'user' ? 'استفسار الفني' : 'المهندس الذكي Gemini'}</span>
                  <span>{msg.time}</span>
                </div>
                <p className="whitespace-pre-line">{msg.text}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-cyan-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>جاري تحليل البيانات وإعداد خطة الفحص الهندسي...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اكتب وصف المشكلة، كود العطل، أو استفسار المخطط الكهربائي..."
            className="flex-1 py-3 px-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />

          <button
            onClick={handleSend}
            disabled={!inputMessage.trim() || isLoading}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold transition-all disabled:opacity-50 shadow-lg shadow-cyan-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
