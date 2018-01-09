// Setup
const spicedPg     = require("spiced-pg");
// const secrets      = require("../secrets.json");

let database;

// Determiines whether we are on a local or hosting server
if (process.env.DATABASE_URL) {
    database = spicedPg(process.env.DATABASE_URL)
}
// } else {
//     database = spicedPg(`postgres:${secrets.user}:${secrets.password}@localhost:5432/marvel`)
// }

// DB query function to insert new user data
exports.insertUser = function(name, email, password) {
    return database.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id`,
    [name, email, password]).then((results) => {
        return results.rows[0];
    })
}

// Get record with email. Bring back the id and password
exports.readUsersByEmail = function(email) {
    return database.query(`SELECT id, password, name FROM users WHERE email = $1`,[email])
        .then((results) => {

        return results.rows[0];
    }).catch((err) => {
        console.log(err);
    });
}

// Get record with userid and send back the name
exports.getName = function(userid) {
    return database.query(`SELECT name FROM users WHERE id = $1`,[userid])
        .then((results) => {
            return results.rows[0];
    }).catch((err) => {
        console.log(err);
    });
}

// Get member count and send back
exports.getMemberCount = function() {
    return database.query(`SELECT id,count(*) FROM users GROUP BY id;`)
        .then((results) => {
            return results.rows;
    }).catch((err) => {
        console.log(err);
    });
}
