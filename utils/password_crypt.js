import bcrypt from 'bcryptjs'
// const bcrypt = require('bcryptjs');


export async function  hashPassword(password, result) {

    // var hashedPassword = "";

    // Encryption of the string password
    bcrypt.genSalt(10, function (err, Salt) {

        // The bcrypt is used for encrypting password.
        bcrypt.hash(password, Salt, function (err, hash) {

            if (err) {
                return console.log('Cannot encrypt');
            }

            // hashedPassword = hash;
            console.log(hash);

            result(hash)

            // return hashedPassword


        })
    })


}


export function verifyPassword(password, hashedPassword, result) {

    bcrypt.compare(password, hashedPassword,
        async function (err, isMatch) {
            result(isMatch)

        })
}