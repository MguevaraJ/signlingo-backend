import { NextFunction } from "express";
const jwt = require("jsonwebtoken");
const moment = require("moment");
const UserModel = require("../models/user.model");

interface responseLocals extends Response {
    locals: any;
}

module.exports = async (req: Request, res: responseLocals, next: NextFunction) => {
    const authorization = (<any>req.headers)["authorization"];

    if(authorization && authorization.split(" ").length > 1) {
        try {
            const token = jwt.verify(
                authorization.split(" ")[1], 
                process.env.JWT_SECRET
            );

            if(token.exp >= moment().unix()) 
                return next("Sesión expirada");

            res["locals"].token = token;

            const user = await UserModel.default.findOne({
                where: {
                    id: token.id
                }
            });

            if(!user) return next("Usuario no autorizado");

            res["locals"].usuario = user;

            next();
        } catch(error) {
            return next(error);
        }
    } else {
        next("Usuario no autorizado");
    }
};
