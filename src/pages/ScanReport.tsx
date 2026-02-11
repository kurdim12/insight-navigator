import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScoreBadge } from "@/components/ScoreBadge";
import { mockScanReport } from "@/lib/mock-data";
import { getScoreLevel } from "@/lib/types";
import { ArrowLeft, Download, RefreshCw, AlertCircle, AlertTriangle, Info, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const severityConfig = {
  critical: { icon: AlertCircle, label: "Critical", className: "text-score-critical" },
  warning: { icon: AlertTriangle, label: "Warning", className: "text-score-warning" },
  info: { icon: Info, label: "Info", className: "text-primary" },
};

export default function ScanReport() {
  const { id } = useParams();
  const report = mockScanReport;
  const [plainEnglish, setPlainEnglish] = useState(true);
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  const filteredIssues = severityFilter === "all"
    ? report.issues
    : report.issues.filter((i) => i.severity === severityFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/dashboard"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">Scan Report</h1>
          <p className="text-muted-foreground text-sm">
            {report.website_url} · {report.completed_at ? new Date(report.completed_at).toLocaleString() : "In progress"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
            <Label htmlFor="plain-english" className="text-sm cursor-pointer">Plain English</Label>
            <Switch id="plain-english" checked={plainEnglish} onCheckedChange={setPlainEnglish} />
          </div>
          <Button variant="outline"><Download className="mr-1.5 h-4 w-4" /> PDF</Button>
          <Button variant="outline"><RefreshCw className="mr-1.5 h-4 w-4" /> Rescan</Button>
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: "SEO Score", value: report.seo_score, score: true },
          { label: "Performance", value: report.performance_score, score: true },
          { label: "Readability", value: report.readability_score, score: true, sub: report.readability_grade },
          { label: "Pages Scanned", value: report.pages_scanned },
          { label: "Issues Found", value: report.issues_found },
        ].map((item, i) => (
          <Card key={item.label} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
            <CardContent className="p-5 text-center">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className={cn("mt-1 text-3xl font-bold", item.score && item.value !== null && `text-score-${getScoreLevel(item.value as number)}`)}>
                {item.value ?? "—"}
              </p>
              {item.sub && <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Issues */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Issues</CardTitle>
            <Tabs value={severityFilter} onValueChange={setSeverityFilter}>
              <TabsList>
                <TabsTrigger value="all">All ({report.issues.length})</TabsTrigger>
                <TabsTrigger value="critical">Critical ({report.issues.filter((i) => i.severity === "critical").length})</TabsTrigger>
                <TabsTrigger value="warning">Warnings ({report.issues.filter((i) => i.severity === "warning").length})</TabsTrigger>
                <TabsTrigger value="info">Info ({report.issues.filter((i) => i.severity === "info").length})</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredIssues.map((issue, i) => {
            const config = severityConfig[issue.severity];
            const Icon = config.icon;
            return (
              <div key={i} className="rounded-lg border p-4 space-y-2 animate-fade-in" style={{ animationDelay: `${i * 0.03}s` }}>
                <div className="flex items-start gap-3">
                  <Icon className={cn("h-5 w-5 mt-0.5 shrink-0", config.className)} />
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="font-medium">{plainEnglish ? issue.simple_message : issue.message}</p>
                    <p className="text-sm text-muted-foreground">{issue.suggestion}</p>
                    <p className="text-xs text-muted-foreground">{issue.affected_pages} page(s) affected</p>
                  </div>
                  <Badge variant="outline" className={cn("shrink-0", config.className)}>{config.label}</Badge>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Pages Analyzed */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pages Analyzed</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>SEO</TableHead>
                <TableHead>Readability</TableHead>
                <TableHead>Response</TableHead>
                <TableHead>Issues</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {report.pages.map((page) => (
                <TableRow key={page.url}>
                  <TableCell className="font-medium max-w-[200px] truncate">{page.url}</TableCell>
                  <TableCell>
                    <Badge variant={page.status_code === 200 ? "outline" : "destructive"}>
                      {page.status_code}
                    </Badge>
                  </TableCell>
                  <TableCell><ScoreBadge score={page.seo_score} level={getScoreLevel(page.seo_score)} /></TableCell>
                  <TableCell><ScoreBadge score={page.readability_score} level={getScoreLevel(page.readability_score)} /></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{page.response_time_ms}ms</TableCell>
                  <TableCell>{page.issues_count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-score-warning" /> Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {report.recommendations.map((rec, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
                <span>{rec}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
