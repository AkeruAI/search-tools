import express from "express";
import { CSVHeaderSuggestionTool } from "../tools/CSVHeaderSuggestionTool";

const router = express.Router();
const csvHeaderTool = new CSVHeaderSuggestionTool();

/**
 * @swagger
 * /csvHeader/suggest:
 *   post:
 *     summary: Suggest CSV headers based on project description
 *     tags: [CSV Headers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - projectDescription
 *             properties:
 *               projectDescription:
 *                 type: string
 *                 description: Description of the project for which CSV headers are needed
 *     responses:
 *       200:
 *         description: Successfully generated CSV header suggestions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 headers:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of suggested CSV headers
 *       400:
 *         description: Bad request - Missing project description
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/suggest", async (req, res) => {
  try {
    const { projectDescription } = req.body;
    if (!projectDescription) {
      return res.status(400).json({ error: "Project description is required" });
    }

    const suggestedHeaders = await csvHeaderTool.suggestHeaders(
      projectDescription
    );
    res.json({ headers: suggestedHeaders });
  } catch (error) {
    console.error("Error in CSV header suggestion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
