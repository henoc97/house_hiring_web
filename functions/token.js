


const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(user) {
    
    const key = process.env.TOKEN_KEY;
    const payload = {
        userId : user.id,
        userEmail : user.email,
    };

    const options = {
        expiresIn : '5h'
    };

    const token = jwt.sign(payload, key, options);

    return token;

}

module.exports = generateToken;