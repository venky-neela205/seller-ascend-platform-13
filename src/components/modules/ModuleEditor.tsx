
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { BasicInfo } from "./BasicInfo";
import { ReelsModule } from "./ReelsModule";
import { ClassroomModule } from "./ClassroomModule";
import { InMarketTable } from "./InMarketTable";
import { MarkupTable } from "./MarkupTable";

interface ModuleEditorProps {
  moduleId: number | null;
  onBack: () => void;
  isAdmin: boolean;
}

export const ModuleEditor = ({ moduleId, onBack, isAdmin }: ModuleEditorProps) => {
  const [activeTab, setActiveTab] = useState("basic-info");

  const isEditing = moduleId !== null;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Modules
          </Button>
          <h1 className="text-3xl font-bold">
            {isEditing ? "Edit Module" : "Create New Module"}
          </h1>
        </div>
        {isAdmin && (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Sub Module
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Module Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
              <TabsTrigger value="reels">Reels</TabsTrigger>
              <TabsTrigger value="classroom">Classroom Training</TabsTrigger>
              <TabsTrigger value="inmarket">In Market</TabsTrigger>
              <TabsTrigger value="markup">Markup</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic-info" className="mt-6">
              <BasicInfo />
            </TabsContent>
            
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
