import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { mockContentResult } from "@/lib/mock-data";
import { getScoreLevel } from "@/lib/types";
import { Sparkles, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ContentOptimizer() {
  const [mode, setMode] = useState<"text" | "url">("text");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<typeof mockContentResult | null>(null);

  const handleOptimize = () => {
    setLoading(true);
    setTimeout(() => {
      setResult(mockContentResult);
      setLoading(false);
    }, 1500);
  };

  const copy = (t: string) => {
    navigator.clipboard.writeText(t);
    toast.success("Copied!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Content Optimizer</h1>
        <p className="text-muted-foreground">AI-powered content analysis and optimization.</p>
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <Tabs value={mode} onValueChange={(v) => setMode(v as "text" | "url")}>
            <TabsList>
              <TabsTrigger value="text">Text Input</TabsTrigger>
              <TabsTrigger value="url">URL Input</TabsTrigger>
            </TabsList>
            <TabsContent value="text" className="mt-3">
              <Textarea
                placeholder="Paste your content here..."
                rows={8}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">{text.split(/\s+/).filter(Boolean).length} words</p>
            </TabsContent>
            <TabsContent value="url" className="mt-3">
              <Input placeholder="https://example.com/my-article" value={url} onChange={(e) => setUrl(e.target.value)} />
            </TabsContent>
          </Tabs>

          <div className="space-y-2">
            <Label>Target Keyword (optional)</Label>
            <Input placeholder='e.g. "best coffee shops in Dubai"' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          </div>

          <Button onClick={handleOptimize} disabled={loading || (mode === "text" ? !text : !url)}>
            {loading ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Sparkles className="mr-1.5 h-4 w-4" />}
            {loading ? "Analyzing..." : "Optimize Content"}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Title Suggestions */}
          <Card>
            <CardHeader><CardTitle className="text-base">Title Suggestions</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {result.title_suggestions.map((t, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{t.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.character_count} chars · {t.reasoning}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => copy(t.title)}><Copy className="h-4 w-4" /></Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Meta Description */}
          <Card>
            <CardHeader><CardTitle className="text-base">Meta Description</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <div className="flex-1">
                  <p className="text-sm">{result.meta_description.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">{result.meta_description.character_count} characters</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => copy(result.meta_description.text)}><Copy className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Readability */}
            <Card>
              <CardHeader><CardTitle className="text-base">Readability</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <p className={cn("text-4xl font-bold", `text-score-${getScoreLevel(result.readability.score)}`)}>{result.readability.score}</p>
                  <p className="text-sm text-muted-foreground mt-1">{result.readability.grade_level}</p>
                  <p className="text-sm font-medium">{result.readability.interpretation}</p>
                </div>
              </CardContent>
            </Card>

            {/* Keyword Density */}
            <Card>
              <CardHeader><CardTitle className="text-base">Keyword Density</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {result.keyword_density.map((kw) => (
                  <div key={kw.keyword} className="flex items-center gap-3">
                    <span className="text-sm w-16 font-medium truncate">{kw.keyword}</span>
                    <Progress value={Math.min(kw.density * 20, 100)} className="flex-1 h-2" />
                    <span className="text-xs text-muted-foreground w-10 text-right">{kw.density}%</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Content Quality */}
          <Card>
            <CardHeader><CardTitle className="text-base">Content Quality</CardTitle></CardHeader>
            <CardContent>
              <div className="mb-3">
                <Badge variant="outline" className="bg-score-good/10 text-score-good border-score-good/30">
                  {result.content_quality.word_count} words
                </Badge>
              </div>
              <ul className="space-y-2">
                {result.content_quality.suggestions.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <span className="text-primary">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
