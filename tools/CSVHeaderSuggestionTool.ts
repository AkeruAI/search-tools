import { gpt3point5 } from "../chat-models/gpt-3.5";
import { BaseLanguageModel } from "langchain/base_language";

export class CSVHeaderSuggestionTool {
  private model: BaseLanguageModel;

  constructor(model: BaseLanguageModel = gpt3point5) {
    this.model = model;
  }

  private createPrompt(projectDescription: string): [string, string][] {
    return [
      [
        "system",
        "You are an expert at suggesting appropriate CSV column headers based on project descriptions. Provide a comma-separated list of column headers that would be suitable for the described project.",
      ],
      [
        "human",
        `Based on the following project description, suggest appropriate CSV column headers:
        
        "${projectDescription}"
        
        Respond with only a comma-separated list of column headers, without any additional explanation or formatting.`,
      ],
    ];
  }

  async suggestHeaders(projectDescription: string): Promise<string[]> {
    try {
      const response = await this.model.invoke(
        this.createPrompt(projectDescription)
      );

      const headers = response.content
        .split(",")
        .map((header) => header.trim());
      return headers;
    } catch (error) {
      console.error("Error in suggestHeaders method:", error);
      throw error;
    }
  }
}
