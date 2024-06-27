import { Router, Request, Response } from "express";
const UnitModel = require("../models/unit.model");
const LessonModel = require("../models/lesson.model");
const { v4: uuidv4 } = require('uuid');

const router: Router = Router();

router.get("/units", async (req: Request, res: Response) => {
    // const unitId = uuidv4();

    // const unit = await UnitModel.default.create({
    //     id: uuidv4(),
    // });

    // await LessonModel.default.create({
    //     id: uuidv4(),
    //     name: "Lección 99 - Z",
    //     image: "assets/",
    //     video: null,
    //     UnitModelId: "0ac9514b-950a-4250-b071-6edc51453c5e"
    // });

    const result = await LessonModel.default.findAll({
        where: {
            UnitModelId: "0ac9514b-950a-4250-b071-6edc51453c5e"
        },
        include: [
            {
                model: UnitModel.default
            }
        ]
    });

    res.status(200).json(result);
});

module.exports = router;
