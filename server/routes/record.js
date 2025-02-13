import express from "express";

// Database connection
import db from "../db/connection.js";

// Convert string ID to ObjectId
import { ObjectId } from "mongodb";

const router = express.Router();

// 🟢 Get all records
router.get("/", async (req, res) => {
  console.log("reached");
  
  try {
    const collection = db.collection("records");
    const results = await collection.find({}).toArray();
    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching records:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🟢 Get a single record by ID
router.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("records");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);

    if (!result) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching record:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🟢 Create a new record
router.post("/", async (req, res) => {
  try {
    const newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };

    const collection = db.collection("records");
    const result = await collection.insertOne(newDocument);

    res.status(201).json(result); // 🟢 201 for created resource
  } catch (err) {
    console.error("Error adding record:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🟢 Update a record by ID
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };

    const collection = db.collection("records");
    const result = await collection.updateOne(query, updates);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.status(200).json({ message: "Record updated", result });
  } catch (err) {
    console.error("Error updating record:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🟢 Delete a record by ID
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("records");
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.status(200).json({ message: "Record deleted" });
  } catch (err) {
    console.error("Error deleting record:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
