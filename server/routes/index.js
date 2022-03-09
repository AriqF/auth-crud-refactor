import express from 'express';
import { 
    getUsers, Register, Login, Logout, 
    getUserByUsername, updateUser,

} from '../controllers/UserController.js';
import { refreshToken } from '../controllers/RefreshToken.js';
import { 
    getContacts, getContactById, addContact, updateContact, deleteContact,

} from '../controllers/ContactController.js';

import { verifyToken } from '../middleware/VerifyToken.js';
import Users from '../models/UserModel.js';
import db from '../config/database.js';
import { QueryTypes } from 'sequelize';

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.get('/user/:username', getUserByUsername);
router.patch('/user/edit/:id', updateUser);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

//contact route
router.get('/contact/:id', getContactById);
router.get('/contacts', getContacts);
router.post('/add-contact', addContact);
router.patch('/contact/update', updateContact);
router.delete('/contact/delete/:id', deleteContact);




// router.get('/contacts', async(req, res) => {
//     const userId = req.query.userId;
//     try {
//         const contacts = await db.query(`SELECT fname, lname, email, phoneNum FROM contacts WHERE userId = ${userId};`, {
//             type: QueryTypes.SELECT
//         });
//         res.json(contacts);
//     } catch (error) {
//         console.error(error);  
//         res.status(404).json({msg: `contact not found or unknown error: ${error} | body.uid = ${req.body.uid}`});      
//     }
// });
export default router;