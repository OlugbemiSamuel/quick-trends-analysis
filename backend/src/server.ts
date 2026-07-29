import express from "express";
import healthRoutes from "./routes/health.routes.js"



const app = express();
app.use(healthRoutes);
const port = 3000;



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

