import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
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
              <Link to="/">
                <Button variant="ghost" className="text-base">
                  Browse Stories
                </Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex-1" />
        <Link to="/create">
          <Button className="bg-story-accent hover:bg-story-accent/90">
            Start Writing ✨
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;