const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt=require('bcrypt');

const app = express();
app.use(express.json());

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



app.get("/book/:bookId", async (request, response) => {
  const { bookId } = request.params;
  const getBookQuery = `SELECT * FROM book WHERE book_id = ${bookId};`;

  const book = await db.get(getBookQuery);
  response.send(book);
});

app.post("/book/",async(request,response)=>{
  const {title,author}=request.body;
  const addquery=`INSERT INTO book (title, author) VALUES('${title}', '${author}')`;
  const dbresponse=await db.run(addquery);
  const book_id=dbresponse.lastID;
  response.send({book_id:book_id});
});

app.put('/book/:bookId',async(request,response)=>{
  const {bookId}=request.params;
  const {title,author}=request.body;
  const query=`UPDATE 
                book 
                SET 
                  title='${title}',
                  author='${author}' 
                where
                  book_id=${bookId}`;
  await db.run(query);
  response.send("Updated Successfully");
});

app.get('/book1/',async(request,response)=>{
  const {
      offset=5,
      limit=4,
      order='DESC',
      order_by='book_id'
    }=request.query;

    const query1=`SELECT * FROM BOOK 
                  ORDER BY ${order_by} ${order} 
                  LIMIT ${limit} 
                  OFFSET ${offset}`;
    const answer=await db.all(query1);
    response.send(answer);
});

app.post('/user/', async (request, response) => {
  const { username, password, name, location } = request.body;
  const hashpassword = await bcrypt.hash(request.body.password, 10);

  const selectUserQuery = `SELECT * FROM user WHERE username = '${username}'`;
  const dbUser = await db.get(selectUserQuery);

  if (dbUser === undefined) {
    const createUserQuery = `INSERT INTO user
     (username, name, password, location) 
     VALUES (
        '${username}',
        '${name}',
        '${hashpassword}',
        '${location}'
      )`;
    const dbResponse = await db.run(createUserQuery);
    const newUserId = dbResponse.lastID;
    response.send(`Created new user with ${newUserId}`);
  } else {
    response.status(400);
    response.send("User already exists");
  }
});
