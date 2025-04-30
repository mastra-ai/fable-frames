import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  generateCharacterImages,
  generateStory,
  type Character,
} from "@/services/storyService";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles } from "lucide-react";
import { Card } from "./ui/card";

// Define the Style interface to match the structure in styles.json
interface Style {
  id: string;
  name: string;
  image: string;
  prompt: string;
}

// Import styles data
import stylesData from "@/data/styles.json";
const styles = stylesData as Style[];

const StoryCreationForm = () => {
  const [step, setStep] = useState(1);
  const [characterDescription, setCharacterDescription] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [characterName, setCharacterName] = useState("");
  const [storyDescription, setStoryDescription] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStyleSelection = (styleId: string) => {
    setSelectedStyle(styleId);
  };

  const handleStyleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStyle) {
      toast({
        title: "Select a Style",
        description: "Please select a story style to continue.",
        variant: "destructive",
      });
      return;
    }
    setStep(2);
  };

  const handleGenerateCharacter = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const images = await generateCharacterImages(
        characterDescription,
        styles.find((s) => s.id === selectedStyle)?.prompt || ""
      );
      setCharacters(images);
      setStep(3);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate character images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCharacterSelection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCharacter || !characterName.trim()) {
      toast({
        title: "Required Fields",
        description: "Please select a character and provide a name.",
        variant: "destructive",
      });
      return;
    }
    setStep(4);
  };

  const handleGenerateStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCharacter || !selectedStyle) return;
    setIsLoading(true);
    try {
      const story = await generateStory(
        selectedCharacter.imageUrl,
        storyDescription,
        selectedStyle // This is now the styleId
      );
      navigate(`/story/${story.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate story. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto space-y-8 p-8">
      {/* <div className="max-w-2xl mx-auto space-y-8 bg-white rounded-2xl shadow-lg p-8"> */}
      {step === 1 && (
        <form onSubmit={handleStyleSubmit} className="space-y-6">
          <h2 className="text-3xl font-bold text-story-text text-center flex items-center justify-center gap-2">
            Select Your Story Style
            <Sparkles className="h-6 w-6 text-story-accent" />
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {styles.map((style) => (
              <div
                key={style.id}
                className={`cursor-pointer p-2 rounded-xl border transition-all flex flex-col items-center justify-center gap-2 ${
                  selectedStyle === style.id
                    ? "ring-4 ring-story-accent"
                    : "hover:ring-2 ring-story-primary/50"
                }`}
                onClick={() => handleStyleSelection(style.id)}
              >
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full object-cover rounded-lg"
                />
                <span className="font-semibold text-center text-sm">
                  {style.name}
                </span>
              </div>
            ))}
          </div>
          <Button type="submit" className="w-full" disabled={!selectedStyle}>
            Next Step
          </Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleGenerateCharacter} className="space-y-6">
          <h2 className="text-3xl font-bold text-story-text text-center flex items-center justify-center gap-2">
            Describe Your Main Character
            <Sparkles className="h-6 w-6 text-story-accent" />
          </h2>
          <Textarea
            value={characterDescription}
            onChange={(e) => setCharacterDescription(e.target.value)}
            placeholder="Describe your main character. The more detail the better..."
            className="min-h-[150px] border-story-primary/20 focus:border-story-primary"
            required
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Character"}
          </Button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleCharacterSelection} className="space-y-6">
          <h2 className="text-3xl font-bold font-serif text-center flex items-center justify-center gap-2">
            Choose Your Character
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {characters.map((char) => (
              <div
                key={char.id}
                className={`cursor-pointer p-2 rounded-xl transition-all transform hover:scale-105 ${
                  selectedCharacter?.id === char.id
                    ? "ring-4 ring-story-accent shadow-lg"
                    : "hover:ring-2 ring-story-primary/50 hover:shadow-md"
                }`}
                onClick={() => setSelectedCharacter(char)}
              >
                <img
                  src={char.imageUrl}
                  alt="Character option"
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
          <Textarea
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            placeholder="Give your character a name..."
            className="min-h-[80px] border-story-primary/20 focus:border-story-primary"
            required
          />
          <Button type="submit" className="w-full">
            Next Step
          </Button>
        </form>
      )}

      {step === 4 && (
        <form onSubmit={handleGenerateStory} className="space-y-6">
          <h2 className="text-3xl font-bold font-serif text-center flex items-center justify-center gap-2">
            Create Your Story
            <Sparkles className="h-6 w-6 text-story-accent" />
          </h2>
          <Textarea
            value={storyDescription}
            onChange={(e) => setStoryDescription(e.target.value)}
            placeholder="Describe the magical adventure..."
            className="min-h-[150px] border-story-primary/20 focus:border-story-primary"
            required
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Story..." : "Create Story"}
          </Button>
        </form>
      )}
    </Card>
  );
};

export default StoryCreationForm;
