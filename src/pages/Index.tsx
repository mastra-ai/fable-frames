import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import StoryGrid from "@/components/StoryGrid";
import { getFeaturedStories } from "@/services/storyService";
import type { Story } from "@/services/storyService";
import { Sparkles } from "lucide-react";
import Header from "@/components/Header";

const Index = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStories = async () => {
      try {
        const latestStories = await getFeaturedStories();
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
    <>
      <div className="texture"></div>
      <div className="min-h-screen container mx-auto">
        <Header />
        <div className="container px-4 py-16 md:py-24">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-extrabold font-serif tracking-tight lg:text-5xl animate-float">
              Frame a Story, Shape a Lesson
              <span className="inline-block ml-2">
                <Sparkles className="h-8 w-8 md:h-12 md:w-12" />
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-foreground/80">
              The simplest way to create a children's story
            </p>
            <div className="pt-4">
              <Link to="/create">
                <Button size="lg" variant="default">
                  <Sparkles className="h-4 w-4" /> Create your Fable{" "}
                  <Sparkles className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div id="stories-section" className="mt-24">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Featured Stories
            </h2>
            {isLoading ? (
              <div className="text-center text-2xl animate-pulse">
                Loading magical stories...
              </div>
            ) : (
              <StoryGrid stories={stories} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
