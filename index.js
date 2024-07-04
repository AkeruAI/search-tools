import express from "express";
import { GithubSearchTool } from "./tools/GithubSearchTool";
import { GoogleSearchTool } from "./tools/GoogleSearchTool";
import { SummaryPipeline } from "./pipeline/searchSummaryPipeline";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
const port = 3000;

const githubSearchTool = new GithubSearchTool();
const googleSearchTool = new GoogleSearchTool();
const summaryPipeline = new SummaryPipeline();

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "API documentation for the summarization service",
  },
  servers: [
    {
      url: `http://localhost:${port}`,
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./index.js"], // files containing annotations as above
};

const swaggerSpec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: Returns OK if the service is running
 */
app.get("/", (_, res) => {
  res.send("Ok");
});

/**
 * @swagger
 * /summarize-from/github/{userid}:
 *   get:
 *     summary: Summarize GitHub user information
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *         description: GitHub user ID
 *       - in: query
 *         name: tools
 *         schema:
 *           type: string
 *         description: Comma-separated list of tools to use (e.g., google)
 *     responses:
 *       200:
 *         description: Returns the summary of the GitHub user
 */
app.get("/summarize-from/github/:userid", async (req, res) => {
  const githubUserid = req.params.userid;
  const tools = req.query.tools ? req.query.tools.split(",") : [];

  const summaryPromises = [
    githubSearchTool.summarize(githubUserid),
    ...tools.includes("google") ? [googleSearchTool.summarize(`Who is ${githubUserid}`)] : []
  ];

  const resolvedSummaries = await Promise.allSettled(summaryPromises);

  const summaries = resolvedSummaries
    .filter(({ status }) => status === "fulfilled")
    .map(({ value }) => value);

  const summary = await summaryPipeline.summarizeExistingJobs(summaries);

  const response = {
    githubSearchToolResult: summaries.find(s => s.toolName === 'GithubSearchTool')?.results,
    summary
  };

  res.json(response);
});

app.listen(port, async () => {
  console.log(`App listening on port ${port}`);
});
