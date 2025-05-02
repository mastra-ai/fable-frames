import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Share2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Story } from "@/services/storyService";

interface StoryViewerProps {
  story: Story;
}

const StoryViewer = ({ story }: StoryViewerProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: story.title,
          text: "Check out this magical story!",
          url: window.location.href,
        });
        toast({
          title: "Shared successfully!",
          description: "The story has been shared.",
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "The story link has been copied to your clipboard.",
        });
      }
    } catch (error) {
      console.log("Sharing failed", error);
      toast({
        title: "Sharing failed",
        description:
          "Unable to share the story. Please try copying the URL manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8 flex justify-between items-center rounded-2xl p-6">
        <h1 className="text-4xl font-bold font-serif flex items-center gap-2">
          {story.title}
        </h1>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-white hover:bg-story-accent hover:text-white transition-colors duration-300"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4" />
          Share Story
        </Button>
      </div>

      <div className="relative mb-8 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
        <img
          src={story.images[currentPage]}
          alt={`Story page ${currentPage + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-story-primary/90 to-transparent p-8 rounded-b-3xl">
          <p className="text-white text-2xl font-medium leading-relaxed animate-fade-in">
            {story.texts[currentPage]}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center bg-story-secondary rounded-2xl p-4">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
          disabled={currentPage === 0}
          className="flex items-center gap-2 bg-white hover:bg-story-accent hover:text-white transition-colors duration-300 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <span className="text-lg font-medium px-4 py-2">
          Page {currentPage + 1} of {story.images.length}
        </span>
        <Button
          variant="outline"
          onClick={() =>
            setCurrentPage(Math.min(story.images.length - 1, currentPage + 1))
          }
          disabled={currentPage === story.images.length - 1}
          className="flex items-center gap-2 bg-white hover:bg-story-accent hover:text-white transition-colors duration-300 disabled:opacity-50"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default StoryViewer;
