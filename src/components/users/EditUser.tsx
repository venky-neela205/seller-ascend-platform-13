
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { User } from "@/contexts/UserContext";
import { useUser } from "@/contexts/UserContext";

interface EditUserProps {
  user: User;
  onBack: () => void;
}

export const EditUser = ({ user, onBack }: EditUserProps) => {
  const { users, setUsers } = useUser();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    points: user.points,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "points" ? Number(value) : value }));
  };

  const handleSave = () => {
    const updatedUsers = users.map(u => 
      u.id === user.id 
        ? { ...u, ...formData }
        : u
    );
    setUsers(updatedUsers);
    onBack();
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle>Edit User</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Name</label>
              <Input name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <label className="block font-medium mb-1">Email</label>
              <Input name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label className="block font-medium mb-1">Points</label>
              <Input name="points" type="number" value={formData.points} onChange={handleChange} />
            </div>
          </div>
          <div className="flex justify-between gap-2 mt-6">
            <Button variant="outline" onClick={onBack}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
