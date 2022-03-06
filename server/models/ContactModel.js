import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from './UserModel.js';

const { DataTypes } = Sequelize;

const Contacts = db.define('contacts', 
{
    fname: {
        type: DataTypes.STRING,
    },
    lname: {
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
    },
    phoneNum:{
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true,
    tableName: 'contacts'
});

Users.hasMany(Contacts);
Contacts.belongsTo(Users);

export default Contacts;