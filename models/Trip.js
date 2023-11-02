const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Trip extends Model {}

Trip.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        trip_budget: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        traveller_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,  
        },
        traveller_id: {
            type: DataTypes.INTEGER,
            unique: false,
            references: {
                model: 'traveller',
                key: 'id',
                unique: false,
            },
        },
        location_id: {
            type: DataTypes.INTEGER,
            unique: false,
            references: {
                model: 'location',
                key: 'id',
                unique: false,
            },
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'trip',
    }
)

module.exports = Trip;