
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save } from "lucide-react";

interface ModuleSellersMappingProps {
  moduleId: number;
  onBack: () => void;
}

const moduleData = {
  id: 1,
  title: "Product Knowledge Training",
  description: "Comprehensive product training for field staff"
};

const sellersData = [
  {
    id: "seller1",
    name: "John Smith",
    email: "john.smith@company.com",
    sellerType: "top-channel",
    belt: "white",
    points: 250,
    assigned: true
  },
  {
    id: "seller2",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    sellerType: "small-channel",
    belt: "green",
    points: 450,
    assigned: false
  },
  {
    id: "seller3",
    name: "Mike Wilson",
    email: "mike.wilson@company.com",
    sellerType: "top-channel",
    belt: "black",
    points: 800,
    assigned: true
  },
  {
    id: "seller4",
    name: "Lisa Davis",
    email: "lisa.davis@company.com",
    sellerType: "zonal-channel",
    belt: "white",
    points: 150,
    assigned: false
  },
  {
    id: "seller5",
    name: "Tom Brown",
    email: "tom.brown@company.com",
    sellerType: "small-channel",
    belt: "green",
    points: 320,
    assigned: true
  }
];

export const ModuleSellersMapping = ({ moduleId, onBack }: ModuleSellersMappingProps) => {
  const [sellers, setSellers] = useState(sellersData);

  const handleSellerToggle = (sellerId: string) => {
    setSellers(sellers.map(seller => 
      seller.id === sellerId 
        ? { ...seller, assigned: !seller.assigned }
        : seller
    ));
  };

  const handleSaveMapping = () => {
    console.log("Saving seller mapping for module:", moduleId);
    console.log("Assigned sellers:", sellers.filter(s => s.assigned));
    // TODO: Implement save functionality
  };

  const getBeltColor = (belt: string) => {
    switch (belt) {
      case "white": return "bg-gray-100 text-gray-800";
      case "green": return "bg-green-100 text-green-800";
      case "black": return "bg-gray-900 text-white";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const getSellerTypeColor = (type: string) => {
    switch (type) {
      case "top-channel": return "bg-blue-100 text-blue-800";
      case "small-channel": return "bg-yellow-100 text-yellow-800";
      case "zonal-channel": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const assignedCount = sellers.filter(s => s.assigned).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Modules
          </Button>
          <h1 className="text-3xl font-bold">Map Sellers to Module</h1>
        </div>
        <Button onClick={handleSaveMapping}>
          <Save className="mr-2 h-4 w-4" />
          Save Mapping
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {moduleData.title}
            <Badge className="ml-2 bg-blue-100 text-blue-800">
              {assignedCount} Assigned
            </Badge>
          </CardTitle>
          <p className="text-muted-foreground">{moduleData.description}</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Assign</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Seller Type</TableHead>
                <TableHead>Belt</TableHead>
                <TableHead>Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sellers.map((seller) => (
                <TableRow key={seller.id}>
                  <TableCell>
                    <Checkbox
                      checked={seller.assigned}
                      onCheckedChange={() => handleSellerToggle(seller.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{seller.name}</TableCell>
                  <TableCell>{seller.email}</TableCell>
                  <TableCell>
                    <Badge className={getSellerTypeColor(seller.sellerType)}>
                      {seller.sellerType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getBeltColor(seller.belt)}>
                      {seller.belt} belt
                    </Badge>
                  </TableCell>
                  <TableCell>{seller.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
