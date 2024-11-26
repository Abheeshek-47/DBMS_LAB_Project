import express from 'express';
import bodyParser from 'body-parser';
import { User } from './db.js';
// import Userrroute from '../routes/userroutes';
import Userrroute from './routes/userroutes.js';
import cors from 'cors';


// const app = express();
// app.use(bodyParser.json());

// const express = require("express");
// const bodyParser = require("body-parser");
// const { User } = require("./db");
// // const Userrroute = require("../routes/userroutes");
// const Userrroute = require("../Backend/routes/userroutes");

const app = express();
const corsOptions = {
    origin: 'https://form.unitycircle.online',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/user", Userrroute);
app.use("/",(req,res)=>{
    res.json({"msg":"Online Deployed Successfully"})
})

// app.post("/addnew", async (req, res) => {
//     const { submittedby, Groupname } = req.body;

//     try {
//         const newuser = await User.create({
//             submittedby,
//             Groupname,
//             createdate: new Date()
//         });

//         res.json({ msg: "Successfully added" });
//     } catch (error) {
//         res.status(403).json({ msg: "Something went wrong" });
//     }
// });

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
