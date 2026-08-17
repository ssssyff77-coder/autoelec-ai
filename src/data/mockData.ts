import {
  CarCompany,
  VehicleSystem,
  DtcCode,
  Sensor,
  Actuator,
  LiveDataParam,
  WiringDiagram,
  ExpertVideo,
  Course,
  RepairCase
} from '../types';

export const VEHICLE_SYSTEMS: VehicleSystem[] = [
  {
    id: 'efi',
    name: 'نظام حقن الوقود وإدارة المحرك (EFI / ECU)',
    nameEn: 'Engine Management & Fuel Injection',
    icon: 'Cpu',
    description: 'التحكم في البخاخات، زمن الحقن، تقديم وتأخير شرارة الاشتعال، ومستشعرات المحرك.'
  },
  {
    id: 'charging-starter',
    name: 'نظام الشحن والتشغيل (دينامو ومارش)',
    nameEn: 'Charging & Starting System',
    icon: 'Zap',
    description: 'بطارية السيارة، المولد الكهربائي (Alternator)، ومحرك البدء (Starter).'
  },
  {
    id: 'abs-esp',
    name: 'نظام الفرامل المانعة للانغلاق (ABS / ESP)',
    nameEn: 'Anti-lock Braking & Stability Control',
    icon: 'ShieldAlert',
    description: 'حساسات سرعة العجلات، وحدة ABS الهيدروليكية، والتحكم بالثبات.'
  },
  {
    id: 'can-bus',
    name: 'شبكة الاتصالات الذكية (CAN-BUS / LIN)',
    nameEn: 'CAN-Bus Multiplexing System',
    icon: 'Network',
    description: 'خطوط نقل البيانات عالية ومنخفضة السرعة بين كمبيوترات السيارة المختلفة.'
  },
  {
    id: 'bcm-body',
    name: 'كمبيوتر جسم السيارة والراحة (BCM)',
    nameEn: 'Body Control Module',
    icon: 'CarKey',
    description: 'الأنوار، الأقفال المركزية، الزجاج الكهربائي، النوافذ، ونظام إنذار السرقة.'
  },
  {
    id: 'srs-airbag',
    name: 'نظام الوسائد الهوائية (SRS Airbag)',
    nameEn: 'Airbag Safety System',
    icon: 'Shield',
    description: 'حساسات الاصطدام، وحدة التحكم بالوسائد الهوائية، وشرائح المقود.'
  },
  {
    id: 'transmission-tcm',
    name: 'كمبيوتر القير الأوتوماتيكي (TCM)',
    nameEn: 'Transmission Control Module',
    icon: 'Settings2',
    description: 'حساسات السرعة، صمامات السولينويد، والتحكم الهيدروليكي في نقل السرعات.'
  },
  {
    id: 'ac-climate',
    name: 'نظام التكييف الإلكتروني (HVAC Climate)',
    nameEn: 'Climate Control System',
    icon: 'ThermometerSnowflake',
    description: 'حساس الضغوط، صمام التمدد، كمبروسر التكييف الإلكتروني، وبوابات الهواء.'
  },
  {
    id: 'eps-steering',
    name: 'نظام المقود الكهربائي (EPS)',
    nameEn: 'Electric Power Steering',
    icon: 'Compass',
    description: 'حساس العزم والزاوية، محرك الدركسون الكهربائي ووحدة تحكم EPS.'
  },
  {
    id: 'immo-security',
    name: 'نظام منع السرقة والبصمة (Immobilizer)',
    nameEn: 'Immobilizer & Smart Key',
    icon: 'Key',
    description: 'شريحة المفتاح، هوائي الحلقة، وحدة الإموبلايزر والزر الذكي Push Start.'
  },
  {
    id: 'tpms-tires',
    name: 'نظام مراقبة ضغط الإطارات (TPMS)',
    nameEn: 'Tire Pressure Monitoring System',
    icon: 'Gauge',
    description: 'حساسات هواء العجلات والبرمجة اللاسلكية لمستقبل TPMS.'
  },
  {
    id: 'dashboard-cluster',
    name: 'عدادات الطبلون والشاشات (Dashboard Cluster)',
    nameEn: 'Instrument Cluster & HUD',
    icon: 'Layout',
    description: 'لوحة العدادات الرقمية، مؤشرات الحرارة والوقود وشاشات العرض.'
  },
  {
    id: 'fuel-delivery',
    name: 'نظام طرمبة وخزان الوقود (Fuel Delivery)',
    nameEn: 'Fuel Pump & Tank System',
    icon: 'Fuel',
    description: 'طرمبة البنزين، منظم الضغط، وحدة التحكم بالثلاجة وخطوط التغذية.'
  },
  {
    id: 'lighting-auto',
    name: 'نظام الإضاءة والأنوار الذكية (Lighting System)',
    nameEn: 'Adaptive Lighting System',
    icon: 'Sun',
    description: 'أنوار الليد، الزينون، المحاذات التلقائية العالية والواطية.'
  },
  {
    id: 'cruise-radar',
    name: 'مثبت السرعة والرادار (Cruise Control & Radar)',
    nameEn: 'Adaptive Cruise Control',
    icon: 'Radio',
    description: 'رادار المصد الأمامي، كاميرا التتبع، وأزرار عجلة القيادة.'
  }
];

