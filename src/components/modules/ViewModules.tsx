
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronRight, ChevronDown } from "lucide-react";

interface ViewModulesProps {
  moduleId: number;
  onBack: () => void;
}

const moduleData = {
  id: 1,
  title: "Product Knowledge Training",
  description: "Comprehensive product training for field staff",
  startDate: "2024-01-15",
  endDate: "2024-03-15",
  sequence: 1,
  priority: "High",
  status: "Active",
  assignedTo: "Top Channel",
  subModules: [
    {
      id: 11,
      title: "Product Features Overview",
      description: "Basic product features and specifications",
      startDate: "2024-01-15",
      endDate: "2024-02-01",
      sequence: 1,
      priority: "High",
      status: "Active"
    },
    {
      id: 12,
      title: "Competitive Analysis",
      description: "Understanding competitor products and positioning",
      startDate: "2024-02-01",
      endDate: "2024-02-15",
      sequence: 2,
      priority: "Medium",
      status: "Active"
    },
    {
      id: 13,
      title: "Sales Objection Handling",
      description: "Common objections and how to handle them",
      startDate: "2024-02-15",
      endDate: "2024-03-15",
      sequence: 3,
      priority: "High",
      status: "Draft"
    }
  ]
};

export const ViewModules = ({ moduleId, onBack }: ViewModulesProps) => {
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

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

  const toggleExpanded = () => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Modules
        </Button>
        <h1 className="text-3xl font-bold">View Module Details</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Module Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Title</label>
              <p className="font-medium">{moduleData.title}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Sequence</label>
              <p className="font-medium">{moduleData.sequence}</p>
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <p className="font-medium">{moduleData.description}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Start Date</label>
              <p className="font-medium">{moduleData.startDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">End Date</label>
              <p className="font-medium">{moduleData.endDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Priority</label>
              <Badge className={getPriorityColor(moduleData.priority)}>
                {moduleData.priority}
              </Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <Badge className={getStatusColor(moduleData.status)}>
                {moduleData.status}
              </Badge>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Sub Modules</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleExpanded}
              >
                {expandedModule === moduleId ? (
                  <>
                    <ChevronDown className="mr-2 h-4 w-4" />
                    Collapse
                  </>
                ) : (
                  <>
                    <ChevronRight className="mr-2 h-4 w-4" />
                    Expand
                  </>
                )}
              </Button>
            </div>

            {expandedModule === moduleId && (
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {moduleData.subModules.map((subModule) => (
                    <TableRow key={subModule.id}>
                      <TableCell>{subModule.sequence}</TableCell>
                      <TableCell className="font-medium">{subModule.title}</TableCell>
                      <TableCell className="max-w-xs truncate">{subModule.description}</TableCell>
                      <TableCell>{subModule.startDate}</TableCell>
                      <TableCell>{subModule.endDate}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(subModule.priority)}>
                          {subModule.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(subModule.status)}>
                          {subModule.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
