// given dependencies
const express = require("express");
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
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Notes html and it's "url"
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

// GET, POST, DELETE------------------------
app.get('/api/notes', (req, res) => {

    let read_sync = fs.readFileSync("db/db.json", "utf-8");
    let parse = JSON.parse(read_sync);
 
    console.log(read_sync);
    console.log(parse);
    res.json(parse);
    
});

// saving
app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = Date.now();

    console.log(req.body);
});



/* here is the route stuff needed
app.route("/api/notes.html")
    // Grab the notes list (this should be updated for every new note and deleted note.)
    .get(function (req, res) {
        res.json(database);
    })

    // Add a new note to the db file JSON
    .post( function(req, res){
        let json_file = path.join(__dirname, "./db/db.json");
        let new_note = req.body;

        let highest_id = 99;

        for(var i = 0; i < database.length(); i++){
            let single_note = database[i];

            if(single_note.id > highest_id){
                highest_id = single_note.id;
            }
        }

        //assign ID to the new note
        new_note.id = highest_id + 1;

        // push new noet to db.json
        database.push(new_note);

        //rewrite the db file
        fs.writeFile(json_file, JSON.stringify(database), function(err){
            if(err){
                return console.log(err);
            }
            console.log("Note saved. Better work.");
        });

        res.json(new_note);
    });*/

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
    