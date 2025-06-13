
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  currentRole: string | null;
  username: string | null;
  login: (role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved auth state on app load
    const savedRole = localStorage.getItem("selectedRole");
    const savedUsername = localStorage.getItem("username");
    const rememberMe = localStorage.getItem("rememberMe");

    if (savedRole && savedUsername && rememberMe) {
      setIsAuthenticated(true);
      setCurrentRole(savedRole);
      setUsername(savedUsername);
    }
  }, []);

  const login = (role: string) => {
    setIsAuthenticated(true);
    setCurrentRole(role);
    const savedUsername = localStorage.getItem("username");
    setUsername(savedUsername);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentRole(null);
    setUsername(null);
    localStorage.removeItem("selectedRole");
    localStorage.removeItem("username");
    localStorage.removeItem("rememberMe");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentRole, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
