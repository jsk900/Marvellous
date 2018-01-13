// Main setup of server side code
const express        = require("express");
const app            = express();
const compression    = require("compression");
const bodyParser     = require("body-parser");
const cookieSession  = require("cookie-session");
const https          = require("https");
const database       = require("./src/database.js");
const encrypt        = require("./src/encrypt.js");
const path           = require("path");
const csurf          = require("csurf");

// Use compresion and setup apps
app.disable("x-powered-by");
app.use(compression());
app.use(bodyParser.json());
app.use(cookieSession({secret: "a hard days night by the beatles", maxAge: 1000 * 60 * 60 * 24 * 14}));
app.use(csurf());

//Setup for csurf
app.use(function(request, response, next){
    response.cookie('mytoken', request.csrfToken());
    next();
});


// Setup access to react ..........................................................................
if (process.env.NODE_ENV != "production") {
    app.use("/bundle.js", require("http-proxy-middleware")({
        target: "http://localhost:8081/"
    }));
}
//.................................................................................................

// Use all in public folder  and listen on port 8080 or heroku
app.use(express.static("./public"));
app.use("/public", express.static(__dirname + "/public"));
app.listen(process.env.PORT || 8080, () => {console.log("Listening on port 8080")});

// Register new user and setup session var. Inform success or not in response.json.................
app.post("/register", (request, response) => {
    database.insertUser(request.body.name, request.body.email, request.body.password).then((results) => {
        request.session.user = {registered: true, userid: results.id}
        response.json({'success': true});
    }).catch((err) => {
        console.log(err);
        response.json({'success': false});
    });
});
// ................................................................................................

// Login existing user. Return success or not after checks.........................................
app.post("/login", (request, response) => {
    if (request.body) {
        database.readUsersByEmail(request.body.email).then((results) => {
            if (results) {
                encrypt.checkPassword(request.body.password, results.password).then((doesMatch) => {
                    if (!doesMatch) {
                        response.json({success: false})
                    } else {
                        request.session.user = { user: true, userid: results.id }
                        response.json({success: true, name: results.name})
                    }
                })
            } else {
                response.json({success: false, email_not_registered: true});
            }
        });
    } else {
        response.json({success: false})
    }
})

//logout
app.get("/logout", (request, response) => {
    request.session = null
    response.redirect("/")
})

// Send name to browser script
app.post("/getName", (request, response) => {
    database.getName(request.session.user.userid).then((results) => {
        response.json({'success': true, name: results.name});
        }).catch((err) => {
        console.log(err);
        response.json({'success': false});
    });
});

// Send member Count to browser script
app.post("/getMemberCount", (request, response) => {
    database.getMemberCount().then((results) => {
        response.json({'success': true, memberCount: results.length});
        }).catch((err) => {
        console.log(err);
        response.json({'success': false});
    });
});

// Send name to browser script
app.post("/checkEmail", (request, response) => {
    database.readUsersByEmail(request.body.email).then((results) => {
        if (results) {
            response.json({'success': true});
        } else {
            response.json({'success': false});
        }
    });
});

// Insert selected favourite into db
app.post("/favourites", (request, response) => {
    database.insertFavourites(request.session.user.userid, request.body.characterId, request.body.characterPic, request.body.characterName)
    .then((results) => {
        response.json({'success': true});
        }).catch((err) => {
        console.log(err);
        response.json({'success': false});
    });
});

// get favourites by userid
app.post("/getFavourites", (request, response) => {
    database.getFavourites(request.session.user.userid).then((results) => {
        response.json({'success': true, results: results});
        }).catch((err) => {
        console.log(err);
        response.json({'success': false});
    });
});

// check favourites by userid and characterId
app.post("/checkFavourites", (request, response) => {
    database.checkFavourites(request.session.user.userid, request.body.characterId).then((results) => {
        if (results.length > 0) {
            response.json({'success': true});
        } else {
            response.json({'success': false});
        }
    });
});

// Delete favourites by userid and characterId
app.post("/deleteFavourites", (request, response) => {
    database.deleteFavourites(request.session.user.userid, request.body.characterId).then((results) => {
        response.json({'success': true});
        }).catch((err) => {
        console.log(err);
        response.json({'success': false});
    });
});

// Catch all with checks to see if there is a user session and redirects accordingly...............
app.get('*', (request, response) => {
    if (!request.session.user && request.url != "/welcome") {
        response.redirect("/welcome")
        return;
    }

    response.sendFile(__dirname + "/index.html");
});
