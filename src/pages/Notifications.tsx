import { useState } from "react";
import {
  Bell,
  CheckCircle,
  Warning,
  Info,
  Sparkle,
  Clock,
  Trash,
  Checks,
  Funnel,
} from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "ai";
  title: string;
  message: string;
  time: string;
  read: boolean;
  action?: string;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "ai",
    title: "AI Study Recommendation",
    message: "Based on your performance, I recommend reviewing Database Normalization before your next exam. Your accuracy has dropped 15% in this area.",
    time: "5 minutes ago",
    read: false,
    action: "Start Review",
  },
  {
    id: "2",
    type: "success",
    title: "Exam Completed!",
    message: "Congratulations! You scored 85% on your Computer Science exam. That's 8% better than your last attempt!",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "3",
    type: "warning",
    title: "Study Streak at Risk",
    message: "You haven't studied today. Don't break your 12-day streak! Complete a quick 15-minute session to keep it going.",
    time: "4 hours ago",
    read: false,
    action: "Quick Study",
  },
  {
    id: "4",
    type: "info",
    title: "Scheduled Exam Reminder",
    message: "Your Linear Algebra exam is scheduled for today at 7:30 PM. Make sure you're ready!",
    time: "6 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "ai",
    title: "Peak Performance Time",
    message: "Your best performance window is approaching (7-9 PM). Consider tackling your most challenging topics now.",
    time: "1 day ago",
    read: true,
  },
  {
    id: "6",
    type: "success",
    title: "Achievement Unlocked!",
    message: "You've earned the 'Week Warrior' badge for maintaining a 7-day study streak. Keep up the great work!",
    time: "2 days ago",
    read: true,
  },
  {
    id: "7",
    type: "info",
    title: "New Study Materials",
    message: "Your Biology course has new flashcards available based on your weak areas.",
    time: "3 days ago",
    read: true,
  },
  {
    id: "8",
    type: "warning",
    title: "Confidence Gap Detected",
    message: "You rated Linear Algebra at 75% confidence but scored 38%. Consider spending more time on this topic.",
    time: "4 days ago",
    read: true,
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "warning":
        return <Warning className="w-5 h-5 text-warning" />;
      case "ai":
        return <Sparkle className="w-5 h-5 text-primary" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getTypeColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "bg-success/10 border-success/20";
      case "warning":
        return "bg-warning/10 border-warning/20";
      case "ai":
        return "bg-primary/10 border-primary/20";
      default:
        return "bg-blue-500/10 border-blue-500/20";
    }
  };

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DashboardLayout title="Notifications">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold">All Notifications</h2>
              <p className="text-sm text-muted-foreground">
                {unreadCount} unread notifications
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <Checks className="w-4 h-4 mr-2" />
              Mark all read
            </Button>
            <Button variant="outline" size="sm" onClick={clearAll}>
              <Trash className="w-4 h-4 mr-2" />
              Clear all
            </Button>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className={filter === "all" ? "gradient-primary" : ""}
          >
            All ({notifications.length})
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("unread")}
            className={filter === "unread" ? "gradient-primary" : ""}
          >
            Unread ({unreadCount})
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={cn(
                  "transition-all hover:shadow-md cursor-pointer",
                  !notification.read && "border-l-4 border-l-primary bg-primary/5"
                )}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border",
                        getTypeColor(notification.type)
                      )}
                    >
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm">{notification.title}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {notification.time}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="p-1 hover:bg-muted rounded-lg transition-colors"
                          >
                            <Trash className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {notification.message}
                      </p>
                      {notification.action && (
                        <Button size="sm" className="gradient-primary">
                          {notification.action}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <Bell className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-2">No notifications</h3>
                <p className="text-sm text-muted-foreground">
                  You're all caught up! Check back later for updates.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
