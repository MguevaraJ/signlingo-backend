import { Router, Request, Response, NextFunction } from "express";
const router: Router = Router();
const UserModel = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwtSign = require("../middlewares/signJWT");
const jwtDecode = require("../middlewares/decodeJWT");
const { v4: uuidv4 } = require('uuid');

router.get("/user", jwtDecode, async (req: Request, res: Response) => {
    res.status(200).json(res["locals"].usuario);
});

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    let passwordMatch = false;

    const existMail = await UserModel.default.findOne({
        where: {
            email: req.body.email
        }
    });

    if(existMail) {
        passwordMatch = bcryptjs.compareSync(req.body.password, existMail.password);
    }

    if(!existMail || !passwordMatch) {
        console.error("Credenciales Invalidas");

        return next("Credenciales Invalidas");
    }

    res.status(200).json({ 
        success: true,
        data: {
            id: existMail.id,
            sign: jwtSign(existMail)
        }
    });
});

router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
    req.body.password = bcryptjs.hashSync(req.body.password, 10);

    const user = await UserModel.default.create({
        id: uuidv4(),
        ...req.body
    });

    res.status(200).json({ 
        success: true,
        data: {
            id: user.id
        }
    });
});

router.get("/logout", async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ slug: "logout" });
});

module.exports = router;
