import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { json } from "node:stream/consumers";

const app: Express = express();

app.use(express.json());
app.use("/api", rootRouter);

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
