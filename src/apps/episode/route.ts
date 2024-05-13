import { watchAnimeC } from "./controller";
import { Router } from "express";

const route = Router();
route.get("/:id", watchAnimeC);
// route.get("/change/:id", changeFrame);

export default route;
