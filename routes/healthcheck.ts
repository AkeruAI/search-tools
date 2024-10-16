import express from "express";

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: Returns OK if the service is running
 */
router.get("/", (_, res) => {
  res.send("Ok");
});

export default router;
