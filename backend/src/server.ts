import express from "express";
import healthRoutes from "./routes/health.routes.js"
import trendsRoutes from "./routes/trends.routes.js"



const app = express();
app.use(healthRoutes);
app.use(trendsRoutes);
const port = 3000;



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

