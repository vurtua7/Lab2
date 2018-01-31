var http = require('http');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

app.set('views',path.resolve(__dirname,"views"));
app.set('view engine', 'ejs');

var entries = [];
// var mongoEntries = {title:"", body:"", date:""};

app.locals.entries = entries;
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended:false}));

app.get("/", (req,res) => 
{
    res.render("index");
});

app.get("/new-entry", (req,res) => 
{
    res.render("new-entry");
});

app.post("/new-entry", (req, res) =>
{
    if(!req.body.title||!req.body.body)
    {
        res.status(400).send("Entries must have some input!");
        return;
    }
    entries.push(
        {
            title:req.body.title,
            body:req.body.body,
            published: new Date()
            
        });
    // mongoEntries.title = req.body.title;
    // mongoEntries.body = req.body.body;
    
    // MongoClient.connect(url, (e,db) =>
    // {
    //     if(e) throw e;

    //     var dbObj = db.db("TestDB");

    //     dbObj.collection("games").insertMany(mongoEntries, (e,res) =>
    //     {
    //          if(e)throw e;
    //          console.log("Number of entries: " + res.insertedCount);
    //         db.close();
    //      });
    // })
    res.redirect("/");
});

app.use((req, res) =>
{
    res.status(404).render("404 Page Not Found");
});

http.createServer(app).listen(3000, (e) =>
{
    if(e)throw e;
    console.log("Game Lib Server started on port 3000");
});

