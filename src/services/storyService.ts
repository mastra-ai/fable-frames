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
}

const mockCharacterImages = [
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
];

const mockStories: Story[] = [
  {
    id: "1",
    title: "The Magical Rainbow Dragon",
    images: Array(5).fill("/placeholder.svg"),
    texts: [
      "Once upon a time, there was a magical rainbow dragon...",
      "He loved to fly through cotton candy clouds...",
      "Making friends with all the sky creatures...",
      "Teaching them about sharing and caring...",
      "And they all lived happily ever after.",
    ],
    createdAt: new Date().toISOString(),
    characterImage: "/placeholder.svg",
  },
  // Add more mock stories as needed
];

export const generateCharacterImages = async (description: string): Promise<Character[]> => {
  // Mock API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  return mockCharacterImages.map((url, index) => ({
    id: `char-${index}`,
    imageUrl: url,
  }));
};

export const generateStory = async (characterImage: string, description: string): Promise<Story> => {
  // Mock API call
  await new Promise(resolve => setTimeout(resolve, 2000));
  return {
    id: Date.now().toString(),
    title: "The Magical Adventure",
    images: Array(5).fill("/placeholder.svg"),
    texts: Array(5).fill("This is a sample story text that will be replaced with AI-generated content."),
    createdAt: new Date().toISOString(),
    characterImage,
  };
};

export const getLatestStories = async (page: number = 1): Promise<Story[]> => {
  // Mock API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockStories;
};

export const getStoryById = async (id: string): Promise<Story | null> => {
  // Mock API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockStories.find(story => story.id === id) || null;
};