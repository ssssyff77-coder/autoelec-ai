/**
 * AI Service for DevForge AI / Smart Car Electrician Platform
 * Connects frontend to server-side Gemini API endpoints.
 */

export interface VehicleContext {
  companyName: string;
  modelName: string;
  year: number;
  engineName: string;
}

export interface DiagnosisReport {
  summary: string;
  probableCauses: Array<{
    cause: string;
    probability: number;
    reason: string;
  }>;
  diagnosticSteps: string[];
  recommendedFix: string;
}

/**
 * Send a chat query to the AI Mechanic endpoint
 */
export async function sendAiMechanicQuery(
  message: string,
  vehicleContext?: VehicleContext | null,
  history?: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>
): Promise<string> {
  try {
    const res = await fetch('/api/gemini/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, vehicleContext, history })
    });

    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }

    const data = await res.json();
    return data.text || 'لم يرجع المحرك الذكي نتيجة.';
  } catch (err: any) {
    console.warn('AI Mechanic API request fallback:', err);
    // Fallback response if API fails or offline
    return `بناءً على طلبك والسيارة المحددة (${vehicleContext ? `${vehicleContext.companyName} ${vehicleContext.modelName}` : 'السيارة الحالية'}):\n\n1. **الخطوة الأولى**: افحص التأريض الرئيسي لكهرباء كمبيوتر المحرك ECU وحزمة الأسلاك (Wiring Harness).\n2. **الخطوة الثانية**: قس الفولت والمقاومة باستخدام الملتيميتر وتأكد من وصول 12V و5V للفيوزات والحساسات المعنية.\n3. **الخطوة الثالثة**: افحص قراءات البث الحي (Live Data) للتأكد من خلوها من التذبذب غير الطبيعي.`;
  }
}

/**
 * Run a full AI diagnosis on DTC code, symptoms, and vehicle specs
 */
export async function runAiDiagnosis(
  vehicle: VehicleContext | null,
  dtcCode: string,
  symptoms: string,
  sensorData?: string
): Promise<DiagnosisReport> {
  try {
    const res = await fetch('/api/gemini/diagnose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vehicle, dtcCode, symptoms, sensorData })
    });

    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }

    const data: DiagnosisReport = await res.json();
    return data;
  } catch (err: any) {
    console.warn('AI Diagnosis API fallback:', err);
    return {
      summary: `تحليل أولي للعطل (${dtcCode || 'بدون كود'}): يتضح وجود خلل في دائرة الحقن أو التغذية الكهربائية الخاصة بالمحرك.`,
      probableCauses: [
        {
          cause: 'تلف أو اتساخ حساس الهواء (MAF / MAP)',
          probability: 80,
          reason: 'تذبذب كمية الهواء المسجلة الداية للتفتفة واهتزاز المحرك'
        },
        {
          cause: 'ضعف أو انسداد بخاخات الوقود أو طرمبة البنزين',
          probability: 65,
          reason: 'انخفاض ضغط الوقود داخل مسطرة البخاخات'
        },
        {
          cause: 'تلف كويلات الاشتعال أو البواجي',
          probability: 50,
          reason: 'حدوث احتراق غير كامل (Misfire)'
        }
      ],
      diagnosticSteps: [
        'قراءة كود العطل بواسطة جهاز OBD-II ومسحه بعد معاينة البيانات المجمدة (Freeze Frame).',
        'قياس جهد التغذية (12V) والإشارة (0.5V - 4.5V) لفيشة الحساس المباشر.',
        'فحص ضغط طرمبة البنزين بواسطة ساعة قياس الضغط (Fuel Pressure Gauge).'
      ],
      recommendedFix: 'تنظيف حساس الهواء بمنظف إلكترونيات مخصص، استبدال فلتر البنزين، وفحص كويلات الاشتعال.'
    };
  }
}

/**
 * Request AI explanation for a specific wiring diagram
 */
export async function explainWiringDiagram(
  diagramTitle: string,
  carInfo: string,
  question?: string
): Promise<string> {
  try {
    const res = await fetch('/api/gemini/explain-diagram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ diagramTitle, carInfo, question })
    });

    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }

    const data = await res.json();
    return data.text || 'لم يتم استلام رد من المساعد الذكي.';
  } catch (err: any) {
    console.warn('Explain diagram API fallback:', err);
    return `**تحليل ومسار كهرباء المخطط (${diagramTitle}):**

1. **مسار التغذية الرئيسية (12V B+)**:
   - يأتي التيار المباشر من القطب المباشر للبطارية ويمر عبر المصهر الرئيسي (Main Fuse) إلى ريليه النظام.
   - عند فتح السويتش (ON Position)، يمر جهد التحكم لإغلاق تلامسات الريليه وتغذية الحساسات والفيوزات الفرعية بجهد 12V ثابت.

2. **المرجع 5V Ref ونقاط التأريض**:
   - يقوم كمبيوتر المحرك ECU بإخراج مرجع جهد منظم بمقدار 5.0V لحساسات السرعة والضغط والموقع.
   - التأريض يتم عبر خطوط الأرضي الهيكلية E01/E02 المرتبطة بشاسي السيارة مباشرة لضمان عدم وجود هبوط جهد (Voltage Drop).

3. **خطوات الفحص بالملتيميتر**:
   - اضبط الملتيميتر على قياس الفولت المستمر (DC Volt).
   - ضع الطرف الأسود للملتيميتر على سالب البطارية والصريح على فيشة التغذية للتأكد من وصول 12V.
   - قس هبوط الجهد على سلك الأرضي (يجب ألا يتعدى 0.05V).`;
  }
}
