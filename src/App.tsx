import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/layout/DashboardLayout";
import Alerts from "./pages/Alerts";
import BannedList from "./pages/BannedList";
import AuditLog from "./pages/AuditLog";
import { AuditLogProvider } from "./context/AuditLogContext";
import { AppProvider } from "./context/AppContext";
import { ThemeProvider } from "./components/theme/theme-provider";
import HomePage from "./pages/HomePage";
import CompliancePage from "./pages/Compliance";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuditLogProvider>
            <AppProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<Index />} />
                  <Route path="alerts" element={<Alerts />} />
                  <Route path="banned-list" element={<BannedList />} />
                  <Route path="audit-log" element={<AuditLog />} />
                  <Route path="compliance" element={<CompliancePage />} />
                  <Route path="profile" element={<ProfilePage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AppProvider>
          </AuditLogProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;