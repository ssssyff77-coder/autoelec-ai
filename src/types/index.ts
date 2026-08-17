export type RouteType =
  | 'home'
  | 'vehicle-select'
  | 'smart-diagnosis'
  | 'dtc'
  | 'sensors'
  | 'actuators'
  | 'live-data'
  | 'obd'
  | 'ai-mechanic'
  | 'knowledge'
  | 'courses'
  | 'expert-library'
  | 'wiring-diagrams'
  | 'repair-cases'
  | 'exams'
  | 'certificates'
  | 'forum'
  | 'notifications'
  | 'profile'
  | 'admin'
  | 'developer';

export interface VehicleSelection {
  companyId: string;
  companyName: string;
  companyLogo?: string;
  modelId: string;
  modelName: string;
  year: number;
  engineId: string;
  engineName: string;
  systemId: string;
  systemName: string;
}

export interface CarCompany {
  id: string;
  name: string;
  nameEn: string;
  logo: string;
  country: string;
  models: CarModel[];
}

export interface CarModel {
  id: string;
  name: string;
  companyId: string;
  years: number[];
  engines: Engine[];
}

export interface Engine {
  id: string;
  name: string;
  displacement: string;
  fuelType: string;
  powerHp: number;
}

export interface VehicleSystem {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
}

export interface DtcCode {
  id: string;
  code: string;
  titleAr: string;
  titleEn: string;
  system: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  companyId?: string;
  meaning: string;
  symptoms: string[];
  causes: string[];
  diagnosisSteps: string[];
  repairSteps: string[];
  requiredTools: string[];
  estimatedTime: string;
  estimatedCost: string;
  sensorIds?: string[];
  videoUrl?: string;
}

export interface Sensor {
  id: string;
  nameAr: string;
  nameEn: string;
  system: string;
  functionDesc: string;
  location: string;
  pinOut: { pinNumber: number; label: string; normalVoltage: string }[];
  testingProcedure: string[];
  normalValues: { parameter: string; range: string; unit: string }[];
  commonFaults: string[];
  dtcCodes: string[];
  videoUrl?: string;
}

export interface Actuator {
  id: string;
  nameAr: string;
  nameEn: string;
  system: string;
  functionDesc: string;
  testingProcedure: string[];
  measurements: { test: string; normalVal: string }[];
  commonFaults: string[];
  dtcCodes?: string[];
  videoUrl?: string;
}

export interface LiveDataParam {
  id: string;
  nameAr: string;
  nameEn: string;
  unit: string;
  minNormal: number;
  maxNormal: number;
  currentValue: number;
  status: 'normal' | 'warning' | 'danger';
  history: number[];
}

export interface WiringHotspot {
  id: string;
  label: string;
  type: 'ecu' | 'sensor' | 'actuator' | 'relay' | 'fuse' | 'battery' | 'ground' | 'switch';
  xPercent: number;
  yPercent: number;
  details: {
    functionAr: string;
    testingMethodAr: string;
    normalValuesAr: string;
    wireColors: string[];
    associatedDtcs: string[];
  };
}

export interface WiringDiagram {
  id: string;
  titleAr: string;
  titleEn: string;
  diagramNumber: string;
  systemId: string;
  systemName: string;
  carCompany: string;
  model: string;
  yearRange: string;
  engineType: string;
  imageUrl: string;
  description: string;
  isEducational?: boolean;
  fuses: Array<{ number: string; rating: string; functionAr: string }>;
  relays: Array<{ number: string; typeAr: string; locationAr: string }>;
  ecuPins: Array<{ pinNumber: string; connector: string; signalName: string; wireColor: string; voltage: string; functionAr: string }>;
  hotspots: WiringHotspot[];
}

export interface ExpertVideo {
  id: string;
  title: string;
  expertName: string;
  expertChannel: string;
  expertAvatar: string;
  youtubeId: string;
  category: string;
  duration: string;
  views: number;
  relatedSensors?: string[];
  relatedDtcCodes?: string[];
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم';
  durationHours: number;
  lessonsCount: number;
  rating: number;
  thumbnail: string;
  description: string;
}

export interface RepairCase {
  id: string;
  title: string;
  carModel: string;
  year: number;
  symptom: string;
  rootCause: string;
  diagnosticSteps: string[];
  solution: string;
  timeSpent: string;
  totalCost: string;
  date: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'مستخدم عادي' | 'فني معتمد' | 'صاحب ورشة' | 'مدير عام' | 'حرفي' | 'مهندس' | 'طالب' | 'مدير';
  subscriptionTier?: 'مجاني' | 'فني احترافي' | 'ورشة شريكة';
  points: number;
  completedCourses: number;
  earnedCertificates: number;
  avatar: string;
}

export interface SubscriptionPlan {
  id: 'free' | 'tech' | 'workshop';
  nameAr: string;
  priceAr: string;
  periodAr: string;
  badge?: string;
  badgeColor?: string;
  descriptionAr: string;
  features: string[];
  ctaAr: string;
}
