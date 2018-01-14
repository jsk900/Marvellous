// Setup
const spicedPg     = require("spiced-pg");

// Determiines whether we are on a local or hosting server
const dbUrl = process.env.DATABASE_URL || `postgres:${require("../secrets.json").user}:${require("../secrets.json").password}@localhost:5432/marvel`
let database = spicedPg(dbUrl)

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

// DB query function to insert new user data
exports.insertFavourites = function(userid,  characterId, characterPic, characterName) {
    return database.query(`INSERT INTO favourites (userid, characterId, characterPic, characterName) VALUES ($1, $2, $3, $4) RETURNING id`,
    [userid, characterId, characterPic, characterName]).then((results) => {
        return results.rows[0];
    })
}

// Get favourite records by userid
exports.getFavourites = function(userid) {
    return database.query(`SELECT * FROM favourites WHERE userid = $1`,[userid])
        .then((results) => {
            return results.rows;
    }).catch((err) => {
        console.log(err);
    });
}

// Check record exists by userid and characterId
exports.checkFavourites = function(userid, characterId) {
    return database.query(`SELECT userid,count(*) FROM favourites WHERE userid = $1 AND characterId = $2 GROUP BY userid `,[userid, characterId])
        .then((results) => {
            return results.rows;
    }).catch((err) => {
        console.log(err);
    });
}

// Delete record by userid and characterId
exports.deleteFavourites = function(userid, characterId) {
    return database.query(`DELETE FROM favourites WHERE userid = $1 AND characterId = $2`,[userid, characterId])
        .then((results) => {
            return results.rows;
    }).catch((err) => {
        console.log(err);
    });
}
