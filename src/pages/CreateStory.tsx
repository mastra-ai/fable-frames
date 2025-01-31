import StoryCreationForm from "@/components/StoryCreationForm";
import Header from "@/components/Header";

const CreateStory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container px-4 py-16 md:py-24">
        <div className="text-center space-y-6 max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-story-text bg-clip-text text-transparent bg-gradient-to-r from-story-primary via-story-accent to-story-primary animate-float">
            Create Your Magical Story
          </h1>
          <p className="text-xl md:text-2xl text-story-text/80">
            Let's bring your imagination to life
          </p>
        </div>
        <StoryCreationForm />
      </div>
    </div>
  );
};

export default CreateStory;