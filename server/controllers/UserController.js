import Users from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'fname', 'lname', 'username', 'email']
        });
        res.json(users);
    } catch (error) {
        console.error(error);
    }
}

export const Register = async (req, res) => {

    const { fname, lname, username, email, password, confirmPassword } = req.body;

    //check password
    if(password !== confirmPassword) {
        return res.status(400).json({ msg: "Password did not match!"});
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await Users.create({ 
            fname: fname,
            lname: lname,
            username: username,
            email: email, 
            password: hashPassword
        });
        res.json({msg: "Register success!"});
    } catch (error) {
        res.status(400).json({msg: `Username or Email already exist!`});
    }
}

export const Login = async (req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match){
            return res.status(400).json({msg: "wrong password!"});
        }

        const userId = user[0].id;
        const username = user[0].username;
        const email = user[0].email;

        const accessToken = jwt.sign(
            {userId, username, email},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '20s'}
        );

        const refreshToken = jwt.sign(
            {userId, username, email},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );

        await Users.update(
            {refresh_token: refreshToken}, 
            {
                where: {
                    id: userId
                }
            }
        );

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 3600 * 1000
        });
        res.cookie('currentlyUserLoggedIn', username, {
            httpOnly: true
        });
        // res.cookie('currentlyUserIDLoggedIn', userId, {
        //     httpOnly: true
        // });
        res.json({accessToken, username});

    } catch (error) {
        res.status(404).json({msg: "email not found"});
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.sendStatus(204);
    }
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if(!user[0]){
        return res.sendStatus(404);
    }
    const userId = user[0].id;
    await Users.update({refresh_token: null}, 
        {
            where: {
                id: userId
            }
        }
    );
    res.clearCookie('refreshToken');
    res.clearCookie('currentlyUserLoggedIn');
    // res.clearCookie('currentlyUserIDLoggedIn');
    return res.sendStatus(200);
}

export const updateUser = async (req, res) => {
    try {
        await Users.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({msg: "update success!"});
    } catch (error) {
        res.status(400).json({msg: `Error: ${error}`});
    }
}

//secondary method

export const getUserByUsername = async (req, res) => {
    const user = await Users.findOne({
        where: { username: req.params.username}
    });
    if(!user){
        return res.sendStatus(404);
    }
    const { id, fname, lname, username, email } = user;

    res.json({id, fname, lname, username, email});
}

export const getUserById = async (req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                id: req.params.id
            }
        });
        const {username, email} = user;
        res.json({username, email});
    } catch (error) {
        res.sendStatus(404).json({msg: "Error user not found"});
    }
}

export const getSessionUserId = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return false;
    }
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if(!user[0]){
        return false;
    }
    const userId = user[0].id;

    return userId;
}
