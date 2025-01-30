import { Link } from "react-router-dom";
import type { Story } from "@/services/storyService";

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
          className="group relative aspect-square overflow-hidden rounded-3xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl transform hover:-rotate-2"
        >
          <img
            src={story.images[0]}
            alt={story.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-story-primary/80 to-transparent flex items-end p-6">
            <h3 className="text-white text-2xl font-bold group-hover:scale-105 transition-transform">
              {story.title}
            </h3>
          </div>
          <div className="absolute top-4 right-4 bg-story-accent text-white px-4 py-2 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Read Now!
          </div>
        </Link>
      ))}
    </div>
  );
};

export default StoryGrid;