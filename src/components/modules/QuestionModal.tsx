
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Upload } from "lucide-react";

interface QuestionOption {
  id: string;
  sequence: number;
  text: string;
}

export const QuestionModal = () => {
  const [options, setOptions] = useState<QuestionOption[]>([
    { id: "1", sequence: 1, text: "" }
  ]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");

  const addOption = () => {
    const newOption: QuestionOption = {
      id: Date.now().toString(),
      sequence: options.length + 1,
      text: ""
    };
    setOptions([...options, newOption]);
  };

  const updateOption = (id: string, field: keyof QuestionOption, value: string | number) => {
    setOptions(options.map(option => 
      option.id === id ? { ...option, [field]: value } : option
    ));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Questions
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Question</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="question">Question</Label>
            <Textarea id="question" placeholder="Enter your question here" />
          </div>

          <div className="space-y-2">
            <Label>Optional File Upload</Label>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Upload className="mr-2 h-4 w-4" />
                Upload Audio
              </Button>
              <Button variant="outline" className="flex-1">
                <Upload className="mr-2 h-4 w-4" />
                Upload PDF
              </Button>
              <Button variant="outline" className="flex-1">
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Answer Options</Label>
            <RadioGroup value={correctAnswer} onValueChange={setCorrectAnswer}>
              {options.map((option) => (
                <div key={option.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <RadioGroupItem value={option.id} />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Sequence</Label>
                      <Input
                        type="number"
                        value={option.sequence}
                        onChange={(e) => updateOption(option.id, "sequence", parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Text</Label>
                      <Input
                        value={option.text}
                        onChange={(e) => updateOption(option.id, "text", e.target.value)}
                        placeholder="Enter option text"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
            
            <Button onClick={addOption} variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add New Option
            </Button>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save Question</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
