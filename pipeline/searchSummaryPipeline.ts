import { gpt3point5 } from "../chat-models/gpt-3.5";
import { BaseLanguageModel } from "langchain/base_language";

export class SummaryPipeline {
  private model: BaseLanguageModel;

  constructor() {
    this.model = gpt3point5;
  }

  async summarizeExistingJobs(summaries): Promise<string> {
    const completedSummaries = summaries.filter(Boolean);
    const toolsNameList = completedSummaries
      .map(({ toolName }) => toolName)
      .join(", ");
    const toolSummaryMap = completedSummaries.map((summary) => {
      return `
      Tool: ${summary.toolName} 
      Results: ${JSON.stringify(summary.results)}
      `;
    });

    const systemMessage =
      "You are an expert at summarizing text from multiple sources. Make a final summary of the searches in a coherent logical progression. The report should flow naturally";
    const userMessage = `I ran a few searches in this order ${JSON.stringify(
      toolsNameList
    )}. Here are the results. Do not name each:
    ${JSON.stringify(toolSummaryMap)}
    
    Your final report should not name each search tool but instead combine the information from each in a single naturally flowing report. The report should feel factual, example: "Gui Bibeau is an expert in JavaScript"`;

    const response = await this.model.invoke([
      ["system", systemMessage],
      ["user", userMessage],
    ]);

    return response.content;
  }
}
