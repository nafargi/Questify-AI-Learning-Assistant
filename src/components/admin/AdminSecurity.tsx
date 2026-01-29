import {
  Shield, Users, Key, Lock, Warning, Eye,
  Clock, CheckCircle, XCircle, Pulse, MagnifyingGlass, Funnel
} from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const roles = [
  { name: "Super Admin", users: 3, permissions: "Full Access", color: "bg-red-500" },
  { name: "Admin", users: 12, permissions: "Management Access", color: "bg-amber-500" },
  { name: "Moderator", users: 45, permissions: "Content Review", color: "bg-blue-500" },
  { name: "Premium User", users: 5678, permissions: "Premium Features", color: "bg-violet-500" },
  { name: "Standard User", users: 19109, permissions: "Basic Access", color: "bg-slate-500" },
];

const recentActivity = [
  { action: "Login", user: "admin@questify.com", ip: "192.168.1.1", time: "2 min ago", status: "success" },
  { action: "Password Reset", user: "sarah.chen@email.com", ip: "10.0.0.45", time: "15 min ago", status: "success" },
  { action: "Failed Login", user: "unknown@email.com", ip: "203.45.67.89", time: "23 min ago", status: "failed" },
  { action: "Role Change", user: "marcus.j@email.com", ip: "192.168.1.5", time: "1 hour ago", status: "success" },
  { action: "API Key Generated", user: "admin@questify.com", ip: "192.168.1.1", time: "2 hours ago", status: "success" },
  { action: "Failed Login (3 attempts)", user: "test@test.com", ip: "45.67.89.123", time: "3 hours ago", status: "blocked" },
];

const securityMetrics = [
  { metric: "Security Score", value: 94, status: "excellent" },
  { metric: "2FA Adoption", value: 78, status: "good" },
  { metric: "Strong Passwords", value: 85, status: "good" },
  { metric: "Session Security", value: 99, status: "excellent" },
];

const AdminSecurity = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Security & Access Control</h1>
        <p className="text-slate-400">Manage roles, permissions, and monitor security events</p>
      </div>

      {/* Security Score */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {securityMetrics.map((metric) => (
          <Card key={metric.metric} className="bg-slate-900/50 border-slate-800 p-5">
            <p className="text-slate-400 text-sm">{metric.metric}</p>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-2xl font-bold text-white">{metric.value}%</p>
              <Badge className={
                metric.status === "excellent"
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  : "bg-blue-500/20 text-blue-400 border-blue-500/30"
              }>
                {metric.status}
              </Badge>
            </div>
            <Progress value={metric.value} className="mt-3 h-2 bg-slate-800" />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Role Management */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-violet-400" />
              Role Management
            </h3>
            <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
              Add Role
            </Button>
          </div>
          <div className="space-y-3">
            {roles.map((role) => (
              <div
                key={role.name}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${role.color}`} />
                  <div>
                    <p className="text-slate-200 font-medium">{role.name}</p>
                    <p className="text-slate-500 text-sm">{role.permissions}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="border-slate-600 text-slate-400">
                    {role.users.toLocaleString()} users
                  </Badge>
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-all">
                    <Eye className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Permission Matrix */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Key className="w-5 h-5 text-violet-400" />
            Permission Overview
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left text-slate-400 text-xs font-medium py-3">Permission</th>
                  <th className="text-center text-slate-400 text-xs font-medium py-3">Admin</th>
                  <th className="text-center text-slate-400 text-xs font-medium py-3">Mod</th>
                  <th className="text-center text-slate-400 text-xs font-medium py-3">User</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { permission: "View Users", admin: true, mod: true, user: false },
                  { permission: "Edit Content", admin: true, mod: true, user: false },
                  { permission: "Manage Exams", admin: true, mod: false, user: false },
                  { permission: "AI Config", admin: true, mod: false, user: false },
                  { permission: "View Analytics", admin: true, mod: true, user: false },
                  { permission: "PaperPlaneTilt Notifications", admin: true, mod: false, user: false },
                ].map((perm) => (
                  <tr key={perm.permission} className="border-b border-slate-800/50">
                    <td className="py-3 text-slate-300 text-sm">{perm.permission}</td>
                    <td className="py-3 text-center">
                      {perm.admin ? <CheckCircle className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-red-400 mx-auto" />}
                    </td>
                    <td className="py-3 text-center">
                      {perm.mod ? <CheckCircle className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-red-400 mx-auto" />}
                    </td>
                    <td className="py-3 text-center">
                      {perm.user ? <CheckCircle className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-red-400 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Activity Log */}
      <Card className="bg-slate-900/50 border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Pulse className="w-5 h-5 text-violet-400" />
            Security Activity Log
          </h3>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search logs..."
                className="pl-10 bg-slate-800 border-slate-700 text-slate-200 text-sm"
              />
            </div>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-200">
              <Funnel className="w-4 h-4 mr-1" /> Filter
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          {recentActivity.map((activity, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-all"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.status === "success" ? "bg-emerald-500/20" :
                activity.status === "failed" ? "bg-red-500/20" : "bg-amber-500/20"
                }`}>
                {activity.status === "success" ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : activity.status === "failed" ? (
                  <XCircle className="w-5 h-5 text-red-400" />
                ) : (
                  <Warning className="w-5 h-5 text-amber-400" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-slate-200 font-medium">{activity.action}</p>
                <p className="text-slate-500 text-sm">{activity.user}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-sm">{activity.ip}</p>
                <p className="text-slate-500 text-xs">{activity.time}</p>
              </div>
              <Badge className={
                activity.status === "success" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
                  activity.status === "failed" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                    "bg-amber-500/20 text-amber-400 border-amber-500/30"
              }>
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Security Alert */}
      <Card className="bg-gradient-to-br from-amber-500/10 to-red-500/10 border-amber-500/20 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
            <Warning className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">3 Security Alerts</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Detected 3 suspicious login attempts from unusual locations in the last 24 hours.
              1 IP address has been automatically blocked due to repeated failures.
            </p>
            <Button className="mt-4 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30">
              Review Alerts
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminSecurity;
