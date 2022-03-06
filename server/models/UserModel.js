import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users', {
    fname:{
        type: DataTypes.STRING
    },
    lname:{
        type: DataTypes.STRING
    },
    username:{
        type: DataTypes.STRING,
        unique: true,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true,
    tableName: 'users'
});

export default Users;