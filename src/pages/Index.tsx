import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import StoryGrid from "@/components/StoryGrid";
import { getLatestStories } from "@/services/storyService";
import type { Story } from "@/services/storyService";

const Index = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStories = async () => {
      try {
        const latestStories = await getLatestStories();
        setStories(latestStories);
      } catch (error) {
        console.error("Failed to load stories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStories();
  }, []);

  return (
    <div className="min-h-screen bg-story-secondary">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-story-text mb-4 animate-float">
            Create Magical Bedtime Stories
          </h1>
          <p className="text-xl text-story-text/80 mb-8">
            Generate unique stories for your little ones with just a few clicks
          </p>
          <Link to="/create">
            <Button
              size="lg"
              className="bg-story-primary hover:bg-story-primary/90 text-white px-8"
            >
              Start Your Story
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-story-text mb-6">
            Latest Stories
          </h2>
          {isLoading ? (
            <div className="text-center">Loading stories...</div>
          ) : (
            <StoryGrid stories={stories} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;