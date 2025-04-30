import { supabase } from "@/integrations/supabase/client";

import { MastraClient } from "@mastra/client-js";

const client = new MastraClient({
  baseUrl: "http://localhost:4111", // Default Mastra development server port
});

export interface Character {
  id: string;
  imageUrl: string;
}

export interface Story {
  id: string;
  title: string;
  images: string[];
  texts: string[];
  createdAt: string;
  characterImage: string;
  styleId: string;
}

type StoryContent = {
  image: string;
  text: string;
}[];

// const mockCharacterImages = [
//   "/placeholder.svg",
//   "/placeholder.svg",
//   "/placeholder.svg",
// ];

export const generateCharacterImages = async (
  description: string,
  style: string
): Promise<Character[]> => {
  console.log(
    "Generating character images for description:",
    description,
    style
  );
  const workflow = client.getWorkflow("generateCharactersWorkflow");

  const { runId } = await workflow.createRun();

  const result = await workflow.startAsync({
    runId,
    triggerData: {
      characterDescription: description,
      style,
    },
  });

  console.log("CharacterImage Result:", result?.results);

  const characterImages = result.results.characterImages;
  if (!characterImages || !Array.isArray(characterImages)) {
    throw new Error("Failed to generate character images");
  }

  return characterImages.map((image: string, index: number) => ({
    id: `char-${index}`,
    imageUrl: image,
  }));

  // await new Promise(resolve => setTimeout(resolve, 1500));
  // return mockCharacterImages.map((url, index) => ({
  //   id: `char-${index}`,
  //   imageUrl: url,
  // }));
};

export const generateStory = async (
  characterImage: string,
  description: string,
  styleId: string
): Promise<Story> => {
  console.log(
    "Generating story with character image, description, and style:",
    { characterImage, description, styleId }
  );

  // Mock story generation
  const mockStoryContent: StoryContent = Array(5)
    .fill(null)
    .map(() => ({
      image: "/placeholder.svg",
      text: "This is a sample story text that will be replaced with AI-generated content.",
    }));

  const title = "The Magical Adventure";

  try {
    const { data: story, error } = await supabase
      .from("stories")
      .insert({
        title,
        content: mockStoryContent,
        style: styleId,
      })
      .select()
      .single();

    if (error) {
      console.error("Error saving story:", error);
      throw error;
    }

    console.log("Story saved successfully:", story);

    return {
      id: story.id,
      title: story.title,
      images: mockStoryContent.map((page) => page.image),
      texts: mockStoryContent.map((page) => page.text),
      createdAt: story.created_at,
      characterImage,
      styleId: story.style,
    };
  } catch (error) {
    console.error("Failed to save story:", error);
    throw error;
  }
};

export const getLatestStories = async (page: number = 1): Promise<Story[]> => {
  console.log("Fetching latest stories, page:", page);
  try {
    const { data: stories, error } = await supabase
      .from("stories")
      .select("*")
      .order("created_at", { ascending: false })
      .range((page - 1) * 12, page * 12 - 1);

    if (error) {
      console.error("Error fetching stories:", error);
      throw error;
    }

    console.log("Retrieved stories:", stories);

    return stories.map((story) => {
      const content = story.content as StoryContent;
      return {
        id: story.id,
        title: story.title,
        images: content.map((page) => page.image),
        texts: content.map((page) => page.text),
        createdAt: story.created_at,
        characterImage: content[0].image,
        styleId: story.style,
      };
    });
  } catch (error) {
    console.error("Failed to fetch stories:", error);
    throw error;
  }
};

export const getStoryById = async (id: string): Promise<Story | null> => {
  console.log("Fetching story by ID:", id);
  try {
    const { data: story, error } = await supabase
      .from("stories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching story:", error);
      throw error;
    }

    if (!story) {
      console.log("No story found with ID:", id);
      return null;
    }

    console.log("Retrieved story:", story);

    const content = story.content as StoryContent;
    return {
      id: story.id,
      title: story.title,
      images: content.map((page) => page.image),
      texts: content.map((page) => page.text),
      createdAt: story.created_at,
      characterImage: content[0].image,
      styleId: story.style,
    };
  } catch (error) {
    console.error("Failed to fetch story:", error);
    throw error;
  }
};
