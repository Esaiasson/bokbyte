const express = require("express");
const PORT = process.env.PORT || 3000;
const path = require("path");
const pool = require("./db");
const app = express();
const { v4: uuidv4 } = require('uuid');

app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json())

if (process.env.NODE_ENV === "production") {
  //server static content
  //npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.get("/books", async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM books")
    res.json(response.rows)
  } catch (err){
    console.error(err.message)
  }
})

app.post ("/userResponse", async (req, res) => {
  try{
    const body = req.body;
    const id = uuidv4()
    addRespondent(body, id)
    addBookNeeds(body, id)
    addBookHas(body, id)
  } catch (err){
    console.error(err.message)
  }
})

app.post ("/createBooks", async (req, res) => {
  try{
    const body = req.body;
    addBook(body)
  } catch (err){
    console.error(err.message)
  }
})


const addRespondent = async (body, id) => {
  try{
    const newResponse = await pool.query("INSERT INTO respondent (id, email, locations, session_id) VALUES($1, $2, $3, $4)",
    [id, body.email, body.location, body.sessionId])
  } catch (err){
    console.error(err.message)
  }
}



const addBookNeeds = async (body, id) => {
  body.needs.forEach(element => {
    insertIntoBookNeeds(id, element);
  });

}


const addBook = async (body) => {
  body.forEach(element => {
    insertIntoBooks(element);
  });

}

const insertIntoBooks = async(element) => {
  try{
    const newResponse = await pool.query("INSERT INTO books (Isbn, Imagelink, Title, Description, Category) VALUES($1, $2, $3, $4, $5)",
    [element.isbn, element.imageLinks, element.title, element.description, element.category])
  } catch (err){
    console.error(err.message)
  }
}



const insertIntoBookNeeds = async(id, element) => {
  try{
    const newResponse = await pool.query("INSERT INTO books_i_want (user_id, book_id) VALUES($1, $2)",
    [id, element.isbn])
  } catch (err){
    console.error(err.message)
  }
}


const addBookHas = async (body, id) => {
  body.has.forEach(element => {
    insertIntoBookHas(id, element);
  });

}


const insertIntoBookHas = async(id, element) => {
  try{
    const newResponse = await pool.query("INSERT INTO books_i_have (user_id, book_id) VALUES($1, $2)",
    [id, element.isbn])
  } catch (err){
    console.error(err.message)
  }
}


app.listen(PORT, () => {
  console.log('Server listening on' + PORT);
});