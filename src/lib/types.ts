export interface Website {
  id: string;
  url: string;
  domain: string;
  user_id: string;
  verified: boolean;
  verified_at: string | null;
  verification_token: string;
  created_at: string;
  updated_at: string;
}

export interface Scan {
  id: string;
  website_id: string;
  status: "pending" | "running" | "completed" | "failed";
  seo_score: number | null;
  performance_score: number | null;
  pages_scanned: number;
  started_at: string;
  completed_at: string | null;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface Issue {
  type: string;
  severity: "critical" | "warning" | "info";
  message: string;
  simple_message: string;
  suggestion: string;
  affected_pages: number;
  page_urls: string[];
}

export interface PageResult {
  url: string;
  status_code: number;
  seo_score: number;
  readability_score: number;
  readability_grade: string;
  response_time_ms: number;
  issues_count: number;
  title: string;
  meta_description: string;
  word_count: number;
}

export interface ScanReport extends Scan {
  readability_score: number;
  readability_grade: string;
  issues: Issue[];
  pages: PageResult[];
  recommendations: string[];
}

export interface ContentOptimizeResult {
  title_suggestions: {
    title: string;
    character_count: number;
    reasoning: string;
  }[];
  meta_description: {
    text: string;
    character_count: number;
  };
  readability: {
    score: number;
    grade_level: string;
    interpretation: string;
  };
  keyword_density: {
    keyword: string;
    count: number;
    density: number;
  }[];
  content_quality: {
    word_count: number;
    suggestions: string[];
  };
}

export type ScoreLevel = "good" | "warning" | "critical";

export function getScoreLevel(score: number): ScoreLevel {
  if (score >= 71) return "good";
  if (score >= 41) return "warning";
  return "critical";
}
