
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Play, Lock, Trophy, Target, Clock } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { cn } from "@/lib/utils";

interface SellerDashboardProps {
  activeSection: string;
}

const modules = [
  { id: "mod-1", title: "Product Knowledge Basics", progress: 100, locked: false, priority: 1 },
  { id: "mod-2", title: "Customer Engagement", progress: 100, locked: false, priority: 2 },
  { id: "mod-3", title: "Sales Techniques", progress: 45, locked: false, priority: 3 },
  { id: "mod-4", title: "Advanced Negotiation", progress: 0, locked: true, priority: 4 },
  { id: "mod-5", title: "Digital Marketing", progress: 0, locked: true, priority: 5 },
];

const leaderboard = [
  { name: "Sarah Johnson", points: 450, belt: "green" },
  { name: "Mike Chen", points: 420, belt: "green" },
  { name: "Alex Kumar", points: 380, belt: "white" },
  { name: "Lisa Wong", points: 350, belt: "white" },
  { name: "David Smith", points: 320, belt: "white" },
];

export const SellerDashboard = ({ activeSection }: SellerDashboardProps) => {
  const { currentUser } = useUser();

  if (!currentUser) return null;

  const getBeltColor = (belt: string) => {
    switch (belt) {
      case "white": return "bg-gray-100 text-gray-800";
      case "green": return "bg-green-100 text-green-800";
      case "black": return "bg-gray-900 text-white";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  if (activeSection === "modules") {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Training Modules</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Card key={module.id} className={cn("cursor-pointer transition-all hover:shadow-md", 
              module.locked && "opacity-60")}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  {module.locked ? (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Play className="h-5 w-5 text-primary" />
                  )}
                </div>
                <CardDescription>Priority {module.priority}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Progress value={module.progress} className="w-full" />
                  <div className="flex justify-between text-sm">
                    <span>{module.progress}% Complete</span>
                    <Badge variant={module.progress === 100 ? "default" : "secondary"}>
                      {module.progress === 100 ? "Completed" : module.locked ? "Locked" : "In Progress"}
                    </Badge>
                  </div>
                  <Button 
                    className="w-full" 
                    disabled={module.locked}
                    variant={module.progress === 100 ? "outline" : "default"}
                  >
                    {module.progress === 100 ? "Review" : module.locked ? "Locked" : "Continue"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (activeSection === "leaderboard") {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Rankings based on training points and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboard.map((seller, index) => (
                <div key={seller.name} className="flex items-center space-x-4 p-3 rounded-lg border">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{seller.name}</p>
                    <p className="text-sm text-muted-foreground">{seller.points} points</p>
                  </div>
                  <Badge className={getBeltColor(seller.belt)}>
                    {seller.belt} Belt
                  </Badge>
                  {seller.name === currentUser.name && (
                    <Badge variant="outline">You</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (activeSection === "help") {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>New to the platform? Start here</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Complete your profile setup</li>
                <li>• Watch the introduction video</li>
                <li>• Start with Module 1: Product Knowledge</li>
                <li>• Connect with your assigned trainer</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>Contact support or your trainer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full">Contact Support</Button>
                <Button variant="outline" className="w-full">Message Trainer</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Default dashboard view
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <Badge className={cn("text-lg px-3 py-1", getBeltColor(currentUser.belt || "white"))}>
          {currentUser.belt || "white"} Belt
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser.points}</div>
            <p className="text-xs text-muted-foreground">Keep learning to earn more!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modules Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser.completedModules.length}/5</div>
            <p className="text-xs text-muted-foreground">2 modules remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Goal</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Green Belt</div>
            <p className="text-xs text-muted-foreground">100 points needed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Progress</CardTitle>
            <CardDescription>Your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Progress</span>
                  <span>60%</span>
                </div>
                <Progress value={60} className="w-full" />
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Next Module</h4>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-sm">Sales Techniques</span>
                  <Badge variant="secondary">In Progress</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Continue your learning</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full">
              <Play className="mr-2 h-4 w-4" />
              Continue Current Module
            </Button>
            <Button variant="outline" className="w-full">
              <Clock className="mr-2 h-4 w-4" />
              Schedule Mock Call
            </Button>
            <Button variant="outline" className="w-full">
              <Trophy className="mr-2 h-4 w-4" />
              View Leaderboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
