export interface PerfumeNotes {
  top: string[];
  middle: string[];
  base: string[];
}

export interface PerfumeRecommendation {
  name: string;
  brand: string;
  family: string;
  notes: PerfumeNotes;
  reason: string;
  occasion: string;
}

export interface AnalysisResult {
  observation: string;
  outerPersona: string;
  innerSelf: string;
  perfumeOuter: PerfumeRecommendation;
  perfumeInner: PerfumeRecommendation;
  closingMessage: string;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}