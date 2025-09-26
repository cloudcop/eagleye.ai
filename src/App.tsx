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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <AuditLogProvider>
                  <AppProvider>
                    <DashboardLayout />
                  </AppProvider>
                </AuditLogProvider>
              }
            >
              <Route path="/" element={<Index />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/banned-list" element={<BannedList />} />
              <Route path="/audit-log" element={<AuditLog />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;