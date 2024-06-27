import { DataTypes, Model } from "sequelize";

class UserModel extends Model {
    static init(sequelize: any): any {
        super.init(
            {
                id: {
                    type: DataTypes.STRING,
                    primaryKey: true
                },
                username: DataTypes.STRING,
                email: DataTypes.STRING,
                password: DataTypes.STRING,
                birthday: DataTypes.DATE,
            },
            {
                sequelize,
                timestamps: true,
                tableName: "Users"
            }
        );

        return this;
    }
}

export default UserModel;
