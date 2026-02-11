export interface Website {
  id: string;
  url: string;
  name: string;
  verified: boolean;
  last_scan_date: string | null;
  latest_seo_score: number | null;
  created_at: string;
}

export interface Scan {
  id: string;
  website_id: string;
  website_name: string;
  website_url: string;
  status: "completed" | "running" | "failed";
  seo_score: number | null;
  performance_score: number | null;
  pages_scanned: number;
  issues_found: number;
  started_at: string;
  completed_at: string | null;
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
