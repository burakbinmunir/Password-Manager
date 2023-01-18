const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
require('dotenv').config();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors())



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.connection_string;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function ff (){
    client.connect();
    const db = client.db('password-manager');
    const collection = db.collection('LoginInfo');
    const f = await collection.findOne();
    console.log(f);
    
}
ff()


// async function run() {
//   try {
//     await client.connect();
//     const db = client.db('sample_mflix');
//     const collection = db.collection('movies');

//     // Find the first document in the collection
//     const first = await collection.findOne();
//     console.log(first);
//   } finally {
//     // Close the database connection when finished or an error occurs
//     await client.close();
//   }
// }
// run().catch(console.error);


app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running,and App is listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);

app.post('/postrequest', (req, res)=>{
    const {name, age} = req.body;
    console.log(name,age);
    res.send("Noted")
})


app.get('/',(req, res)=>{
    
    res.status(200);
    user = {
        name : 'Burak',
        age : 20
    }
    res.json({user:user});
    
});
