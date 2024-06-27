import { DataTypes, Model } from "sequelize";

class UnitModel extends Model {
    static init(sequelize: any): any {
        super.init(
            {
                id: {
                    type: DataTypes.STRING,
                    primaryKey: true
                }
            },
            {
                sequelize,
                timestamps: true,
                tableName: "Units"
            }
        );

        return this;
    }

    static associate(model: any) {
        this.hasMany(model);
    }
}

export default UnitModel;
