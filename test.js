const http=require("http");

const host="127.0.0.1";
const port=3000;

const server=http.createServer((request,response)=>{
    response.statusCode=200;
    response.setHeader("Context-Type","text/plain");
    response.end("Hello World");
});

server.listen(port,host,()=>{
    console.log(`server running at http://${host}:${port}/`);
});