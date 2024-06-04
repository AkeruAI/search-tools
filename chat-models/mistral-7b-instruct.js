import { ChatCloudflareWorkersAI } from "@langchain/cloudflare";
import { ChatGroq } from '@langchain/groq'

export const mistral3bCloudflare = new ChatCloudflareWorkersAI({
  model: "@hf/mistral/mistral-7b-instruct-v0.2", 
  cloudflareAccountId: process.env.CLOUDFLARE_ACCOUNT_ID,
  cloudflareApiToken: process.env.CLOUDFLARE_API_KEY,
  baseUrl: `https://gateway.ai.cloudflare.com/v1/${process.env.CLOUDFLARE_ACCOUNT_ID}/${process.env.CLOUDFLARE_API_KEY}/workers-ai/`
});

export const mistralGroq = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: 'mixtral-8x7b-32768'
})