import { google } from "googleapis";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import { gpt3point5 } from "../chat-models/gpt-3.5";

export class GoogleSearchTool {
  constructor() {
    this.model = gpt3point5;
  }

  async search(query, params = {}) {
    try {
      const res = await google.customsearch("v1").cse.list({
        auth: process.env.GOOGLE_API_KEY,
        cx: "94fa97d839aaf4f5c",
        q: query,
      });
      return res.data.items;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * @param {string} username
   * @returns import('../tools/SearchTool').Summary
   */
  async summarize(query, searchJson) {
    let searchResults = searchJson ? searchJson : await this.search(query);
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are an expert at summarizing search results JSON documents in a bullet point MD format.",
      ],
      [
        "human",
        "The query was: {query}, the json is: {input}. Please summarize the search in 2-3 small sentances",
      ],
    ]);
    const chain = prompt.pipe(this.model);
    const response = await chain.invoke({
      input: JSON.stringify(searchResults),
      query,
    });
    return {
      toolName: this.name,
      results: response.content,
    };
  }
}
