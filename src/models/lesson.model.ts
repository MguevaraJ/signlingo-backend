import { DataTypes, Model } from "sequelize";

class LessonModel extends Model {
    static init(sequelize: any): any {
        super.init(
            {
                id: {
                    type: DataTypes.STRING,
                    primaryKey: true
                },
                name: DataTypes.STRING,
                image: DataTypes.STRING,
                video: {
                    type: DataTypes.STRING,
                    allowNull: true
                }
            },
            {
                sequelize,
                timestamps: true,
                tableName: "Lessons"
            }
        );
        

        return this;
    }

    static associate(model: any) {
        this.belongsTo(model);
    }
}

export default LessonModel;
