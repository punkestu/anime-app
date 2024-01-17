import {
  getAnimeDetailC
} from "./controller";
import { Router } from "express";

const route = Router();
route.get("/:id", getAnimeDetailC);

export default route;
