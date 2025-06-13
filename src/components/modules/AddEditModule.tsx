
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { BasicInfo } from "./BasicInfo";
import { ReelsModule } from "./ReelsModule";
import { ClassroomModule } from "./ClassroomModule";
import { InMarketTable } from "./InMarketTable";
import { MarkupTable } from "./MarkupTable";

export const AddEditModule = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const [activeTab, setActiveTab] = useState("basic-info");

  useEffect(() => {
    if (isEditing) {
      // Load module data for editing
      console.log("Loading module data for ID:", id);
    }
  }, [id, isEditing]);

  const handleSave = () => {
    // Save module data
    console.log("Saving module data");
    // After saving Basic Info, auto-navigate to Reels tab
    if (activeTab === "basic-info") {
      setActiveTab("reels");
    }
  };

  const handleBack = () => {
    navigate("/modules");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Modules
          </Button>
          <h1 className="text-3xl font-bold">
            {isEditing ? "Edit Module" : "Add New Module"}
          </h1>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Module
        </Button>
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
