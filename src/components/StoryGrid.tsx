import { Link } from "react-router-dom";
import type { Story } from "@/services/storyService";

interface StoryGridProps {
  stories: Story[];
}

const StoryGrid = ({ stories }: StoryGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {stories.map((story) => (
        <Link
          key={story.id}
          to={`/story/${story.id}`}
          className="group relative aspect-square overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
        >
          <img
            src={story.images[0]}
            alt={story.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <h3 className="text-white text-xl font-bold group-hover:scale-105 transition-transform">
              {story.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default StoryGrid;