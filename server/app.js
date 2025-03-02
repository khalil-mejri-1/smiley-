const express = require("express");
const app = express();
const mongoose = require('mongoose');

const PORT = 3001;
const stickres = require('./models/stickres'); // Import the Naruto model


app.use(express.json()); // Middleware to parse JSON requests



const cors = require('cors');
app.use(cors()); // Enable CORS for cross-origin requests



const connectDB = async () => {
    try {
        const uri = 'mongodb+srv://khalilmejri000:ZD6XD4Zz4KMuqnb1@cluster0.28bwdzy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(uri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

connectDB();


  


app.get("/items/:category", async (req, res) => {
  const { category } = req.params; // استخراج الفئة من الرابط
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
      const totalItems = await stickres.countDocuments({ category }); // حساب العدد حسب الفئة
      const items = await stickres.find({ category }) // جلب البيانات حسب الفئة
          .sort({ _id: -1 })
          .skip((page - 1) * limit)
          .limit(limit);

      res.json({ items, total: totalItems });
  } catch (error) {
      console.error("Error fetching items:", error);
      res.status(500).json({ message: "Error fetching items" });
  }
});



app.post("/add_stickres", async (req, res) => {
  try {
    const newstickres = new stickres(req.body);
    await newstickres.save();
    res.status(201).send("User added successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

// app.get("/items", async (req, res) => {
//     try {
//       const items = await stickres.find().sort({ _id: -1 }); // Get all items sorted by _id in descending order
  
//       res.json({ items });
//     } catch (error) {
//       console.error("Error fetching items:", error);
//       res.status(500).json({ message: "Error fetching items" });
//     }
//   });
  




app.get("/", (req, res) => {
    res.send("Heldlo,qqqqqq Node.js!");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
