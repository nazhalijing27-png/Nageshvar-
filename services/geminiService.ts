import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProductDescription = async (productName: string): Promise<string> => {
  try {
    const prompt = `Write a short, catchy, and persuasive ecommerce product description for a product named: "${productName}". Focus on its key benefits and unique selling points. Keep it under 50 words. Be creative and engaging.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });

    return response.text;
  } catch (error) {
    console.error("Error generating product description:", error);
    return "Sorry, we couldn't generate an AI description at this time. Please try again later.";
  }
};
