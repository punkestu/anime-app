import { watchAnimeC } from "./controller";
import { Router } from "express";

const route = Router();
route.get("/:id", watchAnimeC);

export default route;
