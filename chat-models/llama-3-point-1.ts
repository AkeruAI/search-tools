import { ChatGroq } from "@langchain/groq";
import { OpenAI } from "@langchain/openai";

export const llama3point1Groq = new ChatGroq({
  model: "llama-3.1-8b-instant",
});

export const llama3point1Gaia = new OpenAI({
  temperature: 0.9,
  configuration: {
    baseURL: "https://llama3.gaianet.network/v1/chat",
  },
});
