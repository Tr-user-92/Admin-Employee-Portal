import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
// import session from "express-session";
// import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

// app.use(
//   session({
//     secret: "secret-key",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from /uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect MongoDB
mongoose
  .connect("mongodb://localhost:27017/CompanyData")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Connection error", err));

// Multer setup for storing image files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// MongoDB Schema for employee data
const empschema = new mongoose.Schema({
  fullName: String,
  jobDesc: String,
  image: String, // image path
  email: String,
  phone: Number,
  bloodGrp: String,
});
const employee = mongoose.model("employee", empschema);

// MongoDB Schema for Admin Data
const adminSchema = new mongoose.Schema({
  fullname: String,
  username: { type: String, required: true, unique: true },
  email: String,
  phone: Number,
  passwd: String,
  // cnfpasswd: String,
  gender: String,
});

const Admin = mongoose.model("Admin", adminSchema);

// Routes
app.post("/data", upload.single("image"), async (req, res) => {
  try {
    console.log("Received data:", req.body);
    console.log("Received file:", req.file);

    const empdata = new employee({
      fullName: req.body.fullName,
      jobDesc: req.body.jobDesc,
      image: req.file ? `/uploads/${req.file.filename}` : "",
      email: req.body.email,
      phone: Number(req.body.phone), // explicitly convert
      bloodGrp: req.body.bloodGrp,
    });
    await empdata.save();
    res.send(empdata);
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Error saving data", err });
  }
});

app.post("/adminregister", async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.passwd, 10);
    const adminData = {
      ...req.body,
      passwd: hashedPass,
      cnfpasswd: undefined, // Optional: don't store confirm password
    };
    const newAdmin = await Admin.create(adminData);
    res.json(newAdmin);
  } catch (err) {
    // res.status(500).json({ error: "Registration failed", err });
    res.status(500).send("Registration error");
  }
});

app.post("/adminlogin", async (req, res) => {
  const { username, passwd } = req.body;

  try {
    const user = await Admin.findOne({ username });

    if (!user) {
      return res.json({ status: "error", message: "User not found" });
    }

    const isMatch = await bcrypt.compare(passwd, user.passwd);
    if (!isMatch) {
      alert("password is incorrect");
      return res.json({ status: "error", message: "Invalid password" });
    }

    res.json({ 
      status: "success", 
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

app.put("/data/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = req.body;
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }
    const updatedEmp = await employee.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.send(updatedEmp);
  } catch (err) {
    res.status(500).json({ error: "Error updating data", err });
  }
});

app.get("/data", async (req, res) => {
  const empdata = await employee.find();
  res.send(empdata);
});

app.delete("/data/:id", async (req, res) => {
  try {
    const deleted = await employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: "Error deleting data", err });
  }
});

// const uploadDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

app.listen(4040, () => console.log("Server running on http://localhost:4040"));
