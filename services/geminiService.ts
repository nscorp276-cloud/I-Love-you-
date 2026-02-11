
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const generateRomanticPoem = async (name: string, trait: string): Promise<string> => {
  const ai = getAIClient();
  const prompt = `Write a short, beautiful 4-line romantic poem for ${name}. Highlight that their best trait is ${trait}. Make it sweet and heartfelt.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.8,
      topP: 0.9,
    }
  });

  return response.text || "Love is in the air, but the words are hiding...";
};

export const generateValentineCard = async (style: string, theme: string): Promise<string | null> => {
  const ai = getAIClient();
  const prompt = `A beautiful, high-quality Valentine's Day greeting card in a ${style} style. The theme is: ${theme}. No text inside the image, just visual romantic elements like hearts, flowers, or couples. Professional illustration.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};
