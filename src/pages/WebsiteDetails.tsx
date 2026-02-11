import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScoreBadge } from "@/components/ScoreBadge";
import { mockWebsites, mockScans } from "@/lib/mock-data";
import { getScoreLevel } from "@/lib/types";
import { ArrowLeft, CheckCircle2, Play, Shield, Copy } from "lucide-react";
import { toast } from "sonner";

export default function WebsiteDetails() {
  const { id } = useParams();
  const website = mockWebsites.find((w) => w.id === id) ?? mockWebsites[0];
  const scans = mockScans.filter((s) => s.website_id === website.id);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/websites"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">{website.name}</h1>
            {website.verified && <CheckCircle2 className="h-5 w-5 text-score-good" />}
          </div>
          <p className="text-muted-foreground text-sm">{website.url}</p>
        </div>
        <Button variant="outline" onClick={() => toast.info("Verification in progress...")}>
          <Shield className="mr-1.5 h-4 w-4" /> Verify
        </Button>
        <Button onClick={() => toast.success("Scan started!")}>
          <Play className="mr-1.5 h-4 w-4" /> Start Scan
        </Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">Scan History</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="p-5 text-center">
                <p className="text-sm text-muted-foreground">SEO Score</p>
                <p className="mt-1 text-4xl font-bold" style={{ color: website.latest_seo_score ? `hsl(var(--score-${getScoreLevel(website.latest_seo_score)}))` : undefined }}>
                  {website.latest_seo_score ?? "—"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 text-center">
                <p className="text-sm text-muted-foreground">Pages Scanned</p>
                <p className="mt-1 text-4xl font-bold">{scans[0]?.pages_scanned ?? 0}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 text-center">
                <p className="text-sm text-muted-foreground">Issues Found</p>
                <p className="mt-1 text-4xl font-bold">{scans[0]?.issues_found ?? 0}</p>
              </CardContent>
            </Card>
          </div>
          {scans[0]?.status === "completed" && (
            <Button asChild><Link to={`/reports/${scans[0].id}`}>View Full Report</Link></Button>
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Pages</TableHead>
                    <TableHead>Issues</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scans.length === 0 ? (
                    <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No scans yet</TableCell></TableRow>
                  ) : scans.map((scan) => (
                    <TableRow key={scan.id}>
                      <TableCell>{new Date(scan.started_at).toLocaleString()}</TableCell>
                      <TableCell><ScoreBadge score={scan.seo_score} level={scan.seo_score ? getScoreLevel(scan.seo_score) : "critical"} /></TableCell>
                      <TableCell>{scan.pages_scanned}</TableCell>
                      <TableCell>{scan.issues_found}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{scan.status}</Badge>
                      </TableCell>
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
        </TabsContent>

        <TabsContent value="verification" className="mt-4 space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">DNS TXT Record</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Add the following TXT record to your domain's DNS settings:</p>
              <div className="flex items-center gap-2 rounded-md bg-muted p-3 font-mono text-sm">
                <span className="flex-1 truncate">devseo-verify=a1b2c3d4e5f6g7h8i9j0</span>
                <Button variant="ghost" size="icon" className="shrink-0" onClick={() => copy("devseo-verify=a1b2c3d4e5f6g7h8i9j0")}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={() => toast.info("Checking DNS...")}>Verify DNS</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Meta Tag</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Add this meta tag inside your page's &lt;head&gt;:</p>
              <div className="flex items-center gap-2 rounded-md bg-muted p-3 font-mono text-sm">
                <span className="flex-1 truncate">&lt;meta name="devseo-verify" content="a1b2c3d4e5f6g7h8i9j0" /&gt;</span>
                <Button variant="ghost" size="icon" className="shrink-0" onClick={() => copy('<meta name="devseo-verify" content="a1b2c3d4e5f6g7h8i9j0" />')}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={() => toast.info("Checking meta tag...")}>Verify Meta Tag</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
