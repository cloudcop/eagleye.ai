import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/layout/DashboardLayout";
import Alerts from "./pages/Alerts";
import BannedList from "./pages/BannedList";
import AuditLog from "./pages/AuditLog";
import { AuditLogProvider } from "./context/AuditLogContext";
import { AppProvider } from "./context/AppContext";
import { ThemeProvider } from "./components/theme/theme-provider";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { RingLoader } from "react-spinners";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RingLoader color="hsl(var(--primary))" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/landing" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route
        path="/"
        element={
          session ? (
            <AuditLogProvider>
              <AppProvider>
                <DashboardLayout />
              </AppProvider>
            </AuditLogProvider>
          ) : (
            <Navigate to="/landing" replace />
          )
        }
      >
        <Route index element={<Index />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="banned-list" element={<BannedList />} />
        <Route path="audit-log" element={<AuditLog />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;