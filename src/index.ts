import express, { Express } from "express";
import { join } from "path";
const UserModel = require("./models/user.model");
const UnitModel = require("./models/unit.model");
const LessonModel = require("./models/lesson.model");
const StageModel = require("./models/stage.model");
const fs = require("fs");
const getConnection = require("./config/mysql.config");
const dotenv = require("dotenv");

const app: Express = express();

(async () => {
    try {
        dotenv.config();

        const sequelize = await getConnection(
            process.env.MYSQL_DATABASE_NAME as string,
            process.env.MYSQL_USERNAME as string,
            process.env.MYSQL_PASSWORD as string,
            process.env.MYSQL_HOST as string,
            "mysql"
        );
        
        await sequelize.authenticate();
        
        console.log('Connection has been established successfully.');
    
        const modelFiles = fs
        .readdirSync(__dirname + "/models/")
        .filter((file: any) => file.endsWith(".ts"));

        for (const file of modelFiles) {
            const model = await import(`./models/${file}`);
            model.default.init(sequelize);
        }

        UnitModel.default.associate(LessonModel.default);
        LessonModel.default.associate(UnitModel.default);

        await UserModel.default.sync({alter: true });
        await UnitModel.default.sync({alter: true });
        await UnitModel.default.sync({alter: true });
        await LessonModel.default.sync({alter: true });
        await StageModel.default.sync({alter: true });

        app.use(express.static(join(__dirname, "public")));
        app.use(express.json());
    
        app.use("/api", require("./routes/lesson.routes"));
        app.use("/api", require("./routes/stage.routes"));
        app.use("/api", require("./routes/student.routes"));
        app.use("/api", require("./routes/unit.routes"));
        app.use("/api", require("./routes/user.routes"));
    
        app.listen(3000, () => console.log("server on port 3000"));
    } catch(error) {
        console.error('Unable to connect to the database: ', error);
    }
})();

/* const jane = User.create({
    id: uuidv4(),
    username: 'janedoe',
    birthday: new Date(1980, 6, 20),
}).then(() => {
    const users = User.findAll();
    console.log(users);
}); */
