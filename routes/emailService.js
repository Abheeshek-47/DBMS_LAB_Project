import nodemailer from 'nodemailer';

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com', // Your SMTP server
    port: 587, // Connection port
    auth: {
        user: '8091a4001@smtp-brevo.com', // SMTP login user
        pass: 'kJ5xdvIqcGYbwPaR' // SMTP login pass
    }
});

// Function to send verification email
export const sendVerificationEmail = (email, otp) => {
    const mailOptions = {
        from: 'no-reply@unitycircle.online', // Sender email
        to: email,
        subject: 'Email Verification OTP',
        text: `Your OTP for email verification is ${otp}`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log('Email sent: ' + info.response);
                resolve(info.response);
            }
        });
    });
};

// Function to send the confirmation email
export const sendConfirmationEmail = async (to, details) => {
    const htmlContent = `
        <html>
        <head>
            <title>Project Submission Confirmation</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Roboto', sans-serif;
                    background-color: #f3f4f6;
                    padding: 20px;
                }
                .container {
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    max-width: 600px;
                    margin: 0 auto;
                }
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .header i {
                    color: #38bdf8;
                    font-size: 48px;
                }
                .header h1 {
                    font-size: 24px;
                    margin-top: 10px;
                    color: #1f2937;
                }
                .content {
                    margin-bottom: 20px;
                }
                .content p {
                    font-size: 16px;
                    color: #4b5563;
                    line-height: 1.5;
                }
                .footer {
                    text-align: center;
                    color: #9ca3af;
                }
                .footer i {
                    color: #ef4444;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <i class="fas fa-check-circle"></i>
                    <h1>Form Successfully Submitted</h1>
                </div>
                <div class="content">
                    <p>Dear User,</p>
                    <p>Thank you for submitting your project. Here are the details of your submission:</p>
                    <ul>
                        <li><strong>Batch:</strong> ${details.batch}</li>
                        <li><strong>Project Details:</strong> ${details.projectdetails}</li>
                        <li><strong>Project Description:</strong> ${details.projectdescription}</li>
                        <li><strong>Submission Date:</strong> ${details.submissionDate}</li>
                        <li><strong>Group Members:</strong> ${details.Groupname.map(member => `${member.name} (${member.sap})`).join(', ')}</li>
                    </ul>
                    <p>We have received your form successfully and will process it shortly.</p>
                </div>
                <div class="footer">
                    Made with <i class="fas fa-heart"></i> by Your Team
                </div>
            </div>
        </body>
        </html>
    `;

    const textContent = `
        Dear User,

        Thank you for submitting your project. Here are the details of your submission:

        - Batch: ${details.batch}
        - Project Details: ${details.projectdetails}
        - Project Description: ${details.projectdescription}
        - Submission Date: ${details.submissionDate}
        - Group Members: ${details.Groupname.map(member => `${member.name} (${member.sap})`).join(', ')}

        We have received your form successfully and will process it shortly.

        Made with ❤️ by Your Team
    `;

    const mailOptions = {
        from: 'confirmation@unitycircle.online',
        to: to,
        subject: 'Project Submission Confirmation',
        html: htmlContent,
        text: textContent
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info.response;
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        throw error;
    }
};

// Function to generate OTP
export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// import nodemailer from 'nodemailer';

// // const nodemailer = require('nodemailer');

// // Configure nodemailer transporter
// const transporter = nodemailer.createTransport({
//     // service: 'gmail', // You can use any email service you prefer
//     // auth: {
//     //     user: 'no-reply@unitycircle.online', // Replace with your email
//     //     pass: 'your-email-password' // Replace with your email password
//     // }
//     host: 'smtp-relay.brevo.com', // <= your smtp server here
//    port: 587, // <= connection port
//    // secure: true, // use SSL or not
//    auth: {
//       user: '8091a4001@smtp-brevo.com', // <= smtp login user
//       pass: 'kJ5xdvIqcGYbwPaR' // <= smtp login pass
//    }
// });

// // Function to send verification email
// export const sendVerificationEmail = (email, otp) => {
//     const mailOptions = {
//         from: 'no-reply@unitycircle.online', // Replace with your email
//         to: email,
//         subject: 'Email Verification OTP',
//         text: `Your OTP for email verification is ${otp}`
//     };

//     return new Promise((resolve, reject) => {
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.log(error);
//                 reject(error);
//             } else {
//                 console.log('Email sent: ' + info.response);
//                 resolve(info.response);
//             }
//         });
//     });
// };

