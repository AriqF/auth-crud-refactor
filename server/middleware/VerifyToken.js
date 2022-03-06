import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    //authHeader split space and if user is not sending authHeader then
    //token will be empty
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401); //unauthorized
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.email = decoded.email;
        next();
    });
}