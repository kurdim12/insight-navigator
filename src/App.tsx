import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import Websites from "@/pages/Websites";
import WebsiteDetails from "@/pages/WebsiteDetails";
import ScanReport from "@/pages/ScanReport";
import ContentOptimizer from "@/pages/ContentOptimizer";
import Billing from "@/pages/Billing";
import SettingsPage from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/websites" element={<Websites />} />
            <Route path="/websites/:id" element={<WebsiteDetails />} />
            <Route path="/reports/:id" element={<ScanReport />} />
            <Route path="/content-optimizer" element={<ContentOptimizer />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
