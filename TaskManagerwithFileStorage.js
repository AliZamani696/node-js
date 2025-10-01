const fs = require("fs").promises;
const path = require("path");


const TASKS_FILE = path.join(__dirname,"tasks.json");



class TaskManager{
    constructor(){
        this.tsak = [];
        this.loadTasks();
    }
    async loadTasks(){
        try{
            const data = await fs.readFile(TASKS_FILE,"utf8");
            this.tasks = JSON.parse(data);
        }catch(error){
            this.tasks = [];
        }
    }
    async saveTasks(){
        await fs.writeFile(TASKS_FILE,JSON.stringify(this.tasks,null,2));
    }
    async addTask(description){
        const task = {
            id:Date.now(),
            description,
            completed :false,
            createdAT:new Date().toISOString(),
        };
        this.tasks.push(task);
        await this.saveTasks();
        return task;
    }
    async completeTask(id){
        const tsak = this.tasks.find(t => t.id === id);
        if (task){
            this.completed = true;
            await this.saveTasks();
        }
        return task;
    }
    async deleteTask(id){
        this.tasks = this.tasks.filter(t => t.id !== id);
        await this.saveTasks();
    }
    listTasks(){
        return this.tasks;
    }
}

const readline = require("readline");
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

const taskManager = new TaskManager();


function displayMenu(){
    console.log(`
=== Task Manager ===
1. Add Task
2. List Tasks
3. Complete Task
4. Delete Task
5. Exit
    `)
}

function displayTasks(){
    const tasks = taskManager.listTasks();
    if (tasks.length === 0 ){
        console.log("no tasks found");
        return
    }
    tasks.forEach(task=>{

        console.log(`${task.id} | ${task.description} ${task.completed}?? '✓' : '✗' | ${task.createdAT}`);
    });
}

async function handleChoice(choice){
    switch (choice){
        case "1":
            rl.question("enter tast description ",async (description)=>{
                await taskManager.addTask(description);
                console.log("task added successfully");
                displayMenu();
            });
            break;
    case "2":
            displayTasks()
            displayMenu();
            break;
    case "3":
            rl.question("enter task id to complete ",async (id)=>{
                await taskManager.completeTask(parseInt(id));
                console.log("task completed");
                displayMenu();
            });
            break;
    case "4":
            rl.question("enter task id to Delete ",async (id)=>{
                await taskManager.deleteTask(parseInt(id));
                console.log("task Deleted");
                displayMenu();
            });
            break;
    case "5":
            rl.close();
            break;
    default:
        console.log("invalid choice");
        break;
    }
}

rl.on("line",(input)=>{
    handleChoice(input.trim());
})

displayMenu()
