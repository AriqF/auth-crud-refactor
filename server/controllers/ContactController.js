import Contacts from '../models/ContactModel.js';
import db from "../config/database.js";
import { QueryTypes } from 'sequelize';

export const getContacts = async(req, res) => {
    try {
        const userId = req.query.userId;
        const contacts = await db.query(`SELECT id, fname, lname, email, phoneNum FROM contacts WHERE userId = ${userId};`, {
            type: QueryTypes.SELECT
        });
        res.json(contacts);
    } catch (error) {
        console.error(error); 
        if(error){
            res.status(404).json({msg: `Contact not found or ${error} | body.uid = ${req.body.uid}`});      
        } 
    }
}

export const getContactById = async(req, res) => {
    try {
        // const userId = req.params.userId;
        // const contact = await Contacts.findOne({
        //     attributes: {id, fname, lname, email, phoneNum, userId},
        //     where: { 
        //         id: req.query.id,
        //         userId: userId
        //     }
        // });
        const contact = await db.query(`SELECT fname, lname, email, phoneNum FROM contacts WHERE id = ${req.params.id};`)
        if(!contact){
            return res.status(404).json({msg: "contact not found!"});
        }
        res.json(contact[0]);
    } catch (error) {
        console.error(error);  
        res.status(404).json({msg: `${error} | id = ${req.query.id}`});      
    }
}

export const addContact = async(req, res) => {
    const { fname, lname, email, phoneNum, userId } = req.body;
    console.log(`userID => ${userId}`);
    try {
        await Contacts.create({
            fname: fname,
            lname: lname,
            email: email,
            phoneNum: phoneNum,
            userId: userId
        });
        res.json({msg: "Contact Succesfully added!"});
    } catch (error) {
        console.error(error);
        res.status(400).json({msg: `Error occured: ${error}`});
    }
}

export const updateContact = async (req, res) => {
    try {
        await Contacts.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({msg: "Contact updated successfully!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteContact = async (req, res) => {
    try {
        await Contacts.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({msg: "Contact deleted successfully"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}