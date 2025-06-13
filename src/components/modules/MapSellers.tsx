
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface Seller {
  id: string;
  name: string;
  email: string;
  type: string;
  belt: string;
  isAssigned: boolean;
}

export const MapSellers = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSellers, setSelectedSellers] = useState<string[]>([]);
  const [sellers, setSellers] = useState<Seller[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      type: "Top Channel",
      belt: "White",
      isAssigned: false
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      type: "Small Channel",
      belt: "Green",
      isAssigned: true
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      type: "Zonal Channel",
      belt: "Black",
      isAssigned: false
    }
  ]);

  const filteredSellers = sellers.filter(seller =>
    seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seller.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSellerToggle = (sellerId: string) => {
    setSelectedSellers(prev =>
      prev.includes(sellerId)
        ? prev.filter(id => id !== sellerId)
        : [...prev, sellerId]
    );
  };

  const handleAssignSellers = () => {
    // Call API to assign sellers to module
    console.log("Assigning sellers:", selectedSellers, "to module:", moduleId);
    // Update local state
    setSellers(prev =>
      prev.map(seller =>
        selectedSellers.includes(seller.id)
          ? { ...seller, isAssigned: true }
          : seller
      )
    );
    setSelectedSellers([]);
  };

  const handleBack = () => {
    navigate("/modules");
  };

  const getBeltColor = (belt: string) => {
    switch (belt.toLowerCase()) {
      case "white": return "bg-gray-100 text-gray-800";
      case "green": return "bg-green-100 text-green-800";
      case "black": return "bg-gray-900 text-white";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Modules
          </Button>
          <h1 className="text-3xl font-bold">Map Sellers to Module</h1>
        </div>
        <Button 
          onClick={handleAssignSellers}
          disabled={selectedSellers.length === 0}
        >
          <Users className="mr-2 h-4 w-4" />
          Assign Selected ({selectedSellers.length})
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Sellers</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search sellers by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSellers.map((seller) => (
              <div
                key={seller.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={selectedSellers.includes(seller.id)}
                    onCheckedChange={() => handleSellerToggle(seller.id)}
                    disabled={seller.isAssigned}
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{seller.name}</h4>
                      {seller.isAssigned && (
                        <Badge variant="secondary">Already Assigned</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{seller.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{seller.type}</Badge>
                  <Badge className={getBeltColor(seller.belt)}>
                    {seller.belt} Belt
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
