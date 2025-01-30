import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StoryViewer from "@/components/StoryViewer";
import { getStoryById } from "@/services/storyService";
import type { Story } from "@/services/storyService";

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
    return <div className="text-center py-12">Loading story...</div>;
  }

  if (!story) {
    return <div className="text-center py-12">Story not found</div>;
  }

  return (
    <div className="min-h-screen bg-story-secondary py-12">
      <StoryViewer story={story} />
    </div>
  );
};

export default StoryPage;