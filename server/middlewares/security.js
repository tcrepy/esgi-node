const verifyToken = require('../lib/auth').verifyToken;

const verify = (req, res, next) => {
    console.log(req.path, ['/login', '/register'].includes(req.path));
    if (['/login', '/register'].includes(req.path)) return next();

    const authHeader = req.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.sendStatus(401);
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