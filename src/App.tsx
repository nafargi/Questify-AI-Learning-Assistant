import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Exam from "./pages/Exam";
import Notes from "./pages/Notes";
import StudyRoom from "./pages/StudyRoom";
import Planner from "./pages/Planner";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Billing from "./pages/Billing";
import ExamHistory from "./pages/ExamHistory";
import QuestyChat from "./pages/QuestyChat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/study-room" element={<StudyRoom />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/exam-history" element={<ExamHistory />} />
          <Route path="/questy-chat" element={<QuestyChat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