// 52 Global Car Companies Seed List
export const CAR_COMPANIES: CarCompany[] = [
  {
    id: 'toyota',
    name: 'تويوتا',
    nameEn: 'Toyota',
    logo: '🚗',
    country: 'اليابان',
    models: [
      {
        id: 'camry',
        name: 'كامري (Camry)',
        companyId: 'toyota',
        years: [1998, 2005, 2012, 2018, 2024, 2026],
        engines: [
          { id: '2ar-fe', name: '2.5L 2AR-FE (4-Cyl)', displacement: '2500cc', fuelType: 'بنزين', powerHp: 178 },
          { id: 'a25a-fks', name: '2.5L Dynamic Force', displacement: '2500cc', fuelType: 'هايبرد / بنزين', powerHp: 203 }
        ]
      },
      {
        id: 'corolla',
        name: 'كورولا (Corolla)',
        companyId: 'toyota',
        years: [2000, 2008, 2014, 2020, 2026],
        engines: [
          { id: '1zr-fe', name: '1.6L 1ZR-FE Dual VVT-i', displacement: '1600cc', fuelType: 'بنزين', powerHp: 121 },
          { id: '2zr-fxe', name: '1.8L Hybrid 2ZR-FXE', displacement: '1800cc', fuelType: 'هايبرد', powerHp: 138 }
        ]
      },
      {
        id: 'hilux',
        name: 'هايلوكس (Hilux)',
        companyId: 'toyota',
        years: [2005, 2012, 2018, 2024],
        engines: [
          { id: '2tr-fe', name: '2.7L 2TR-FE Gasoline', displacement: '2700cc', fuelType: 'بنزين', powerHp: 164 },
          { id: '1gd-ftv', name: '2.8L Turbo Diesel 1GD', displacement: '2800cc', fuelType: 'ديزل', powerHp: 201 }
        ]
      },
      {
        id: 'land-cruiser',
        name: 'لاندكروزر (Land Cruiser LC300)',
        companyId: 'toyota',
        years: [2008, 2016, 2022, 2026],
        engines: [
          { id: 'v35a-fts', name: '3.5L Twin Turbo V6', displacement: '3500cc', fuelType: 'بنزين توربو', powerHp: 409 }
        ]
      },
      {
        id: 'prado',
        name: 'برادو (Prado)',
        companyId: 'toyota',
        years: [2010, 2015, 2020, 2025],
        engines: [{ id: '1gr-fe', name: '4.0L V6 1GR-FE', displacement: '4000cc', fuelType: 'بنزين', powerHp: 271 }]
      }
    ]
  },
  {
    id: 'hyundai',
    name: 'هيونداي',
    nameEn: 'Hyundai',
    logo: '🚙',
    country: 'كوريا الجنوبية',
    models: [
      {
        id: 'elantra',
        name: 'إلانترا (Elantra)',
        companyId: 'hyundai',
        years: [2008, 2014, 2018, 2023, 2026],
        engines: [
          { id: 'g4fg', name: '1.6L Gamma MPI (G4FG)', displacement: '1600cc', fuelType: 'بنزين', powerHp: 127 },
          { id: 'g4nh', name: '2.0L Nu MPI Atkinson', displacement: '2000cc', fuelType: 'بنزين', powerHp: 152 }
        ]
      },
      {
        id: 'sonata',
        name: 'سوناتا (Sonata)',
        companyId: 'hyundai',
        years: [2011, 2016, 2020, 2025],
        engines: [
          { id: 'g4kj', name: '2.4L Theta II GDI', displacement: '2400cc', fuelType: 'بنزين', powerHp: 185 }
        ]
      },
      {
        id: 'tucson',
        name: 'توسان (Tucson)',
        companyId: 'hyundai',
        years: [2012, 2017, 2022, 2026],
        engines: [{ id: 'g4fj', name: '1.6L Turbo GDI', displacement: '1600cc', fuelType: 'بنزين توربو', powerHp: 180 }]
      }
    ]
  },
  {
    id: 'kia',
    name: 'كيا',
    nameEn: 'Kia',
    logo: '🚘',
    country: 'كوريا الجنوبية',
    models: [
      {
        id: 'optima-k5',
        name: 'أوبتيموا / K5',
        companyId: 'kia',
        years: [2012, 2016, 2021, 2025],
        engines: [{ id: 'g4kn-kia', name: '2.5L Smartstream GDI', displacement: '2500cc', fuelType: 'بنزين', powerHp: 191 }]
      },
      {
        id: 'sportage',
        name: 'سبورتاج (Sportage)',
        companyId: 'kia',
        years: [2011, 2016, 2022, 2026],
        engines: [{ id: 'g4na', name: '2.0L Nu MPI', displacement: '2000cc', fuelType: 'بنزين', powerHp: 156 }]
      }
    ]
  },
  {
    id: 'nissan',
    name: 'نيسان',
    nameEn: 'Nissan',
    logo: '🚗',
    country: 'اليابان',
    models: [
      {
        id: 'altima',
        name: 'ألتيمة (Altima)',
        companyId: 'nissan',
        years: [2008, 2013, 2019, 2025],
        engines: [{ id: 'qr25de', name: '2.5L QR25DE', displacement: '2500cc', fuelType: 'بنزين', powerHp: 182 }]
      },
      {
        id: 'patrol',
        name: 'باترول (Patrol Y62 / Y63)',
        companyId: 'nissan',
        years: [2010, 2016, 2022, 2026],
        engines: [{ id: 'vk56de', name: '5.6L V8 VK56DE', displacement: '5600cc', fuelType: 'بنزين', powerHp: 400 }]
      },
      {
        id: 'sunny',
        name: 'صني (Sunny)',
        companyId: 'nissan',
        years: [2012, 2018, 2023, 2026],
        engines: [{ id: 'hr15de', name: '1.5L HR15DE', displacement: '1500cc', fuelType: 'بنزين', powerHp: 99 }]
      }
    ]
  },
  {
    id: 'honda',
    name: 'هوندا',
    nameEn: 'Honda',
    logo: '🚗',
    country: 'اليابان',
    models: [
      {
        id: 'accord',
        name: 'أكورد (Accord)',
        companyId: 'honda',
        years: [2008, 2014, 2018, 2024],
        engines: [{ id: 'l15b7', name: '1.5L Turbo VTEC', displacement: '1500cc', fuelType: 'بنزين توربو', powerHp: 192 }]
      },
      {
        id: 'civic',
        name: 'سيفيك (Civic)',
        companyId: 'honda',
        years: [2006, 2012, 2017, 2022, 2026],
        engines: [{ id: 'r18a1', name: '1.8L i-VTEC', displacement: '1800cc', fuelType: 'بنزين', powerHp: 140 }]
      }
    ]
  },
  {
    id: 'ford',
    name: 'فورد',
    nameEn: 'Ford',
    logo: '🚙',
    country: 'أمريكا',
    models: [
      {
        id: 'f150',
        name: 'اف-150 (F-150)',
        companyId: 'ford',
        years: [2011, 2015, 2021, 2026],
        engines: [{ id: 'ecoboost-35', name: '3.5L EcoBoost V6', displacement: '3500cc', fuelType: 'بنزين توربو', powerHp: 400 }]
      },
      {
        id: 'mustang',
        name: 'موستانج (Mustang)',
        companyId: 'ford',
        years: [2012, 2018, 2024],
        engines: [{ id: 'coyote-50', name: '5.0L V8 Coyote', displacement: '5000cc', fuelType: 'بنزين', powerHp: 460 }]
      }
    ]
  },
  {
    id: 'chevrolet',
    name: 'شيفروليه',
    nameEn: 'Chevrolet',
    logo: '🛻',
    country: 'أمريكا',
    models: [
      {
        id: 'tahoe',
        name: 'تاهو (Tahoe)',
        companyId: 'chevrolet',
        years: [2007, 2015, 2021, 2026],
        engines: [{ id: 'ecotec3-53', name: '5.3L V8 EcoTec3', displacement: '5300cc', fuelType: 'بنزين', powerHp: 355 }]
      },
      {
        id: 'malibu',
        name: 'ماليبو (Malibu)',
        companyId: 'chevrolet',
        years: [2013, 2017, 2022],
        engines: [{ id: 'ecotec-15t', name: '1.5L Turbo EcoTec', displacement: '1500cc', fuelType: 'بنزين توربو', powerHp: 160 }]
      }
    ]
  },
  {
    id: 'lexus',
    name: 'لكزس',
    nameEn: 'Lexus',
    logo: '💎',
    country: 'اليابان',
    models: [
      {
        id: 'es350',
        name: 'إي إس 350 (ES 350)',
        companyId: 'lexus',
        years: [2008, 2013, 2019, 2025],
        engines: [{ id: '2gr-fks', name: '3.5L V6 2GR-FKS', displacement: '3500cc', fuelType: 'بنزين', powerHp: 302 }]
      }
    ]
  },
  {
    id: 'bmw',
    name: 'بي إم دبليو',
    nameEn: 'BMW',
    logo: '🏎️',
    country: 'ألمانيا',
    models: [
      {
        id: 'series-5',
        name: 'الفئة الخامسة (5 Series G30/G60)',
        companyId: 'bmw',
        years: [2010, 2017, 2024, 2026],
        engines: [{ id: 'b48', name: '2.0L Turbo B48', displacement: '2000cc', fuelType: 'بنزين توربو', powerHp: 252 }]
      }
    ]
  },
  {
    id: 'mercedes',
    name: 'مرسيدس بنز',
    nameEn: 'Mercedes-Benz',
    logo: '⭐',
    country: 'ألمانيا',
    models: [
      {
        id: 'e-class',
        name: 'إي كلاس (E-Class W213/W214)',
        companyId: 'mercedes',
        years: [2011, 2017, 2024, 2026],
        engines: [{ id: 'm274', name: '2.0L Turbo M274', displacement: '2000cc', fuelType: 'بنزين توربو', powerHp: 241 }]
      }
    ]
  },
  { id: 'audi', name: 'أودي', nameEn: 'Audi', logo: '💍', country: 'ألمانيا', models: [] },
  { id: 'volkswagen', name: 'فولكس واجن', nameEn: 'Volkswagen', logo: '🚗', country: 'ألمانيا', models: [] },
  { id: 'mitsubishi', name: 'ميتسوبيشي', nameEn: 'Mitsubishi', logo: '♦️', country: 'اليابان', models: [] },
  { id: 'mazda', name: 'مازدا', nameEn: 'Mazda', logo: '🚘', country: 'اليابان', models: [] },
  { id: 'suzuki', name: 'سوزوكي', nameEn: 'Suzuki', logo: '🚙', country: 'اليابان', models: [] },
  { id: 'isuzu', name: 'إيسوزو', nameEn: 'Isuzu', logo: '🚚', country: 'اليابان', models: [] },
  { id: 'renault', name: 'رينو', nameEn: 'Renault', logo: '🚗', country: 'فرنسا', models: [] },
  { id: 'peugeot', name: 'بيجو', nameEn: 'Peugeot', logo: '🦁', country: 'فرنسا', models: [] },
  { id: 'mg', name: 'إم جي', nameEn: 'MG', logo: '🚘', country: 'بريطانيا / الصين', models: [] },
  { id: 'changan', name: 'شانجان', nameEn: 'Changan', logo: '🚙', country: 'الصين', models: [] },
  { id: 'geely', name: 'جيلي', nameEn: 'Geely', logo: '🚗', country: 'الصين', models: [] },
  { id: 'byd', name: 'بي واي دي', nameEn: 'BYD', logo: '⚡', country: 'الصين', models: [] },
  { id: 'chery', name: 'شيري', nameEn: 'Chery', logo: '🚘', country: 'الصين', models: [] },
  { id: 'great-wall', name: 'جريت وول', nameEn: 'Great Wall', logo: '🛻', country: 'الصين', models: [] },
  { id: 'haval', name: 'هافال', nameEn: 'Haval', logo: '🚙', country: 'الصين', models: [] },
  { id: 'dongfeng', name: 'دونج فينج', nameEn: 'Dongfeng', logo: '🚗', country: 'الصين', models: [] },
  { id: 'jac', name: 'جاك', nameEn: 'JAC', logo: '🚛', country: 'الصين', models: [] },
  { id: 'gac', name: 'جي إيه سي', nameEn: 'GAC', logo: '🚘', country: 'الصين', models: [] },
  { id: 'faw', name: 'فاو', nameEn: 'FAW', logo: '🚗', country: 'الصين', models: [] },
  { id: 'jetour', name: 'جيتور', nameEn: 'Jetour', logo: '🚙', country: 'الصين', models: [] },
  { id: 'porsche', name: 'بورشه', nameEn: 'Porsche', logo: '🏎️', country: 'ألمانيا', models: [] },
  { id: 'land-rover', name: 'لاند روفر', nameEn: 'Land Rover', logo: '⛰️', country: 'بريطانيا', models: [] },
  { id: 'jeep', name: 'جيب', nameEn: 'Jeep', logo: '🚙', country: 'أمريكا', models: [] },
  { id: 'dodge', name: 'دودج', nameEn: 'Dodge', logo: '🏎️', country: 'أمريكا', models: [] },
  { id: 'ram', name: 'رام', nameEn: 'RAM', logo: '🛻', country: 'أمريكا', models: [] },
  { id: 'gmc', name: 'جي إم سي', nameEn: 'GMC', logo: '🛻', country: 'أمريكا', models: [] },
  { id: 'cadillac', name: 'كاديلاتك', nameEn: 'Cadillac', logo: '💎', country: 'أمريكا', models: [] },
  { id: 'lincoln', name: 'لينكون', nameEn: 'Lincoln', logo: '🚘', country: 'أمريكا', models: [] },
  { id: 'volvo', name: 'فولفو', nameEn: 'Volvo', logo: '🛡️', country: 'السويد', models: [] },
  { id: 'subaru', name: 'سوبارو', nameEn: 'Subaru', logo: '⭐', country: 'اليابان', models: [] },
  { id: 'infiniti', name: 'إنفينيتي', nameEn: 'Infiniti', logo: '💎', country: 'اليابان', models: [] },
  { id: 'acura', name: 'أكورا', nameEn: 'Acura', logo: '🚗', country: 'اليابان', models: [] },
  { id: 'genesis', name: 'جينيسيس', nameEn: 'Genesis', logo: '💎', country: 'كوريا الجنوبية', models: [] },
  { id: 'mini', name: 'ميني', nameEn: 'Mini', logo: '🚗', country: 'بريطانيا', models: [] },
  { id: 'fiat', name: 'فيات', nameEn: 'Fiat', logo: '🚗', country: 'إيطاليا', models: [] },
  { id: 'alfa-romeo', name: 'ألفا روميو', nameEn: 'Alfa Romeo', logo: '🐍', country: 'إيطاليا', models: [] },
  { id: 'opel', name: 'أوبل', nameEn: 'Opel', logo: '⚡', country: 'ألمانيا', models: [] },
  { id: 'citroen', name: 'ستروين', nameEn: 'Citroën', logo: '🚗', country: 'فرنسا', models: [] },
  { id: 'skoda', name: 'سكودا', nameEn: 'Skoda', logo: '🚗', country: 'التشيك', models: [] },
  { id: 'seat', name: 'سيات', nameEn: 'Seat', logo: '🚗', country: 'إسبانيا', models: [] },
  { id: 'tesla', name: 'تسلا', nameEn: 'Tesla', logo: '⚡', country: 'أمريكا', models: [] }
];

