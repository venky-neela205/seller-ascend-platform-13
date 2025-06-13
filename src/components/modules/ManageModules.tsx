
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Eye, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface Module {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  sequence: number;
  priority: "High" | "Medium" | "Low";
}

export const ManageModules = () => {
  const { currentRole } = useAuth();
  const navigate = useNavigate();
  
  // Mock data - in real app, this would come from an API
  const [modules] = useState<Module[]>([
    {
      id: "1",
      title: "Sales Fundamentals",
      description: "Basic sales training module",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      sequence: 1,
      priority: "High"
    },
    {
      id: "2",
      title: "Advanced Techniques",
      description: "Advanced sales strategies",
      startDate: "2024-02-16",
      endDate: "2024-03-16",
      sequence: 2,
      priority: "Medium"
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleEdit = (moduleId: string) => {
    navigate(`/modules/edit/${moduleId}`);
  };

  const handleView = (moduleId: string) => {
    navigate(`/modules/view/${moduleId}`);
  };

  const handleMapSellers = (moduleId: string) => {
    navigate(`/modules/map-sellers/${moduleId}`);
  };

  const handleAddNew = () => {
    navigate("/modules/add");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Modules</h1>
        {currentRole === "Admin" && (
          <Button onClick={handleAddNew}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Module
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Training Modules</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Sequence</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {modules.map((module) => (
                <TableRow key={module.id}>
                  <TableCell className="font-medium">{module.title}</TableCell>
                  <TableCell>{module.description}</TableCell>
                  <TableCell>{module.startDate}</TableCell>
                  <TableCell>{module.endDate}</TableCell>
                  <TableCell>{module.sequence}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(module.priority)}>
                      {module.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(module.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {currentRole === "Admin" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(module.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {currentRole === "Distributor" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMapSellers(module.id)}
                        >
                          <Users className="h-4 w-4" />
                          Map Sellers
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
