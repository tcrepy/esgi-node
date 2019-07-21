const jwt = require('jsonwebtoken');

const createToken = (user = {}) => {
    const jwt_secret = process.env.JWT_SECRET || "MyBestSecret"
   return jwt.sign({
       id: user.id,
       lastname: user.lastname,
       firstname: user.firstname,
       pseudo: user.pseudo,
       email: user.email
   }, jwt_secret, {//
       algorithm: "HS256",
       expiresIn: 3600
   });
};

const verifyToken = (token) => {
    const jwt_secret = process.env.JWT_SECRET || "MyBestSecret"
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwt_secret, (err, decodedToken) => {
            console.log(err, decodedToken);
            if (err || !decodedToken) reject(err);
            resolve(decodedToken);
        })
    });
};

module.exports = {
    createToken,
    verifyToken
};
