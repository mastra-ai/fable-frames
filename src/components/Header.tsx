import { Link, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const navigate = useNavigate();

  const handleBrowseStories = () => {
    navigate('/');
    // Wait for navigation to complete before scrolling
    setTimeout(() => {
      const storiesSection = document.getElementById('stories-section');
      if (storiesSection) {
        storiesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2 mr-6">
          <BookOpen className="h-8 w-8 text-story-primary" />
          <span className="text-2xl font-bold bg-gradient-to-r from-story-primary to-story-accent bg-clip-text text-transparent">
            FableFrames
          </span>
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Button variant="ghost" className="text-base" onClick={handleBrowseStories}>
                Browse Stories
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex-1" />
        <Link to="/create">
          <Button className="bg-story-accent hover:bg-story-accent/90">
            Create your Fable ✨
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;