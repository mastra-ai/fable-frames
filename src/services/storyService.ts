import { supabase } from "@/integrations/supabase/client";

import { MastraClient } from "@mastra/client-js";

// In Vite, environment variables are accessed through import.meta.env
const mastraUrl = (() => {
  // Debug logging to see what's available
  console.log("Environment variables:", {
    VITE_MASTRA_URL: import.meta.env.VITE_MASTRA_URL,
    MODE: import.meta.env.MODE,
    DEV: import.meta.env.DEV,
  });

  return import.meta.env.VITE_MASTRA_URL || "http://localhost:4111";
})();

console.log("Using Mastra URL:", mastraUrl);

const client = new MastraClient({
  baseUrl: mastraUrl, // Use environment variable with fallback
});

export interface Character {
  id: string;
  imageUrl: string;
  prompt: string;
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
    inputData: {
      characterDescription: description,
      style,
    },
  });

  // @ts-expect-error - result is not typed
  console.log("CharacterImage Result:", result?.result);

  // Check if the step exists and is in a success state with output
  if (result.status !== "success") {
    throw new Error("Failed to generate character images");
  }

  const characterImages = result.result?.characterImages;
  if (!characterImages || !Array.isArray(characterImages)) {
    throw new Error("Character images not found in workflow result");
  }

  return characterImages.map((image: string, index: number) => ({
    id: image.split("/").pop(),
    imageUrl: image,
    prompt: result.result?.characterPrompts[index],
  }));
};

export const generateStory = async (
  characterImage: string,
  characterPrompt: string,
  characterName: string,
  description: string,
  style: string
): Promise<Story> => {
  console.log("Generating story with character, description, and style:", {
    characterImage,
    characterName,
    description,
    style,
  });

  try {
    const workflow = client.getWorkflow("storyWorkflow");

    const { runId } = await workflow.createRun();

    const result = await workflow.startAsync({
      runId,
      inputData: {
        characterPrompt,
        characterImageUrl: characterImage,
        characterName,
        style,
        storyTheme: description,
      },
    });

    // @ts-expect-error - result is not typed
    console.log("storyWorkflow Result:", result?.result);

    if (result.status !== "success") {
      throw new Error("Failed to generate story images");
    }

    const title = result.result?.completeStory?.title;
    const content = result.result?.completeStory?.pages;

    // return characterImages.map((image: string, index: number) => ({
    //   id: image.split("/").pop(),
    //   imageUrl: image,
    // }));

    console.log("pre save story", {
      title,
      content,
      style,
      character: characterName,
      characterUrl: characterImage,
    });

    const { data: story, error } = await supabase
      .from("stories")
      .insert({
        title,
        content,
        style,
        character: characterName,
        character_url: characterImage,
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
      images: content.map((page) => page.image),
      texts: content.map((page) => page.text),
      createdAt: story.created_at,
      characterImage,
      styleId: style,
    };
  } catch (error) {
    console.error("Failed to save story:", error);
    throw error;
  }
};

export const getFeaturedStories = async (
  page: number = 1
): Promise<Story[]> => {
  console.log("Fetching latest stories, page:", page);
  try {
    const { data: stories, error } = await supabase
      .from("stories")
      .select("*")
      .eq("featured", true)
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
