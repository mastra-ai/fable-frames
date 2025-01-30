import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Share2 } from "lucide-react";
import type { Story } from "@/services/storyService";

interface StoryViewerProps {
  story: Story;
}

const StoryViewer = ({ story }: StoryViewerProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: story.title,
        text: "Check out this magical story!",
        url: window.location.href,
      });
    } catch (error) {
      console.log("Sharing failed", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-story-text">{story.title}</h1>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4" />
          Share Story
        </Button>
      </div>

      <div className="relative aspect-[16/9] mb-8">
        <img
          src={story.images[currentPage]}
          alt={`Story page ${currentPage + 1}`}
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 rounded-b-lg">
          <p className="text-white text-xl font-medium">
            {story.texts[currentPage]}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
          disabled={currentPage === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <span className="text-story-text">
          Page {currentPage + 1} of {story.images.length}
        </span>
        <Button
          variant="outline"
          onClick={() =>
            setCurrentPage(Math.min(story.images.length - 1, currentPage + 1))
          }
          disabled={currentPage === story.images.length - 1}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default StoryViewer;