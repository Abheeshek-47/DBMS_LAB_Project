import express from "express";
import bodyParser from "body-parser";
import { User } from "./db.js"; // Assuming this is an ORM model (e.g., Sequelize, Mongoose).

const app = express();
app.use(bodyParser.json());
app.get("/",(req,res)=>{
    res.json({
        msg:"Deployed online Successfully"
    })
})
app.post("/addnew", async (req, res) => {
    // const { submittedby, Groupname } = req.body;

    const submittedby=req.body.submittedby;
    const Groupname=req.body.Groupname;
    // Input validation
    if (!submittedby || !Array.isArray(Groupname)) {
        return res.status(400).json({ msg: "Invalid input data" });
    }

    try {

        const newuser= await User.create({
            submittedby:submittedby,
            Groupname:Groupname,
            createdate:Date.now()

        });
        // const newuser = await User.create({
        //     submittedby,
        //     Groupname,
        //     createdate: Date.now(),
        // });

        res.json({ msg: "Successful", user: newuser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

///Previous Code


// // const express=require("express");
// import express from "express";

// // const bodyParser=require("body-parser");
// import bodyParser from "body-parser";
// const {User}=require("./db");

// // const Userrroute=require("../Project/routes/userroutes")
// const app= express();
// app.use(bodyParser.json());

// // app.use("/user",Userrroute);

// app.post("/addnew",async (req,res)=>{
//     // submittedby:String,
//     // Groupname:[{
//     //     name:string,
//     //     batch:number,
//     //     sap:number
//     // }]
//     const submittedby=req.body.submittedby;
//     const Groupname=req.body.Groupname;

//     const newuser= await User.create({
//          submittedby:submittedby,
//         Groupname:Groupname,
//         createdate:Date()

//     })
//     if(newuser){
//         res.json({
//             msg:"Successfull"
//         })
//     }
//     else{
//         res.status(403).json({
//             msg:"Something went wrong"
//         })
//     }
// })



// const PORT = 3000;
// app.listen(PORT,()=>{
//     console.log(`Server is running on ${PORT}`);
// })

