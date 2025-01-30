import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateCharacterImages, generateStory, type Character } from "@/services/storyService";
import { useToast } from "@/components/ui/use-toast";

const StoryCreationForm = () => {
  const [step, setStep] = useState(1);
  const [characterDescription, setCharacterDescription] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [characterName, setCharacterName] = useState("");
  const [storyDescription, setStoryDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGenerateCharacter = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const images = await generateCharacterImages(characterDescription);
      setCharacters(images);
      setStep(2);
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
    setStep(3);
  };

  const handleGenerateStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCharacter) return;
    
    setIsLoading(true);
    try {
      const story = await generateStory(selectedCharacter.imageUrl, storyDescription);
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
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      {step === 1 && (
        <form onSubmit={handleGenerateCharacter} className="space-y-6">
          <h2 className="text-3xl font-bold text-story-text text-center">Describe Your Character</h2>
          <Textarea
            value={characterDescription}
            onChange={(e) => setCharacterDescription(e.target.value)}
            placeholder="Describe your magical character..."
            className="min-h-[150px]"
            required
          />
          <Button
            type="submit"
            className="w-full bg-story-primary hover:bg-story-primary/90"
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate Character"}
          </Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleCharacterSelection} className="space-y-6">
          <h2 className="text-3xl font-bold text-story-text text-center">Choose Your Character</h2>
          <div className="grid grid-cols-3 gap-4">
            {characters.map((char) => (
              <div
                key={char.id}
                className={`cursor-pointer p-2 rounded-lg transition-all ${
                  selectedCharacter?.id === char.id
                    ? "ring-4 ring-story-accent"
                    : "hover:ring-2 ring-story-primary"
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
            className="min-h-[80px]"
            required
          />
          <Button
            type="submit"
            className="w-full bg-story-primary hover:bg-story-primary/90"
          >
            Next Step
          </Button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleGenerateStory} className="space-y-6">
          <h2 className="text-3xl font-bold text-story-text text-center">Create Your Story</h2>
          <Textarea
            value={storyDescription}
            onChange={(e) => setStoryDescription(e.target.value)}
            placeholder="Describe the magical adventure..."
            className="min-h-[150px]"
            required
          />
          <Button
            type="submit"
            className="w-full bg-story-primary hover:bg-story-primary/90"
            disabled={isLoading}
          >
            {isLoading ? "Creating Story..." : "Create Story"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default StoryCreationForm;