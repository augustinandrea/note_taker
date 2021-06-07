// given dependencies
const express = require("express");
const path = require("path");

var app = express();
var PORT = process.env.PORT || 3001;

const fs = require("fs");
const database = require("./db/db.json");

// link to assets
app.use(express.urlencoded( { extended: true } ));
app.use( express.json() );
app.use(express.static('public'));

// page load, start with index.html
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Notes html and it's "url"
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

// GET, POST, DELETE------------------------

// read db.json file
app.get("/api/notes", (req, res) => {

    let read_sync = fs.readFileSync("db/db.json", "utf-8");
    let parse = JSON.parse(read_sync);
 
    console.log(read_sync);
    console.log(parse);
    return res.json(parse);
    
});

// saving the notes
app.post("/api/notes", (req, res) => {
console.log('Start of app.post');

    let read_sync = fs.readFileSync("db/db.json", "utf-8");
    read_sync = JSON.parse(read_sync);
    let json_path = path.join(__dirname, "db/db.json");

    let new_db = {
        "title": req.body.title,
        "text": req.body.text,
        "id": Date.now()
    }

    read_sync.push(new_db);
    fs.writeFileSync( json_path, JSON.stringify(read_sync), function (err){
        if(err){
            return console.log(err);
        }
        else{
            console.log("new note.");
        }
    });

    res.send(true);

});

// the delete on server side
app.delete("/api/notes/:id", (req, res) => {
    console.log('starting delete...');
        
    let json_path = path.join(__dirname, "/db/db.json");
    let notesJson = fs.readFileSync("db/db.json", "utf-8");

    let notesArray = JSON.parse(notesJson);


    console.log('deleting id: ' + req.params.id);
    console.log('starting database: ' + notesArray);

    for(var i = 0; i < notesArray.length; i++){

        if(notesArray[i].id == req.params.id){
            // use splice. I might be using this wrong
            notesArray.splice(i, 1);
            break;
        }
    }

    console.log('database after delete:' + notesArray);

    //rewrite the file without id indicated
    fs.writeFileSync(json_path, JSON.stringify(notesArray), function (err){
        if(err){
            return console.log(err);
        }
        else{
            console.log("Note deleted.");
        }
    });

    res.json(notesArray);

});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
    