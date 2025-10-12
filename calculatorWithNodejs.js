const { stdin, stdout } = require("process");

const readline = require("readline").createInterface({
        input : stdin,
        output: stdout
});

function Calculator(){
        readline.question("enter first number",(num1)=>{
                readline.question("enter operator",(operator)=>{
                        readline.question("enter second number",(num2)=>{
                                const a = parseFloat(num1)
                                const b = parseFloat(num2)
                                let res;

                                switch(operator){
                                        case "+":res = a + b;break;
                                        case "*":res = a * b;break;
                                        case "-":res = a - b;break;
                                        case "/":res = b!== 0?a/b:"error division zero";break;
                                        default : res = "Error invalid operator";
                                }
                                console.log(res);
                                readline.close();
                        })
                })
        })
}
Calculator()
