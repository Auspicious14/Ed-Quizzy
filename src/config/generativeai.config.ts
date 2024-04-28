export const GenerativeAI = {
  useFactory: () => {
    return {
      apiKey: process.env.GEMINI_API_KEY,
    };
  },
};
