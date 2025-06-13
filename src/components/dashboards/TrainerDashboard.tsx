
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Users, CheckCircle, Clock, AlertCircle, Award, MessageSquare } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { cn } from "@/lib/utils";

interface TrainerDashboardProps {
  activeSection: string;
}

export const TrainerDashboard = ({ activeSection }: TrainerDashboardProps) => {
  const { users, currentUser } = useUser();
  
  if (!currentUser) return null;

  const assignedSellers = users.filter(u => u.role === "seller" && u.assignedTrainer === currentUser.id);

  const getBeltColor = (belt?: string) => {
    switch (belt) {
      case "white": return "bg-gray-100 text-gray-800";
      case "green": return "bg-green-100 text-green-800";  
      case "black": return "bg-gray-900 text-white";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  if (activeSection === "sellers") {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">My Sellers</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignedSellers.map((seller) => (
            <Card key={seller.id}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{seller.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{seller.name}</CardTitle>
                    <CardDescription className="capitalize">{seller.sellerType?.replace('-', ' ')}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Belt Level</span>
                    <Badge className={getBeltColor(seller.belt)}>
                      {seller.belt} Belt
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Points</span>
                    <span className="font-medium">{seller.points}</span>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{Math.round((seller.completedModules.length / 5) * 100)}%</span>
                    </div>
                    <Progress value={(seller.completedModules.length / 5) * 100} className="w-full" />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Award className="h-4 w-4 mr-1" />
                      Evaluate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (activeSection === "qualifications") {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Qualifications</h1>
        <Card>
          <CardHeader>
            <CardTitle>Pending Evaluations</CardTitle>
            <CardDescription>In-market qualifications and mock calls requiring your review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignedSellers.map((seller) => (
                <div key={seller.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>{seller.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{seller.name}</p>
                      <p className="text-sm text-muted-foreground">Module 3: Sales Techniques</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">In-Market Qualification</Badge>
                    <Button size="sm">Evaluate</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (activeSection === "reports") {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Reports</h1>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">
              Detailed trainer performance reports and analytics would be displayed here.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Default dashboard view
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Trainer Dashboard</h1>
        <Badge variant="outline">Supervisor</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Sellers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignedSellers.length}</div>
            <p className="text-xs text-muted-foreground">Under your guidance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Evaluations</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed This Week</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Evaluations completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Belt Promotions</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your sellers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignedSellers.slice(0, 3).map((seller) => (
                <div key={seller.id} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">{seller.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{seller.name}</p>
                    <p className="text-xs text-muted-foreground">Completed Module 2</p>
                  </div>
                  <Badge variant="outline" className="text-xs">2 hours ago</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Your team's progress this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Average Completion Rate</span>
                <span className="text-sm font-medium">75%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">On-Time Evaluations</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Seller Satisfaction</span>
                <span className="text-sm font-medium">4.8/5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
