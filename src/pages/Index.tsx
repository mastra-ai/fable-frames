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
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container px-4 py-16 md:py-24">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-story-text bg-clip-text text-transparent bg-gradient-to-r from-story-primary via-story-accent to-story-primary animate-float">
            Frame a Story, Shape a Lesson
            <span className="inline-block ml-2">
              <Sparkles className="h-8 w-8 md:h-12 md:w-12 text-story-accent" />
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-story-text/80 animate-fade-in">
            The simplest way to create a story with your child
          </p>
          <div className="pt-4">
            <Link to="/create">
              <Button
                size="lg"
                className="bg-story-accent hover:bg-story-accent/90 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Create your Fable ✨
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-story-text mb-12 text-center">
            ✨ Recent Fables ✨
          </h2>
          {isLoading ? (
            <div className="text-center text-2xl text-story-text/80 animate-pulse">
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