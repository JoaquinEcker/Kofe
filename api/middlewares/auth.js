const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.status(401).json({
        status: 401,
        error: 'You are not authorized to perform this action',
        });
    }
}
const checkAdmin = (req, res, next) => {
    if (req.user.role === 'admin' || req.user.role === 'superAdmin') {
        next();
    } else {
        return res.status(403).send({
        status: 403,
        error: 'You are not an admin, get the fuck out of here',
        });
    }
}

module.exports = {checkAuth, checkAdmin};