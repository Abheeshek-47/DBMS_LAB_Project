import mongoose from 'mongoose';
import { string, number, date } from 'zod';

// const mongoose=require("mongoose");
// const { string, number, date } = require("zod");
// const { link } = require("../routes/adminRoute");

mongoose.connect("mongodb+srv://abheeshek47code:prWa9EpVYKRFVaoW@cluster0.ai6su.mongodb.net/test_project");

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
const CourseSchema= new mongoose.Schema({
    submittedby:String,
    batch:String,
    projectdetails:String,
    projectdescription:String,
    submissionDate:Date,
    Groupname:[{
        username:String,
        sap:{
            type:Number,
            unique:true
        }
    }],
    createdate:Date
})

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    createdate: Date,
    otp: String, // Add OTP field
    otpExpiration: Date // Add OTP expiration field
});


// const UserSchema= new mongoose.Schema({
//     email:{
//         type:String,
//         unique:true
//     },
//     password:String,
//     createdate:Date
// })

const TempUserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    otp: String,
    otpExpiration: Date,
    createdate: Date
});

const TempUser = mongoose.model("TempUser", TempUserSchema);


// const Usertable= mongoose.model("table_name",connectingtheschemawithpreviouslybuilt_schema)
// const Admin = mongoose.model("Admin",AdminSchema);
const User = mongoose.model("User",UserSchema);
const Course = mongoose.model("Course", CourseSchema)

// module.exports={User, Course};

export { User, Course, TempUser };
// module.exports = { User, Course, TempUser };




