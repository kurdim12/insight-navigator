import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    features: ["1 website", "5 scans/month", "10 optimizations/month", "Email support"],
    current: true,
  },
  {
    name: "Starter",
    price: "$19",
    period: "/month",
    features: ["5 websites", "50 scans/month", "100 optimizations/month", "Email support", "Plain English mode", "Domain verification"],
    current: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    features: ["25 websites", "500 scans/month", "Unlimited optimizations", "Priority support", "White-label PDFs", "API access", "Scheduled scans"],
    current: false,
    popular: true,
  },
  {
    name: "Agency",
    price: "$149",
    period: "/month",
    features: ["Unlimited websites", "Unlimited scans", "Unlimited optimizations", "Dedicated support", "Client management", "White-label everything", "Custom branding"],
    current: false,
  },
];

const usage = [
  { label: "Websites", used: 4, limit: 5 },
  { label: "Scans", used: 12, limit: 50 },
  { label: "Optimizations", used: 3, limit: 100 },
];

export default function Billing() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground">Manage your subscription and usage.</p>
      </div>

      {/* Usage */}
      <Card>
        <CardHeader><CardTitle className="text-base">Usage This Month</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {usage.map((item) => (
            <div key={item.label} className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span>{item.label}</span>
                <span className="text-muted-foreground">{item.used} / {item.limit}</span>
              </div>
              <Progress value={(item.used / item.limit) * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Pricing */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Plans</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, i) => (
            <Card
              key={plan.name}
              className={cn(
                "relative animate-fade-in",
                plan.popular && "border-primary shadow-lg"
              )}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {plan.popular && (
                <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              <CardContent className="p-5 space-y-4">
                <div>
                  <h3 className="font-semibold">{plan.name}</h3>
                  <p className="mt-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </p>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-score-good shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.current ? "outline" : plan.popular ? "default" : "outline"}
                  className="w-full"
                  disabled={plan.current}
                >
                  {plan.current ? "Current Plan" : "Upgrade"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
