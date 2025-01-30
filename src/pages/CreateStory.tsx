import StoryCreationForm from "@/components/StoryCreationForm";
import Header from "@/components/Header";

const CreateStory = () => {
  return (
    <div className="min-h-screen bg-story-secondary">
      <Header />
      <div className="py-12">
        <StoryCreationForm />
      </div>
    </div>
  );
};

export default CreateStory;