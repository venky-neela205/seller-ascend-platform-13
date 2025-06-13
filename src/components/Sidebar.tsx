
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Users, 
  BookOpen, 
  Trophy, 
  Settings, 
  BarChart3,
  Upload,
  Award,
  MessageSquare,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  const { currentUser } = useUser();

  if (!currentUser) return null;

  const getBeltColor = (belt?: string) => {
    switch (belt) {
      case "white": return "bg-gray-100 text-gray-800";
      case "green": return "bg-green-100 text-green-800";
      case "black": return "bg-gray-900 text-white";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const getMenuItems = () => {
    switch (currentUser.role) {
      case "sys-admin":
        return [
          { id: "dashboard", label: "Dashboard", icon: BarChart3 },
          { id: "users", label: "User Management", icon: Users },
          { id: "modules", label: "Module Management", icon: BookOpen },
          { id: "reports", label: "Reports", icon: BarChart3 },
          { id: "settings", label: "Settings", icon: Settings },
        ];
      case "seller":
        return [
          { id: "dashboard", label: "My Dashboard", icon: User },
          { id: "modules", label: "Training Modules", icon: BookOpen },
          { id: "leaderboard", label: "Leaderboard", icon: Trophy },
          { id: "help", label: "Help", icon: MessageSquare },
        ];
      case "supervisor":
        return [
          { id: "dashboard", label: "Dashboard", icon: BarChart3 },
          { id: "sellers", label: "My Sellers", icon: Users },
          { id: "qualifications", label: "Qualifications", icon: Award },
          { id: "reports", label: "Reports", icon: BarChart3 },
        ];
      case "distributor":
        return [
          { id: "dashboard", label: "Dashboard", icon: BarChart3 },
          { id: "upload", label: "Upload Data", icon: Upload },
          { id: "sellers", label: "Manage Sellers", icon: Users },
          { id: "reports", label: "Reports", icon: BarChart3 },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarFallback>{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{currentUser.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
          </div>
        </div>
        {currentUser.belt && (
          <Badge className={cn("mt-2", getBeltColor(currentUser.belt))}>
            {currentUser.belt} Belt
          </Badge>
        )}
        {currentUser.role === "seller" && (
          <div className="mt-2">
            <p className="text-xs text-muted-foreground">Points: {currentUser.points}</p>
          </div>
        )}
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {getMenuItems().map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <Button
                  variant={activeSection === item.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection(item.id)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full justify-start" onClick={() => window.location.reload()}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};
