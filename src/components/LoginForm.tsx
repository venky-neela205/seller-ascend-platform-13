
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@/contexts/UserContext";
import { User, Lock, Mail } from "lucide-react";
import { RoleSelectionModal } from "@/components/RoleSelectionModal";

interface LoginFormProps {
  onLogin: () => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { setCurrentUser } = useUser();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    // Simple validation
    if (!username || !password) {
      setLoginError("Please enter both username and password");
      return;
    }

    // For demo purposes, accept any username/password
    // In a real app, you'd validate against a backend
    if (username.length > 0 && password.length > 0) {
      console.log("Login attempt:", { username, rememberMe });
      setShowRoleSelection(true);
    } else {
      setLoginError("Invalid credentials");
    }
  };

  const handleRoleSelected = (user: any) => {
    setCurrentUser(user);
    setShowRoleSelection(false);
    onLogin();
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
          <CardTitle className="text-2xl">Sales Training Portal</CardTitle>
          <CardDescription>
            Sign in to access the learning management system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm">
                Remember me
              </Label>
            </div>

            {loginError && (
              <div className="text-sm text-red-600 text-center">
                {loginError}
              </div>
            )}

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>

      <RoleSelectionModal
        isOpen={showRoleSelection}
        onClose={() => setShowRoleSelection(false)}
        onRoleSelected={handleRoleSelected}
      />
    </div>
  );
};
