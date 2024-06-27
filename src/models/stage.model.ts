import { DataTypes, Model } from "sequelize";

class StagesModel extends Model {
    static init(sequelize: any): any {
        super.init(
            {
                id: {
                    type: DataTypes.STRING,
                    primaryKey: true
                },
                name: DataTypes.STRING,
                average: DataTypes.STRING
            },
            {
                sequelize,
                timestamps: true,
                tableName: "Stages"
            }
        );

        return this;
    }
}

export default StagesModel;
