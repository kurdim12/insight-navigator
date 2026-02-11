import { type ScoreLevel } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const scoreStyles: Record<ScoreLevel, string> = {
  good: "bg-score-good/15 text-score-good border-score-good/30",
  average: "bg-score-warning/15 text-score-warning border-score-warning/30",
  poor: "bg-score-critical/15 text-score-critical border-score-critical/30",
};

export function ScoreBadge({
  score,
  level,
  className,
}: {
  score: number | null;
  level: ScoreLevel;
  className?: string;
}) {
  if (score === null) return <Badge variant="outline" className={className}>—</Badge>;
  return (
    <Badge variant="outline" className={cn(scoreStyles[level], "font-semibold", className)}>
      {score}
    </Badge>
  );
}
