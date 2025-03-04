const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
app.use(express.json()); // Enables JSON body parsing

const dbPath = "C:\\Users\\Rahul\\goodreads.db";

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/books", async (request, response) => {
  try {
    const getBooksQuery = `SELECT * FROM book;`;
    const booksArray = await db.all(getBooksQuery);
    response.json({ books: booksArray });
  } catch (e) {
    response.status(500).json({ error: e.message });
  }
});
