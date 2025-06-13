
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { BasicInfo } from "./BasicInfo";
import { QuestionModal } from "./QuestionModal";

export const ReelsModule = () => {
  return (
    <div className="space-y-6">
      <BasicInfo />
      
      <Card>
        <CardHeader>
          <CardTitle>Reels Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Upload Video</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Drop your video here or click to browse</p>
              <Button className="mt-4">
                <Upload className="mr-2 h-4 w-4" />
                Upload Video
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="points">Input Points</Label>
            <Input id="points" type="number" placeholder="Enter points for completion" />
          </div>

          <div className="flex justify-between items-center">
            <Label>Questions</Label>
            <QuestionModal />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
