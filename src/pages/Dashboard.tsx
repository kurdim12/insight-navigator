import { Globe, BarChart3, AlertTriangle, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ScoreBadge } from "@/components/ScoreBadge";
import { mockWebsites, mockScans, mockScoreHistory } from "@/lib/mock-data";
import { getScoreLevel } from "@/lib/types";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Plus, Play } from "lucide-react";

const avgScore = Math.round(
  mockWebsites.filter((w) => w.latest_seo_score !== null).reduce((a, w) => a + (w.latest_seo_score ?? 0), 0) /
    mockWebsites.filter((w) => w.latest_seo_score !== null).length
);

const criticalIssues = mockScans
  .filter((s) => s.status === "completed")
  .reduce((a, s) => a + s.issues_found, 0);

const statusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge variant="outline" className="bg-score-good/10 text-score-good border-score-good/30">Completed</Badge>;
    case "running":
      return <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">Running</Badge>;
    case "failed":
      return <Badge variant="outline" className="bg-score-critical/10 text-score-critical border-score-critical/30">Failed</Badge>;
    default:
      return null;
  }
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your SEO overview.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/websites"><Plus className="mr-1.5 h-4 w-4" /> Add Website</Link>
          </Button>
          <Button asChild>
            <Link to="/websites"><Play className="mr-1.5 h-4 w-4" /> Run Scan</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Websites" value={mockWebsites.length} icon={Globe} />
        <StatsCard title="Scans This Month" value={mockScans.length} icon={BarChart3} />
        <StatsCard title="Average SEO Score" value={avgScore} icon={Activity} />
        <StatsCard title="Total Issues" value={criticalIssues} icon={AlertTriangle} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle className="text-base">SEO Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockScoreHistory}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis domain={[0, 100]} className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <CardHeader>
            <CardTitle className="text-base">Issues by Severity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Critical", count: 3, color: "bg-score-critical" },
              { label: "Warnings", count: 3, color: "bg-score-warning" },
              { label: "Info", count: 2, color: "bg-primary" },
            ].map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.count}</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${(item.count / 8) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <CardHeader>
          <CardTitle className="text-base">Recent Scans</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Website</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Pages</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockScans.map((scan) => (
                <TableRow key={scan.id}>
                  <TableCell className="font-medium">{scan.website_name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(scan.started_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <ScoreBadge score={scan.seo_score} level={scan.seo_score ? getScoreLevel(scan.seo_score) : "critical"} />
                  </TableCell>
                  <TableCell>{scan.pages_scanned}</TableCell>
                  <TableCell>{statusBadge(scan.status)}</TableCell>
                  <TableCell className="text-right">
                    {scan.status === "completed" && (
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/reports/${scan.id}`}>View Report</Link>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
