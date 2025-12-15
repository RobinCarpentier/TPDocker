const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// GET /counter → valeur actuelle
app.get("/counter", async (req, res) => {
  try {
    await pool.query(
      "CREATE TABLE IF NOT EXISTS counter (id SERIAL PRIMARY KEY, value INT)"
    );

    const result = await pool.query("SELECT * FROM counter ORDER BY id DESC LIMIT 1");

    if (result.rows.length === 0) {
      await pool.query("INSERT INTO counter(value) VALUES($1)", [0]);
      return res.json({ counter: 0 });
    }

    res.json({ counter: result.rows[0].value });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /counter/incr → incrémente
app.post("/counter/incr", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM counter ORDER BY id DESC LIMIT 1");
    let value = 0;
    if (result.rows.length > 0) value = result.rows[0].value;

    const newValue = value + 1;
    await pool.query("INSERT INTO counter(value) VALUES($1)", [newValue]);

    res.json({ counter: newValue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /counter/decr → décrémente
app.post("/counter/decr", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM counter ORDER BY id DESC LIMIT 1");
    let value = 0;
    if (result.rows.length > 0) value = result.rows[0].value;

    const newValue = value - 1;
    await pool.query("INSERT INTO counter(value) VALUES($1)", [newValue]);

    res.json({ counter: newValue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Backend listening on port 3000");
});