// // Function to send the confirmation email
// async function sendConfirmationEmail(to, details) {
    
//     const htmlContent = `
//         <html>
//         <head>
//             <title>Project Submission Confirmation</title>
//             <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
//             <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
//             <style>
//                 body {
//                     font-family: 'Roboto', sans-serif;
//                     background-color: #f3f4f6;
//                     padding: 20px;
//                 }
//                 .container {
//                     background-color: #ffffff;
//                     padding: 20px;
//                     border-radius: 8px;
//                     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//                     max-width: 600px;
//                     margin: 0 auto;
//                 }
//                 .header {
//                     text-align: center;
//                     margin-bottom: 20px;
//                 }
//                 .header i {
//                     color: #38bdf8;
//                     font-size: 48px;
//                 }
//                 .header h1 {
//                     font-size: 24px;
//                     margin-top: 10px;
//                     color: #1f2937;
//                 }
//                 .content {
//                     margin-bottom: 20px;
//                 }
//                 .content p {
//                     font-size: 16px;
//                     color: #4b5563;
//                     line-height: 1.5;
//                 }
//                 .footer {
//                     text-align: center;
//                     color: #9ca3af;
//                 }
//                 .footer i {
//                     color: #ef4444;
//                 }
//             </style>
//         </head>
//         <body>
//             <div class="container">
//                 <div class="header">
//                     <i class="fas fa-check-circle"></i>
//                     <h1>Form Successfully Submitted</h1>
//                 </div>
//                 <div class="content">
//                     <p>Dear User,</p>
//                     <p>Thank you for submitting your project. Here are the details of your submission:</p>
//                     <ul>
//                         <li><strong>Batch:</strong> ${details.batch}</li>
//                         <li><strong>Project Details:</strong> ${details.projectdetails}</li>
//                         <li><strong>Project Description:</strong> ${details.projectdescription}</li>
//                         <li><strong>Submission Date:</strong> ${details.submissionDate}</li>
//                         <li><strong>Group Members:</strong> ${details.Groupname.map(member => `${member.name} (${member.sap})`).join(', ')}</li>
//                     </ul>
//                     <p>We have received your form successfully and will process it shortly.</p>
//                 </div>
//                 <div class="footer">
//                     Made with <i class="fas fa-heart"></i> by Your Team
//                 </div>
//             </div>
//         </body>
//         </html>
//     `;

//     const textContent = `
//         Dear User,

//         Thank you for submitting your project. Here are the details of your submission:

//         - Batch: ${details.batch}
//         - Project Details: ${details.projectdetails}
//         - Project Description: ${details.projectdescription}
//         - Submission Date: ${details.submissionDate}
//         - Group Members: ${details.Groupname.map(member => `${member.name} (${member.sap})`).join(', ')}

//         We have received your form successfully and will process it shortly.

//         Made with ❤️ by Your Team
//     `;

//     const mailOptions = {
//         from: 'confirmation@unitycircle.online',
//         to: to,
//         subject: 'Project Submission Confirmation',
//         html: htmlContent,
//         text: textContent
//     };
//     // try {
//     //     await transporter.sendMail(mailOptions);
//     //     console.log('Confirmation email sent successfully');
//     // } catch (error) {
//     //     console.error('Error sending confirmation email:', error);
//     // }
//     return new Promise((resolve, reject) => {
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.log(error);
//                 reject(error);
//             } else {
//                 console.log('Email sent: ' + info.response);
//                 resolve(info.response);
//             }
//         });
//     });
// }
// // const sendConfirmationEmail = (email, courseDetails) => {
// //     const mailOptions = {
// //         from: 'confirmation@unitycircle.online',
// //         to: email,
// //         subject: 'Course Submission Confirmation',
// //         text: `Thank you for your submission. Here are the details you provided:\n\n${JSON.stringify(courseDetails, null, 2)}`
// //     };

// //     return new Promise((resolve, reject) => {
// //         transporter.sendMail(mailOptions, (error, info) => {
// //             if (error) {
// //                 console.log(error);
// //                 reject(error);
// //             } else {
// //                 console.log('Email sent: ' + info.response);
// //                 resolve(info.response);
// //             }
// //         });
// //     });
// // };


// // Function to generate OTP
// const generateOTP = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// };

// module.exports = { sendVerificationEmail, sendConfirmationEmail, generateOTP };
