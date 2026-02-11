import type { Website, Scan, ScanReport, ContentOptimizeResult } from "./types";

export const mockWebsites: Website[] = [
  { id: "1", url: "https://example.com", name: "Example Corp", verified: true, last_scan_date: "2026-02-10T14:30:00Z", latest_seo_score: 82, created_at: "2026-01-15T10:00:00Z" },
  { id: "2", url: "https://myblog.dev", name: "My Tech Blog", verified: true, last_scan_date: "2026-02-09T11:00:00Z", latest_seo_score: 64, created_at: "2026-01-20T08:00:00Z" },
  { id: "3", url: "https://shop.arabmarket.sa", name: "Arab Market", verified: false, last_scan_date: null, latest_seo_score: null, created_at: "2026-02-08T16:00:00Z" },
  { id: "4", url: "https://portfolio.design", name: "Design Portfolio", verified: true, last_scan_date: "2026-02-11T09:00:00Z", latest_seo_score: 91, created_at: "2026-01-10T12:00:00Z" },
];

export const mockScans: Scan[] = [
  { id: "s1", website_id: "1", website_name: "Example Corp", website_url: "https://example.com", status: "completed", seo_score: 82, performance_score: 78, pages_scanned: 24, issues_found: 8, started_at: "2026-02-10T14:00:00Z", completed_at: "2026-02-10T14:30:00Z" },
  { id: "s2", website_id: "2", website_name: "My Tech Blog", website_url: "https://myblog.dev", status: "completed", seo_score: 64, performance_score: 55, pages_scanned: 12, issues_found: 15, started_at: "2026-02-09T10:30:00Z", completed_at: "2026-02-09T11:00:00Z" },
  { id: "s3", website_id: "4", website_name: "Design Portfolio", website_url: "https://portfolio.design", status: "completed", seo_score: 91, performance_score: 88, pages_scanned: 8, issues_found: 3, started_at: "2026-02-11T08:30:00Z", completed_at: "2026-02-11T09:00:00Z" },
  { id: "s4", website_id: "1", website_name: "Example Corp", website_url: "https://example.com", status: "running", seo_score: null, performance_score: null, pages_scanned: 0, issues_found: 0, started_at: "2026-02-11T12:00:00Z", completed_at: null },
  { id: "s5", website_id: "2", website_name: "My Tech Blog", website_url: "https://myblog.dev", status: "failed", seo_score: null, performance_score: null, pages_scanned: 3, issues_found: 0, started_at: "2026-02-08T09:00:00Z", completed_at: "2026-02-08T09:05:00Z" },
];

