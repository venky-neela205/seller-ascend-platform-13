
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Filter, Calendar } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

export const DistributorReports = () => {
  const { users } = useUser();
  
  // Filter sellers only
  const sellers = users.filter(user => user.role === "seller");
  
  const getBeltColor = (belt?: string) => {
    switch (belt) {
      case "white": return "bg-gray-100 text-gray-800";
      case "green": return "bg-green-100 text-green-800";
      case "black": return "bg-gray-900 text-white";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const getProgressPercentage = (completedModules: string[]) => {
    const totalModules = 5; // Assuming 5 modules total
    return Math.round((completedModules.length / totalModules) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Distributor Reports</h2>
          <p className="text-muted-foreground">Comprehensive analytics and performance tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sellers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sellers.length}</div>
            <p className="text-xs text-muted-foreground">Active sellers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(sellers.reduce((acc, seller) => acc + getProgressPercentage(seller.completedModules), 0) / sellers.length || 0)}%
            </div>
            <p className="text-xs text-muted-foreground">Module completion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Belt Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sellers.filter(s => s.belt === "black").length}B / 
              {sellers.filter(s => s.belt === "green").length}G / 
              {sellers.filter(s => s.belt === "white").length}W
            </div>
            <p className="text-xs text-muted-foreground">Black/Green/White</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sellers.reduce((acc, seller) => acc + seller.points, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Cumulative points</p>
          </CardContent>
        </Card>
      </div>

      {/* Seller Progress Report */}
      <Card>
        <CardHeader>
          <CardTitle>Seller Progress Report</CardTitle>
          <CardDescription>Detailed view of seller performance and training progress</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Seller Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Belt</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Modules</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sellers.map((seller) => (
                <TableRow key={seller.id}>
                  <TableCell className="font-medium">{seller.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {seller.sellerType?.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {seller.belt && (
                      <Badge className={getBeltColor(seller.belt)}>
                        {seller.belt} Belt
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{seller.points}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${getProgressPercentage(seller.completedModules)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {getProgressPercentage(seller.completedModules)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{seller.completedModules.length}/5</TableCell>
                  <TableCell>
                    <Badge 
                      variant={getProgressPercentage(seller.completedModules) >= 80 ? "default" : "secondary"}
                    >
                      {getProgressPercentage(seller.completedModules) >= 80 ? "On Track" : "Needs Attention"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Module Completion Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Module Completion Summary</CardTitle>
            <CardDescription>Progress across all training modules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Module 1: Product Knowledge', 'Module 2: Sales Techniques', 'Module 3: Customer Service', 'Module 4: Digital Tools', 'Module 5: Advanced Strategies'].map((module, index) => {
                const moduleId = `mod-${index + 1}`;
                const completedCount = sellers.filter(seller => seller.completedModules.includes(moduleId)).length;
                const percentage = Math.round((completedCount / sellers.length) * 100);
                
                return (
                  <div key={moduleId} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{module}</span>
                      <span className="text-sm text-muted-foreground">{completedCount}/{sellers.length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <CardDescription>Key observations and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800">Top Performers</h4>
                <p className="text-sm text-green-700 mt-1">
                  {sellers.filter(s => getProgressPercentage(s.completedModules) >= 80).length} sellers are performing excellently
                </p>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-800">Needs Support</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  {sellers.filter(s => getProgressPercentage(s.completedModules) < 50).length} sellers require additional training support
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800">Belt Progression</h4>
                <p className="text-sm text-blue-700 mt-1">
                  {sellers.filter(s => s.belt === "white").length} sellers ready for Green Belt evaluation
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Channel Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Channel Performance Analysis</CardTitle>
          <CardDescription>Performance breakdown by seller type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['top-channel', 'small-channel', 'zonal-channel'].map((channelType) => {
              const channelSellers = sellers.filter(s => s.sellerType === channelType);
              const avgProgress = channelSellers.length > 0 
                ? Math.round(channelSellers.reduce((acc, seller) => acc + getProgressPercentage(seller.completedModules), 0) / channelSellers.length)
                : 0;
              const avgPoints = channelSellers.length > 0
                ? Math.round(channelSellers.reduce((acc, seller) => acc + seller.points, 0) / channelSellers.length)
                : 0;

              return (
                <div key={channelType} className="p-4 border rounded-lg">
                  <h4 className="font-medium capitalize mb-2">{channelType.replace('-', ' ')}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Sellers:</span>
                      <span className="font-medium">{channelSellers.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Progress:</span>
                      <span className="font-medium">{avgProgress}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Points:</span>
                      <span className="font-medium">{avgPoints}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
