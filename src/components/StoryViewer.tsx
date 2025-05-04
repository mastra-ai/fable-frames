import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Story } from "@/services/storyService";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface StoryViewerProps {
  story: Story;
}

const StoryViewer = ({ story }: StoryViewerProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
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

  // Update currentPage when carousel changes
  const handleCarouselSelect = useCallback(() => {
    if (!api) return;
    setCurrentPage(api.selectedScrollSnap());
  }, [api]);

  // Set up the carousel API and event listeners
  useEffect(() => {
    if (!api) return;

    api.on("select", handleCarouselSelect);

    return () => {
      api.off("select", handleCarouselSelect);
    };
  }, [api, handleCarouselSelect]);

  // Programmatically navigate to a specific page
  const goToPage = (pageIndex: number) => {
    if (!api) return;
    api.scrollTo(pageIndex);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8 flex justify-between items-center rounded-2xl p-6">
        <h1 className="text-2xl md:text-4xl font-bold font-serif flex items-center gap-2">
          {story.title}
        </h1>
        <Button
          variant="outline"
          className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base bg-white hover:bg-story-accent transition-colors duration-300"
          onClick={handleShare}
        >
          <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Share Story</span>
          <span className="sm:hidden">Share</span>
        </Button>
      </div>

      <div className="relative mb-8">
        {/* Large screen navigation buttons (hidden on small screens) */}
        <Button
          variant="outline"
          onClick={() => goToPage(Math.max(0, currentPage - 1))}
          disabled={currentPage === 0}
          className="hidden lg:flex absolute left-[-60px] top-1/2 transform -translate-y-1/2 z-10 items-center justify-center size-12 rounded-full bg-white hover:bg-story-accent transition-colors duration-300 disabled:opacity-50"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <Button
          variant="outline"
          onClick={() =>
            goToPage(Math.min(story.images.length - 1, currentPage + 1))
          }
          disabled={currentPage === story.images.length - 1}
          className="hidden lg:flex absolute right-[-60px] top-1/2 transform -translate-y-1/2 z-10 items-center justify-center size-12 rounded-full bg-white hover:bg-story-accent transition-colors duration-300 disabled:opacity-50"
          aria-label="Next page"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        <Carousel
          setApi={setApi}
          opts={{
            loop: false,
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {story.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={image}
                    alt={`Story page ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-story-primary/90 to-transparent p-8 rounded-b-3xl">
                    <p className="text-sm md:text-xl lg:text-2xl text-white font-medium leading-relaxed animate-fade-in">
                      {story.texts[index]}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Small screen navigation (hidden on large screens) */}
      <div className="lg:hidden flex justify-between items-center bg-story-secondary rounded-2xl p-4 mb-8">
        <Button
          variant="outline"
          onClick={() => goToPage(Math.max(0, currentPage - 1))}
          disabled={currentPage === 0}
          className="flex items-center gap-2 bg-white hover:bg-story-accent transition-colors duration-300 disabled:opacity-50"
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
            goToPage(Math.min(story.images.length - 1, currentPage + 1))
          }
          disabled={currentPage === story.images.length - 1}
          className="flex items-center gap-2 bg-white hover:bg-story-accent transition-colors duration-300 disabled:opacity-50"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Large screen page indicator (hidden on small screens) */}
      <div className="hidden lg:flex justify-center items-center">
        <span className="text-lg font-medium px-4 bg-story-secondary rounded-2xl">
          Page {currentPage + 1} of {story.images.length}
        </span>
      </div>
    </div>
  );
};

export default StoryViewer;