export const DTC_CODES: DtcCode[] = [
  {
    id: 'p0100',
    code: 'P0100',
    titleAr: 'عطل في دائرة حساس تدفق الهواء (MAF Sensor)',
    titleEn: 'Mass or Volume Air Flow Circuit Malfunction',
    system: 'نظام حقن الوقود (EFI)',
    severity: 'high',
    meaning: 'كمبيوتر السيارة (ECU) يعطي قراءات غير منطقية أو انقطاع في الإشارة من حساس تدفق الهواء MAF.',
    symptoms: [
      'ضعف شديد في تسارع السيارة وتفتفة',
      'دخان أسود من الشكمان بسبب زيادة الوقود',
      'توقف المحرك فجأة عند التهدئة',
      'إضاءة لمبة فحص المحرك (Check Engine)'
    ],
    causes: [
      'تلف حساس MAF أو اتساخه برواسب الأتربة',
      'قطع في سلك الإشارة أو الأرضي المتصل بالحساس',
      'تسريب هواء خلف الحساس (Air Leak)',
      'تلف في كبس الفيش أو صدأ الدبابيس'
    ],
    diagnosisSteps: [
      'افحص الفيش كهربائياً للتأكد من وصول تغذية 12V و 5V الأرضي.',
      'استخدم الأوسيلوسكوب أو جهاز الفحص لقراءة إشارة تردد الحساس أو الفولت أثناء الضغط على البنزين.',
      'تأكد من عدم وجود تشققات في خرطوم هواء المانيفولد.'
    ],
    repairSteps: [
      'تنظيف الحساس بخاخ تنظيف الحساسات المخصص (CRC Mass Air Flow Cleaner).',
      'إذا استمر العطل، يتم قياس المقاومة واستبدال الحساس بقطع أصلية.',
      'مسح الكود باستخدام جهاز الفحص واختبار القيادة.'
    ],
    requiredTools: ['جهاز فحص OBD2', 'ملتيميتر رقمي', 'بخاخ تنظيف حساسات CRC'],
    estimatedTime: '30 - 45 دقيقة',
    estimatedCost: '50 - 150 ريال سعودي',
    sensorIds: ['maf-sensor']
  },
  {
    id: 'p0300',
    code: 'P0300',
    titleAr: 'تغيب اشتعال عشوائي في السلندرات (Random Misfire)',
    titleEn: 'Random/Multiple Cylinder Misfire Detected',
    system: 'نظام الاشتعال والوقود',
    severity: 'critical',
    meaning: 'رصد كمبيوتر السيارة عدم حدوث احتراق تام داخل غرف احتراق المحرك بشكل عشوائي.',
    symptoms: [
      'اهتزاز شديد للمحرك أثناء التوقف (Idle Roughness)',
      'وميض لمبة المحرك (Check Engine Blinking)',
      'رائحة بنزين غير محترق في العادم',
      'فقدان قوة المحرك ومصروف بنزين مرتفع'
    ],
    causes: [
      'تلف الكويلات أو البواجي (إشعال)',
      'انسداد البخاخات أو ضعف ضغط طلمبة البنزين',
      'تسريب هواء Vacuum Leak من الثلاجة',
      'ضعف ضغط السلندر Compression'
    ],
    diagnosisSteps: [
      'افحص القراءات الحية Live Data لمعرفة أي سلندر يواجه الميسفاير تحديداً.',
      'تبديل الكويل المشتبه به مع سلندر آخر للتحقق من انتقال العطل.',
      'قياس ضغط الوقود في المسطرة (Fuel Rail Pressure).'
    ],
    repairSteps: [
      'استبدال شمعات الاحتراق (البواجي).',
      'استبدال الكويل التالف.',
      'تنظيف البخاخات بالجهاز.'
    ],
    requiredTools: ['مفتاح بواجي', 'ساعة قياس ضغط الوقود', 'جهاز فحص Live Data'],
    estimatedTime: '1 - 2 ساعة',
    estimatedCost: '150 - 400 ريال سعودي'
  },
  {
    id: 'p0171',
    code: 'P0171',
    titleAr: 'خليط الوقود فقير جداً في بنك 1 (System Too Lean Bank 1)',
    titleEn: 'System Too Lean Bank 1',
    system: 'نظام التحكم بالخليط (Fuel Trim)',
    severity: 'medium',
    meaning: 'كمبيوتر السيارة يكتشف أن نسبة الهواء أعلى بكثير من نسبة البنزين المطلوب للاحتراق المثالي (14.7:1).',
    symptoms: [
      'تأخر في التشغيل صباحاً',
      'تقطيع أثناء التسارع',
      'ارتفاع حرارة المحرك نسبياً'
    ],
    causes: [
      'تسريب هواء خارجي عبر الخراطيم أو ثلاجة المحرك',
      'انسداد في فلتر البنزين أو ضعف طلمبة البنزين',
      'اتساخ حساس الهواء MAF',
      'خلل في حساس الأكسجين الأولي O2'
    ],
    diagnosisSteps: [
      'قراءة قيم Short Term & Long Term Fuel Trim (إذا كانت أكبر من +15% فالخليط فقير).',
      'رش بخاخ اختبار التسريب حول الخراطيم لملاحظة تغير صوت المحرك.'
    ],
    repairSteps: [
      'إصلاح خراطيم الفاكيوم الممزقة.',
      'تغيير صفاية البنزين وتنظيف حساس MAF.'
    ],
    requiredTools: ['جهاز فحص القراءات الحية', 'جهاز كشف التسريب بالدخان Smoke Machine'],
    estimatedTime: '45 دقيقة',
    estimatedCost: '80 - 200 ريال سعودي'
  },
  {
    id: 'p0335',
    code: 'P0335',
    titleAr: 'عطل إشارة حساس الكرنك (Crankshaft Position Sensor A Circuit)',
    titleEn: 'Crankshaft Position Sensor A Circuit Malfunction',
    system: 'نظام الاشتعال وتوقيت المحرك',
    severity: 'critical',
    meaning: 'انقطاع أو عدم استقرار الإشارة الكهربائية القادمة من حساس الكرنك إلى كمبيوتر المحرك.',
    symptoms: [
      'السيارة تدور سلف بدون تشغيل المحرك (No Start Condition)',
      'توقف المحرك فجأة أثناء السير',
      'ثبات مؤشر الـ RPM عند صفر أثناء التدوير'
    ],
    causes: ['تلف حساس الكرنك المغناطيسي أو الهول', 'قطع في الفيش أو الأسلاك', 'تكسر أسنان حذافة الكرنك'],
    diagnosisSteps: [
      'قياس مقاومة الحساس بالملتيميتر.',
      'فحص إشارة الموجه بواسطة الأوسيلوسكوب أثناء السلف.'
    ],
    repairSteps: ['استبدال حساس الكرنك بآخر أصلي مع التأكد من نظافة مكان التركيب.'],
    requiredTools: ['ملتيميتر رقمي', 'أوسيلوسكوب oscilloscpoe'],
    estimatedTime: '45 دقيقة',
    estimatedCost: '100 - 250 ريال'
  }
];

