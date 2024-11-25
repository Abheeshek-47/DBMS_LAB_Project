import { Router } from 'express';
// import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, TempUser, Course } from '../db.js';
import { sendVerificationEmail, generateOTP, sendConfirmationEmail } from './emailService.js';
import authenticateToken from '../Middleware/authMiddleware.js';

// const { Router } = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { User, TempUser, Course } = require("../db");
// const { sendVerificationEmail, generateOTP, sendConfirmationEmail } = require("./emailService"); // Import the email service
// const authenticateToken = require("../Middleware/authMiddleware");


const router = Router();
const secret = "DBMS_Project_Lab"; // Replace with your secret

// Sign-up route
router.post("/createnew", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate OTP
        const otp = generateOTP();
        const otpExpiration = Date.now() + 3600000; // OTP expires in 1 hour

        // Store data in TempUser collection
        await TempUser.create({
            email,
            password: hashedPassword,
            otp,
            otpExpiration,
            createdate: new Date()
        });

        // Send OTP email
        await sendVerificationEmail(email, otp);

        res.json({ msg: "User registered successfully. Please check your email for the OTP." });
    } catch (error) {
        console.error("Sign-up error:", error);
        if (error.code === 11000) {
            return res.status(400).json({ msg: "User already exists" });
        }
        res.status(500).json({ msg: "Something went wrong" });
    }
});

// OTP verification route
router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;

    try {
        const tempUser = await TempUser.findOne({ email, otp });
        if (!tempUser) {
            return res.status(400).json({ msg: "Invalid OTP or email" });
        }

        if (Date.now() > tempUser.otpExpiration) {
            return res.status(400).json({ msg: "OTP has expired" });
        }

        // Move data to User collection
        await User.create({
            email: tempUser.email,
            password: tempUser.password,
            createdate: tempUser.createdate
        });

        // Remove from TempUser collection
        await TempUser.deleteOne({ email });

        res.json({ msg: "Email verified successfully" });
    } catch (error) {
        console.error("OTP verification error:", error);
        res.status(500).json({ msg: "Something went wrong" });
    }
});

// router.post("/createnew", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Check if the user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ msg: "User already exists" });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create the new user
//         const newUser = await User.create({
//             email,
//             password: hashedPassword,
//             createdate: new Date()
//         });

//         res.json({ msg: "User created successfully" });
//     } catch (error) {
//         if (error.code === 11000) { // Duplicate key error code
//             return res.status(400).json({ msg: "User already exists" });
//         }
//         res.status(500).json({ msg: "Something went wrong" });
//     }
// });


// OTP verification route
router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email, otp });
        if (!user) {
            return res.status(400).json({ msg: "Invalid OTP or email" });
        }

        if (Date.now() > user.otpExpiration) {
            return res.status(400).json({ msg: "OTP has expired" });
        }

        // Clear the OTP and its expiration date after successful verification
        user.otp = null;
        user.otpExpiration = null;
        await user.save();

        res.json({ msg: "Email verified successfully" });
    } catch (error) {
        console.error("OTP verification error:", error);
        res.status(500).json({ msg: "Something went wrong" });
    }
});



// Sign-in route
// router.post("/signin", async (req, res) => {
//     console.log("Is running");
//     const { email, password } = req.body;

//     // Find the user
//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//         console.log("This is running");
//         return res.status(400).json({ msg: "Invalid email or password" });
//     }

//     // Compare the password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//         console.log("This is password running");
//         return res.status(400).json({ msg: "Invalid email or password" });
//     }

//     // Generate a token
//     const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: "1h" });

//     res.json({ msg: "Login successful", token });
// });

// module.exports = router;


// Sign-in route
router.post("/signin", async (req, res) => {
    console.log("Sign-in running");
    const { email, password } = req.body;

    try {
        // console.log("Sign-in email:", email);

        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid email" });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }

        // Generate a token
        const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: "1h" });

        res.json({ msg: "Login successful", token });
    } catch (error) {
        console.error("Sign-in error:", error);
        res.status(500).json({ msg: "Something went wrong" });
    }
});

router.post("/addcourse", authenticateToken, async (req, res) => {
    const { batch, submissionDate, Groupname, projectdetails, projectdescription, } = req.body;

    try {
        // Check for duplicate sap values within the Groupname array
        const duplicateSap = await Course.findOne({ "Groupname.sap": { $in: Groupname.map(member => member.sap) } });
        if (duplicateSap) {
            return res.status(400).json({ msg: "Duplicate sap value found in Groupname" });
        }

        // Check for duplicate submittedby email
        const duplicateEmail = await Course.findOne({ submittedby: req.user.email });
        if (duplicateEmail) {
            return res.status(400).json({ msg: "Duplicate email found for submittedby" });
        }

        // Ensure Groupname array is correctly structured
        const newGroupname = Groupname.map(member => ({
            username: member.username,
            sap: member.sap
        }));

        
        const newCourse = await Course.create({
            submittedby: req.user.email, // assuming the authenticated user's email is used
            projectdetails,
            projectdescription,
            batch,
            submissionDate: new Date(submissionDate),
            Groupname:newGroupname,
            createdate: new Date()
        });

        // Send confirmation email
        await sendConfirmationEmail(req.user.email, {
            submittedby: req.user.email,
            projectdetails,
            projectdescription,
            batch,
            submissionDate: new Date(submissionDate),
            Groupname:newGroupname,
            createdate: new Date()
        });

        res.json({ msg: "Course added successfully", course: newCourse });
    } catch (error) {
        console.error("Error adding course:", error);
        res.status(500).json({ msg: "Something went wrong" });
    }
});

// router.post("/addcourse", authenticateToken, async (req, res) => {
//     const { batch, submissionDate, Groupname } = req.body;

//     try {
//         const newCourse = await Course.create({
//             submittedby: req.user.email, // assuming the authenticated user's email is used
//             batch,
//             submissionDate: new Date(submissionDate),
//             Groupname,
//             createdate: new Date()
//         });

//         res.json({ msg: "Course added successfully", course: newCourse });
//     } catch (error) {
//         console.error("Error adding course:", error);
//         res.status(500).json({ msg: "Something went wrong" });
//     }
// });
export default router;
// 
// module.exports = router;

