
import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { Dashboard } from "@/components/Dashboard";
import { UserProvider } from "@/contexts/UserContext";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserProvider>
      <div className="min-h-screen bg-background">
        {!isAuthenticated ? (
          <LoginForm onLogin={() => setIsAuthenticated(true)} />
        ) : (
          <Dashboard />
        )}
      </div>
    </UserProvider>
  );
};

export default Index;
