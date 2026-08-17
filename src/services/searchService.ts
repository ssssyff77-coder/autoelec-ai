import {
  CAR_COMPANIES,
  VEHICLE_SYSTEMS,
  DTC_CODES,
  SENSORS,
  ACTUATORS,
  WIRING_DIAGRAMS,
  REPAIR_CASES
} from '../data/mockData';

export interface SearchResultItem {
  id: string;
  type: 'dtc' | 'sensor' | 'actuator' | 'vehicle' | 'case' | 'system' | 'diagram';
  typeLabel: string;
  title: string;
  subtitle: string;
  details: string;
  matchScore: number;
  badgeColor?: string;
  linkRoute?: string;
}

export function performSmartSearch(query: string): SearchResultItem[] {
  if (!query || query.trim().length === 0) return [];

  const q = query.trim().toLowerCase();
  const terms = q.split(/\s+/);
  const results: SearchResultItem[] = [];

  // Helper for scoring string matches
  const matchScore = (text: string): number => {
    if (!text) return 0;
    const lower = text.toLowerCase();
    if (lower === q) return 100;
    if (lower.includes(q)) return 80;
    let score = 0;
    for (const t of terms) {
      if (t.length > 1 && lower.includes(t)) {
        score += 25;
      }
    }
    return score;
  };

  // 1. Search DTC Codes
  DTC_CODES.forEach((dtc) => {
    const textToMatch = `${dtc.code} ${dtc.titleAr} ${dtc.titleEn} ${dtc.meaning} ${dtc.symptoms.join(' ')} ${dtc.causes.join(' ')}`;
    const score = matchScore(textToMatch);
    if (score > 0) {
      results.push({
        id: dtc.id,
        type: 'dtc',
        typeLabel: 'كود عطل DTC',
        title: `${dtc.code} - ${dtc.titleAr}`,
        subtitle: dtc.titleEn,
        details: dtc.meaning,
        matchScore: score + 10,
        badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
        linkRoute: 'dtc'
      });
    }
  });

  // 2. Search Sensors
  SENSORS.forEach((sensor) => {
    const textToMatch = `${sensor.nameAr} ${sensor.nameEn} ${sensor.functionDesc} ${sensor.location} ${sensor.commonFaults.join(' ')}`;
    const score = matchScore(textToMatch);
    if (score > 0) {
      results.push({
        id: sensor.id,
        type: 'sensor',
        typeLabel: 'حساس إلكتروني',
        title: `${sensor.nameAr} (${sensor.nameEn})`,
        subtitle: sensor.system,
        details: sensor.functionDesc,
        matchScore: score,
        badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        linkRoute: 'sensors'
      });
    }
  });

  // 3. Search Actuators
  ACTUATORS.forEach((act) => {
    const textToMatch = `${act.nameAr} ${act.nameEn} ${act.functionDesc} ${act.commonFaults.join(' ')}`;
    const score = matchScore(textToMatch);
    if (score > 0) {
      results.push({
        id: act.id,
        type: 'actuator',
        typeLabel: 'مشغل / سولينويد',
        title: `${act.nameAr}`,
        subtitle: act.nameEn,
        details: act.functionDesc,
        matchScore: score,
        badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
        linkRoute: 'actuators'
      });
    }
  });

  // 4. Search Repair Cases
  REPAIR_CASES.forEach((rc) => {
    const textToMatch = `${rc.carModel} ${rc.year} ${rc.symptom} ${rc.rootCause} ${rc.solution}`;
    const score = matchScore(textToMatch);
    if (score > 0) {
      results.push({
        id: rc.id,
        type: 'case',
        typeLabel: 'حالة إصلاح واقعية',
        title: `${rc.title} - ${rc.carModel} (${rc.year})`,
        subtitle: `الأعراض: ${rc.symptom} | السبب: ${rc.rootCause}`,
        details: rc.solution,
        matchScore: score + 15,
        badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        linkRoute: 'repair-cases'
      });
    }
  });

  // 5. Search Vehicles
  CAR_COMPANIES.forEach((company) => {
    company.models.forEach((model) => {
      const textToMatch = `${company.name} ${company.nameEn} ${model.name} ${model.years.join(' ')}`;
      const score = matchScore(textToMatch);
      if (score > 0) {
        results.push({
          id: `${company.id}-${model.id}`,
          type: 'vehicle',
          typeLabel: 'سيارة وموديل',
          title: `${company.name} - ${model.name}`,
          subtitle: `السنوات: ${model.years.join(', ')}`,
          details: `المحركات المتاحة: ${model.engines.map((e) => e.name).join(' | ')}`,
          matchScore: score,
          badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
          linkRoute: 'knowledge'
        });
      }
    });
  });

  // Sort by highest match score
  return results.sort((a, b) => b.matchScore - a.matchScore);
}
