import express from 'express';
import bodyParser from 'body-parser';
import { User } from './db.js'; // Assuming this is an ORM model (e.g., Sequelize, Mongoose).
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'https://www.unitycircle.online',  // Frontend URL
  methods: ['GET', 'POST'],
  credentials: true,  // If needed for cookies or headers
}));

app.get("/", (req, res) => {
  res.json({
    msg: "Deployed online Successfully",
  });
});

app.post("/addnew", async (req, res) => {
  const { Groupname, projectTitle, projectdescription, Submission_Date } = req.body;

  // Validate required fields
  if (!Groupname || !Array.isArray(Groupname) || Groupname.length === 0) {
    return res.status(400).json({ msg: "Invalid input data. 'Groupname' is required and must be a non-empty array." });
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