export const SENSORS: Sensor[] = [
  {
    id: 'maf-sensor',
    nameAr: 'حساس تدفق كتلة الهواء (MAF Sensor)',
    nameEn: 'Mass Air Flow Sensor',
    system: 'نظام الهواء والوقود (EFI)',
    functionDesc: 'يقيس حجم وكتلة الهواء الداخلي للمحرك بالجرام/ثانية ويحيط كمبيوتر السيارة بالمعلومات لحساب كمية البنزين المطلوبة.',
    location: 'يقع على خرطوم الهواء الرئيسي بين فلتر الهواء وبوابة الثروتل.',
    pinOut: [
      { pinNumber: 1, label: '12V Power Supply', normalVoltage: '11.8V - 14.2V' },
      { pinNumber: 2, label: 'Ground (GND)', normalVoltage: '0.01V - 0.05V' },
      { pinNumber: 3, label: 'Signal Out (إشارة الحساس)', normalVoltage: '0.8V (Idle) -> 4.5V (WOT)' },
      { pinNumber: 4, label: 'IAT Reference (حساس حرارة الهواء)', normalVoltage: '5.0V' }
    ],
    testingProcedure: [
      'ضع السويتش على وضع ON واقس التغذية 12V والأرضي بالملتيميتر.',
      'شغل المحرك واقس خط الإشارة أثناء فتح الثروتل، يجب أن يرتفع الفولت بسلاسة من 0.9V إلى أكثر من 3.5V عند الدوس.',
      'استخدم الأوسيلوسكوب لملاحظة التردد أو الفولتية بدون تقطيع.'
    ],
    normalValues: [
      { parameter: 'خمول (Idle)', range: '0.8V - 1.2V', unit: 'Volts' },
      { parameter: 'تدفق الهواء خمول', range: '2.0 - 4.5', unit: 'g/sec' }
    ],
    commonFaults: [
      'تراكم الأتربة والزيوت على سلك البلاتين الحراري الداخلي',
      'انقطاع كبل الأرضي الخفي',
      'تذبذب قراءات السرعة والخمول'
    ],
    dtcCodes: ['P0100', 'P0101', 'P0102', 'P0103']
  },
  {
    id: 'ckp-sensor',
    nameAr: 'حساس الكرنك (Crankshaft Position Sensor - CKP)',
    nameEn: 'Crankshaft Position Sensor',
    system: 'نظام الإشعال والشرارة',
    functionDesc: 'يحدد سرعة دوران المحرك (RPM) وموقع المكبس في النقطة الميتة العليا (TDC)، وهو الأساسي لتشغيل البخاخات والشرارة.',
    location: 'بجوار بكرة الكرنك الأمامية أو مثبت على جدار حلة القير من الخلف.',
    pinOut: [
      { pinNumber: 1, label: 'Signal +', normalVoltage: 'AC Signal 1.5V - 5V RMS' },
      { pinNumber: 2, label: 'Signal -', normalVoltage: 'Reference GND' },
      { pinNumber: 3, label: 'Shielding Wire', normalVoltage: 'Chassis Ground' }
    ],
    testingProcedure: [
      'في حالة عدم اشتغال المحرك بالكامل، ابحث عن مؤشر الـ RPM أثناء السلف، إذا كان ثابت 0 فالحساس مشكوك به.',
      'قياس مقاومة الحساس المغناطيسي Inductive (بين 500 إلى 1500 أوم عادة).'
    ],
    normalValues: [
      { parameter: 'مقاومة ملف الحساس', range: '800 - 1200', unit: 'Ohm' },
      { parameter: 'إشارة AC أثناء السلف', range: '1.0 - 2.5', unit: 'Volts AC' }
    ],
    commonFaults: [
      'السيارة تدور سلف بدون تشغيل المحرك (No Start Condition)',
      'انطفاء السيارة الفجائي عند سخونة المحرك',
      'تقطيع حاد أثناء السير'
    ],
    dtcCodes: ['P0335', 'P0336', 'P0339']
  },
  {
    id: 'o2-sensor',
    nameAr: 'حساس الأكسجين الشكمان (O2 Sensor)',
    nameEn: 'Oxygen / Lambda Sensor',
    system: 'نظام العادم والبيئة',
    functionDesc: 'يقيس نسبة الأكسجين المتبقية في غازات العادم لإبلاغ الكمبيوتر بتعديل نسبة الخليط (Fuel Trim).',
    location: 'على مجمع العادم (مانيفولد الشكمان) وقبل وبعد علبة البيئة (دبة التلوث).',
    pinOut: [
      { pinNumber: 1, label: 'Heater 12V', normalVoltage: '12.0V' },
      { pinNumber: 2, label: 'Heater Ground', normalVoltage: '0.0V' },
      { pinNumber: 3, label: 'Signal Output', normalVoltage: '0.1V - 0.9V Oscillation' },
      { pinNumber: 4, label: 'Signal Ground', normalVoltage: '0.0V' }
    ],
    testingProcedure: [
      'قراءة تذبذب الفولت على جهاز Live Data بعد وصول المحرك لدرجة حرارة التشغيل.',
      'يجب أن يتذبذب السجنل بسرعة بين 0.1V (خليط فقير) و 0.9V (خليط غني) 8 مرات على الأقل كل 10 ثوانٍ.'
    ],
    normalValues: [
      { parameter: 'تذبذب الإشارة', range: '0.1 - 0.9', unit: 'Volts' }
    ],
    commonFaults: ['بطء استجابة الحساس (Lazy Sensor)', 'تلف هيتر التسخين الداخلي'],
    dtcCodes: ['P0130', 'P0133', 'P0135', 'P0420']
  }
];

