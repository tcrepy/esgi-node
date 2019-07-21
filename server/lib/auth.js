const jwt = require('jsonwebtoken');

const createToken = (user = {}) => {
   return jwt.sign({
       id: user.id,
       lastname: user.lastname,
       firstname: user.firstname,
       pseudo: user.pseudo,
       email: user.email
   }, process.env.JWT_SECRET, {
       algorithm: "HS256",
       expiresIn: 3600
   });
};

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err || !decodedToken) reject(err);
            resolve(decodedToken);
        })
    });
};

module.exports = {
    createToken,
    verifyToken
};
