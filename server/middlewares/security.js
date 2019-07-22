const verifyToken = require('../lib/auth').verifyToken;

const verify = (req, res, next) => {
    if (['/login', '/register', '/flush'].includes(req.path)) return next();

    const authHeader = req.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ "error" : "unauthorized" });
    }
    const token = authHeader.replace('Bearer ', '');
    verifyToken(token)
        .then(decodedToken => {
            req.user = decodedToken;
            next();
        }).catch(err => {
            res.status(401).send({
                error: "invalid JWT Token"
            });
    })
};

module.exports = {
    verify
};
