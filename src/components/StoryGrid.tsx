import { Link } from "react-router-dom";
import type { Story } from "@/services/storyService";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { MaskedImage } from "./ui/masked-image";

interface StoryGridProps {
  stories: Story[];
}

const StoryGrid = ({ stories }: StoryGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {stories.map((story) => (
        <Link key={story.id} to={`/story/${story.id}`} className="group">
          <div className="relative w-full h-full aspect-square">
            <MaskedImage
              src={story.images[0]}
              alt={story.title}
              width={500}
              height={500}
              variant="shape3"
            />
            {/* <img
              src={story.images[0]}
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            /> */}
            {/* <div className="absolute inset-0 flex items-end p-6">
              <CardHeader>
                <CardTitle>{story.title}</CardTitle>
              </CardHeader>
            </div> */}
            <div className="absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Read Now!
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default StoryGrid;
