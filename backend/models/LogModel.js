const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./UserModel");

const Log = sequelize.define("Log", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
    },
    moodRating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    anxietyLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sleepHours: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    sleepQuality: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    physicalActivity: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    socialInteractions: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stressLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    symptoms: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    timestamps: true,
});

Log.belongsTo(User, { foreignKey: "userId" });

module.exports = Log;
