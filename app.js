const expres = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = expres();

app.use(bodyParser.urlencoded({extended: true}));

app.use(expres.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    let firstN = req.body.fName;
    let lastN = req.body.lName;
    let emailS = req.body.email;

    let data = {
        members: [
            {
                email_address: emailS,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstN,
                    LNAME: lastN
                }
            }
        ]
    };

    let jsonData = JSON.stringify(data);
    
    let options = {
        url: "https://us10.api.mailchimp.com/3.0/lists/25f85e2e7d",
        method: "POST",
        headers: {
            "Authorization" : "sk77 eeff9ffec3b5183a70d43707ed511afd-us10"
        },
        body: jsonData
    };

    request(options, function(error, response, body){
        if (error) {
            res.sendFile(__dirname + "/failure.html");
            console.log(response.statusCode);
        } else {
            if (response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
                console.log(response.statusCode);
            } else {
                res.sendFile(__dirname + "/failure.html");
                console.log(response.statusCode);
            }
        }
    });
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 5500, function(req, res){
    console.log("Server is started at the port 3000");
});

// API Key
// eeff9ffec3b5183a70d43707ed511afd-us10


//List ID
// 25f85e2e7d