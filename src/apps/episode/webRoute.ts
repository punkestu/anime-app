import { watchAnimeC } from "./webController";
import { Router } from "express";

const route = Router();
route.get("/:id", watchAnimeC);

export default route;
