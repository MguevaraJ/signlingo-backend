import { Router, Request, Response } from "express";
import { resolve } from "path";

const router: Router = Router();

router.get("/lesson", (req: Request, res: Response) => {
    res.status(200).sendFile(resolve(__dirname, "../public/a.css"));
});

module.exports = router;
