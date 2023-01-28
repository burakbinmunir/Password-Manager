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

    const collection2 = await db.collection("SavedPasswords");
    const r = await collection2.insertOne({username: username , savedPasswords: [{applicationName: 'demo', username: 'demo', password: 'demo'}]})

    
    return success
}

async function getLoginInfo (username, password) {
    await client.connect();
    const db = await client.db("password-manager");
    const collection = await db.collection('LoginInfo');
    const result = await collection.findOne({username: username, password: password});
    return result;
}

async function addNewPassword (username, applicationName, appUserName, appPassword) {
    await client.connect();
    const db = await client.db("password-manager");
    const collection = await db.collection("SavedPasswords");
    const result  = await collection.updateOne({username: username} , { $push:{ savedPasswords:{
        applicationName: applicationName,
        username: appUserName,
        password: appPassword
    }}});
    return result.acknowledged;
}

async function getSavedPasswords (username) {
    await client.connect();
    const db = await client.db("password-manager");
    const collection = await db.collection("SavedPasswords");
    const result = await collection.findOne({username: username});
    return result;
}

async function deleteSavedPassword (applicationName, username, password, currentUser){
    await client.connect();
    const db = await client.db("password-manager");
    const collection = await db.collection("SavedPasswords");
    const result = await collection.updateOne({username: currentUser}, {$pull: {savedPasswords: {
        applicationName: applicationName,
        username: username,
        password: password
    }}})
    return result.acknowledged;
}

app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running,and App is listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);


app.post('/loggedin', async (req, res)=>{
    const {username} = req.body;
    const result = await getSavedPasswords(username);
    res.json({result: result});
})

app.post ('/login', async (req, res)=>{
    const {username, password} = req.body;
    const result = await getLoginInfo(username, password);
    res.json({user: result});
})

app.post ('/newpassword', async (req, res)=>{
    const {username,applicationName, appUserName, appPassword} = req.body;
    const result = await addNewPassword(username, applicationName, appUserName, appPassword);
    res.json({success: result});
})

app.post('/signup', async (req, res)=>{
    const {email, username, password} = req.body;
    const s = await addLoginInfo(username,email,password)
    if (s === true)
        success = true;
    else success = false;
    res.json({success : success});
})

app.post('/delete', async (req,res)=>{
    const {applicationName, username, password, currentUser} = req.body;
    const success = await deleteSavedPassword(applicationName, username, password, currentUser);
    res.json({success: success})
})
