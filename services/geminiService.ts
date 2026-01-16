
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getGrokAssistantResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: "Tu es Grok AI, l'assistant technique de la plateforme de formation GROK. Réponds de manière concise, technique et encourageante. Si l'utilisateur demande des ressources, mentionne les tutoriels ou les PDF disponibles sur la plateforme.",
        temperature: 0.7,
      },
    });
    return response.text || "Désolé, je rencontre une petite difficulté technique. Peux-tu reformuler ?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Je ne parviens pas à me connecter au réseau ARAKNET pour le moment.";
  }
};
