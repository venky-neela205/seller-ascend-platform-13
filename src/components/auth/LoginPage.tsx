
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Lock } from "lucide-react";
import { RoleSelectionModal } from "./RoleSelectionModal";

interface LoginPageProps {
  onLogin: (role: string) => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [availableRoles] = useState(["Admin", "Distributor"]); // Mock available roles

  const handleLogin = () => {
    // Mock authentication - in real app, this would call an API
    if (username && password) {
      setShowRoleModal(true);
    }
  };

  const handleRoleSelection = (selectedRole: string) => {
    // Save to localStorage
    localStorage.setItem("selectedRole", selectedRole);
    localStorage.setItem("username", username);
    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    }
    
    setShowRoleModal(false);
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <User className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <Label htmlFor="remember" className="text-sm font-normal">
              Remember Me
            </Label>
          </div>

          <Button 
            onClick={handleLogin} 
            disabled={!username || !password}
            className="w-full"
          >
            Login
          </Button>
        </CardContent>
      </Card>

      <RoleSelectionModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        availableRoles={availableRoles}
        onRoleSelect={handleRoleSelection}
      />
    </div>
  );
};
