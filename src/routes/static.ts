import {Request, Response, Router} from "express";
import path from "path";

const route = Router();

route.get("/htmx.js", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../node_modules/htmx.org/dist/htmx.js"));
});

export default route;