export const ACTUATORS: Actuator[] = [
  {
    id: 'fuel-injector',
    nameAr: 'بخاخ الوقود (Fuel Injector)',
    nameEn: 'Electronic Fuel Injector',
    system: 'نظام الوقود EFI',
    functionDesc: 'صمام كهرومغناطيسي يفتح بواسطة إشارة نقع أرضية من الكمبيوتر لرش البنزين برذاذ متجانس داخل غرف الاحتراق.',
    testingProcedure: [
      'افحص وصول تغذية 12V ثابتة إلى أحد أطراف الفيش عند فتح السويتش.',
      'استخدم لمبة فحص النبضات (Noid Light) على الفيش أثناء السلف لملاحظة الفلاش الكهربائي.',
      'قياس مقاومة ملف البخاخ الداخلي بالملتيميتر.'
    ],
    measurements: [
      { test: 'مقاومة ملف البخاخ (Resistance)', normalVal: '12 - 16 Ohms (High Z)' },
      { test: 'زمن فتح البخاخ (Pulse Width)', normalVal: '2.0ms - 3.5ms عند الخمول' }
    ],
    commonFaults: ['انسداد ثقوب الرشاشات بالترسبات', 'تسريب بنزين صريح', 'احتراق ملف الصمام الكهرومغناطيسي']
  },
  {
    id: 'ignition-coil',
    nameAr: 'كويل الاشتعال (Ignition Coil / COP)',
    nameEn: 'Coil On Plug System',
    system: 'نظام شرارة الاشتعال',
    functionDesc: 'يحول فولت البطارية (12V) إلى جهد عادي مرتفع جداً يصل إلى (25,000 - 40,000V) لإنشاء شرارة بين طرفي البوجيه.',
    testingProcedure: [
      'قياس شرارة الكويل باستخدام جهاز اختبار الشرر الجاف Spark Tester.',
      'فحص خطوط التغذية الثلاثة (12V، الأرضي، إشارة التريجر 5V من الكمبيوتر).'
    ],
    measurements: [
      { test: 'جهد الإشعال العالي (High Volt Output)', normalVal: '25kV - 35kV' },
      { test: 'مقاومة الملف الابتدائي', normalVal: '0.5 - 1.5 Ohms' }
    ],
    commonFaults: ['تصدع العازل البلاستيكي وتسريب الشرارة للأرضي', 'تلف الترانزستور الداخلي للكويل']
  },
  {
    id: 'throttle-body',
    nameAr: 'بوابة الثروتل الإلكترونية (Electronic Throttle Body)',
    nameEn: 'Motorized Throttle Body',
    system: 'نظام التحكم بالهواء',
    functionDesc: 'تتحكم بدقة في كمية الهواء الداخل للمحرك بواسطة محرك سيرفو بداخلها بناءً على دعسة البنزين الإلكترونية.',
    testingProcedure: [
      'فحص مقاومة محرك البوابة بين طرفي المحرك DC Motor.',
      'فحص خطوط حساس موقع البوابة TPS المزدوج (TPS 1 و TPS 2) لمنع التضارب.'
    ],
    measurements: [
      { test: 'جهد TPS 1 عند الخمول', normalVal: '0.6V - 0.9V' },
      { test: 'جهد TPS 2 عند الخمول', normalVal: '4.1V - 4.4V' }
    ],
    commonFaults: ['تراكم الكربون على فراشة البوابة', 'تلف تروس البلاستيك الداخلية'],
    dtcCodes: ['P0120', 'P0220', 'P2101', 'P2119']
  }
];

