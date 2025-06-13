
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ReelsModule } from "./ReelsModule";
import { ClassroomModule } from "./ClassroomModule";
import { InMarketTable } from "./InMarketTable";
import { MarkupTable } from "./MarkupTable";

export const ModuleManagement = () => {
  const [activeTab, setActiveTab] = useState("reels");

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Modules</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Module
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Module Types</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="reels">Reels</TabsTrigger>
              <TabsTrigger value="classroom">Classroom Training</TabsTrigger>
              <TabsTrigger value="inmarket">In Market</TabsTrigger>
              <TabsTrigger value="markup">Markup</TabsTrigger>
            </TabsList>
            
            <TabsContent value="reels" className="mt-6">
              <ReelsModule />
            </TabsContent>
            
            <TabsContent value="classroom" className="mt-6">
              <ClassroomModule />
            </TabsContent>
            
            <TabsContent value="inmarket" className="mt-6">
              <InMarketTable />
            </TabsContent>
            
            <TabsContent value="markup" className="mt-6">
              <MarkupTable />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
