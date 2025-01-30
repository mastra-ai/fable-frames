import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-story-primary/10 py-4 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-start gap-3">
        <Link to="/" className="flex items-center gap-2 text-story-text hover:opacity-90 transition-opacity">
          <BookOpen className="h-8 w-8 text-story-primary" />
          <span className="text-2xl font-bold">FableFrames</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;