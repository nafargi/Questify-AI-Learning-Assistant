import {
  Pulse, HardDrives, Cpu, HardDrive, WifiHigh, Clock,
  CheckCircle, Warning, XCircle, ArrowsClockwise, TrendUp
} from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const systemMetrics = [
  { label: "Uptime", value: "99.97%", status: "excellent", icon: Clock },
  { label: "API Response", value: "124ms", status: "excellent", icon: WifiHigh },
  { label: "CPU Usage", value: "42%", status: "good", icon: Cpu },
  { label: "Memory", value: "68%", status: "good", icon: HardDrives },
];

const services = [
  { name: "API Gateway", status: "operational", latency: "45ms", uptime: "99.99%" },
  { name: "Database Cluster", status: "operational", latency: "12ms", uptime: "99.98%" },
  { name: "AI Processing", status: "operational", latency: "234ms", uptime: "99.95%" },
  { name: "File Storage", status: "operational", latency: "89ms", uptime: "99.97%" },
  { name: "Authentication", status: "operational", latency: "34ms", uptime: "99.99%" },
  { name: "Email Service", status: "degraded", latency: "456ms", uptime: "99.12%" },
  { name: "Analytics Pipeline", status: "operational", latency: "178ms", uptime: "99.94%" },
];

const recentIncidents = [
  {
    title: "Increased AI Response Latency",
    time: "2 hours ago", duration: "15 min",
    status: "resolved", impact: "minor"
  },
  {
    title: "Email Delivery Delays",
    time: "5 hours ago", duration: "ongoing",
    status: "investigating", impact: "moderate"
  },
  {
    title: "Database Connection Pool Exhausted",
    time: "2 days ago", duration: "8 min",
    status: "resolved", impact: "major"
  },
];

const resourceUsage = [
  { resource: "Database Connections", used: 234, max: 500, percentage: 47 },
  { resource: "AI Request Queue", used: 89, max: 1000, percentage: 9 },
  { resource: "Storage (Total)", used: 8.1, max: 10, percentage: 81, unit: "TB" },
  { resource: "Bandwidth (Monthly)", used: 4.2, max: 10, percentage: 42, unit: "TB" },
];

const AdminHealth = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational": return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case "degraded": return <Warning className="w-4 h-4 text-amber-400" />;
      case "down": return <XCircle className="w-4 h-4 text-red-400" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">System Health & Performance</h1>
          <p className="text-slate-400">Monitor backend performance, uptime, and resource usage</p>
        </div>
        <Button variant="outline" className="bg-slate-800 border-slate-700 text-slate-300">
          <ArrowsClockwise className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {systemMetrics.map((metric) => (
          <Card key={metric.label} className="bg-slate-900/50 border-slate-800 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{metric.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${metric.status === "excellent" ? "bg-emerald-500/20" : "bg-blue-500/20"
                }`}>
                <metric.icon className={`w-6 h-6 ${metric.status === "excellent" ? "text-emerald-400" : "text-blue-400"
                  }`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Status */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Pulse className="w-5 h-5 text-violet-400" />
            Service Status
          </h3>
          <div className="space-y-3">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50"
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(service.status)}
                  <span className="text-slate-200">{service.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-400 text-sm">{service.latency}</span>
                  <Badge className={
                    service.status === "operational"
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                  }>
                    {service.uptime}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Resource Usage */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-violet-400" />
            Resource Usage
          </h3>
          <div className="space-y-6">
            {resourceUsage.map((resource) => (
              <div key={resource.resource}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300">{resource.resource}</span>
                  <span className="text-slate-400 text-sm">
                    {resource.used}{resource.unit || ""} / {resource.max}{resource.unit || ""}
                  </span>
                </div>
                <Progress
                  value={resource.percentage}
                  className={`h-3 bg-slate-800 ${resource.percentage > 80 ? "[&>div]:bg-amber-500" : ""
                    }`}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Incidents */}
      <Card className="bg-slate-900/50 border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Warning className="w-5 h-5 text-violet-400" />
          Recent Incidents
        </h3>
        <div className="space-y-4">
          {recentIncidents.map((incident, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${incident.status === "resolved" ? "bg-emerald-500/20" :
                incident.status === "investigating" ? "bg-amber-500/20" : "bg-red-500/20"
                }`}>
                {incident.status === "resolved" ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Warning className="w-5 h-5 text-amber-400" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-slate-200 font-medium">{incident.title}</h4>
                <div className="flex items-center gap-4 mt-1 text-sm">
                  <span className="text-slate-500">{incident.time}</span>
                  <span className="text-slate-400">Duration: {incident.duration}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={
                  incident.impact === "major" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                    incident.impact === "moderate" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                      "bg-blue-500/20 text-blue-400 border-blue-500/30"
                }>
                  {incident.impact} impact
                </Badge>
                <Badge className={
                  incident.status === "resolved"
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                }>
                  {incident.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance Trend */}
      <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
            <TrendUp className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Performance Trend: Excellent</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              System performance is stable. Average response times have improved by 12% compared
              to last month. No major incidents in the past 7 days. Storage usage is at 81% -
              consider scaling before reaching 90%.
            </p>
            <div className="flex gap-3 mt-4">
              <Button className="bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30">
                View Detailed Report
              </Button>
              <Button variant="outline" className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800">
                Configure Alerts
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminHealth;
