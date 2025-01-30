import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import StoryGrid from "@/components/StoryGrid";
import { getLatestStories } from "@/services/storyService";
import type { Story } from "@/services/storyService";
import { Sparkles } from "lucide-react";
import Header from "@/components/Header";

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
    <div className="min-h-screen bg-gradient-to-b from-story-secondary via-white to-story-secondary">
      <Header />
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center mb-12 space-y-6">
          <h1 className="text-6xl font-bold text-story-text mb-4 animate-float">
            Frame a Story, Shape a Lesson
            <span className="inline-block ml-2">
              <Sparkles className="h-12 w-12 text-story-accent" />
            </span>
          </h1>
          <p className="text-2xl text-story-text/80 mb-8 animate-fade-in">
            The simplest way to create a story with your child
          </p>
          <div className="mt-8">
            <Link to="/create">
              <Button
                size="lg"
                className="bg-story-accent hover:bg-story-accent/90 text-white px-12 py-6 rounded-full text-xl font-bold shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
              >
                Create Your Fable ✨
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-4xl font-bold text-story-text mb-8 text-center">
            ✨ Recent Fables ✨
          </h2>
          {isLoading ? (
            <div className="text-center text-2xl text-story-text animate-pulse">
              Loading magical stories...
            </div>
          ) : (
            <StoryGrid stories={stories} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;