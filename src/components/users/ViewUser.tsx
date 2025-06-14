
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { User } from "@/contexts/UserContext";

interface ViewUserProps {
  user: User;
  onBack: () => void;
}

export const ViewUser = ({ user, onBack }: ViewUserProps) => {
  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle>View User</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div><span className="font-medium">Name: </span>{user.name}</div>
            <div><span className="font-medium">Email: </span>{user.email}</div>
            <div><span className="font-medium">Role: </span><span className="capitalize">{user.role}</span></div>
            <div><span className="font-medium">Points: </span>{user.points}</div>
            {user.sellerType && <div><span className="font-medium">Seller Type: </span>{user.sellerType}</div>}
            {user.belt && <div><span className="font-medium">Belt: </span>{user.belt}</div>}
            <div><span className="font-medium">Completed Modules: </span>{user.completedModules.length}</div>
            {user.assignedTrainer && <div><span className="font-medium">Assigned Trainer ID: </span>{user.assignedTrainer}</div>}
          </div>
          <Button className="mt-6" variant="outline" onClick={onBack}>Back</Button>
        </CardContent>
      </Card>
    </div>
  );
};
