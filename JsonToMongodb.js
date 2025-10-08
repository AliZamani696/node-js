const {MongoClient} = require("mongodb");
const fs = require("fs");

async function impoprtJsonToMongo() {
        const uri = "mongodb://localhost:27017";
        const client = new MongoClient(uri);

        try{
                await client.connect();
                console.log("connected to mongodb");
                const database = client.db("usersdb");
                const collection = database.collection("mongonode");

                const Jsondata = JSON.parse(fs.readFileSync("users.json","utf8"));

                if(Array.isArray(Jsondata)){
                        const result = await collection.insertMany(JsonData);
                        console.log(`${result.insertedCount} documents inserted`);
                }else{
                       const result = await collection.insertOne(Jsondata);
                       console.log(`1 document inserted`);
                }

        }catch(err){
                console.error(err)
        }finally{
                await client.close()
        }
}
impoprtJsonToMongo()
