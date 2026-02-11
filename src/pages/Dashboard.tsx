/**
 * Dashboard - Main overview page with real backend data
 */
import { Globe, BarChart3, AlertTriangle, Activity, Plus, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ScoreBadge } from "@/components/ScoreBadge";
import { useWebsites } from "@/hooks/useWebsites";
import { useScans } from "@/hooks/useScans";
import { getScoreLevel } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

const statusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
    case "running":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Running</Badge>;
    case "pending":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
    case "failed":
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export default function Dashboard() {
  const { data: websites, isLoading: websitesLoading } = useWebsites();
  const { data: scans, isLoading: scansLoading } = useScans();

  // Calculate stats
  const totalWebsites = websites?.length || 0;
  const totalScans = scans?.length || 0;

  const avgScore = websites && websites.length > 0
    ? Math.round(
        websites
          .map(w => scans?.filter(s => s.website_id === w.id && s.seo_score !== null)?.[0]?.seo_score || 0)
          .filter(score => score > 0)
          .reduce((a, b) => a + b, 0) / Math.max(websites.length, 1)
      )
    : 0;

  const completedScans = scans?.filter(s => s.status === "completed") || [];
  const recentScans = scans?.slice(0, 10) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your SEO overview.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/websites">
              <Plus className="mr-2 h-4 w-4" /> Add Website
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {websitesLoading ? (
          <>
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </>
        ) : (
          <>
            <StatsCard title="Total Websites" value={totalWebsites} icon={Globe} />
            <StatsCard title="Scans This Month" value={totalScans} icon={BarChart3} />
            <StatsCard title="Average SEO Score" value={avgScore} icon={Activity} />
            <StatsCard
              title="Completed Scans"
              value={completedScans.length}
              icon={AlertTriangle}
            />
          </>
        )}
      </div>

      {/* Recent Scans Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Scans</CardTitle>
          {totalScans === 0 && !scansLoading && (
            <Button asChild size="sm">
              <Link to="/websites">Start Your First Scan</Link>
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {scansLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : recentScans.length === 0 ? (
            <div className="text-center py-12">
              <Globe className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No scans yet</h3>
              <p className="text-gray-500 mb-4">Add a website and start your first SEO scan</p>
              <Button asChild>
                <Link to="/websites">
                  <Plus className="mr-2 h-4 w-4" /> Add Website
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Website ID</TableHead>
                  <TableHead>Started</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Pages</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentScans.map((scan) => {
                  const website = websites?.find(w => w.id === scan.website_id);

                  return (
                    <TableRow key={scan.id}>
                      <TableCell className="font-medium">
                        {website?.domain || scan.website_id.slice(0, 8)}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(scan.started_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {scan.seo_score !== null ? (
                          <ScoreBadge
                            score={scan.seo_score}
                            level={getScoreLevel(scan.seo_score)}
                          />
                        ) : (
                          <span className="text-muted-foreground text-sm">-</span>
                        )}
                      </TableCell>
                      <TableCell>{scan.pages_scanned}</TableCell>
                      <TableCell>{statusBadge(scan.status)}</TableCell>
                      <TableCell className="text-right">
                        {scan.status === "completed" ? (
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/reports/${scan.id}`}>View Report</Link>
                          </Button>
                        ) : scan.status === "running" ? (
                          <span className="text-sm text-muted-foreground">In progress...</span>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <Button variant="outline" className="h-24 flex-col gap-2" asChild>
              <Link to="/websites">
                <Globe className="h-8 w-8" />
                <span>Manage Websites</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2" asChild>
              <Link to="/content-optimizer">
                <BarChart3 className="h-8 w-8" />
                <span>Content Optimizer</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2" asChild>
              <Link to="/settings">
                <Activity className="h-8 w-8" />
                <span>Settings</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
