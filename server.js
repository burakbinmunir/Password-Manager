const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();
app.use(express.urlencoded());
app.use(express.json());
app.use(cors())
const uri = process.env.connection_string;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function addLoginInfo (username, email, password){
    await client.connect();
    const db = await client.db('password-manager');
    const collection = await db.collection('LoginInfo');
    const result = await collection.insertOne({username: username, email: email, password: password});
    const success = await result.acknowledged;  
    return success
}

async function getLoginInfo (username, password) {
    await client.connect();
    const db = await client.db("password-manager");
    const collection = await db.collection('LoginInfo');
    const result = await collection.findOne({username: username, password: password});
    return result;
}



app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running,and App is listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);


app.post ('/login', async (req, res)=>{
    const {username, password} = req.body;
    const result = await getLoginInfo(username, password);
    res.json({user: result});
})

app.post('/signup', async (req, res)=>{
    const {email, username, password} = req.body;
    const s = await addLoginInfo(username,email,password)
    if (s === true)
        success = true;
    else success = false;
    res.json({success : success});
})
