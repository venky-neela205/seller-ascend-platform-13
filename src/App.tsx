
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LoginPage } from "@/components/auth/LoginPage";
import { ManageModules } from "@/components/modules/ManageModules";
import { AddEditModule } from "@/components/modules/AddEditModule";
import { ViewModule } from "@/components/modules/ViewModule";
import { MapSellers } from "@/components/modules/MapSellers";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const RoleProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
  const { currentRole } = useAuth();
  
  if (!currentRole || !allowedRoles.includes(currentRole)) {
    return <Navigate to="/modules" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated, login } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage onLogin={login} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/modules" replace />} />
      <Route path="/modules" element={
        <ProtectedRoute>
          <ManageModules />
        </ProtectedRoute>
      } />
      <Route path="/modules/add" element={
        <ProtectedRoute>
          <RoleProtectedRoute allowedRoles={["Admin"]}>
            <AddEditModule />
          </RoleProtectedRoute>
        </ProtectedRoute>
      } />
      <Route path="/modules/edit/:id" element={
        <ProtectedRoute>
          <RoleProtectedRoute allowedRoles={["Admin"]}>
            <AddEditModule />
          </RoleProtectedRoute>
        </ProtectedRoute>
      } />
      <Route path="/modules/view/:id" element={
        <ProtectedRoute>
          <ViewModule />
        </ProtectedRoute>
      } />
      <Route path="/modules/map-sellers/:moduleId" element={
        <ProtectedRoute>
          <RoleProtectedRoute allowedRoles={["Distributor"]}>
            <MapSellers />
          </RoleProtectedRoute>
        </ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      } />
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
