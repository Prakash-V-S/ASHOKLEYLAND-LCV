const express = require('express');
const multer = require('multer');
const cors = require('cors');
const connectDB = require('./config/db');
const Users = require('./module/Users');  
const bodyParser = require("body-parser");

const app = express();
require('dotenv').config();

connectDB(app);

// Middleware for parsing JSON and URL-encoded bodies
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Set up storage for Multer (in-memory storage for now)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },  // Limit to 2MB for each image
});

app.post('/api/users', async (req, res) => {
    const { customerName, model, about, img } = req.body;
  
    const newUser = new Users({
      customerName,
      model,
      about,
      img, 
    });
  
    try {
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  });
  
  

// GET route to fetch all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);     
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Optionally, use the userRoutes for other routes if needed
// app.use('/api/users', userRoutes);  // Ensure this is used correctly in the routing logic

