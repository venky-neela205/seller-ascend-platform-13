
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

const markupData = [
  {
    id: 1,
    title: "Brand Guidelines Training",
    description: "Training on brand guidelines and markup standards",
    assignedTo: "Top",
    priority: "High",
    status: "Active",
    sequence: 1,
    startDate: "2024-01-10",
    endDate: "2024-03-10",
    markupType: "Visual"
  },
  {
    id: 2,
    title: "Content Creation Standards",
    description: "Standards for content creation and markup",
    assignedTo: "SmallChannel",
    priority: "Medium",
    status: "Draft",
    sequence: 2,
    startDate: "2024-02-15",
    endDate: "2024-04-15",
    markupType: "Text"
  },
  {
    id: 3,
    title: "Digital Asset Management",
    description: "Training on digital asset markup and management",
    assignedTo: "Top",
    priority: "Low",
    status: "Completed",
    sequence: 3,
    startDate: "2023-11-01",
    endDate: "2024-01-01",
    markupType: "Media"
  }
];

export const MarkupTable = () => {
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

  const getMarkupTypeColor = (type: string) => {
    switch (type) {
      case "Visual": return "bg-purple-100 text-purple-800";
      case "Text": return "bg-orange-100 text-orange-800";
      case "Media": return "bg-cyan-100 text-cyan-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Markup Modules</CardTitle>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Module
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sequence</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Markup Type</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {markupData.map((module) => (
              <TableRow key={module.id}>
                <TableCell>{module.sequence}</TableCell>
                <TableCell className="font-medium">{module.title}</TableCell>
                <TableCell className="max-w-xs truncate">{module.description}</TableCell>
                <TableCell>
                  <Badge className={getMarkupTypeColor(module.markupType)}>
                    {module.markupType}
                  </Badge>
                </TableCell>
                <TableCell>{module.assignedTo}</TableCell>
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
                <TableCell>{module.startDate}</TableCell>
                <TableCell>{module.endDate}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
