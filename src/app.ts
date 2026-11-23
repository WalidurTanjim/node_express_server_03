import express, { Request, Response } from "express";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req: Request, res: Response) => {
     res.send("Next Level Developer")
})

// 404 not found route
app.use((req: Request, res: Response) => {
     res.status(404).json({
          success: false,
          message: "404 route not found!",
          path: req?.path
     })
})

export default app;
