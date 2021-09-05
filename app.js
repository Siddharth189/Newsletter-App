const express = require("express");
const port = 3000;
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static('public'));
// Read these : https://expressjs.com/en/starter/static-files.html
// https://stackoverflow.com/questions/50085482/how-to-include-separate-front-end-javascript-files-in-expressjs

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
})



//After filling the ye dikega
app.post('/', function(req, res){
    const fname = req.body.FirstName;
    const lname = req.body.LastName;
    
    const email = req.body.Email;
    const password = req.body.Password;

    res.send("<h1> your credentials are <br>Name: " + fname + " " + lname + " <br>Email: " + email + "<br>Password: " + password);

    var data = {
        members: {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: fname,
                LNAME: lname
            }
        }
    };
    
    const jsonData = JSON.stringify(data);
    
    const url = "https://us5.api.mailchimp.com/3.0/lists/2110194ab9"
    const option = {
        method:"POST",
        auth: "Siddharth1:188aec22097a9e71503ed61cc68a9fac-us5"
    }
    const request = https.request(url, option, function (response) {
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.listen(process.env.PORT || 3000, function (err) {
    if(err){
        console.log("Error: " + err);
        
        return ;
    }
    console.log("Yupp! the server is up and running on port: " + port);
})



// API Key
// 188aec22097a9e71503ed61cc68a9fac-us5

// List Id
// 2110194ab9