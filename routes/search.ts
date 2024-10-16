import express from "express";
import { SummaryTool } from "../tools/SummaryTool";
// import { gaiaGemma } from "../chat-models/gaia-gemma";
import { mistralGroq } from "../chat-models/mistral-7b-instruct";

const router = express.Router();
const groqSearchTool = new SummaryTool(mistralGroq);

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Summarize search results
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query
 *       - in: query
 *         name: stream
 *         required: false
 *         schema:
 *           type: boolean
 *         description: Whether to stream the response
 *     responses:
 *       200:
 *         description: Returns a summary of the search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 summary:
 *                   type: string
 *           text/plain:
 *             schema:
 *               type: string
 */
router.get("/", async (req, res) => {
  const query = req.query.q as string;
  const stream = req.query.stream === "true";

  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  if (stream) {
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    const summaryStream = groqSearchTool.summarizeStream(query);
    for await (const chunk of summaryStream) {
      res.write(chunk);
    }
    res.end();
  } else {
    const summary = await groqSearchTool.summarize(query);
    res.json({ summary });
  }
});

export default router;
