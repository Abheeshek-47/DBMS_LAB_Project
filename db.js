
import mongoose from "mongoose";
import { string, number, date } from "zod";

// const { string, number, date } = require("zod");
// const { link } = require("../routes/adminRoute");

mongoose.connect("mongodb+srv://abheeshek47code:prWa9EpVYKRFVaoW@cluster0.ai6su.mongodb.net/Project_Form_LAB");

///Define Schemas

// const AdminSchema= new mongoose.Schema({
//     username:String,
//     password:String

// });

// const UserSchema= new mongoose.Schema({
//     username:String,
//     password:String,
//     purchasedCourse:[{
//         type:mongoose.Types.ObjectId,
//         ref:'Course'
//     }]
// })
const UserSchema= new mongoose.Schema({
    submittedby:String,
    Groupname:[{
        username:String,
        batch:Number,
        sap:Number
    }],
    createdate:Date
})

// const CourseSchema = new mongoose.Schema({
//     // Body: { 
//     title: String, 
//     description: String, 
//     price: Number, 
//     imageLink: String 


// })

// const Usertable= mongoose.model("table_name",connectingtheschemawithpreviouslybuilt_schema)
// const Admin = mongoose.model("Admin",AdminSchema);
const User = mongoose.model("User",UserSchema);
// const Course=mongoose.model("Course",CourseSchema);

// module.exports={Admin,User,Course};
// module.exports={User};
export {User}




