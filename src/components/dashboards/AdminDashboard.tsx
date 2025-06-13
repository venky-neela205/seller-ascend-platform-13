import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, Award, TrendingUp, Upload, Plus } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { ModuleManagement } from "@/components/modules/ModuleManagement";

interface AdminDashboardProps {
  activeSection: string;
}

export const AdminDashboard = ({ activeSection }: AdminDashboardProps) => {
  const { users } = useUser();

  if (activeSection === "modules") {
    return (
      <div className="p-6">
        <ModuleManagement />
      </div>
    );
  }

  if (activeSection !== "dashboard") {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 capitalize">{activeSection.replace('-', ' ')}</h1>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">
              {activeSection === "users" && "User management interface would be here"}
              {activeSection === "reports" && "Comprehensive reports dashboard would be here"}
              {activeSection === "settings" && "System settings and configuration options would be here"}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalSellers = users.filter(u => u.role === "seller").length;
  const totalTrainers = users.filter(u => u.role === "supervisor").length;
  const activeSellers = users.filter(u => u.role === "seller" && u.completedModules.length > 0).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">System Administration</h1>
        <div className="flex gap-2">
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Bulk Upload
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Module
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sellers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSellers}</div>
            <p className="text-xs text-muted-foreground">Across all channels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trainers</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTrainers}</div>
            <p className="text-xs text-muted-foreground">Supervisors assigned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Learners</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSellers}</div>
            <p className="text-xs text-muted-foreground">Started training</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modules Created</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Training modules</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent User Activity</CardTitle>
            <CardDescription>Latest user registrations and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.slice(0, 3).map((user) => (
                <div key={user.id} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                  <Badge variant="outline">{user.role}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Statistics</CardTitle>
            <CardDescription>Overview of platform usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Module Completion Rate</span>
                <span className="text-sm font-medium">68%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Average Training Time</span>
                <span className="text-sm font-medium">2.5 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Belt Promotions This Month</span>
                <span className="text-sm font-medium">15</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
