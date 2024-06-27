const { Sequelize, DataTypes } = require("sequelize");

const getConnection = async (databaseName: string, username: string, password: string, host: string, dialect: string) => {
    return new Sequelize(
        databaseName,
        username,
        password,
        {
            host: host,
            dialect: dialect
        }
    );
}

module.exports = getConnection;
