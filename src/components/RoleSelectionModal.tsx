
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/contexts/UserContext";
import { User, Users, Award, BarChart3 } from "lucide-react";

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRoleSelected: (user: any) => void;
}

export const RoleSelectionModal = ({ isOpen, onClose, onRoleSelected }: RoleSelectionModalProps) => {
  const { users } = useUser();
  const [selectedUser, setSelectedUser] = useState<string>("");

  const handleRoleSelect = () => {
    const user = users.find(u => u.id === selectedUser);
    if (user) {
      onRoleSelected(user);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "sys-admin":
        return <BarChart3 className="h-6 w-6" />;
      case "supervisor":
        return <Award className="h-6 w-6" />;
      case "seller":
        return <User className="h-6 w-6" />;
      case "distributor":
        return <Users className="h-6 w-6" />;
      default:
        return <User className="h-6 w-6" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "sys-admin":
        return "border-red-200 hover:border-red-300 hover:bg-red-50";
      case "supervisor":
        return "border-purple-200 hover:border-purple-300 hover:bg-purple-50";
      case "seller":
        return "border-blue-200 hover:border-blue-300 hover:bg-blue-50";
      case "distributor":
        return "border-green-200 hover:border-green-300 hover:bg-green-50";
      default:
        return "border-gray-200 hover:border-gray-300 hover:bg-gray-50";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Your Role</DialogTitle>
          <DialogDescription>
            Choose your role to access the appropriate dashboard and features.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3">
          {users.map((user) => (
            <Card
              key={user.id}
              className={`cursor-pointer transition-all duration-200 ${getRoleColor(user.role)} ${
                selectedUser === user.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
              }`}
              onClick={() => setSelectedUser(user.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    {getRoleIcon(user.role)}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-sm">{user.name}</CardTitle>
                    <CardDescription className="text-xs capitalize">
                      {user.role.replace("-", " ")}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              {user.role === "seller" && (
                <CardContent className="pt-0">
                  <div className="text-xs text-muted-foreground">
                    {user.belt && <span className="capitalize">{user.belt} Belt</span>}
                    {user.points !== undefined && <span> • {user.points} Points</span>}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleRoleSelect}
            disabled={!selectedUser}
          >
            Continue as Selected Role
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