export const LIVE_DATA_PARAMS: LiveDataParam[] = [
  {
    id: 'rpm',
    nameAr: 'سرعة المحرك (RPM)',
    nameEn: 'Engine Speed',
    unit: 'RPM',
    minNormal: 650,
    maxNormal: 850,
    currentValue: 750,
    status: 'normal',
    history: [740, 745, 752, 750, 748, 755, 750]
  },
  {
    id: 'coolant-temp',
    nameAr: 'حرارة سائل التبريد (ECT)',
    nameEn: 'Coolant Temperature',
    unit: '°C',
    minNormal: 85,
    maxNormal: 98,
    currentValue: 91,
    status: 'normal',
    history: [82, 85, 88, 90, 91, 91, 92]
  },
  {
    id: 'battery-volt',
    nameAr: 'جهد النظام والبطارية',
    nameEn: 'System Battery Voltage',
    unit: 'V',
    minNormal: 13.5,
    maxNormal: 14.5,
    currentValue: 14.1,
    status: 'normal',
    history: [13.9, 14.0, 14.1, 14.1, 14.2, 14.1]
  },
  {
    id: 'short-fuel-trim',
    nameAr: 'تعديل الوقود قصير الأمد (STFT)',
    nameEn: 'Short Term Fuel Trim',
    unit: '%',
    minNormal: -10,
    maxNormal: 10,
    currentValue: 2.3,
    status: 'normal',
    history: [-1.2, 0.5, 3.1, 2.3, 1.8]
  }
];

