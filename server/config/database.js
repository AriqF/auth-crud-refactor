import {Sequelize} from 'sequelize';

const db = new Sequelize('express_crud_refac', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

export default db;