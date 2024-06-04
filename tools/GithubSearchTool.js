import { ChatPromptTemplate } from "@langchain/core/prompts";

import { SearchTool } from "./SearchTool";
import { gpt3point5 } from "../chat-models/gpt-3.5";
import { mistralGroq, mistral3bCloudflare } from '../chat-models/mistral-7b-instruct'

export class GithubSearchTool extends SearchTool {
  constructor() {
    super("GithubSearchTool");
    this.model = gpt3point5
  }

  async getUserInfo(username) {
    try {
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );
    
      const userData = await userResponse.json();

      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=pushed`
      );
      const reposData = await reposResponse.json();
      const reposNoForks = reposData
        .filter((repo) => repo.fork !== true)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5);

      return {
        userData,
        reposData: reposNoForks,
      };
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @param {string} username 
   * @returns import('../tools/SearchTool').Summary
   */
  async summarize(username) {
    const { userData, reposData } = await this.getUserInfo(username);

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are an expert at summarizing GitHub user profiles and repositories in a bullet point MD format.",
      ],
      [
        "human",
        "The user data is: {userData}, and the top repositories data is: {reposData}. Please summarize the user's information and their top repositories in bullet points.",
      ],
    ]);
    const chain = prompt.pipe(this.model);
    try {
      const response = await chain.invoke({
        userData: JSON.stringify(userData),
        reposData: JSON.stringify(reposData),
      });
      return {
        toolName: this.name,
        results: response.content
      }
    } catch (e) {
      console.error(e);
    }
  }
}
