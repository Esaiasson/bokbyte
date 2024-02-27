const express = require("express");
const PORT = process.env.PORT || 3000;
const path = require("path");
const pool = require("./db");
const app = express();


app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.NODE_ENV === "production") {
  //server static content
  //npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.get("/books", async (req, res) => {
  try {
    console.log("hit")
    const allTodos = await pool.query("SELECT * FROM books");

    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () => {
  console.log('Server listening on' + PORT);
});