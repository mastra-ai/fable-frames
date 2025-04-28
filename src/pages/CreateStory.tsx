import StoryCreationForm from "@/components/StoryCreationForm";
import Header from "@/components/Header";

const CreateStory = () => {
  return (
    <>
      <div className="texture"></div>
      <div className="min-h-screen container mx-auto">
        <Header />
        <div className="container px-4 py-16 md:py-24">
          <div className="text-center space-y-6 max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight pb-2">
              Create Your Magical Story
            </h1>
            <p className="text-xl md:text-2xl">
              Let's bring your imagination to life
            </p>
          </div>
          <StoryCreationForm />
        </div>
      </div>
    </>
  );
};

export default CreateStory;
