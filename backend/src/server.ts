import "dotenv/config";
import express from "express";
import healthRoutes from "./routes/health.routes.js";
import trendsRoutes from "./routes/trends.routes.js";
import logger from "./middleware/logger.js";
import customErrorHandler from "./middleware/customError.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use(healthRoutes);
app.use(trendsRoutes);
const port = Number(process.env.Port) || 3000;

//Custom errorHandler
app.use(customErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
