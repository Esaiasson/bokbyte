const express = require("express");
const PORT = process.env.PORT || 3000;
const path = require("path");
const pool = require("./db");
const app = express();


app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json())

if (process.env.NODE_ENV === "production") {
  //server static content
  //npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}


app.get("/books", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM books");

    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post ("/userResponse", async (req, res) => {
  try{
    const description = req.body;
    const email = description.email
    const newResponse = await pool.query("INSERT INTO respondent (email, locations) VALUES($1, $2)",
    [description.email, description.location])
  } catch (err){
    console.error(err.message)
  }
})

app.listen(PORT, () => {
  console.log('Server listening on' + PORT);
});