import { COMPREHENSIVE_WIRING_DIAGRAMS } from './wiringData';
export const WIRING_DIAGRAMS: WiringDiagram[] = COMPREHENSIVE_WIRING_DIAGRAMS;

export const EXPERT_VIDEOS: ExpertVideo[] = [
  {
    id: 'v1',
    title: 'شرح فحص الحساسات والمخططات الكهربائية بطريقة احترافية',
    expertName: 'المهندس عبدالحق العاني',
    expertChannel: 'سيارتك مع عبدالحق',
    expertAvatar: '👨‍🔧',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'فحص الحساسات',
    duration: '18:45',
    views: 450000,
    relatedSensors: ['maf-sensor', 'ckp-sensor'],
    relatedDtcCodes: ['P0100', 'P0300']
  },
  {
    id: 'v2',
    title: 'كيف تشخص قطع شحن الدينامو وتسريب الكهرباء أثناء التوقف؟',
    expertName: 'المهندس أحمد كهرباء',
    expertChannel: 'كهرباء السيارات الحديثة',
    expertAvatar: '⚡',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'نظام الشحن',
    duration: '22:10',
    views: 280000
  }
];

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'الدورة الشاملة في تشخيص كهرباء وإلكترونيات السيارات الحديثة',
    instructor: 'د. مهندس حازم علي',
    level: 'متوسط',
    durationHours: 32,
    lessonsCount: 45,
    rating: 4.9,
    thumbnail: '⚡',
    description: 'تعلم قراءة المخططات، فحص الكمبيوترات بواسطة جهاز الأوسيلوسكوب، وكشف أعطال CAN-BUS خطوة بخطوة.'
  },
  {
    id: 'c2',
    title: 'إتقان استخدام أجهزة OBD-II وتحليل البيانات الحية Live Data',
    instructor: 'م. خالد العتيبي',
    level: 'مبتدئ',
    durationHours: 14,
    lessonsCount: 20,
    rating: 4.8,
    thumbnail: '📟',
    description: 'كيف تستخرج الأعطال المعقدة وتحللها باستخدام أجهزة الفحص الشائعة مثل Launch و Autel.'
  }
];

