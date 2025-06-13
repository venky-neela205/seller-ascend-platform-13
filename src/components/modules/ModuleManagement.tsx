
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Eye, Users } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { ModuleEditor } from "./ModuleEditor";
import { ViewModules } from "./ViewModules";
import { ModuleSellersMapping } from "./ModuleSellersMapping";

const modulesData = [
  {
    id: 1,
    title: "Product Knowledge Training",
    description: "Comprehensive product training for field staff",
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    sequence: 1,
    priority: "High",
    status: "Active",
    assignedTo: "Top Channel"
  },
  {
    id: 2,
    title: "Sales Techniques Workshop",
    description: "Advanced sales techniques for market performance",
    startDate: "2024-02-01",
    endDate: "2024-04-01",
    sequence: 2,
    priority: "Medium",
    status: "Draft",
    assignedTo: "Small Channel"
  },
  {
    id: 3,
    title: "Customer Service Excellence",
    description: "Customer handling and service excellence training",
    startDate: "2023-12-01",
    endDate: "2024-02-01",
    sequence: 3,
    priority: "Low",
    status: "Completed",
    assignedTo: "All Channels"
  }
];

export const ModuleManagement = () => {
  const { currentUser } = useUser();
  const [currentView, setCurrentView] = useState<"grid" | "editor" | "view" | "mapping">("grid");
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);

  const handleEdit = (moduleId: number) => {
    console.log("Edit module:", moduleId);
    setSelectedModuleId(moduleId);
    setCurrentView("editor");
  };

  const handleView = (moduleId: number) => {
    console.log("View module:", moduleId);
    setSelectedModuleId(moduleId);
    setCurrentView("view");
  };

  const handleMapSellers = (moduleId: number) => {
    console.log("Map sellers for module:", moduleId);
    setSelectedModuleId(moduleId);
    setCurrentView("mapping");
  };

  const handleAddNew = () => {
    console.log("Navigate to AddEditModule.tsx");
    setSelectedModuleId(null);
    setCurrentView("editor");
  };

  const handleBackToGrid = () => {
    setCurrentView("grid");
    setSelectedModuleId(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-blue-100 text-blue-800";
      case "Draft": return "bg-gray-100 text-gray-800";
      case "Completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Render different views based on current state
  if (currentView === "editor") {
    return (
      <ModuleEditor 
        moduleId={selectedModuleId} 
        onBack={handleBackToGrid}
        isAdmin={currentUser?.role === "sys-admin"}
      />
    );
  }

  if (currentView === "view" && selectedModuleId) {
    return (
      <ViewModules 
        moduleId={selectedModuleId} 
        onBack={handleBackToGrid}
      />
    );
  }

  if (currentView === "mapping" && selectedModuleId) {
    return (
      <ModuleSellersMapping 
        moduleId={selectedModuleId} 
        onBack={handleBackToGrid}
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Module Management</h1>
        {currentUser?.role === "sys-admin" && (
          <Button onClick={handleAddNew}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Module
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Modules Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sequence</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {modulesData.map((module) => (
                <TableRow key={module.id}>
                  <TableCell>{module.sequence}</TableCell>
                  <TableCell className="font-medium">{module.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{module.description}</TableCell>
                  <TableCell>{module.startDate}</TableCell>
                  <TableCell>{module.endDate}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(module.priority)}>
                      {module.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(module.status)}>
                      {module.status}
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
                      {currentUser?.role === "sys-admin" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(module.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {currentUser?.role === "distributor" && (
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
