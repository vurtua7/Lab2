var http = require('http');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();

app.set('views',path.resolve(__dirname,"views"));
app.set('view engine', 'ejs');

var entries = [];

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
            content:req.body.body,
            published:new Date()
        });
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