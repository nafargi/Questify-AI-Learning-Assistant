import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  CreditCard,
  Question,
  CaretRight,
  Moon,
  Sun,
  SpeakerHigh,
  Envelope,
  DeviceMobile,
  Check,
} from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { studentProfile } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

interface SettingSection {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
}

const sections: SettingSection[] = [
  { id: "account", label: "Account", icon: User, description: "Manage your account details" },
  { id: "notifications", label: "Notifications", icon: Bell, description: "Configure alerts and reminders" },
  { id: "appearance", label: "Appearance", icon: Palette, description: "Customize your experience" },
  { id: "privacy", label: "Privacy & Security", icon: Shield, description: "Control your data and security" },
  { id: "billing", label: "Billing & Plans", icon: CreditCard, description: "Manage subscription" },
  { id: "help", label: "Help & Support", icon: Question, description: "Get assistance" },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("account");
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    studyReminders: true,
    examAlerts: true,
    weeklyReports: true,
    soundEffects: true,
    darkMode: false,
    language: "English",
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DashboardLayout title="Settings">
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <Card className="lg:col-span-1 h-fit">
          <CardContent className="p-4">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all",
                    activeSection === section.id
                      ? "gradient-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{section.label}</span>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Account Section */}
          {activeSection === "account" && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-foreground">
                        {studentProfile.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <Button variant="outline" size="sm" onClick={() => toast.info("Photo upload coming soon!")}>Change Photo</Button>
                      <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 5MB</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input defaultValue={studentProfile.name} />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input defaultValue={studentProfile.email} />
                    </div>
                    <div className="space-y-2">
                      <Label>Academic Year</Label>
                      <Input defaultValue={studentProfile.academicYear} />
                    </div>
                    <div className="space-y-2">
                      <Label>University</Label>
                      <Input placeholder="Enter university name" />
                    </div>
                  </div>

                  <Button className="gradient-primary" onClick={() => toast.success("Profile updated successfully!")}>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <Input type="password" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>New Password</Label>
                      <Input type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label>Confirm Password</Label>
                      <Input type="password" />
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => toast.success("Password updated successfully!")}>Update Password</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === "notifications" && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Envelope className="w-5 h-5" />
                    Email Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div>
                      <p className="font-medium text-sm">Study Reminders</p>
                      <p className="text-xs text-muted-foreground">Get reminded about scheduled study sessions</p>
                    </div>
                    <Switch
                      checked={settings.studyReminders}
                      onCheckedChange={(v) => updateSetting("studyReminders", v)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div>
                      <p className="font-medium text-sm">Exam Alerts</p>
                      <p className="text-xs text-muted-foreground">Notifications about upcoming exams</p>
                    </div>
                    <Switch
                      checked={settings.examAlerts}
                      onCheckedChange={(v) => updateSetting("examAlerts", v)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div>
                      <p className="font-medium text-sm">Weekly Progress Reports</p>
                      <p className="text-xs text-muted-foreground">Summary of your weekly performance</p>
                    </div>
                    <Switch
                      checked={settings.weeklyReports}
                      onCheckedChange={(v) => updateSetting("weeklyReports", v)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DeviceMobile className="w-5 h-5" />
                    Push Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div>
                      <p className="font-medium text-sm">Enable Push Notifications</p>
                      <p className="text-xs text-muted-foreground">Receive instant alerts on your device</p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(v) => updateSetting("pushNotifications", v)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SpeakerHigh className="w-5 h-5" />
                    Sound Effects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div>
                      <p className="font-medium text-sm">Sound Effects</p>
                      <p className="text-xs text-muted-foreground">Play sounds for actions and alerts</p>
                    </div>
                    <Switch
                      checked={settings.soundEffects}
                      onCheckedChange={(v) => updateSetting("soundEffects", v)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Appearance Section */}
          {activeSection === "appearance" && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Theme</CardTitle>
                  <CardDescription>Choose your preferred theme</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => updateSetting("darkMode", false)}
                      className={cn(
                        "p-6 rounded-2xl border text-left transition-all",
                        !settings.darkMode ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      )}
                    >
                      <Sun className="w-8 h-8 text-warning mb-3" />
                      <h4 className="font-semibold">Light Mode</h4>
                      <p className="text-xs text-muted-foreground">Clean and bright interface</p>
                    </button>
                    <button
                      onClick={() => updateSetting("darkMode", true)}
                      className={cn(
                        "p-6 rounded-2xl border text-left transition-all",
                        settings.darkMode ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      )}
                    >
                      <Moon className="w-8 h-8 text-secondary mb-3" />
                      <h4 className="font-semibold">Dark Mode</h4>
                      <p className="text-xs text-muted-foreground">Easy on the eyes</p>
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Language
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {["English", "Amharic", "Afaan Oromo", "German", "Chinese", "Arabic"].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setSettings((prev) => ({ ...prev, language: lang }))}
                        className={cn(
                          "p-4 rounded-xl border text-center transition-all",
                          settings.language === lang ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        )}
                      >
                        <span className="text-sm font-medium">{lang}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Billing Section */}
          {activeSection === "billing" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">Free Plan</h3>
                      <p className="text-muted-foreground">Basic features with limited exams</p>
                    </div>
                    <Button className="gradient-primary" onClick={() => navigate('/billing')}>Upgrade to Pro</Button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-background/50">
                      <p className="text-2xl font-bold">10</p>
                      <p className="text-xs text-muted-foreground">Exams per month</p>
                    </div>
                    <div className="p-4 rounded-xl bg-background/50">
                      <p className="text-2xl font-bold">5</p>
                      <p className="text-xs text-muted-foreground">Courses</p>
                    </div>
                    <div className="p-4 rounded-xl bg-background/50">
                      <p className="text-2xl font-bold">Limited</p>
                      <p className="text-xs text-muted-foreground">AI Features</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Questify Pro</CardTitle>
                  <CardDescription>Unlock all premium features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-6 rounded-2xl gradient-primary text-primary-foreground mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-3xl font-bold">$9.99<span className="text-lg font-normal">/month</span></h3>
                      <Button variant="secondary" size="lg" onClick={() => toast.info("Redirecting to checkout...")}>Subscribe Now</Button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        "Unlimited exams",
                        "All question types",
                        "Advanced AI insights",
                        "Priority support",
                        "Export to PDF",
                        "Custom study plans",
                      ].map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Privacy Section */}
          {activeSection === "privacy" && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Data Privacy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div>
                      <p className="font-medium text-sm">Share usage data</p>
                      <p className="text-xs text-muted-foreground">Help us improve Questify</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div>
                      <p className="font-medium text-sm">Personalized recommendations</p>
                      <p className="text-xs text-muted-foreground">Get AI-powered study suggestions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Delete Account</p>
                        <p className="text-xs text-muted-foreground">Permanently delete your account and data</p>
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => {
                        if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                          toast.error("Account deletion initiated. Contact support to complete.");
                        }
                      }}>Delete</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Help Section */}
          {activeSection === "help" && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Help & Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { title: "Getting Started Guide", desc: "Learn the basics of Questify" },
                    { title: "FAQ", desc: "Common questions answered" },
                    { title: "Contact Support", desc: "Get help from our team" },
                    { title: "Report a Bug", desc: "Help us fix issues" },
                  ].map((item) => (
                    <button
                      key={item.title}
                      className="w-full flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="text-left">
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <CaretRight className="w-5 h-5 text-muted-foreground" />
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