export const REPAIR_CASES: RepairCase[] = [
  {
    id: 'rc1',
    title: 'توقف كامري 2018 فجأة أثناء السير مع انطفاء جميع عدادات الطبلون',
    carModel: 'تويوتا كامري',
    year: 2018,
    symptom: 'توقف المحرك ومسح طبلون السيارة مع إضاءة لمبة الشحن والفرامل.',
    rootCause: 'ارتخاء كبل التأريض الرئيسي (Ground Wire) الواصل بين جسم شاسي السيارة وعلبة الفيوزات.',
    diagnosticSteps: [
      'فحص فولت البطارية بالملتيميتر (12.6V ممتاز).',
      'فحص هبوط الجهد (Voltage Drop Test) بين سالب البطارية وهيكل السيارة، ووجد هبوط عالي قدره 4.2V.',
      'سنفرة نقطة الاتصال وتثبيت المسمار بإحكام.'
    ],
    solution: 'تنظيف وتثبيت كبل الأرضي الرئيسي وتطبيق شحم النحاس لمنع الأكسدة.',
    timeSpent: '30 دقيقة',
    totalCost: '50 ريال',
    date: '2026-02-10'
  },
  {
    id: 'rc2',
    title: 'سوناتا 2015 - تفتفة شديدة مع كود P0300 وضغط بنزين متذبذب',
    carModel: 'هيونداي سوناتا',
    year: 2015,
    symptom: 'تفتفة واهتزاز عالي عند التوقف، وتقطيع عند تجاوز سرعة 80 كم/س.',
    rootCause: 'انسداد الصفاية الداخلية لطرمبة البنزين وضعف ضغط طرمبة الوقود إلى 2.1 بار بدلاً من 3.8 بار.',
    diagnosticSteps: [
      'وصل ساعة قياس ضغط الوقود بمسطرة البخاخات.',
      'ملاحظة انخفاض ضغط البنزين فور الدوس على دواسة البنزين.'
    ],
    solution: 'استبدال طرمبة البنزين وتنظيف خزان الوقود.',
    timeSpent: '45 دقيقة',
    totalCost: '220 ريال',
    date: '2026-02-14'
  }
];
