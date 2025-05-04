import { Link, useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
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
    navigate("/");
    // Wait for navigation to complete before scrolling
    setTimeout(() => {
      const storiesSection = document.getElementById("stories-section");
      if (storiesSection) {
        storiesSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <header className="">
      <div className="flex h-16 mx-4 items-center">
        <Link to="/" className="flex items-center gap-2 mr-6">
          <img
            src="/FableFramesLogoSmall.png"
            alt="FableFrames Logo"
            className="h-8 w-auto"
          />
          <span className="text-2xl font-bold primary">FableFrames</span>
        </Link>
        {/* <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Button
                variant="ghost"
                className="text-base"
                onClick={handleBrowseStories}
              >
                Browse Stories
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}
        <div className="flex-1" />
        <Link to="/create">
          <Button className="">
            <Sparkles className="h-4 w-4" /> Create your Fable{" "}
            <Sparkles className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
