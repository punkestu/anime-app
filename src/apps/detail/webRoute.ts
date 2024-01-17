import { Router } from "express";
import { DetailAnime } from "./webController";

const route = Router();
route.get("/:id", DetailAnime);

export default route;
