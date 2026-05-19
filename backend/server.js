
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// MYSQL CONNECTION
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2404",
  database: "crm_system",
});

// CONNECT DATABASE
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});

// ADD LEAD API
app.post("/addLead", (req, res) => {

  const { name, email, source, status, notes } = req.body;

  const sql =
    "INSERT INTO leads (name,email,source,status,notes) VALUES (?,?,?,?,?)";

  db.query(
    sql,
    [name, email, source, status, notes],
    (err, result) => {

      if (err) {
        console.log(err);
        res.status(500).send("Error adding lead");
      } else {
        res.send("Lead Added Successfully");
      }

    }
  );

});

// GET ALL LEADS API
app.get("/leads", (req, res) => {

  const sql = "SELECT * FROM leads";

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).send("Error fetching leads");
    } else {
      res.json(result);
    }

  });

});

// DELETE LEAD API
app.delete("/deleteLead/:id", (req, res) => {

  const id = req.params.id;

  const sql = "DELETE FROM leads WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).send("Delete failed");
    } else {
      res.send("Lead deleted successfully");
    }

  });

});

// SERVER START
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

