const express = require("express");
const db = require("./data/accounts-model");
const server = express();
server.use(express.json());

// your code here

/*
    Route to fetch all the accounts in the database
    path /api/accounts
*/

server.get("/api/accounts", async (req, res) => {
  try {
    const data = await db.find();
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

/*
    Route to fetch a specific account based on ID
    Path /api/accounts/id
*/

server.get("/api/accounts/:id", async (req, res) => {
  try {
    const data = await db.findById(req.params.id);
    // Returns an Error if data is not found.
    if (!data) {
      res.status(404).json({ message: "Account ID not found" });
    }
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

/*
    Route to update an account
    The change is stored in req.body and passed to the db.update handle along with the ID
    Path /api/accounts/id
*/
server.put("/api/accounts/:id", async (req, res) => {
  const change = req.body;
  try {
    const data = await db.update(req.params.id, change);
    // Returns an Error if data is not found.
    if (!data) {
      res.status(404).json({ message: "Account ID not found" });
    }
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

/*
    Route to insert an account to the database
    ID Auto increments from the database
    Required fields are name and budget
    Path /api/accounts
*/

server.post("/api/accounts/", async (req, res) => {
  try {
    const data = await db.add(req.body);
    res.status(201).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

/*
    Route to delete an account in the database. Takes a specific ID
    Returns 1 for success and 0 for failure
*/

server.delete("/api/accounts/:id", async (req, res) => {
  try {
    const data = await db.remove(req.params.id);
    console.log(data);
    if (!data) {
      res.status(404).json({ message: "ID not found" });
    }
    res.status(204).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

module.exports = server;
