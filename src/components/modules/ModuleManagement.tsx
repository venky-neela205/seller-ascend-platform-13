
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Eye, Users } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

// Sample module data - in a real app this would come from an API
const moduleData = [
  {
    id: 1,
    title: "Product Knowledge Training",
    description: "Comprehensive product training for all sales staff",
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    sequence: 1,
    priority: "High"
  },
  {
    id: 2,
    title: "Sales Techniques Workshop",
    description: "Advanced sales techniques and customer interaction methods",
    startDate: "2024-02-01",
    endDate: "2024-04-01",
    sequence: 2,
    priority: "Medium"
  },
  {
    id: 3,
    title: "Customer Service Excellence",
    description: "Customer handling and service excellence training",
    startDate: "2024-01-01",
    endDate: "2024-02-28",
    sequence: 3,
    priority: "Low"
  },
  {
    id: 4,
    title: "Digital Marketing Basics",
    description: "Introduction to digital marketing strategies and tools",
    startDate: "2024-03-01",
    endDate: "2024-05-01",
    sequence: 4,
    priority: "High"
  }
];

export const ModuleManagement = () => {
  const { currentUser } = useUser();
  const [modules] = useState(moduleData);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddModule = () => {
    console.log("Navigate to AddEditModule.tsx");
    // TODO: Navigate to AddEditModule component
  };

  const handleEditModule = (moduleId: number) => {
    console.log("Edit module:", moduleId);
    // TODO: Navigate to AddEditModule component with module data
  };

  const handleViewModule = (moduleId: number) => {
    console.log("View module:", moduleId);
    // TODO: Open read-only detail view
  };

  const handleMapSellers = (moduleId: number) => {
    console.log("Map sellers for module:", moduleId);
    // TODO: Open seller mapping interface
  };

  const isAdmin = currentUser?.role === "sys-admin";
  const isDistributor = currentUser?.role === "distributor";

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Modules</h1>
        {isAdmin && (
          <Button onClick={handleAddModule}>
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
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={module.description}>
                      {module.description}
                    </div>
                  </TableCell>
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
                      {isAdmin && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditModule(module.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewModule(module.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {isDistributor && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleMapSellers(module.id)}
                        >
                          <Users className="h-4 w-4" />
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
