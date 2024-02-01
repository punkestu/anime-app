import { Router } from "express";
import { getByGenre } from "./webController";

const route = Router();
route.get("/:genre", getByGenre);

export default route;
