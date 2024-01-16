import {Request, Response, Router} from "express";
// import path from "node:path";

function sendFile(filePath: string) {
    return (_: Request, res: Response) => {
        res.sendFile(filePath);
    };
}

const route = Router();
// route.get(
//     "/htmx.js",
//     sendFile(path.join(__dirname, "../../node_modules/htmx.org/dist/htmx.js"))
// );

export default route;