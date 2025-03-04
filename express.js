const express=require("express");
const app=express();

app.get("/",(request,response)=>{
    console.log("Hello World");
});
app.listen(3000);