import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Upload, Trash2 } from "lucide-react";

interface QuestionOption {
  id: string;
  sequence: number;
  text: string;
}

interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
  correctAnswer: string;
}

interface QuestionModalProps {
  reelId: string;
}

export const QuestionModal = ({ reelId }: QuestionModalProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: "",
    question: "",
    options: [{ id: "1", sequence: 1, text: "" }],
    correctAnswer: ""
  });
  const [isOpen, setIsOpen] = useState(false);

  const addOption = () => {
    const newOption: QuestionOption = {
      id: Date.now().toString(),
      sequence: currentQuestion.options.length + 1,
      text: ""
    };
    setCurrentQuestion({
      ...currentQuestion,
      options: [...currentQuestion.options, newOption]
    });
  };

  const removeOption = (optionId: string) => {
    if (currentQuestion.options.length > 1) {
      setCurrentQuestion({
        ...currentQuestion,
        options: currentQuestion.options.filter(option => option.id !== optionId)
      });
    }
  };

  const updateOption = (id: string, field: keyof QuestionOption, value: string | number) => {
    setCurrentQuestion({
      ...currentQuestion,
      options: currentQuestion.options.map(option => 
        option.id === id ? { ...option, [field]: value } : option
      )
    });
  };

  const saveQuestion = () => {
    if (currentQuestion.question.trim()) {
      const newQuestion: Question = {
        ...currentQuestion,
        id: currentQuestion.id || Date.now().toString()
      };
      
      if (currentQuestion.id) {
        setQuestions(questions.map(q => q.id === currentQuestion.id ? newQuestion : q));
      } else {
        setQuestions([...questions, newQuestion]);
      }
      
      resetCurrentQuestion();
    }
  };

  const resetCurrentQuestion = () => {
    setCurrentQuestion({
      id: "",
      question: "",
      options: [{ id: "1", sequence: 1, text: "" }],
      correctAnswer: ""
    });
  };

  const editQuestion = (question: Question) => {
    setCurrentQuestion(question);
  };

  const deleteQuestion = (questionId: string) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const addNewQuestion = () => {
    resetCurrentQuestion();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Questions ({questions.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Questions</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Existing Questions List */}
          {questions.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium">Existing Questions</h4>
              {questions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium">Question {index + 1}</p>
                      <p className="text-sm text-gray-600">{question.question}</p>
                      <p className="text-xs text-gray-500">{question.options.length} options</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => editQuestion(question)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => deleteQuestion(question.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add/Edit Question Form */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">
                {currentQuestion.id ? 'Edit Question' : 'Add New Question'}
              </h4>
              {currentQuestion.id && (
                <Button variant="outline" onClick={addNewQuestion}>
                  Add New Question
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="question">Question</Label>
              <Textarea 
                id="question" 
                placeholder="Enter your question here"
                value={currentQuestion.question}
                onChange={(e) => setCurrentQuestion({
                  ...currentQuestion,
                  question: e.target.value
                })}
              />
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
              <RadioGroup 
                value={currentQuestion.correctAnswer} 
                onValueChange={(value) => setCurrentQuestion({
                  ...currentQuestion,
                  correctAnswer: value
                })}
              >
                {currentQuestion.options.map((option) => (
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
                        <div className="flex gap-2">
                          <Input
                            value={option.text}
                            onChange={(e) => updateOption(option.id, "text", e.target.value)}
                            placeholder="Enter option text"
                            className="flex-1"
                          />
                          {currentQuestion.options.length > 1 && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => removeOption(option.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
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
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Close
              </Button>
              <Button onClick={saveQuestion}>
                {currentQuestion.id ? 'Update Question' : 'Save Question'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
