// import express from "express";
// import bodyParser from "body-parser";
// import { User } from "./db.js"; // Assuming this is an ORM model (e.g., Sequelize, Mongoose).

// const app = express();
// app.use(bodyParser.json());
// app.get("/",(req,res)=>{
//     res.json({
//         msg:"Deployed online Successfully"
//     })
// })
// app.post("/addnew", async (req, res) => {
//     const { projectTitle,projectdescription, Submission_Date } = req.body;
//     // projectTitle:String,
//     // projectdescription:String,
//     // Submission_Date: Date,
//     // Groupname:[{
        
//     //     username:String,
//     //     sap:Number
//     // }],
//     // createdate:Date
//     const submittedby=req.body.submittedby;
//     const Groupname=req.body.Groupname;
//     // Input validation
//     if (!submittedby || !Array.isArray(Groupname)) {
//         return res.status(400).json({ msg: "Invalid input data" });
//     }

//     try {

//         const newuser= await User.create({
//             submittedby:submittedby,
//             Groupname:Groupname,
//             createdate:Date.now()

//         });
//         // const newuser = await User.create({
//         //     submittedby,
//         //     Groupname,
//         //     createdate: Date.now(),
//         // });

//         res.json({ msg: "Successful", user: newuser });
//     } catch (error) {
//         console.error("Error creating user:", error);
//         res.status(500).json({ msg: "Something went wrong", error: error.message });
//     }
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// ///Previous Code


// // // const express=require("express");
// // import express from "express";

// // // const bodyParser=require("body-parser");
// // import bodyParser from "body-parser";
// // const {User}=require("./db");

// // // const Userrroute=require("../Project/routes/userroutes")
// // const app= express();
// // app.use(bodyParser.json());

// // // app.use("/user",Userrroute);

// // app.post("/addnew",async (req,res)=>{
// //     // submittedby:String,
// //     // Groupname:[{
// //     //     name:string,
// //     //     batch:number,
// //     //     sap:number
// //     // }]
// //     const submittedby=req.body.submittedby;
// //     const Groupname=req.body.Groupname;

// //     const newuser= await User.create({
// //          submittedby:submittedby,
// //         Groupname:Groupname,
// //         createdate:Date()

// //     })
// //     if(newuser){
// //         res.json({
// //             msg:"Successfull"
// //         })
// //     }
// //     else{
// //         res.status(403).json({
// //             msg:"Something went wrong"
// //         })
// //     }
// // })



// // const PORT = 3000;
// // app.listen(PORT,()=>{
// //     console.log(`Server is running on ${PORT}`);
// // })

import express from 'express';
import bodyParser from 'body-parser';
import { User } from './db.js'; // Assuming this is an ORM model (e.g., Sequelize, Mongoose).

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    msg: "Deployed online Successfully",
  });
});

app.post("/addnew", async (req, res) => {
  const { submittedby, Groupname, projectTitle, projectdescription, Submission_Date } = req.body;

  // Validate required fields
  if (!submittedby || !Groupname || !Array.isArray(Groupname) || Groupname.length === 0) {
    return res.status(400).json({ msg: "Invalid input data. 'submittedby' and 'Groupname' are required." });
  }

  // Validate group data structure
  for (const group of Groupname) {
    if (!group.username || typeof group.sap !== 'number') {
      return res.status(400).json({ msg: "Each group member must have a 'username' and 'sap' number." });
    }
  }

  try {
    // Create the project (user) in the database
    const newuser = await User.create({
      submittedby,
      Groupname,
      projectTitle,
      projectdescription,
      Submission_Date: new Date(Submission_Date), // Ensure correct date format
      createdate: new Date(), // Current timestamp
    });

    res.status(201).json({ msg: "Project created successfully", user: newuser });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ msg: "Something went wrong", error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
