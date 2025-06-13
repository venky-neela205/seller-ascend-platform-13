
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Plus, Trash2 } from "lucide-react";
import { QuestionModal } from "./QuestionModal";

interface ClassroomItem {
  id: string;
  points: string;
  questions: any[];
}

export const ClassroomModule = () => {
  const [classroomItems, setClassroomItems] = useState<ClassroomItem[]>([
    { id: "1", points: "", questions: [] }
  ]);

  const addNewClassroom = () => {
    const newClassroom: ClassroomItem = {
      id: Date.now().toString(),
      points: "",
      questions: []
    };
    setClassroomItems([...classroomItems, newClassroom]);
  };

  const removeClassroom = (id: string) => {
    if (classroomItems.length > 1) {
      setClassroomItems(classroomItems.filter(item => item.id !== id));
    }
  };

  const updateClassroomPoints = (id: string, points: string) => {
    setClassroomItems(classroomItems.map(item => 
      item.id === id ? { ...item, points } : item
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Classroom Training Configuration</h3>
        <Button onClick={addNewClassroom}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Training
        </Button>
      </div>

      {classroomItems.map((classroom, index) => (
        <Card key={classroom.id}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Classroom Training {index + 1}</CardTitle>
              {classroomItems.length > 1 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => removeClassroom(classroom.id)}
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
              <Label htmlFor={`points-${classroom.id}`}>Input Points</Label>
              <Input 
                id={`points-${classroom.id}`} 
                type="number" 
                placeholder="Enter points for completion"
                value={classroom.points}
                onChange={(e) => updateClassroomPoints(classroom.id, e.target.value)}
              />
            </div>

            <div className="flex justify-between items-center">
              <Label>Questions</Label>
              <QuestionModal reelId={classroom.id} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
