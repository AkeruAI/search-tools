import { port } from "./serverConfig";
import swaggerJsdoc from "swagger-jsdoc";

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

export const options = {
  swaggerDefinition,
  apis: ["./index.js"], // files containing annotations as above
};

export const swaggerSpec = swaggerJsdoc(options);
