
const http = require("http");
const port = 8080
const server = http.createServer((req,res)=>{
    res.end("hello node js")
});

server.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
})
