const express = require("express");
const db = require("./data/accounts-model");
const server = express();

// your code here

server.get("/api/accounts", async (req, res) => {
  try {
    const data = await db.find();
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

/*
    Route to fetch a specific ID an account /api/accounts/id
    The change is stored in req.body and passed to the db.update handle along with the ID
*/

server.get("/api/accounts/:id", async (req, res) => {
  try {
    const data = await db.findById(req.params.id);
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

/*
    Route to update an account /api/accounts/id
    The change is stored in req.body and passed to the db.update handle along with the ID
*/
server.put("/api/accounts/:id", async (req, res) => {
  const change = req.body;
  try {
    const data = await db.update(req.params.id, change);
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

module.exports = server;
