import { useState } from "react";
import { 
  Search, Filter, MoreVertical, UserCheck, UserX, 
  Shield, Mail, Download, ChevronLeft, ChevronRight,
  Eye, Ban, RefreshCw
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const users = [
  { 
    id: 1, name: "Sarah Chen", email: "sarah.chen@email.com", 
    role: "Student", status: "active", materials: 24, exams: 89, 
    progress: 78, joined: "Jan 15, 2024", lastActive: "2 hours ago"
  },
  { 
    id: 2, name: "Marcus Johnson", email: "marcus.j@email.com", 
    role: "Student", status: "active", materials: 12, exams: 45, 
    progress: 65, joined: "Feb 3, 2024", lastActive: "5 min ago"
  },
  { 
    id: 3, name: "Emily Rodriguez", email: "emily.r@email.com", 
    role: "Premium", status: "active", materials: 56, exams: 234, 
    progress: 92, joined: "Dec 8, 2023", lastActive: "1 hour ago"
  },
  { 
    id: 4, name: "David Kim", email: "david.kim@email.com", 
    role: "Student", status: "suspended", materials: 8, exams: 23, 
    progress: 34, joined: "Mar 1, 2024", lastActive: "3 days ago"
  },
  { 
    id: 5, name: "Lisa Wang", email: "lisa.wang@email.com", 
    role: "Premium", status: "active", materials: 41, exams: 167, 
    progress: 88, joined: "Nov 20, 2023", lastActive: "30 min ago"
  },
  { 
    id: 6, name: "James Brown", email: "james.b@email.com", 
    role: "Student", status: "inactive", materials: 3, exams: 12, 
    progress: 15, joined: "Feb 28, 2024", lastActive: "2 weeks ago"
  },
];

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || user.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-slate-400">Manage all platform users, roles, and access</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-violet-600 hover:bg-violet-700 text-white">
            <Mail className="w-4 h-4 mr-2" />
            Bulk Message
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: "24,847", color: "text-violet-400" },
          { label: "Active", value: "18,293", color: "text-emerald-400" },
          { label: "Inactive", value: "5,842", color: "text-slate-400" },
          { label: "Suspended", value: "712", color: "text-red-400" },
        ].map((stat) => (
          <Card key={stat.label} className="bg-slate-900/50 border-slate-800 p-4">
            <p className="text-slate-400 text-sm">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-500"
          />
        </div>
        <div className="flex gap-2">
          {["all", "active", "inactive", "suspended"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedFilter === filter
                  ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <Card className="bg-slate-900/50 border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left text-slate-400 text-xs font-medium uppercase tracking-wider px-6 py-4">User</th>
                <th className="text-left text-slate-400 text-xs font-medium uppercase tracking-wider px-6 py-4">Role</th>
                <th className="text-left text-slate-400 text-xs font-medium uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-slate-400 text-xs font-medium uppercase tracking-wider px-6 py-4">Materials</th>
                <th className="text-left text-slate-400 text-xs font-medium uppercase tracking-wider px-6 py-4">Exams</th>
                <th className="text-left text-slate-400 text-xs font-medium uppercase tracking-wider px-6 py-4">Progress</th>
                <th className="text-left text-slate-400 text-xs font-medium uppercase tracking-wider px-6 py-4">Last Active</th>
                <th className="text-left text-slate-400 text-xs font-medium uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-slate-200 font-medium">{user.name}</p>
                        <p className="text-slate-500 text-sm">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={
                      user.role === "Premium" 
                        ? "border-amber-500/30 text-amber-400 bg-amber-500/10"
                        : "border-slate-600 text-slate-400"
                    }>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        user.status === "active" ? "bg-emerald-400" :
                        user.status === "inactive" ? "bg-slate-400" : "bg-red-400"
                      }`} />
                      <span className={`text-sm capitalize ${
                        user.status === "active" ? "text-emerald-400" :
                        user.status === "inactive" ? "text-slate-400" : "text-red-400"
                      }`}>
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{user.materials}</td>
                  <td className="px-6 py-4 text-slate-300">{user.exams}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                          style={{ width: `${user.progress}%` }}
                        />
                      </div>
                      <span className="text-slate-400 text-sm">{user.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{user.lastActive}</td>
                  <td className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 hover:bg-slate-700 rounded-lg transition-all">
                          <MoreVertical className="w-4 h-4 text-slate-400" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-slate-800 border-slate-700">
                        <DropdownMenuItem className="text-slate-300 hover:bg-slate-700 cursor-pointer">
                          <Eye className="w-4 h-4 mr-2" /> View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-slate-300 hover:bg-slate-700 cursor-pointer">
                          <Shield className="w-4 h-4 mr-2" /> Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-slate-300 hover:bg-slate-700 cursor-pointer">
                          <RefreshCw className="w-4 h-4 mr-2" /> Reset Access
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400 hover:bg-slate-700 cursor-pointer">
                          <Ban className="w-4 h-4 mr-2" /> Suspend User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800">
          <p className="text-slate-400 text-sm">Showing 1-6 of 24,847 users</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 text-slate-400">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {[1, 2, 3, "...", 4141].map((page, i) => (
              <Button 
                key={i}
                variant="outline" 
                size="sm" 
                className={page === 1 
                  ? "bg-violet-500/20 border-violet-500/30 text-violet-300"
                  : "bg-slate-800 border-slate-700 text-slate-400"
                }
              >
                {page}
              </Button>
            ))}
            <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 text-slate-400">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminUsers;
