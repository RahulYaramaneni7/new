const express=require("express");
const app=express();

app.get("/date", (request, response) => {
    let date = new Date();
    response.send(`Today's date is ${date}`);
  });
app.listen(3000,() => {
    console.log("Server is running on http://localhost:3000");
});