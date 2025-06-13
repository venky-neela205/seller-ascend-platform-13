
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Plus, Trash2 } from "lucide-react";
import { QuestionModal } from "./QuestionModal";

interface ReelItem {
  id: string;
  points: string;
  questions: any[];
}

export const ReelsModule = () => {
  const [reelItems, setReelItems] = useState<ReelItem[]>([
    { id: "1", points: "", questions: [] }
  ]);

  const addNewReel = () => {
    const newReel: ReelItem = {
      id: Date.now().toString(),
      points: "",
      questions: []
    };
    setReelItems([...reelItems, newReel]);
  };

  const removeReel = (id: string) => {
    if (reelItems.length > 1) {
      setReelItems(reelItems.filter(item => item.id !== id));
    }
  };

  const updateReelPoints = (id: string, points: string) => {
    setReelItems(reelItems.map(item => 
      item.id === id ? { ...item, points } : item
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Reels Configuration</h3>
        <Button onClick={addNewReel}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Reel
        </Button>
      </div>

      {reelItems.map((reel, index) => (
        <Card key={reel.id}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Reel {index + 1}</CardTitle>
              {reelItems.length > 1 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => removeReel(reel.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
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
              <Label htmlFor={`points-${reel.id}`}>Input Points</Label>
              <Input 
                id={`points-${reel.id}`} 
                type="number" 
                placeholder="Enter points for completion"
                value={reel.points}
                onChange={(e) => updateReelPoints(reel.id, e.target.value)}
              />
            </div>

            <div className="flex justify-between items-center">
              <Label>Questions</Label>
              <QuestionModal reelId={reel.id} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
