// Setup
const bcrypt = require("bcryptjs");

//Two functions here. First function hashes our password ready for the db write
// Second function compares our db hashed password to password entered on login form. The compare-
// hashes the password entered into the login form before a comparison to the db password is made.
exports.HashPassword = plainTextPassword => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt((err, salt) => {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(plainTextPassword, salt, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
};

exports.checkPassword = (
    textEnteredInLoginForm,
    hashedPasswordFromDatabase
) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(
            textEnteredInLoginForm,
            hashedPasswordFromDatabase,
            (err, doesMatch) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doesMatch);
                }
            }
        );
    });
};
