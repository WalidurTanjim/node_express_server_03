import express, { Request, Response } from "express";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req: Request, res: Response) => {
     res.send("Next Level Developer")
})

export default app;
