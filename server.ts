import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Initialize GoogleGenAI SDK with headers
  const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not defined in environment variables.');
    }
    return new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  };

  // Health check API
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // AI Mechanic Chat Endpoint
  app.post('/api/gemini/chat', async (req, res) => {
    try {
      const { message, vehicleContext, history } = req.body;

      const ai = getGenAI();

      const systemInstruction = `أنت "المهندس الذكي لكهرباء السيارات" (Smart Car Electrician AI Engine)، خبير أول في هندسة تشخيص وتطوير كهرباء وإلكترونيات السيارات، أجهزة الفحص (OBD-II)، كمبيوترات السيارات (ECU/BCM/TCM/ABS)، وحساسات ومشغلات السيارة.
سياق السيارة الحالية التي يفحصها المستخدم: ${
        vehicleContext
          ? `${vehicleContext.companyName} ${vehicleContext.modelName} (سنة ${vehicleContext.year}, محرك ${vehicleContext.engineName})`
          : 'غير محددة بعد'
      }.
إرشاداتك:
- أجب باللغة العربية الفصحى التقنية الدقيقة.
- قدم خطوات فحص مرتبة رقمياً بأسلوب مهندس تشخيص محترف.
- اذكر الفولتيات، المقاومات، وأماكن أطراف التوصيل (Pinouts) وأسماء الحساسات والفيوزات ذات الصلة عند الإمكان.
- قدم إجابات مباشرة ومختصرة ومفيدة جداً للميكانيكي أو الفني.`;

      const contents = history && Array.isArray(history) && history.length > 0
        ? [...history, { role: 'user', parts: [{ text: message }] }]
        : [{ role: 'user', parts: [{ text: `سؤال الفني: ${message}` }] }];

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text || 'لم يتم استلام رد من نموذج الذكاء الاصطناعي.' });
    } catch (err: any) {
      console.error('Gemini Chat API Error:', err);
      res.status(500).json({
        error: 'حدث خطأ أثناء معالجة الطلب عبر الميكانيكي الذكي.',
        details: err?.message || String(err)
      });
    }
  });

  // AI Diagnosis Analysis Endpoint
  app.post('/api/gemini/diagnose', async (req, res) => {
    try {
      const { vehicle, dtcCode, symptoms, sensorData } = req.body;

      const ai = getGenAI();

      const prompt = `قم بتحليل هندسي شامل للمشكلة الكهربائية التالية:
السيارة: ${vehicle ? `${vehicle.companyName} ${vehicle.modelName} ${vehicle.year} (${vehicle.engineName})` : 'عامة'}
كود العطل DTC: ${dtcCode || 'غير مدخل'}
أعراض العطل والشكوى: ${symptoms || 'غير محددة'}
بيانات الحساسات/الفحص الحية: ${sensorData || 'لا توجد'}

قم بالتحليل وإرجاع الإجابة بتنسيق JSON محدد بالشكل التالي فقط:
{
  "summary": "ملخص شامل ومكثف للعطل كمهندس تشخيص",
  "probableCauses": [
    { "cause": "السبب المحتمل", "probability": 85, "reason": "سبب التوقع بناء على الشكوى" }
  ],
  "diagnosticSteps": [
    "الخطوة 1: افحص كذا...",
    "الخطوة 2: قس الفولت على الحساس..."
  ],
  "recommendedFix": "طريقة الاصلاح الموصى بها مع أدوات الفحص المطلوب استخدامها"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch (err: any) {
      console.error('Gemini Diagnose API Error:', err);
      res.status(500).json({
        error: 'حدث خطأ في محرك التشخيص الذكي',
        details: err?.message || String(err)
      });
    }
  });

  // AI Diagram Explanation Endpoint
  app.post('/api/gemini/explain-diagram', async (req, res) => {
    try {
      const { diagramTitle, carInfo, question } = req.body;
      const ai = getGenAI();

      const prompt = `أنت مهندس متخصص في قراءة وتحليل المخططات الكهربائية للسيارات (Wiring Diagrams Expert).
المخطط الحالي: ${diagramTitle}
معلومات السيارة: ${carInfo}
سؤال الفني حول المخطط: ${question || 'اشرح مسار التغذية والأرضي وكيفية فحص هذا المخطط بالملتيميتر خطوة بخطوة.'}

قم بإعطاء شرح مهني دقيق ومرتب يوضح:
1. مسار التغذية المباشرة (12V) والفيوزات المخصصة.
2. مسار التغذية المرجعية 5V ونقاط التأريض الرئيسية.
3. كيفية فحص إشارات هذا النظام بالملتيميتر أو الأوسيلوسكوب.
4. أهم الأعطال التي تحدث في هذا المخطط وكيفية تتبع السلك التالف.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          temperature: 0.4
        }
      });

      res.json({ text: response.text || 'لم يتوفر شرح تلقائي من المساعد.' });
    } catch (err: any) {
      console.error('Gemini Diagram Explain Error:', err);
      res.status(500).json({
        error: 'حدث خطأ أثناء تفسير المخطط عبر الذكاء الاصطناعي',
        details: err?.message || String(err)
      });
    }
  });

  // Vite Middleware or Production Static Serve
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
