import { Router, Request, Response } from "express";
const router: Router = Router();

router.get("/student", async (req: Request, res: Response) => {
    res.status(200).json({ slug: "student" });
});

module.exports = router;
