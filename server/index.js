import express from 'express';
import db from './config/database.js';
import router from './routes/index.js';

import Users from './models/UserModel.js';
import Contacts from './models/ContactModel.js';

import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from 'express-session';
import flash from 'connect-flash';
import cors from "cors";

dotenv.config();
const app = express();
const port = 5000;

try {
    await db.authenticate();
    await Users.sync();
    await Contacts.sync();

    Users.Contacts = Users.hasMany(Contacts);

    console.log('Database Connected!');
} catch (err) {
    console.error(`Error => ${err}`);
}

app.use(cors({ credentials: true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(
    session({
        cookie: {maxAge:6000},
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());
app.use(express.json());
app.use(router);

app.listen(port, () => console.log('listening on port ' + port));