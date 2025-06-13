
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface ModuleData {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  sequence: number;
  priority: string;
  assignTo: string;
  reels: Array<{
    id: string;
    videoUrl: string;
    points: number;
    questions: any[];
  }>;
  classroomTraining: Array<{
    id: string;
    videoUrl: string;
    points: number;
    questions: any[];
  }>;
}

export const ViewModule = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [moduleData, setModuleData] = useState<ModuleData | null>(null);

  useEffect(() => {
    // Mock data - in real app, this would come from an API
    setModuleData({
      id: id || "1",
      title: "Sales Fundamentals",
      description: "Basic sales training module covering essential techniques and strategies",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      sequence: 1,
      priority: "High",
      assignTo: "Top",
      reels: [
        {
          id: "r1",
          videoUrl: "video1.mp4",
          points: 100,
          questions: [
            { id: "q1", question: "What is the first step in sales?", options: ["Listen", "Talk", "Sell", "Close"] }
          ]
        }
      ],
      classroomTraining: [
        {
          id: "c1",
          videoUrl: "training1.mp4",
          points: 150,
          questions: [
            { id: "q2", question: "How to handle objections?", options: ["Ignore", "Address", "Argue", "Deflect"] }
          ]
        }
      ]
    });
  }, [id]);

  const handleBack = () => {
    navigate("/modules");
  };

  if (!moduleData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Modules
        </Button>
        <h1 className="text-3xl font-bold">View Module: {moduleData.title}</h1>
      </div>

      {/* Basic Info Section */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Title</label>
              <p className="text-lg">{moduleData.title}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Sequence</label>
              <p className="text-lg">{moduleData.sequence}</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Description</label>
            <p className="text-lg">{moduleData.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Start Date</label>
              <p className="text-lg">{moduleData.startDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">End Date</label>
              <p className="text-lg">{moduleData.endDate}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Assign To</label>
              <p className="text-lg">{moduleData.assignTo}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Priority</label>
              <Badge className="text-lg">{moduleData.priority}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reels Section */}
      <Card>
        <CardHeader>
          <CardTitle>Reels ({moduleData.reels.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {moduleData.reels.map((reel, index) => (
            <div key={reel.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Reel {index + 1}</h4>
                <Badge>Points: {reel.points}</Badge>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Play className="h-4 w-4" />
                <span className="text-sm text-gray-600">{reel.videoUrl}</span>
              </div>
              <p className="text-sm text-gray-600">
                Questions: {reel.questions.length}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Classroom Training Section */}
      <Card>
        <CardHeader>
          <CardTitle>Classroom Training ({moduleData.classroomTraining.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {moduleData.classroomTraining.map((training, index) => (
            <div key={training.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Training {index + 1}</h4>
                <Badge>Points: {training.points}</Badge>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Play className="h-4 w-4" />
                <span className="text-sm text-gray-600">{training.videoUrl}</span>
              </div>
              <p className="text-sm text-gray-600">
                Questions: {training.questions.length}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
