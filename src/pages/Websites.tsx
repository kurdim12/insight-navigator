import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, ExternalLink, Trash2, Play, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { mockWebsites } from "@/lib/mock-data";
import { getScoreLevel } from "@/lib/types";
import { toast } from "sonner";

export default function Websites() {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newName, setNewName] = useState("");

  const filtered = mockWebsites.filter(
    (w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.url.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!newUrl) return;
    toast.success("Website added successfully!");
    setDialogOpen(false);
    setNewUrl("");
    setNewName("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Websites</h1>
          <p className="text-muted-foreground">Manage your monitored websites.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-1.5 h-4 w-4" /> Add Website</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a Website</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="url">Website URL</Label>
                <Input id="url" placeholder="https://example.com" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name (optional)</Label>
                <Input id="name" placeholder="My Website" value={newName} onChange={(e) => setNewName(e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAdd}>Add Website</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search websites..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {filtered.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Globe className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No websites yet</h3>
            <p className="text-muted-foreground mt-1">Add your first website to get started!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((website, i) => (
            <Card key={website.id} className="animate-fade-in group hover:shadow-md transition-shadow" style={{ animationDelay: `${i * 0.05}s` }}>
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{website.name}</h3>
                      {website.verified && (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-score-good" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{website.url}</p>
                  </div>
                  {website.latest_seo_score !== null && (
                    <ScoreBadge score={website.latest_seo_score} level={getScoreLevel(website.latest_seo_score)} />
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {website.last_scan_date
                    ? `Last scan: ${new Date(website.last_scan_date).toLocaleDateString()}`
                    : "No scans yet"}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link to={`/websites/${website.id}`}>
                      <ExternalLink className="mr-1 h-3.5 w-3.5" /> Details
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => toast.success("Scan started!")}>
                    <Play className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => toast.success("Website deleted.")}>
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function Globe(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
    </svg>
  );
}
