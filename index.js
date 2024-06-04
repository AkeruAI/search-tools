import express from "express";
import { mockData } from "./guiBibeau";
import { GithubSearchTool } from "./tools/GithubSearchTool";
import { GoogleSearchTool } from "./tools/GoogleSearchTool";
import { SummaryPipeline } from "./pipeline/searchSummaryPipeline";

const app = express();
const port = 3000;

const githubSearchTool = new GithubSearchTool();
const googleSearchTool = new GoogleSearchTool();

const summaryPipeline = new SummaryPipeline();

app.get("/", (_, res) => {
  res.send("Ok");
});

app.get("/summary/github/:userid", async (req, res) => {
  const githubUserid = req.params.userid;

  const summaryPromises = await Promise.allSettled([
    googleSearchTool.summarize(`Who is ${githubUserid}`),
    githubSearchTool.summarize(githubUserid),
  ]);

  const summaries = summaryPromises
    .filter(({ status }) => status === "fulfilled")
    .map(({ value }) => value);

  const summary = await summaryPipeline.summarizeExistingJobs(summaries);
  return res.send(summary);
});

app.listen(port, async () => {
  console.log(`App listening on port ${port}`);
});
