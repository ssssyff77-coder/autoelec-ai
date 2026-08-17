import { WiringDiagram } from '../types';

export const COMPREHENSIVE_WIRING_DIAGRAMS: WiringDiagram[] = [
  {
    id: 'wd-efi-camry',
    titleAr: 'مخطط إدارة المحرك والحقن الإلكتروني (Engine ECU Terminal Pinout)',
    titleEn: 'Engine Management & Fuel Injection System Diagram',
    diagramNumber: 'WD-2024-ECU-01',
    systemId: 'efi',
    systemName: 'نظام إدارة المحرك والحقن (EFI / ECU)',
    carCompany: 'Toyota',
    model: 'Camry / RAV4',
    yearRange: '2018 - 2026',
    engineType: '2.5L 2AR-FE / Dynamic Force',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    description: 'مخطط كهربائي تفصيلي يوضح فيوزات التغذية المباشرة B+، ريليه EFI Main، أطراف كمبيوتر المحرك ECU Pins، ألوان السلك، ومسارات حساس الهواء والكرنك والبخاخات.',
    fuses: [
      { number: 'EFI NO.1', rating: '15A', functionAr: 'تغذية البخاخات والكويلات بجهد 12V' },
      { number: 'EFI NO.2', rating: '10A', functionAr: 'تغذية كمبيوتر المحرك B+ المستمرة' },
      { number: 'IGN', rating: '10A', functionAr: 'تغذية إشارة السويتش السفلية عند ON' },
      { number: 'INJ', rating: '20A', functionAr: 'المرحلة الرئيسية لبخاخات المانيفولد' }
    ],
    relays: [
      { number: 'RLY-EFI-MAIN', typeAr: 'ريليه EFI الرئيسي 4 دبوس', locationAr: 'علبة الفيوزات الرئيسية بالكبوت (Engine Bay Junction Box)' },
      { number: 'RLY-C/OPN', typeAr: 'ريليه طرمبة البنزين Circuit Opening Relay', locationAr: 'كابينة السيارة خلف الدرج الأيمن' }
    ],
    ecuPins: [
      { pinNumber: 'A1', connector: 'Plug A (31 Pin)', signalName: 'BATT (Power)', wireColor: 'أحمر/أبيض', voltage: '12.6V DC', functionAr: 'التغذية المباشرة من البطارية' },
      { pinNumber: 'A5', connector: 'Plug A (31 Pin)', signalName: 'E01 (Ground)', wireColor: 'أسود/أبيض', voltage: '0.01V DC', functionAr: 'الأرضي الرئيسي لكمبيوتر المحرك' },
      { pinNumber: 'B12', connector: 'Plug B (24 Pin)', signalName: 'VC (5V Ref)', wireColor: 'أصفر/أزرق', voltage: '5.00V DC', functionAr: 'مرجع الجهد لحساس البوابة والضغط' },
      { pinNumber: 'B18', connector: 'Plug B (24 Pin)', signalName: 'VG (MAF Signal)', wireColor: 'أخضر/أسود', voltage: '0.9V - 4.2V', functionAr: 'إشارة حجم الهواء من حساس MAF' },
      { pinNumber: 'C3', connector: 'Plug C (16 Pin)', signalName: 'NE+ (CKP Signal)', wireColor: 'أبيض شيلد', voltage: '1.5V AC RMS', functionAr: 'إشارة سرعة دوران الكرنك' },
      { pinNumber: 'C10', connector: 'Plug C (16 Pin)', signalName: 'INJ1 (Injector 1)', wireColor: 'بني/أحمر', voltage: 'نبض أرضي PWM', functionAr: 'نقع البخاخ رقم 1' }
    ],
    hotspots: [
      {
        id: 'hs-battery',
        label: 'البطارية الرئيسية 12V',
        type: 'battery',
        xPercent: 12,
        yPercent: 20,
        details: {
          functionAr: 'مصدر الجهد الرئيسي للمنظومة الكهربائية مع موصل المصهر الرئيسي 120A.',
          testingMethodAr: 'قياس الفولتية بين القطبين، يجب أن تكون بين 12.4V و 12.8V والمحرك متوقف.',
          normalValuesAr: '12.6V متوقف | 13.8V - 14.4V مع دوران المولد',
          wireColors: ['أحمر (سلك سميك)', 'أسود (أرضي الشاسي)'],
          associatedDtcs: ['P0562', 'P0563']
        }
      },
      {
        id: 'hs-fuse-box',
        label: 'علبة الفيوزات الرئيسية',
        type: 'fuse',
        xPercent: 28,
        yPercent: 35,
        details: {
          functionAr: 'توزيع التغذية وتمرير التيارات لحماية الكويلات، البخاخات، وكمبيوتر السيارة.',
          testingMethodAr: 'قياس الاستمرارية Continuity على دبابيس الفيوز والتحقق من عدم انصهار السلك الداخلي.',
          normalValuesAr: 'مقاومة 0 أوم بين طرفي الفيوز',
          wireColors: ['أحمر/أصفر', 'أزرق/أبيض'],
          associatedDtcs: ['P0685', 'P0689']
        }
      },
      {
        id: 'hs-ecu',
        label: 'كمبيوتر المحرك ECU',
        type: 'ecu',
        xPercent: 50,
        yPercent: 50,
        details: {
          functionAr: 'الوحدة المركزية لمعالجة قراءات الحساسات وإصدار أوامر الحقن والشرارة.',
          testingMethodAr: 'فحص التغذية المباشرة (Pins BATT) والأرضي E01 وتأكيد خرج الـ 5V Reference.',
          normalValuesAr: '5.0V Ref output stablized | Ground voltage < 0.05V',
          wireColors: ['أحمر/أبيض', 'أسود', 'رمادي'],
          associatedDtcs: ['P0606', 'P0607', 'P0610']
        }
      },
      {
        id: 'hs-maf',
        label: 'حساس كتلة الهواء MAF',
        type: 'sensor',
        xPercent: 75,
        yPercent: 25,
        details: {
          functionAr: 'قياس كمية الهواء المتدفق للمحرك وإرسال إشارة الفولتية للـ ECU.',
          testingMethodAr: 'قياس الفولت بين دبوس الإشارة والأرضي مع الدوس على دواسة البنزين.',
          normalValuesAr: '0.9V خمول -> 3.8V عند فتح الثروتل بالكامل',
          wireColors: ['أخضر/أسود (إشارة)', 'أصفر (5V Ref)', 'أسود (أرضي)'],
          associatedDtcs: ['P0100', 'P0101', 'P0102', 'P0103']
        }
      },
      {
        id: 'hs-injectors',
        label: 'بخاخات الوقود 1-4',
        type: 'actuator',
        xPercent: 82,
        yPercent: 70,
        details: {
          functionAr: 'فتح صمامات الحقن بدقة أجزاء من الملي ثانية عند استقبال نبضات التحكم.',
          testingMethodAr: 'قياس المقاومة بين دبابيس البخاخ ولمبة النبض Noid Light على الفيش.',
          normalValuesAr: 'مقاومة 12 - 16 أوم | زمن نبض 2.0 - 3.2 ms',
          wireColors: ['بني', 'برتقالي', 'بنفسجي', 'وردي'],
          associatedDtcs: ['P0201', 'P0202', 'P0203', 'P0204']
        }
      }
    ]
  },
  {
    id: 'wd-charging-system',
    titleAr: 'مخطط دائرة الشحن والدينامو الإلكتروني (Alternator Smart Charging System)',
    titleEn: 'Smart Alternator & Battery Charging System Diagram',
    diagramNumber: 'WD-CHG-ALT-02',
    systemId: 'charging-starter',
    systemName: 'نظام الشحن والتشغيل (دينامو ومارش)',
    carCompany: 'Hyundai / Kia',
    model: 'Elantra / Tucson / Sportage',
    yearRange: '2016 - 2025',
    engineType: '1.6L / 2.0L MPI / GDI',
    imageUrl: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80',
    description: 'مخطط كهربائي تفصيلي لمولد الشحن الدينامو الذكي الذاتي التنظيم LIN Bus / Duty Cycle مع فحص خط B+ المباشر، خط L لمبة الشحن، وخط Sense لقياس جهد البطارية.',
    fuses: [
      { number: 'ALT 150A', rating: '150A', functionAr: 'المصهر الرئيسي عالي التيار لحماية الدينامو والبطارية' },
      { number: 'ECU 10A', rating: '10A', functionAr: 'تغذية وحدة تحكم الشحن المباشرة' },
      { number: 'CLUSTER 10A', rating: '10A', functionAr: 'تغذية لمبة الشحن بالطبلون' }
    ],
    relays: [
      { number: 'RLY-START', typeAr: 'ريليه التشفيل والمارش 30A', locationAr: 'علبة المحرك الرئيسية' }
    ],
    ecuPins: [
      { pinNumber: 'D4', connector: 'ECU Harness D', signalName: 'ALT-C (Control)', wireColor: 'أزرق/أصفر', voltage: 'PWM 128Hz', functionAr: 'إشارة التحكم بنسبة شحن الدينامو' },
      { pinNumber: 'D8', connector: 'ECU Harness D', signalName: 'ALT-FR (Feedback)', wireColor: 'أبيض/أسود', voltage: '0V - 5V PWM', functionAr: 'إشارة التغذية الراجعة لحمل المولد' }
    ],
    hotspots: [
      {
        id: 'hs-alt',
        label: 'مولد الشحن (الدينامو)',
        type: 'actuator',
        xPercent: 35,
        yPercent: 45,
        details: {
          functionAr: 'توليد التيار المتناوب وتحويله لتيار مستمر لتغذية أحمال السيارة وإعادة شحن البطارية.',
          testingMethodAr: 'قياس الجهد على القطب B+ أسلوب خمول وتحت الحمل العالي (تشغيل الأنوار والتكييف).',
          normalValuesAr: '13.8V إلى 14.5V ثابت دون هبوط حاد',
          wireColors: ['أحمر سميك (B+)', 'أزرق (LIN Control)', 'أبيض (FR Feedback)'],
          associatedDtcs: ['P0620', 'P0625', 'P0626']
        }
      },
      {
        id: 'hs-starter',
        label: 'محرك البدء (المارش / السلف)',
        type: 'actuator',
        xPercent: 70,
        yPercent: 65,
        details: {
          functionAr: 'تدوير حذافة الكرنك بسرعة كافية لبدء عملية الشوط الأول واشتعال المحرك.',
          testingMethodAr: 'قياس وصول 12V إلى مسمار السولينويد الصغير (S Terminal) عند تدوير المفتاح لوضع START.',
          normalValuesAr: 'جهد 12V صريح عند السلف | تيار بدء يصل لـ 150-250 أمبير',
          wireColors: ['أحمر 35mm²', 'بنفسجي (خط السولينويد S)'],
          associatedDtcs: ['P0615', 'P0616', 'P0617']
        }
      }
    ]
  },
  {
    id: 'wd-can-bus',
    titleAr: 'مخطط شبكة الاتصالات عالية السرعة CAN-BUS (High/Low Multiplexing)',
    titleEn: 'CAN-Bus High Speed Communications Network Diagram',
    diagramNumber: 'WD-CAN-NET-03',
    systemId: 'can-bus',
    systemName: 'شبكة الاتصالات الذكية (CAN-BUS / LIN)',
    carCompany: 'All Brands (Toyota / Nissan / Ford / GM / Hyundai)',
    model: 'Universal Standards J1939 / ISO 11898',
    yearRange: '2008 - 2026',
    engineType: 'جميع أنواع المحركات',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    description: 'مخطط تفصيلي لشبكة الـ CAN-BUS يوضح مسار سلكي CAN High و CAN Low، مقاومات الإنهاء Termination Resistors 120Ω، وفيشة الفحص OBD-II (Pin 6 & Pin 14).',
    fuses: [
      { number: 'GATEWAY 10A', rating: '10A', functionAr: 'تغذية كمبيوتر بوابة الشبكة Gateway Module' },
      { number: 'OBD 7.5A', rating: '7.5A', functionAr: 'تغذية فيشة الفحص Pin 16 بجهد البطارية' }
    ],
    relays: [],
    ecuPins: [
      { pinNumber: 'OBD Pin 6', connector: 'DLC OBD-II Connector', signalName: 'CAN-H', wireColor: 'أصفر / بني', voltage: '2.5V - 3.5V', functionAr: 'خط البيانات العالي CAN High' },
      { pinNumber: 'OBD Pin 14', connector: 'DLC OBD-II Connector', signalName: 'CAN-L', wireColor: 'أخضر / أبيض', voltage: '1.5V - 2.5V', functionAr: 'خط البيانات المنخفض CAN Low' }
    ],
    hotspots: [
      {
        id: 'hs-obd-port',
        label: 'فيشة الفحص الذكية OBD-II DLC',
        type: 'switch',
        xPercent: 15,
        yPercent: 50,
        details: {
          functionAr: 'منفذ الاتصال المباشر مع أجهزة التشخيص والوصول لكافة كمبيوترات السيارة عبر الشبكة.',
          testingMethodAr: 'قياس المقاومة بين Pin 6 و Pin 14 والأجهزة متوقفة ومفصلية البطارية، يجب قراءة 60 أوم بالضبط.',
          normalValuesAr: '60 Ohm Total Net Resistance | CAN-H ~2.7V | CAN-L ~2.3V',
          wireColors: ['أصفر (CAN-H Pin 6)', 'أخضر (CAN-L Pin 14)', 'أحمر (Pin 16 Power)'],
          associatedDtcs: ['U0001', 'U0100', 'U0101', 'U0121']
        }
      },
      {
        id: 'hs-term-resistor',
        label: 'مقاومة الإنهاء 120 أوم (Termination Resistor)',
        type: 'fuse',
        xPercent: 88,
        yPercent: 50,
        details: {
          functionAr: 'امتصاص الترددات الكهربائية المرتدة ومص انعكاس الموجات لحماية استقرار نقل البيانات.',
          testingMethodAr: 'قياس المقاومة الداخلية لكمبيوتر المحرك أو كمبيوتر BCM بعد فصل السوكيت.',
          normalValuesAr: '120 Ohm ± 2%',
          wireColors: ['ملفوف Twisted Pair'],
          associatedDtcs: ['U0002', 'U0073']
        }
      }
    ]
  },
  {
    id: 'wd-abs-esp',
    titleAr: 'مخطط وحدة فرامل ABS وحساسات سرعة العجلات الأربعة (ABS / ESP Hydraulic System)',
    titleEn: 'Anti-Lock Braking System & Electronic Stability Control Wiring Diagram',
    diagramNumber: 'WD-ABS-ESP-04',
    systemId: 'abs-esp',
    systemName: 'نظام الفرامل المانعة للانغلاق (ABS / ESP)',
    carCompany: 'Nissan / Infiniti',
    model: 'Patrol Y62 / Altima / Sunny',
    yearRange: '2012 - 2026',
    engineType: '2.5L / 3.5L / 5.6L V8',
    imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
    description: 'مخطط كهربائي متكامل لفرامل ABS ووحدة الثبات الإلكتروني ESP، يوضح حساسات سرعة العجلات الهال/المغناطيسية، صمامات السولينويد المزدوجة، ومحرك المضخة الهيدروليكية.',
    fuses: [
      { number: 'ABS MTR 40A', rating: '40A', functionAr: 'تغذية محرك مضخة الـ ABS الهيدروليكية' },
      { number: 'ABS SOL 25A', rating: '25A', functionAr: 'تغذية صمامات السولينويد الهيدروليكية' },
      { number: 'STOP LAMP 10A', rating: '10A', functionAr: 'إشارة دعسة الفرامل المباشرة' }
    ],
    relays: [
      { number: 'RLY-ABS-MTR', typeAr: 'ريليه مضخة ABS المدمج داخل الوحدة', locationAr: 'داخل الموديول الهيدروليكي للفرامل' }
    ],
    ecuPins: [
      { pinNumber: '1', connector: 'ABS Plug 46-Pin', signalName: 'FL+ Speed Sensor', wireColor: 'وردي', voltage: 'إشارة ترددية Current Pulse', functionAr: 'حساس سرعة العجلة الأمامية اليسرى' },
      { pinNumber: '2', connector: 'ABS Plug 46-Pin', signalName: 'FL- Ground', wireColor: 'أزرق فاتح', voltage: '0V', functionAr: 'أرضي حساس العجلة الأمامية اليسرى' },
      { pinNumber: '25', connector: 'ABS Plug 46-Pin', signalName: 'CAN-H', wireColor: 'أصفر', voltage: '2.5V - 3.5V', functionAr: 'خط الاتصال مع BCM و ECU' }
    ],
    hotspots: [
      {
        id: 'hs-wheel-sensor',
        label: 'حساس سرعة العجلة (Wheel Speed Sensor)',
        type: 'sensor',
        xPercent: 20,
        yPercent: 70,
        details: {
          functionAr: 'رصد دوران وسرعة العجلة الفردية باستخدام شريحة Hall Effect وإرسال نبضات التيار.',
          testingMethodAr: 'قياس التيار أو قراءة السرعة بالكمبيوتر أثناء تدوير العجلة باليد.',
          normalValuesAr: '0.7mA (منخفض) إلى 1.4mA (مرتفع) عند الحركة',
          wireColors: ['وردي', 'أزرق فاتح'],
          associatedDtcs: ['C0031', 'C0034', 'C0037', 'C0040']
        }
      },
      {
        id: 'hs-abs-modulator',
        label: 'الموديول الهيدروليكي ومحرك المضخة',
        type: 'ecu',
        xPercent: 60,
        yPercent: 40,
        details: {
          functionAr: 'تنفيس وضخ ضغط زيت الفرامل للتحكم الفردي بكل عجلة لمنع الانزلاق.',
          testingMethodAr: 'فحص جهد المصهر 40A والأرضي الثقيل وفحص تشغيل المضخة عبر اختبار المكونات Actuation Test.',
          normalValuesAr: '12.6V Power | Resistance < 0.2 Ohm to Chassis',
          wireColors: ['أحمر ثقيل', 'أسود ثقيل'],
          associatedDtcs: ['C0110', 'C0121', 'C0265']
        }
      }
    ]
  },
  {
    id: 'wd-bcm-body',
    titleAr: 'مخطط كمبيوتر جسم السيارة والراحة (Body Control Module BCM)',
    titleEn: 'Body Control Module (BCM) & Electrical Accessories Diagram',
    diagramNumber: 'WD-BCM-BODY-05',
    systemId: 'bcm-body',
    systemName: 'كمبيوتر جسم السيارة والراحة (BCM)',
    carCompany: 'Ford / Chevrolet',
    model: 'F-150 / Mustang / Tahoe / Malibu',
    yearRange: '2015 - 2026',
    engineType: 'EcoBoost / V8 Coyote / EcoTec',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    description: 'مخطط كهربائي شامل لوحدة BCM المسؤولة عن الأقفال المركزية، أنوار المصدات والأنوار العالية والواطية، المساحات المطرية، أزرار النوافذ، ونظام الإشعال الذكي.',
    fuses: [
      { number: 'BCM 1', rating: '30A', functionAr: 'تغذية محركات الأقفال والنوافذ' },
      { number: 'BCM 2', rating: '20A', functionAr: 'تغذية الإضاءة الخارجية العالية والواطية' },
      { number: 'HAZARD', rating: '15A', functionAr: 'تغذية أنوار التنبيه والإشارات الرباعية' }
    ],
    relays: [
      { number: 'RLY-HORN', typeAr: 'ريليه البوق والبهرباء', locationAr: 'علبة BCM الداخلية' },
      { number: 'RLY-WIPER-HI/LO', typeAr: 'ريليه سرعات مساحات الزجاج', locationAr: 'تحت الطبلون' }
    ],
    ecuPins: [
      { pinNumber: 'C1-1', connector: 'BCM Plug C1 Gray', signalName: 'LOCK OUT', wireColor: 'رمادي/برتقالي', voltage: '12V Pulse', functionAr: 'إشارة إغلاق الأبواب' },
      { pinNumber: 'C2-14', connector: 'BCM Plug C2 Blue', signalName: 'KEYLESS ANT', wireColor: 'بنفسجي/أبيض', voltage: 'RF Signal 433MHz', functionAr: 'هوائي البصمة والمفتاح الذكي' }
    ],
    hotspots: [
      {
        id: 'hs-bcm-box',
        label: 'وحدة كمبيوتر BCM الرئيسية',
        type: 'ecu',
        xPercent: 50,
        yPercent: 45,
        details: {
          functionAr: 'إدارة وتوجيه إشارات الراحة، الإضاءة، إنذار السرقة، والأقفال المركزية.',
          testingMethodAr: 'فحص التغذية المستمرة والقيام بقراءة الأخطاء البرمجية لموديول BCM.',
          normalValuesAr: 'تغذية 12V ثابتة | اتصال CAN الخالي من الأعطال',
          wireColors: ['متعدد الألوان'],
          associatedDtcs: ['B1000', 'B1325', 'B3055']
        }
      }
    ]
  },
  {
    id: 'wd-srs-airbag',
    titleAr: 'مخطط نظام الوسائد الهوائية وحساسات التصادم (SRS Airbag Safety System)',
    titleEn: 'SRS Supplemental Restraint System & Crash Sensors Wiring Diagram',
    diagramNumber: 'WD-SRS-AIRBAG-06',
    systemId: 'srs-airbag',
    systemName: 'نظام الوسائد الهوائية (SRS Airbag)',
    carCompany: 'Toyota / Lexus',
    model: 'Corolla / Camry / Avalon / Land Cruiser',
    yearRange: '2014 - 2026',
    engineType: 'جميع الأنواع',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    description: 'مخطط أمان عالي الدقة لوحدة SRS Airbag، يوضح حساسات الاصطدام الأمامية والجانبية Front/Side Impact Sensors، شريحة المقود Clock Spring، والوسائد السائق والراكب.',
    fuses: [
      { number: 'IGN-SRS 10A', rating: '10A', functionAr: 'تغذية أمان مستقلة ومعزولة لوحدة الإيرباج' }
    ],
    relays: [],
    ecuPins: [
      { pinNumber: '1', connector: 'SRS Yellow Connector', signalName: 'D-AIRBAG +', wireColor: 'أصفر/أحمر', voltage: '0.0V (Low Pulse on trigger)', functionAr: 'خط كبسولة وسادة السائق' },
      { pinNumber: '2', connector: 'SRS Yellow Connector', signalName: 'D-AIRBAG -', wireColor: 'أصفر/أسود', voltage: '0.0V', functionAr: 'خط أرضي وسادة السائق' }
    ],
    hotspots: [
      {
        id: 'hs-clockspring',
        label: 'شريحة المقود (Clock Spring / Spiral Cable)',
        type: 'switch',
        xPercent: 30,
        yPercent: 55,
        details: {
          functionAr: 'توصيل إشارة وسادة دركسون السائق وأزرار المقود والبوق أثناء دوران عجلة القيادة.',
          testingMethodAr: 'قياس استمرارية المسارات بدقة مع مراعاة عدم استخدام أوم-ميتر مباشر يسبب تفجير الكبسولة!',
          normalValuesAr: 'مقاومة أقل من 0.5 أوم على مسارات الشريحة',
          wireColors: ['أصفر عالي الأمان Yellow Connectors'],
          associatedDtcs: ['B1800', 'B1801', 'B1806']
        }
      },
      {
        id: 'hs-srs-module',
        label: 'وحدة SRS وسائد الأمان المركزية',
        type: 'ecu',
        xPercent: 65,
        yPercent: 40,
        details: {
          functionAr: 'معالجة تسارع التسادم وإشعال كبسولات الغاز في أجزاء من الملي ثانية.',
          testingMethodAr: 'فحص التغذية والأرضي بفيش الصفراء المجهزة بأقفال التثبيت الثانوية.',
          normalValuesAr: 'تغذية 12V عند On | مقاومة الكبسولات 2.0 - 3.0 أوم',
          wireColors: ['أسلاك صفراء محاطة بعازل أمان خاص'],
          associatedDtcs: ['B1000', 'B1650', 'B1810']
        }
      }
    ]
  },
  {
    id: 'wd-tcm-transmission',
    titleAr: 'مخطط كمبيوتر القير الأوتوماتيكي وصمامات السولينويد (Transmission TCM / CVT Wiring)',
    titleEn: 'Transmission Control Module (TCM) & Solenoids Wiring Diagram',
    diagramNumber: 'WD-TCM-TRANS-07',
    systemId: 'transmission-tcm',
    systemName: 'نظام ناقل الحركة (AT / CVT / DCT)',
    carCompany: 'Toyota / Honda / Nissan',
    model: 'Camry / Civic / Altima',
    yearRange: '2015 - 2026',
    engineType: 'CVT / 6-Speed / 8-Speed Automatic',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    description: 'مخطط كهربائي تفصيلي لـ كمبيوتر ناقل الحركة TCM، يوضح صمامات التحكم بالسائل Shift Solenoids (A, B, C, D)، حساس سرعة الدخل والخرج Input/Output Speed Sensors، وحساس الحرارة TFT.',
    fuses: [
      { number: 'TCM 15A', rating: '15A', functionAr: 'تغذية وحدة تحكم القير الصريحة' },
      { number: 'BACK UP 10A', rating: '10A', functionAr: 'ذاكرة القير وحفظ قيم التكيف التلقائي' }
    ],
    relays: [
      { number: 'RLY-NEUTRAL-SW', typeAr: 'مفتاح الأمان عند التعشيق على P/N', locationAr: 'على جسم القير الخارجي' }
    ],
    ecuPins: [
      { pinNumber: '12', connector: 'TCM Connector 28-Pin', signalName: 'SOL-A Control', wireColor: 'أزرق/أحمر', voltage: '12V Duty Cycle PWM', functionAr: 'التحكم بصمام التعشيق A' },
      { pinNumber: '19', connector: 'TCM Connector 28-Pin', signalName: 'TFT Sensor Input', wireColor: 'أصفر/أخضر', voltage: '0.5V - 4.5V (حسب الحرارة)', functionAr: 'حساس حرارة زيت القير' }
    ],
    hotspots: [
      {
        id: 'hs-solenoids',
        label: 'مجموعة صمامات السولينويد الهيدروليكية',
        type: 'actuator',
        xPercent: 75,
        yPercent: 60,
        details: {
          functionAr: 'توجيه تدفق زيت القير الهيدروليكي للكلتشات للقيام بالتعشيق والموازنة.',
          testingMethodAr: 'قياس مقاومة الملف لكل سولينويد بالملتيميتر من فيشة القير الخارجية.',
          normalValuesAr: 'مقاومة 11.5 - 15.0 أوم عند 20°C',
          wireColors: ['أزرق', 'وردي', 'برتقالي', 'رمادي'],
          associatedDtcs: ['P0750', 'P0755', 'P0760', 'P0973']
        }
      }
    ]
  },
  {
    id: 'wd-ac-climate',
    titleAr: 'مخطط نظام التكييف الإلكتروني والكمبروسر الكهربائي (HVAC Climate & ECV Control)',
    titleEn: 'Electronic Climate Control & Variable Compressor Wiring Diagram',
    diagramNumber: 'WD-AC-CLIMATE-08',
    systemId: 'ac-climate',
    systemName: 'نظام التكييف الإلكتروني (HVAC Climate)',
    carCompany: 'Toyota / Hyundai / Mercedes',
    model: 'Camry / Sonata / C-Class',
    yearRange: '2016 - 2026',
    engineType: 'جميع المحركات وبدائل الهايبرد',
    imageUrl: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80',
    description: 'مخطط الدائرة الكهربائية للتكييف الإلكتروني الذكي، صمام الكمبروسر الإلكتروني ECV، حساس الضغط الثلاثي Triple Pressure Switch، وحساس حرارة الثلاجة Evaporator Temp Sensor.',
    fuses: [
      { number: 'A/C COMP 10A', rating: '10A', functionAr: 'تغذية كلتش وصمام كمبروسر المكيف' },
      { number: 'BLOWER 40A', rating: '40A', functionAr: 'تغذية محرك مروحة دفع الهواء الداخلية (المقاول)' }
    ],
    relays: [
      { number: 'RLY-A/C-MG', typeAr: 'ريليه الكلتش المغناطيسي للمكيف', locationAr: 'علبة الفيوزات الرئيسية بالكبوت' }
    ],
    ecuPins: [
      { pinNumber: '8', connector: 'A/C Amplifier 24-Pin', signalName: 'ECV Control Signal', wireColor: 'أخضر/أصفر', voltage: 'PWM 0-100% Duty', functionAr: 'إشارة حجم إزاحة الكمبروسر المتغير' }
    ],
    hotspots: [
      {
        id: 'hs-ecv-valv',
        label: 'صمام الكمبروسر الإلكتروني ECV',
        type: 'actuator',
        xPercent: 40,
        yPercent: 60,
        details: {
          functionAr: 'التحكم بزاوية القرص المائل داخل الكمبروسر لضبط التبريد بدون فصل الكلتش.',
          testingMethodAr: 'قياس إشارة الـ PWM ونسبة الإشغال Duty Cycle القادمة من كمبيوتر المكيف.',
          normalValuesAr: 'مقاومة 10 - 12 أوم | جهد PWM متغير 12V',
          wireColors: ['أخضر/أصفر', 'أسود (أرضي)'],
          associatedDtcs: ['B1422', 'B1424', 'P0645']
        }
      }
    ]
  }
];
