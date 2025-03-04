const express=require("express");
const app=express();

app.get("/",(request,response)=>{
    console.log("Hello World");
    response.send("Hello World");
});
app.listen(3000,() => {
    console.log("Server is running on http://localhost:3000");
});