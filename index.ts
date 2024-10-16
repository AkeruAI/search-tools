import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./lib/swagger";
import { port } from "./lib/serverConfig";
import { authenticateAPIKey } from "./middleware/auth";
import healthcheckRouter from "./routes/healthcheck";
import searchRouter from "./routes/search";
import csvHeaderRouter from "./routes/csvHeader";

const app = express();

app.use(cors());
app.use(authenticateAPIKey);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", healthcheckRouter);
app.use("/search", searchRouter);
app.use("/csvHeader", csvHeaderRouter);

app.listen(port, async () => {
  console.log(`App listening on port ${port}`);
});
