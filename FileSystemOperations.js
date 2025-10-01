const fs = require ("fs");


const readline = require("readline");
const rl= readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

rl.question("Filename :",(path)=>{
    fs.readFile(`${path.trim()}`,"utf8",(err,data)=>{
    if(err){
        console.error("Error reading file",err);
        return
    }
    console.log("file content",data)
    })
    rl.close()
})
