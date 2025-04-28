import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StoryViewer from "@/components/StoryViewer";
import { getStoryById } from "@/services/storyService";
import type { Story } from "@/services/storyService";
import Header from "@/components/Header";

const StoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStory = async () => {
      if (!id) return;
      try {
        const storyData = await getStoryById(id);
        setStory(storyData);
      } catch (error) {
        console.error("Failed to load story:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStory();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-story-secondary">
        <Header />
        <div className="text-center py-12">Loading story...</div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-story-secondary">
        <Header />
        <div className="text-center py-12">Story not found</div>
      </div>
    );
  }

  return (
    <>
      <div className="texture"></div>
      <div className="min-h-screen container mx-auto">
        <Header />
        <div className="py-12">
          <StoryViewer story={story} />
        </div>
      </div>
    </>
  );
};

export default StoryPage;
