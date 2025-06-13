
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

const inMarketData = [
  {
    id: 1,
    title: "Product Knowledge Training",
    description: "Comprehensive product training for field staff",
    assignedTo: "Top",
    priority: "High",
    status: "Active",
    sequence: 1,
    startDate: "2024-01-15",
    endDate: "2024-03-15"
  },
  {
    id: 2,
    title: "Sales Techniques Workshop",
    description: "Advanced sales techniques for market performance",
    assignedTo: "SmallChannel",
    priority: "Medium",
    status: "Draft",
    sequence: 2,
    startDate: "2024-02-01",
    endDate: "2024-04-01"
  },
  {
    id: 3,
    title: "Customer Service Excellence",
    description: "Customer handling and service excellence training",
    assignedTo: "Top",
    priority: "Low",
    status: "Completed",
    sequence: 3,
    startDate: "2023-12-01",
    endDate: "2024-02-01"
  }
];

export const InMarketTable = () => {
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

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>In Market Modules</CardTitle>
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
              <TableHead>Assigned To</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inMarketData.map((module) => (
              <TableRow key={module.id}>
                <TableCell>{module.sequence}</TableCell>
                <TableCell className="font-medium">{module.title}</TableCell>
                <TableCell className="max-w-xs truncate">{module.description}</TableCell>
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