export const mockScanReport: ScanReport = {
  id: "s1",
  website_id: "1",
  website_name: "Example Corp",
  website_url: "https://example.com",
  status: "completed",
  seo_score: 82,
  performance_score: 78,
  readability_score: 71,
  readability_grade: "7th-8th grade",
  pages_scanned: 24,
  issues_found: 8,
  started_at: "2026-02-10T14:00:00Z",
  completed_at: "2026-02-10T14:30:00Z",
  issues: [
    { type: "missing_meta", severity: "critical", message: "Missing meta description tag in HTML head", simple_message: "Your page doesn't have a description. Add one so Google knows what your page is about.", suggestion: "Add a <meta name='description'> tag with 150-160 characters.", affected_pages: 3, page_urls: ["/about", "/contact", "/blog/old-post"] },
    { type: "missing_alt", severity: "critical", message: "Images missing alt attributes", simple_message: "Some images don't have descriptions. Screen readers and Google can't understand them.", suggestion: "Add descriptive alt text to all <img> tags.", affected_pages: 5, page_urls: ["/", "/products", "/about", "/gallery", "/team"] },
    { type: "slow_page", severity: "warning", message: "Page load time exceeds 3 seconds", simple_message: "Some pages load slowly, which can hurt your ranking and frustrate visitors.", suggestion: "Optimize images, enable caching, and minimize JavaScript.", affected_pages: 4, page_urls: ["/products", "/gallery", "/blog", "/portfolio"] },
    { type: "thin_content", severity: "warning", message: "Pages with less than 300 words of content", simple_message: "Some pages have very little text. Google prefers pages with substantial, helpful content.", suggestion: "Add more relevant, high-quality content to these pages.", affected_pages: 2, page_urls: ["/contact", "/faq"] },
    { type: "no_h1", severity: "warning", message: "Missing H1 heading tag", simple_message: "A page is missing its main heading. Think of H1 as the title of a book chapter.", suggestion: "Add exactly one H1 tag to each page.", affected_pages: 1, page_urls: ["/contact"] },
    { type: "broken_links", severity: "critical", message: "Broken internal links returning 404 status", simple_message: "Some links on your site lead to pages that don't exist anymore.", suggestion: "Fix or remove broken links.", affected_pages: 2, page_urls: ["/blog/old-post", "/products/discontinued"] },
    { type: "no_canonical", severity: "info", message: "Missing canonical URL tag", simple_message: "Without a canonical tag, Google might get confused if the same content appears on multiple URLs.", suggestion: "Add <link rel='canonical'> to each page.", affected_pages: 6, page_urls: ["/", "/about", "/products", "/blog", "/contact", "/faq"] },
    { type: "long_title", severity: "info", message: "Title tag exceeds 60 characters", simple_message: "Your page title is a bit long. Google may cut it off in search results.", suggestion: "Keep title tags under 60 characters.", affected_pages: 2, page_urls: ["/products", "/blog/seo-guide"] },
  ],
  pages: [
    { url: "/", status_code: 200, seo_score: 88, readability_score: 75, readability_grade: "8th grade", response_time_ms: 420, issues_count: 2, title: "Example Corp - Home", meta_description: "Welcome to Example Corp", word_count: 650 },
    { url: "/about", status_code: 200, seo_score: 72, readability_score: 68, readability_grade: "9th grade", response_time_ms: 380, issues_count: 3, title: "About Us", meta_description: "", word_count: 420 },
    { url: "/products", status_code: 200, seo_score: 65, readability_score: 60, readability_grade: "10th grade", response_time_ms: 3200, issues_count: 4, title: "Our Products and Services for Enterprise Solutions", meta_description: "Browse our products", word_count: 890 },
    { url: "/contact", status_code: 200, seo_score: 55, readability_score: 80, readability_grade: "6th grade", response_time_ms: 290, issues_count: 3, title: "Contact Us", meta_description: "", word_count: 120 },
    { url: "/blog", status_code: 200, seo_score: 78, readability_score: 72, readability_grade: "8th grade", response_time_ms: 3500, issues_count: 2, title: "Blog", meta_description: "Latest articles from Example Corp", word_count: 340 },
  ],
  recommendations: [
    "Add meta descriptions to all pages — this is the quickest win for improving click-through rates from search results.",
    "Optimize image sizes on the /products and /gallery pages to improve load times.",
    "Add alt text to all images for better accessibility and SEO.",
    "Fix the 2 broken internal links to prevent users from hitting dead ends.",
    "Consider adding more content to thin pages like /contact and /faq.",
  ],
};

export const mockContentResult: ContentOptimizeResult = {
  title_suggestions: [
    { title: "10 Best Coffee Shops in Dubai | 2026 Guide", character_count: 47, reasoning: "Includes number, location, and year for freshness." },
    { title: "Dubai's Top Coffee Spots You Must Visit", character_count: 41, reasoning: "Emotional trigger with 'Must Visit' and concise length." },
    { title: "Where to Find the Best Coffee in Dubai", character_count: 40, reasoning: "Natural language query that matches voice search patterns." },
  ],
  meta_description: {
    text: "Discover the best coffee shops in Dubai. From artisan roasters to cozy cafes, explore our curated list of must-visit spots for coffee lovers in 2026.",
    character_count: 150,
  },
  readability: { score: 72, grade_level: "7th-8th grade", interpretation: "Fairly easy to read" },
  keyword_density: [
    { keyword: "coffee", count: 12, density: 3.2 },
    { keyword: "dubai", count: 8, density: 2.1 },
    { keyword: "shops", count: 6, density: 1.6 },
    { keyword: "best", count: 5, density: 1.3 },
    { keyword: "cafe", count: 4, density: 1.1 },
  ],
  content_quality: {
    word_count: 1240,
    suggestions: [
      "Great content length! Over 1000 words is ideal for this topic.",
      "Consider adding an FAQ section to target long-tail queries.",
      "Add internal links to related articles about Dubai dining.",
      "Include location-specific details (neighborhoods, addresses) for local SEO.",
    ],
  },
};

export const mockScoreHistory = [
  { date: "Jan 12", score: 68 },
  { date: "Jan 19", score: 71 },
  { date: "Jan 26", score: 70 },
  { date: "Feb 02", score: 75 },
  { date: "Feb 09", score: 78 },
  { date: "Feb 11", score: 82 },
];
