import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function SettingsPage() {
  const [name, setName] = useState("Ahmed");
  const [language, setLanguage] = useState("en");
  const [reportMode, setReportMode] = useState("plain");
  const [scanEmail, setScanEmail] = useState(true);
  const [failEmail, setFailEmail] = useState(true);
  const [weeklyEmail, setWeeklyEmail] = useState(false);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences.</p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader><CardTitle className="text-base">Profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Display Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value="ahmed@example.com" disabled />
            <p className="text-xs text-muted-foreground">Managed by your authentication provider.</p>
          </div>
          <Button onClick={() => toast.success("Profile saved!")}>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader><CardTitle className="text-base">Preferences</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">العربية (Arabic)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Default Report Mode</Label>
            <Select value={reportMode} onValueChange={setReportMode}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plain">Plain English</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader><CardTitle className="text-base">Email Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Scan complete", value: scanEmail, set: setScanEmail },
            { label: "Scan failed", value: failEmail, set: setFailEmail },
            { label: "Weekly summary", value: weeklyEmail, set: setWeeklyEmail },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <Label className="cursor-pointer">{item.label}</Label>
              <Switch checked={item.value} onCheckedChange={item.set} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/30">
        <CardHeader><CardTitle className="text-base text-destructive">Danger Zone</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" onClick={() => toast.info("Export started...")}>Export Data</Button>
          <Separator />
          <Button variant="destructive" onClick={() => toast.error("This action is irreversible.")}>Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}
