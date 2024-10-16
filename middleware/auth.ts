import { Request, Response, NextFunction } from "express";

export function authenticateAPIKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const exemptPaths = ["/", "/api-docs/"];
  if (exemptPaths.includes(req.path)) {
    return next();
  }

  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid API key" });
  }

  const apiKey = authHeader.slice("Bearer ".length).trim();

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: "Invalid API key" });
  }

  next();
}
