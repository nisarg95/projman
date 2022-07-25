const express = require('express'); 
const router = require("./router"); 
const mongoose = require("mongoose");
const path = require('path');
const bodyparser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const {MongoClient} = require("mongodb");

/*
//mongodb integration
const{ MongoClient }= require('mongodb') 

async function main(){

    const uri = "mongodb+srv://nisargvaishnav:Nisarg$9501Cluster@cluster0.kfu13.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);
    
    try{
        await client.connect();

        await listDatabases(client);

    } catch(e) {
        console.error(e);

    } finally {
        await client.close(); 
    } 
}

main().catch (console.error); 

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
    databasesList.database.forEach(db => {
        console.log (`-${db.name}`); 
    });
}*/

/* const username = "Nisarg Vaishnav";
const password = "Nisarg$9501Cluster";


const cluster = "Cluster0";
const dbname = "sample_airbnb";

mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true,
        //useFindandModify: false,
        useUnifiedTopology: true   
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:" ));
db.once("open", function(){

    console.log("DB Connected Successfully"); 
});

//const { default: mongoose } = require('mongoose');  */

//mongoOOSE
mongoose
  .connect(
    'mongodb+srv://myname:mypwd@myapp-vp7yg.mongodb.net/sample_airbnb?retryWrites=true',
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to mongodb..."))
  .catch(err => console.log(err));

async function  main(){
    
   /* const username = "nisargvaishnav";
    const password = "Nisarg$9501Cluster";
    const cluster = "cluster0.kfu13";
    const dbname = "sample_airbnb";
    */
  //`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 

    const uri = "mongodb+srv://nisargvaishnav:Nisarg$9501Cluster@cluster0.kfu13.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri); 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
 

main().catch(console.error);

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

// load static assets
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

app.use(session({
    secret: uuidv4(), //   uuid '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    resave: false,
    saveUninitialized: true
}));

app.use('/route', router);

// home route
app.get('/', (req, res) =>{
    res.render('base', { title : "Login"});
})

app.listen(port, ()=>{ console.log("Listening to the server on http://localhost:3000")});