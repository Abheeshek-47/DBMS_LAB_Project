
import jwt from 'jsonwebtoken';
import { User } from '../db.js';
const secret = "DBMS_Project_Lab"; // Ensure this matches your JWT secret

// const jwt = require("jsonwebtoken");
// const { User } = require("../db");
// const secret = "DBMS_Project_Lab"; // Ensure this matches your JWT secret

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secret, async (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = await User.findById(user.id);
        if (!req.user) return res.sendStatus(404);

        next();
    });
};

// module.exports = authenticateToken;


export default authenticateToken;

