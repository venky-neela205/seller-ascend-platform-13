
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Users, BookOpen } from "lucide-react";

const Index = () => {
  const { currentRole, username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleManageModules = () => {
    navigate("/modules");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Sales Training Portal</h1>
            <p className="text-muted-foreground">Welcome back, {username}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="text-sm">
              Role: {currentRole}
            </Badge>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleManageModules}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Manage Modules
              </CardTitle>
              <CardDescription>
                {currentRole === "Admin" 
                  ? "Create, edit, and manage training modules"
                  : "View modules and map sellers"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Access Modules
              </Button>
            </CardContent>
          </Card>

          {currentRole === "Distributor" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Seller Management
                </CardTitle>
                <CardDescription>
                  Map and assign sellers to training modules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" onClick={handleManageModules}>
                  Manage Sellers
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Role-specific information */}
        <Card>
          <CardHeader>
            <CardTitle>Your Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {currentRole === "Admin" && (
                <>
                  <p className="flex items-center text-green-600">
                    ✓ Create and edit training modules
                  </p>
                  <p className="flex items-center text-green-600">
                    ✓ View all module details
                  </p>
                  <p className="flex items-center text-green-600">
                    ✓ Full access to all features
                  </p>
                </>
              )}
              {currentRole === "Distributor" && (
                <>
                  <p className="flex items-center text-green-600">
                    ✓ View training modules
                  </p>
                  <p className="flex items-center text-green-600">
                    ✓ Map sellers to modules
                  </p>
                  <p className="flex items-center text-red-600">
                    ✗ Cannot create or edit modules
                  </p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
