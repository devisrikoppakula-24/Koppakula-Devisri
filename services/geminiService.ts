
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Google GenAI client with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getEventPlanningAdvice(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are 'Ally', a professional event planning AI. Help users plan weddings, corporate events, and parties. Suggest venues types, service combinations, and budgeting tips. Be concise and helpful.",
        temperature: 0.7,
      },
    });
    // Correct way to extract text from response
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm having a bit of trouble connecting to my planning brain. How can I help you manually today?";
  }
}

export async function getPersonalizedPackage(userInterests: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest an event package for: ${userInterests}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            estimatedBudget: { type: Type.NUMBER },
            services: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "description", "estimatedBudget", "services"]
        }
      }
    });
    // response.text returns the JSON string when responseMimeType is application/json
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("AI Error:", error);
    return null;
  }
}
