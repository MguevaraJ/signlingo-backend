import { Router, Request, Response } from "express";
const router: Router = Router();

router.get("/stages", (req: Request, res: Response) => {
    res.status(200).json({ slug: "stages" });
});

module.exports = router;
