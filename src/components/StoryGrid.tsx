import { Link } from "react-router-dom";
import type { Story } from "@/services/storyService";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface StoryGridProps {
  stories: Story[];
}

const StoryGrid = ({ stories }: StoryGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {stories.map((story) => (
        <Link
          key={story.id}
          to={`/story/${story.id}`}
          className="group"
        >
          <Card>
            <div className="relative w-full h-full aspect-square">
              <img
                src={story.images[0]}
                alt={story.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-story-primary/80 to-transparent flex items-end p-6">
                <CardHeader>
                  <CardTitle>
                    {story.title}
                  </CardTitle>
                </CardHeader>
              </div>
              <div className="absolute top-4 right-4 bg-story-accent text-white px-4 py-2 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Read Now!
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default StoryGrid;