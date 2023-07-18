import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Password } from "./models/Password.js";
import { generateSecretKey } from "./utils/functions.js";
import { mongooseConnection } from "./utils/mongoose.js";

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

const SECRET_KEY = generateSecretKey(32);

app.get("/", (req, res) => {
  res.send({
    message: "Hello World",
  });
});

// Register a new user
app.post("/api/auth/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const passwordDocument = new Password({ username, password: hashedPassword });
  await passwordDocument.save();
  res.status(201).json({ message: "User registered successfully" });
});

// User login
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const passwordDocument = await Password.findOne({ username });
  if (passwordDocument) {
    const passwordMatch = await bcrypt.compare(
      password,
      passwordDocument.password
    );
    if (passwordMatch) {
      const token = jwt.sign(
        { username: passwordDocument.username },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});

// Get all passwords
app.get("/api/passwords", async (req, res) => {
  const passwords = await Password.find();
  res.status(200).json(passwords);
});

// Get a password by ID
app.get("/api/passwords/:id", async (req, res) => {
  const { id } = req.params;
  const password = await Password.findById(id);
  if (password) {
    res.status(200).json(password);
  } else {
    res.status(404).json({ error: "Password not found" });
  }
});

// Add a new password
app.post("/api/passwords", async (req, res) => {
  const { username, password } = req.body;
  const passwordDocument = new Password({ username, password });
  await passwordDocument.save();
  res.status(201).json(passwordDocument);
});

// Update a password
app.put("/api/passwords/:id", async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  const updatedPassword = { username, password };
  const passwordDocument = await Password.findByIdAndUpdate(
    id,
    updatedPassword,
    { new: true }
  );
  if (passwordDocument) {
    res.status(200).json({ message: "Password updated successfully" });
  } else {
    res.status(404).json({ error: "Password not found" });
  }
});

// Delete a password
app.delete("/api/passwords/:id", async (req, res) => {
  const { id } = req.params;
  const result = await Password.findByIdAndDelete(id);
  if (result) {
    res.status(200).json({ message: "Password deleted successfully" });
  } else {
    res.status(404).json({ error: "Password not found" });
  }
});

await mongooseConnection();

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
