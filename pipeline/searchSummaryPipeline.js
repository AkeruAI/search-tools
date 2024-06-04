import { gpt3point5 } from "../chat-models/gpt-3.5";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { mistral3bCloudflare, mistralGroq } from "../chat-models/mistral-7b-instruct";

export class SummaryPipeline {
  constructor() {
    this.model = gpt3point5;
  }

  /**
   *
   * @param {Array<import('../tools/SearchTool').Summary>} summaries
   */
  async summarizeExistingJobs(summaries) {
    // in cas some promises failed we want to summarize the rest
    const completedSummaries = summaries.filter(Boolean);
    const toolsNameList = completedSummaries
      .map(({ toolName }) => toolName)
      .join(", ");
    const tollSummaryMap = completedSummaries.map((summary) => {
      return `
      Tool: ${summary.toolName} 
      Results: ${JSON.stringify(summary.results)}
      `;
    });


    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are an expert at summarizing text from multiple sources. Make a final summary of the searches in a coherent logical progression. The report should flow naturally",
      ],
      [
        "human",
        `I ran a few searches in this order {order}.  Here are the results. Do not name each:
       {result}
       
       Your final report should not name each seach tool but instead combine the information from each in a single naturally flowing report. The report should feel factual, example: "Gui Bibeau is an expert in JavaScript
      `,
      ],
    ]);
    const chain = prompt.pipe(this.model);
    const response = await chain.invoke({
      order: JSON.stringify(toolsNameList),
      result: JSON.stringify(tollSummaryMap),
    });

    return response.content;
  }
}
